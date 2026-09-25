/**
 * Runtime tłumaczeń (i18n).
 *
 * Cel: cały tekst widoczny dla użytkownika mieszka w plikach językowych
 * (`i18n/pl/`), a kod odwołuje się do niego kluczem. Dodanie języka to
 * dodanie katalogu z plikami i zarejestrowanie go w LOCALES - bez ruszania
 * logiki kreatora.
 *
 * Konwencja projektu: dane gry mają polskie nazwy pól, a identyfikatory w
 * kodzie są angielskie - dlatego KLUCZE są angielskie ('step1.heading'),
 * a wartości to teksty w danym języku.
 *
 * Język domyślny (pl) jest importowany STATYCZNIE, żeby t() było zawsze
 * synchroniczne. Gdyby paczka językowa ładowała się dynamicznie, każda
 * funkcja renderująca musiałaby czekać na jej gotowość - a renderowanie w
 * tym kreatorze jest synchroniczne (66 miejsc podstawia innerHTML).
 */

import PL from './pl/index.js';

/**
 * Zarejestrowane języki. Klucz to tag BCP 47 - używany też przez
 * Intl.PluralRules i localeCompare, więc musi być prawdziwym tagiem, nie
 * dowolnym skrótem.
 *
 * `load` jest leniwe dla wszystkiego poza domyślnym językiem: dopóki nikt nie
 * przełączy języka, przeglądarka nie pobiera niepotrzebnych plików.
 */
const LOCALES = {
  'pl-PL': { nazwa: 'Polski', bundle: PL },
  // Przykład rejestracji kolejnego języka (katalog jeszcze nie istnieje -
  // ekstrakcja przygotowała miejsce, tłumaczenie to osobna praca):
  // 'en-US': { nazwa: 'English', load: () => import('./en/index.js') }
};

const DEFAULT_LOCALE = 'pl-PL';
const STORAGE_KEY = 'kreator_jezyk';

let currentLocale = DEFAULT_LOCALE;
let bundle = PL;
let pluralRules = new Intl.PluralRules(DEFAULT_LOCALE);

/** Klucze, dla których już ostrzegliśmy - żeby nie zaśmiecać konsoli w pętli renderowania. */
const missingReported = new Set();

/**
 * Schodzi po ścieżce 'a.b.c' w obiekcie paczki językowej.
 * Zwraca undefined, gdy którykolwiek segment nie istnieje.
 */
function lookup(obj, key) {
  let node = obj;
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object' || !(part in node)) return undefined;
    node = node[part];
  }
  return node;
}

/**
 * Podstawia `{nazwa}` wartościami z `params`. Brakujący parametr zostawia
 * placeholder w tekście - łatwiej wtedy zauważyć pomyłkę niż przy cichym
 * wstawieniu "undefined".
 */
function interpolate(text, params) {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (caly, nazwa) =>
    (Object.prototype.hasOwnProperty.call(params, nazwa) ? String(params[nazwa]) : caly));
}

/**
 * Zwraca tekst dla klucza.
 *
 * Formy mnogie: jeśli wartością klucza jest obiekt z kategoriami CLDR
 * (one/few/many/other), a w `params` jest liczba `count`, forma wybierana
 * jest przez Intl.PluralRules dla aktualnego języka. Polski ma trzy formy
 * ("1 zaklęcie / 2 zaklęcia / 5 zaklęć"), angielski dwie - dlatego liczba
 * mnoga nie może być sklejana w kodzie, tylko musi siedzieć w pliku
 * językowym.
 *
 * Wartości mogą zawierać HTML (np. <strong>) - t() nie escapuje, bo część
 * komunikatów kreatora jest formatowana. O tym, czy wynik idzie do
 * innerHTML, czy do textContent, decyduje miejsce wywołania.
 *
 * @param {string} key klucz, np. 'magic.blockade.deadEnd'
 * @param {Object<string, *>} [params] wartości do podstawienia oraz `count`
 * @returns {string}
 */
