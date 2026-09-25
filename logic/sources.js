/**
 * Filtr podręczników - pozwala graczowi wyłączyć z kreatora treść z wybranych
 * dodatków (np. taką, która nie pasuje do stylu jego kampanii).
 *
 * Przechowywane są WYŁĄCZONE kody źródeł, a nie włączone. Dzięki temu dodatek
 * dopisany do danych w przyszłości jest domyślnie widoczny, zamiast znikać
 * tylko dlatego, że nie było go na liście zapisanej wcześniej w przeglądarce.
 *
 * Podręcznika Głównego nie da się wyłączyć - to baza zasad, bez której
 * kreator nie ma z czego budować postaci.
 */

const ALWAYS_ENABLED_SOURCE = 'PG';
const STORAGE_KEY = 'kreator_wylaczone_podreczniki';

/** Wczytuje listę wyłączonych podręczników z pamięci przeglądarki. */
function loadDisabledSources() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const lista = JSON.parse(raw);
    return new Set(Array.isArray(lista) ? lista.filter(k => k !== ALWAYS_ENABLED_SOURCE) : []);
  } catch {
    // Pamięć może być zablokowana albo zawierać śmieci po starszej wersji -
    // brak filtra jest bezpieczniejszy niż ukrycie połowy treści.
    return new Set();
  }
}

const disabledSources = loadDisabledSources();

/**
 * Zapisuje bieżący stan filtra.
 * @returns {boolean} false, gdy zapis się nie powiódł (pamięć pełna/zablokowana)
 */
function persistDisabledSources() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...disabledSources]));
    return true;
  } catch {
    return false;
  }
}

/**
 * Czy treść z danego podręcznika ma być widoczna w kreatorze.
 * Wpisy bez podanego źródła traktujemy jak Podręcznik Główny - tak samo robi
 * reszta aplikacji (zob. renderSourceTag()).
 * @param {string} [zrodlo] - Kod źródła, np. 'SUP'
 * @returns {boolean}
 */
function isSourceEnabled(zrodlo) {
  if (!zrodlo || zrodlo === ALWAYS_ENABLED_SOURCE) return true;
  return !disabledSources.has(zrodlo);
}

/** Filtruje listę obiektów po ich polu `zrodlo`. */
function filterBySource(lista) {
  return (lista || []).filter(x => isSourceEnabled(x && x.zrodlo));
}

/**
 * Włącza albo wyłącza podręcznik. Podręcznika Głównego nie da się wyłączyć.
 * @returns {boolean} false, gdy nie udało się zapisać wyboru
 */
function setSourceEnabled(zrodlo, enabled) {
  if (!zrodlo || zrodlo === ALWAYS_ENABLED_SOURCE) return true;
  if (enabled) disabledSources.delete(zrodlo);
  else disabledSources.add(zrodlo);
  return persistDisabledSources();
}

/**
 * Włącza albo wyłącza naraz całą grupę podręczników - jeden zapis do pamięci
 * zamiast jednego na każdy kod, żeby przełączniki zbiorcze w popupie nie
 * kolejkowały kilkunastu zapisów pod rząd.
 * @returns {boolean} false, gdy nie udało się zapisać wyboru
 */
function setSourcesEnabled(kody, enabled) {
  (kody || []).forEach(kod => {
    if (!kod || kod === ALWAYS_ENABLED_SOURCE) return;
    if (enabled) disabledSources.delete(kod);
    else disabledSources.add(kod);
  });
  return persistDisabledSources();
}

/** Kody wyłączonych podręczników (kopia - stan zmienia się tylko setterem). */
function getDisabledSources() {
  return new Set(disabledSources);
}

export {
  ALWAYS_ENABLED_SOURCE,
  isSourceEnabled,
  filterBySource,
  setSourceEnabled,
  setSourcesEnabled,
  getDisabledSources
};
