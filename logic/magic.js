/**
 * Silnik reguł nauki tradycji magicznych i zaklęć (PG, rozdział "Magia").
 *
 * Zasady źródłowe (zweryfikowane bezpośrednio w podręczniku):
 * - "Poznawanie tradycji": poznanie nowej tradycji oznacza automatyczną
 *   naukę jednego z jej zaklęć kręgu 0.
 * - "Uczenie się zaklęć": nauka zaklęcia wymaga już znanej tradycji, z
 *   której to zaklęcie pochodzi, a jego krąg nie może przekraczać Mocy
 *   postaci.
 * - "Czarna magia" (Klątwy, Sztuki Zakazane, Nekromancja i best-effort
 *   klasyfikowane tradycje z suplementów - zob. `traditions.js`): poznanie
 *   takiej tradycji przyznaje od razu 1 punkt Splugawienia; każde kolejne
 *   nauczone z niej zaklęcie niesie ryzyko +1 Splugawienia (rzut k6 <
 *   liczba już znanych zaklęć czarnej magii).
 *
 * Ten moduł rozbija pole `magia` ze `paths.js`/`origins.js` (jednostki
 * nadania: tradycja / wybor / zaklecie - zob. dokumentację w paths.js) na
 * listę "atomowych wyborów" - niepodzielnych decyzji gracza, jedną kartę
 * UI na atom - i udostępnia funkcje pomocnicze do ich rozwiązywania
 * (śledzenie znanych tradycji, filtrowanie dostępnych zaklęć wg Mocy).
 */

import PATHS, { PATH_LEVEL_KEYS } from '../data/paths.js';
import SPELLS from '../data/spells.js';
import { TRADITIONS, RELIGIOUS_TRADITIONS, getLearnableTraditionsList } from '../data/traditions.js';
import { isSourceEnabled } from './sources.js';
import { localeTag } from '../i18n/index.js';

/**
 * Minimalny poziom postaci wymagany do odblokowania danego klucza korzyści
 * ścieżki - wspólna definicja z data/paths.js, żeby nie utrzymywać dwóch
 * rozjeżdżających się kopii tego mapowania.
 */
const REQUIRED_LEVEL = PATH_LEVEL_KEYS;

function findPath(groupKey, id) {
  if (!id) return null;
  return (PATHS[groupKey] && PATHS[groupKey][id]) || null;
}

/**
 * Normalizuje pole `magia` (bare obiekt albo tablica obiektów) do tablicy
 * jednostek nadania. Wartości tekstowe (np. "Zaklęcie egzorcyzm" Egzorcysty)
 * to automatyczne, nieinteraktywne nadania zaklęcia - nie przechodzą przez
 * ten mechanizm wyboru, więc zwracają puste.
 */
function normalizeMagic(magia) {
  if (!magia || typeof magia === 'string') return [];
  return Array.isArray(magia) ? magia : [magia];
}

/**
 * Rozwija jedną jednostkę nadania magii na listę atomowych wyborów.
 * @param {Object} jednostka - jednostka nadania (typ tradycja/wybor/zaklecie)
 * @param {string} idBase - prefiks stabilnego id (unikalny w ramach źródła)
 * @param {string} source - etykieta źródła nadania (do wyświetlenia)
 * @returns {Array}
 */
function expandUnit(jednostka, idBase, source) {
  const atoms = [];
  if (jednostka.typ === 'tradycja') {
    atoms.push({ id: `${idBase}-t`, source, rodzaj: 'wymuszona_tradycja', kategoria: jednostka.kategoria || ['dowolna'] });
  } else if (jednostka.typ === 'wybor') {
    const ilosc = jednostka.ilosc || 1;
    for (let i = 0; i < ilosc; i++) {
      if (jednostka.tradycjaNazwa) {
        atoms.push({ id: `${idBase}-w${i}`, source, rodzaj: 'wybor_fixed', tradycjaNazwa: jednostka.tradycjaNazwa });
      } else {
        atoms.push({ id: `${idBase}-w${i}`, source, rodzaj: 'wybor', kategoria: jednostka.kategoria || ['dowolna'] });
      }
    }
  } else if (jednostka.typ === 'zaklecie') {
    const ilosc = jednostka.ilosc || 1;
    for (let i = 0; i < ilosc; i++) {
      atoms.push({ id: `${idBase}-z${i}`, source, rodzaj: 'zaklecie_tylko' });
    }
  }
  return atoms;
}