export function t(key, params) {
  let value = lookup(bundle, key);

  // Awaryjnie sięgnij do języka domyślnego - brak tłumaczenia jednego klucza
  // nie powinien wywalać całego ekranu.
  if (value === undefined && bundle !== PL) value = lookup(PL, key);

  if (value === undefined) {
    if (!missingReported.has(key)) {
      missingReported.add(key);
      console.warn(`[i18n] brak klucza: ${key}`);
    }
    return key;
  }

  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const count = params && params.count;
    if (typeof count !== 'number') {
      if (!missingReported.has(key)) {
        missingReported.add(key);
        console.warn(`[i18n] klucz ${key} ma formy mnogie, ale nie podano params.count`);
      }
      return key;
    }
    const kategoria = pluralRules.select(count);
    const forma = value[kategoria] ?? value.other ?? value.many ?? Object.values(value)[0];
    return interpolate(String(forma), params);
  }

  return interpolate(String(value), params);
}

/**
 * Tag BCP 47 aktualnego języka. Do localeCompare() i toLocaleString() -
 * dzięki temu sortowanie i formatowanie daty idą za wybranym językiem,
 * zamiast być zaszyte jako 'pl'.
 */
export function localeTag() {
  return currentLocale;
}

/** Lista języków do ewentualnego przełącznika w UI: [{ kod, nazwa }]. */
export function availableLocales() {
  return Object.entries(LOCALES).map(([kod, def]) => ({ kod, nazwa: def.nazwa }));
}

/**
 * Przełącza język i podmienia teksty w już wyrenderowanym DOM.
 * Zwraca true, gdy język był zarejestrowany.
 */
export async function setLocale(kod) {
  const def = LOCALES[kod];
  if (!def) {
    console.warn(`[i18n] nieznany język: ${kod}`);
    return false;
  }
  if (!def.bundle && def.load) {
    const mod = await def.load();
    def.bundle = mod.default || mod;
  }
  bundle = def.bundle;
  currentLocale = kod;
  pluralRules = new Intl.PluralRules(kod);
  missingReported.clear();
  try {
    localStorage.setItem(STORAGE_KEY, kod);
  } catch {
    // Tryb prywatny albo zablokowane dane witryny - wybór nie przetrwa
    // odświeżenia, ale sama zmiana języka ma zadziałać.
  }
  document.documentElement.lang = kod.split('-')[0];
  hydrateDom();
  return true;
}

/**
 * Przywraca język zapisany przy poprzedniej wizycie. Wołane raz przy starcie,
 * przed pierwszym renderowaniem.
 */
export async function initI18n() {
  let zapisany = null;
  try {
    zapisany = localStorage.getItem(STORAGE_KEY);
  } catch {
    // brak dostępu do localStorage - zostajemy na domyślnym języku
  }
  if (zapisany && zapisany !== currentLocale && LOCALES[zapisany]) {
    await setLocale(zapisany);
  } else {
    document.documentElement.lang = currentLocale.split('-')[0];
    hydrateDom();
  }
}

/**
 * Wstawia teksty do statycznego HTML. Znaczniki w index.html:
 *
 *   data-i18n="key"            -> textContent elementu
 *   data-i18n-html="key"       -> innerHTML (gdy tekst zawiera znaczniki)
 *   data-i18n-attr="title:key;aria-label:key" -> atrybuty
 *
 * Dzięki temu w index.html zostaje sama struktura (w tym ikony <svg>), a
 * tekst przychodzi z pliku językowego. Wołane przy starcie i po każdej
 * zmianie języka.
 */
export function hydrateDom(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  root.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  root.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.getAttribute('data-i18n-attr').split(';').forEach(para => {
      const idx = para.indexOf(':');
      if (idx < 1) return;
      const atrybut = para.slice(0, idx).trim();
      const klucz = para.slice(idx + 1).trim();
      if (atrybut && klucz) el.setAttribute(atrybut, t(klucz));
    });
  });
  const tytul = t('app.title');
  if (tytul !== 'app.title') document.title = tytul;
}

export default t;
