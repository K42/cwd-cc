/**
 * Silnik reguł języków i profesji (PG, rozdział 1: "Języki i profesje").
 *
 * Zasady źródłowe:
 * - Każda postać zaczyna z 2 profesjami (dowolnej kategorii). Każdą z nich
 *   można zamienić na naukę mówienia nowym językiem albo na umiejętność
 *   czytania/pisania w języku, którym już mówi.
 * - Pochodzenie może dać dodatkową, obowiązkową profesję (czasem z
 *   ograniczeniem do konkretnej kategorii - patrz `origins.js`).
 * - Wybrane ścieżki (nowicjusza/eksperckie/mistrzowskie) mogą przy wyborze
 *   przyznać język lub profesję - czasem to wybór (język ALBO profesja z
 *   ograniczonych kategorii), czasem to wyłącznie profesja (bez opcji
 *   językowej), a czasem obie korzyści łącznie (patrz `paths.js`,
 *   pole `jezyki_profesje`).
 * - Magik dodatkowo automatycznie zyskuje czytanie/pisanie we wszystkich
 *   znanych sobie językach (nie jest to slot do wyboru).
 */

import PATHS from '../data/paths.js';

/** Języki Północnych Rubieży (PG, ramka w rozdziale 1). */
const LANGUAGES = {
  wspólny: 'Wspólny',
  mroczna_mowa: 'Mroczna mowa',
  krasnoludzki: 'Krasnoludzki',
  elficki: 'Elficki',
  wysoki_archaik: 'Wysoki archaik',
  trolli: 'Trolli'
};

/** Mapuje przymiotnikowe formy kategorii (z origins.js/paths.js) na klucze tabel PROFESSIONS.tables. */
const CATEGORY_ALIASES = {
  naukowa: 'naukowe', naukowe: 'naukowe',
  pospolita: 'pospolite', pospolite: 'pospolite',
  przestepcza: 'przestepcze', przestepcze: 'przestepcze',
  wojenna: 'wojenne', wojenne: 'wojenne',
  koczownicza: 'koczownicze', koczownicze: 'koczownicze',
  religijna: 'religijne', religijne: 'religijne',
  dowolna: 'dowolna'
};

function normalizeCategories(kategorie) {
  return (kategorie || []).map(k => CATEGORY_ALIASES[k] || k);
}

function findPath(groupKey, id) {
  if (!id) return null;
  return (PATHS[groupKey] && PATHS[groupKey][id]) || null;
}

/**
 * Oblicza wszystkie sloty językowo-profesyjne przyznane postaci na
 * podstawie pochodzenia i wybranych ścieżek.
 *
 * Każdy slot ma pole `opcje` - listę dozwolonych sposobów jego rozdania:
 * - 'profesja' - profesja z kategorii `kategorie` (['dowolna'] = bez ograniczeń)
 * - 'jezyk_nowy' - nauka mówienia nowym językiem
 * - 'jezyk_pismo' - nauka czytania/pisania w już znanym języku
 *
 * @param {Object} params
 * @param {Object|null} params.pochodzenie - obiekt pochodzenia (z origins.js)
 * @param {string} params.sciezkaNowicjuszaId
 * @param {string} params.sciezkaEksperckaId
 * @param {string} params.sciezkaMistrzowskaId
 * @returns {{ sloty: Array, autoPismoWszystkieZnane: boolean }}
 */
function calculateSlotsProfessionsAndLanguages({ pochodzenie, pathNoviceId, pathExpertId, pathMasterId }) {
  const slots = [];
  let autoScriptAllKnown = false;
  let autoScriptAllKnownSource = null;

  // Profesje początkowe - każda postać zaczyna z dwiema, każdą można zamienić
  // na język (mówiony lub pismo w znanym).
  slots.push({ id: 'start-1', source: 'Profesje początkowe', kategorie: ['dowolna'], opcje: ['profesja', 'jezyk_nowy', 'jezyk_pismo'] });
  slots.push({ id: 'start-2', source: 'Profesje początkowe', kategorie: ['dowolna'], opcje: ['profesja', 'jezyk_nowy', 'jezyk_pismo'] });

  // Pochodzenie - dodatkowa profesja (czasem ograniczona kategorią; u
  // niektórych pochodzeń, np. Człowieka, to wybór język-albo-profesja,
  // patrz `bonus_jezyk_lub_profesja` w origins.js).
  if (pochodzenie && Array.isArray(pochodzenie.profesje) && pochodzenie.profesje.length > 0) {
    slots.push({
      id: 'pochodzenie',
      source: `Pochodzenie: ${pochodzenie.nazwa}`,
      kategorie: normalizeCategories(pochodzenie.profesje),
      opcje: pochodzenie.bonus_jezyk_lub_profesja ? ['profesja', 'jezyk_nowy'] : ['profesja']
    });
  }

  const addPath = (groupKey, pathId, etykieta) => {
    const sciezka = findPath(groupKey, pathId);
    const grant = sciezka && sciezka.poziom_1 && sciezka.poziom_1.jezyki_profesje;
    if (!grant) return;
    const kategorie = normalizeCategories(grant.kategorie);
    const source = `Ścieżka: ${sciezka.nazwa} (${etykieta})`;

    if (grant.typ === 'wybor') {
      slots.push({ id: `${pathId}-jp`, source, kategorie, opcje: ['profesja', 'jezyk_nowy'], opis: grant.opis });
    } else if (grant.typ === 'tylko_profesja') {
      slots.push({ id: `${pathId}-jp`, source, kategorie, opcje: ['profesja'], opis: grant.opis });
    } else if (grant.typ === 'oba') {
      slots.push({ id: `${pathId}-jp-jezyk`, source, kategorie: ['dowolna'], opcje: ['jezyk_nowy'], opis: grant.opis });
      slots.push({ id: `${pathId}-jp-profesja`, source, kategorie, opcje: ['profesja'], opis: grant.opis });
    } else if (grant.typ === 'automatyczne_naukowa') {
      autoScriptAllKnown = true;
      autoScriptAllKnownSource = source;
      slots.push({ id: `${pathId}-jp-profesja`, source, kategorie, opcje: ['profesja'], opis: grant.opis });
    }
  };

  addPath('sciezki_nowicjuszy', pathNoviceId, 'poziom 1');
  addPath('sciezki_ekspertow', pathExpertId, 'poziom 3');
  addPath('sciezki_mistrzow', pathMasterId, 'poziom 7');

  // Automatyczne pismo z pochodzenia (np. Krasnolud - krasnoludzki,
  // Elf - elficki) - niezależnie od Magika i nie zajmuje slotu.
  const autoScriptWithOrigin = (pochodzenie && pochodzenie.jezyki_pismo_automatyczne) || [];
  const autoScriptWithOriginSource = pochodzenie ? `Pochodzenie: ${pochodzenie.nazwa}` : null;

  return {
    slots,
    autoScriptAllKnown,
    autoScriptAllKnownSource,
    autoScriptWithOrigin,
    autoScriptWithOriginSource
  };
}

export { LANGUAGES, calculateSlotsProfessionsAndLanguages, normalizeCategories };