/**
 * Oblicza wszystkie atomowe wybory magii przyznane postaci na obecnym
 * poziomie - jeden atom = jedna karta UI w Kroku 4.5. Uwzględnia
 * pochodzenie (opcja "1 zaklęcie" na poziomie 4) oraz wszystkie poziomy
 * korzyści wybranych ścieżek nowicjusza/eksperckiej/mistrzowskiej, które są
 * już odblokowane przy `wybranyPoziom` postaci.
 *
 * @param {Object} params
 * @param {Object|null} params.pochodzenie
 * @param {string|null} params.wybranaOpcjaPoziom4 - wybrana opcja radiową z Kroku korzyści pochodzenia
 * @param {string|null} params.sciezkaNowicjuszaId
 * @param {string|null} params.sciezkaEksperckaId
 * @param {string|null} params.sciezkaMistrzowskaId
 * @param {number} params.wybranyPoziom
 * @returns {Array}
 */
function calculateSlotsMagic({ pochodzenie, wybranaOpcjaPoziom4, pathNoviceId, pathExpertId, pathMasterId, selectedLevel }) {
  const atoms = [];

  if (pochodzenie && pochodzenie.poziom_4 && selectedLevel >= 4 && wybranaOpcjaPoziom4 === '1 zaklęcie') {
    atoms.push(...expandUnit(
      { typ: 'zaklecie', ilosc: 1 },
      `poch-${pochodzenie.id}`,
      `Pochodzenie: ${pochodzenie.nazwa} (poziom 4)`
    ));
  }

  const addPath = (groupKey, pathId) => {
    const sciezka = findPath(groupKey, pathId);
    if (!sciezka) return;
    const levelsInThisGroup = REQUIRED_LEVEL[groupKey];
    Object.entries(levelsInThisGroup).forEach(([lvlKey, wymaganyPoziom]) => {
      if (selectedLevel < wymaganyPoziom) return;
      const pkt = sciezka[lvlKey];
      if (!pkt) return;
      const units = normalizeMagic(pkt.magia);
      units.forEach((jednostka, idx) => {
        const idBase = `${pathId}-${lvlKey}-m${idx}`;
        const source = `Ścieżka: ${sciezka.nazwa} (poziom ${wymaganyPoziom})`;
        atoms.push(...expandUnit(jednostka, idBase, source));
      });
    });
  };

  addPath('sciezki_nowicjuszy', pathNoviceId);
  addPath('sciezki_ekspertow', pathExpertId);
  addPath('sciezki_mistrzow', pathMasterId);

  return atoms;
}

/** Sprawdza, czy dana tradycja (po id) jest tradycją czarnej magii. */
function isBlackMagic(tradycjaId) {
  return !!(tradycjaId && TRADITIONS[tradycjaId] && TRADITIONS[tradycjaId].czarnaMagia);
}

/**
 * Zwraca listę tradycji dostępnych do poznania dla danego ograniczenia
 * kategorii slotu ('dowolna' / 'religijne' / lista konkretnych id tradycji),
 * pomijając tradycje już znane.
 */
function getTraditionsForCategory(kategoria, knownTraditions) {
  const all = getLearnableTraditionsList();
  let dozwolone;
  if (!kategoria || kategoria.includes('dowolna')) {
    dozwolone = all;
  } else if (kategoria.includes('religijne')) {
    dozwolone = all.filter(id => RELIGIOUS_TRADITIONS.includes(id));
  } else {
    dozwolone = all.filter(id => kategoria.includes(id));
  }
  return dozwolone
    .filter(id => !knownTraditions.has(id))
    // Tradycje z wyłączonych przez gracza podręczników nie są do poznania.
    .filter(id => isSourceEnabled(TRADITIONS[id] && TRADITIONS[id].zrodlo))
    .map(id => ({ id, nazwa: TRADITIONS[id].nazwa, czarnaMagia: !!TRADITIONS[id].czarnaMagia, opis: TRADITIONS[id].opis || null }))
    .sort((a, b) => a.nazwa.localeCompare(b.nazwa, localeTag()));
}

/**
 * Zwraca listę zaklęć dostępnych do nauki: z tradycji już znanych postaci
 * (albo wyłącznie z `tradycjaOgraniczenie`, gdy podana - przypadek
 * wybor_fixed), o kręgu nie wyższym niż aktualna Moc postaci.
 */
function getSpellsToLearning({ knownTraditions, moc, tradycjaOgraniczenie }) {
  const allowedTraditions = tradycjaOgraniczenie ? [tradycjaOgraniczenie] : [...knownTraditions];
  return SPELLS.filter(s => allowedTraditions.includes(s.tradycja) && s.krag <= moc && isSourceEnabled(s.zrodlo));
}

/**
 * Rozwiązuje pełną listę atomów wg dokonanych przez gracza wyborów
 * (`wybory`, mapa id atomu -> { mode, tradycjaId, spellId }), zwracając
 * kolejność-świadome rozwiązania (dla wybor_fixed liczy się to, co jest
 * już znane w chwili przetwarzania danego atomu) oraz zbiór wynikowych
 * znanych tradycji.
 */
function calculateResolutionMagic(atoms, wybory) {
  const knownTraditions = new Set();
  const resolutions = [];
  let knownBlackSpellCount = 0;

  for (const atom of atoms) {
    const wybor = wybory[atom.id] || {};
    let mode = null;
    let tradycjaId = null;
    let spellId = null;
    let darmowyZaklecieId = null;

    if (atom.rodzaj === 'wymuszona_tradycja') {
      mode = 'tradycja';
      tradycjaId = wybor.tradycjaId || null;
    } else if (atom.rodzaj === 'wybor_fixed') {
      mode = knownTraditions.has(atom.tradycjaNazwa) ? 'zaklecie' : 'tradycja';
      tradycjaId = atom.tradycjaNazwa;
      spellId = wybor.spellId || null;
    } else if (atom.rodzaj === 'zaklecie_tylko') {
      mode = 'zaklecie';
      spellId = wybor.spellId || null;
    } else if (atom.rodzaj === 'wybor') {
      mode = wybor.mode || null;
      tradycjaId = mode === 'tradycja' ? (wybor.tradycjaId || null) : null;
      spellId = mode === 'zaklecie' ? (wybor.spellId || null) : null;
    }

    if (mode === 'tradycja' && tradycjaId) {
      knownTraditions.add(tradycjaId);
      // "Poznawanie tradycji": poznanie tradycji oznacza naukę jednego jej
      // zaklęcia kręgu 0 - gracz wybiera, które (patrz pobierzZakleciaKregu0()).
      darmowyZaklecieId = wybor.darmowyZaklecieId || null;
      // Jeśli to tradycja czarnej magii, to darmowe zaklęcie liczy się już
      // jako "znane zaklęcie czarnej magii" na potrzeby ryzyka splugawienia
      // przy nauce KOLEJNYCH zaklęć z tej tradycji.
      if (isBlackMagic(tradycjaId)) knownBlackSpellCount++;
    }

    const complete = mode === 'tradycja' ? !!(tradycjaId && darmowyZaklecieId) : (mode === 'zaklecie' ? !!spellId : false);

    // Ryzyko splugawienia dotyczy tylko zaklęć czarnej magii nauczonych
    // jako "kolejne zaklęcie" (mode 'zaklecie') - nie darmowego zaklęcia
    // kręgu 0 przyznanego automatycznie przy poznaniu samej tradycji
    // (to już naliczone powyżej, jednorazowo, przy poznaniu tradycji).
    let blackMagicRisk = null;
    if (mode === 'zaklecie' && spellId) {
      const spell = SPELLS.find(s => s.id === spellId);
      if (spell && isBlackMagic(spell.tradycja)) {
        blackMagicRisk = { liczbaZnanychPrzed: knownBlackSpellCount };
        knownBlackSpellCount++;
      }
    }

    resolutions.push({ atom, mode, tradycjaId, spellId, darmowyZaklecieId, complete, blackMagicRisk });
  }

  return { resolutions, knownTraditions };
}

/**
 * Zwraca zaklęcia kręgu 0 należące do danej tradycji - to z nich gracz
 * wybiera darmowe zaklęcie przyznawane automatycznie przy poznaniu tejże
 * tradycji ("Poznawanie tradycji", PG).
 */
function getCircleZeroSpells(tradycjaId) {
  return SPELLS.filter(s => s.tradycja === tradycjaId && s.krag === 0 && isSourceEnabled(s.zrodlo));
}

/** Krótki, czytelny opis jednego atomowego wyboru - do podglądu/pomocy. */
function atomDescription(atom) {
  if (atom.rodzaj === 'wymuszona_tradycja') {
    return `Poznajesz nową tradycję${descriptionCategories(atom.kategoria, 'accusative')}.`;
  }
  if (atom.rodzaj === 'wybor_fixed') {
    return `Tradycja ${TRADITIONS[atom.tradycjaNazwa]?.nazwa || atom.tradycjaNazwa} lub zaklęcie z niej.`;
  }
  if (atom.rodzaj === 'wybor') {
    return `Nowa tradycja${descriptionCategories(atom.kategoria, 'nominative')} lub zaklęcie ze znanej tradycji.`;
  }
  if (atom.rodzaj === 'zaklecie_tylko') {
    return 'Uczysz się jednego zaklęcia ze znanej już tradycji.';
  }
  return '';
}

/**
 * Czytelny opis kategorii tradycji (do wpisania w opis jednostki nadania).
 * @param {string[]} kategoria
 * @param {'nominative'|'accusative'} forma - odmiana przymiotnika
 *   "związana/związaną", dopasowana do rzeczownika, który opisuje ("tradycja"
 *   w mianowniku vs. "tradycję" w bierniku po "Poznajesz").
 */
function descriptionCategories(kategoria, forma = 'nominative') {
  if (!kategoria || kategoria.includes('dowolna')) return '';
  const related = forma === 'accusative' ? 'związaną' : 'związana';
  if (kategoria.includes('religijne')) return ` ${related} z religią`;
  return ` ${related} z: ${kategoria.map(id => TRADITIONS[id]?.nazwa || id).join(', ')}`;
}

/**
 * Krótki, czytelny opis jednej jednostki nadania magii (nie rozwiniętej na
 * atomy) - używany w podglądzie kafelka ścieżki (Krok 3) i w Karcie
 * Postaci, gdzie liczy się zwięzłe podsumowanie całej korzyści, nie
 * pojedyncza karta wyboru.
 */
function descriptionUnits(jednostka) {
  if (jednostka.typ === 'tradycja') {
    return `Poznajesz nową tradycję${descriptionCategories(jednostka.kategoria, 'accusative')}.`;
  }
  if (jednostka.typ === 'wybor') {
    const ilosc = jednostka.ilosc || 1;
    if (jednostka.tradycjaNazwa) {
      return `Tradycja ${TRADITIONS[jednostka.tradycjaNazwa]?.nazwa || jednostka.tradycjaNazwa} lub zaklęcie z niej.`;
    }
    const times = ilosc > 1 ? `${ilosc}x: ` : '';
    return `${times}nowa tradycja${descriptionCategories(jednostka.kategoria, 'nominative')} lub zaklęcie ze znanej tradycji.`;
  }
  if (jednostka.typ === 'zaklecie') {
    const ilosc = jednostka.ilosc || 1;
    return ilosc > 1 ? `Uczysz się ${ilosc} zaklęć ze znanych tradycji.` : 'Uczysz się jednego zaklęcia ze znanej tradycji.';
  }
  return '';
}

/**
 * Czytelny opis całego pola `magia` (string bare / obiekt / tablica) - do
 * podglądu w kafelku ścieżki (Krok 3) i w Karcie Postaci.
 */
function descriptionMagic(magia) {
  if (!magia) return '';
  if (typeof magia === 'string') return magia;
  const units = Array.isArray(magia) ? magia : [magia];
  return units.map(descriptionUnits).join(' ');
}

export {
  calculateSlotsMagic,
  calculateResolutionMagic,
  getTraditionsForCategory,
  getSpellsToLearning,
  getCircleZeroSpells,
  isBlackMagic,
  atomDescription,
  descriptionMagic
};
