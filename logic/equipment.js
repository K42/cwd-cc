/**
 * Silnik reguł początkowego wyposażenia i sklepu (PG, "Początkowe
 * wyposażenie" str. 25-26 oraz "Ekwipunek", Rozdział 6).
 *
 * Waluta: 10 okrawków (okr) = 1 miedziak (md), 10 miedziaków = 1 srebrnik
 * (sr), 10 srebrników = 1 złota korona (zk) - PG, "Ceny". Wszystkie
 * obliczenia pieniężne wykonuje się wewnętrznie w okrawkach (najmniejsza
 * jednostka), a wyświetla w rozbiciu na największe pasujące nominały.
 *
 * Sprzedaż: "Używany ekwipunek wart jest połowę lub mniej swojej
 * podstawowej ceny" (PG, "Inne środki płatności") - ten kreator używa
 * maksymalnej dozwolonej stawki: dokładnie połowy ceny bazowej.
 */

import EQUIPMENT from '../data/equipment.js';
import { WEALTH, getWealthForRoll } from '../data/wealth.js';
import { localeTag } from '../i18n/index.js';

const CONVERTER_TO_COPPERBITS = { okr: 1, md: 10, sr: 100, zk: 1000 };
const DENOMINATIONS_DESC = ['zk', 'sr', 'md', 'okr'];

const BUYBACK_RATE = 0.5;

/**
 * Identyfikatory rzadkości w kolejności rosnącej. Nazwy widoczne dla
 * użytkownika są w pliku językowym (i18n/pl/equipment.js -> rarity).
 */
const RARITY_CODES = ['pospolity', 'niepospolity', 'rzadki', 'egzotyczny'];

const RARITY_RANK = { pospolity: 0, niepospolity: 1, rzadki: 2, egzotyczny: 3 };

/** Kolumny sortowania katalogu; nazwy w i18n/pl/equipment.js -> sort. */
const SORT_CODES = ['nazwa', 'cena', 'obrazenia', 'obrona', 'rzadkosc'];

/** Kategorie katalogu; nazwy w i18n/pl/equipment.js -> categories. */
const CATEGORY_CODES_EQ = [
  'bron_biala', 'bron_dystansowa', 'tarcze', 'amunicja', 'zbroje', 'wyposazenie', 'ubior', 'narzedzia', 'jedzenie_zakwaterowanie', 'zwierzeta', 'eliksiry', 'substancje_alchemiczne', 'przedmioty_zakazane', 'wynalazki'
];

/** Znajduje przedmiot w katalogu po id. */
function getItem(id) {
  return EQUIPMENT.find(i => i.id === id) || null;
}

/** Przelicza cenę przedmiotu (obiekt {wartosc, jednostka}) na okrawki. */
function priceOnCopperbits(cena) {
  if (!cena) return 0;
  return cena.wartosc * (CONVERTER_TO_COPPERBITS[cena.jednostka] || 1);
}

/** Formatuje cenę przedmiotu z katalogu do czytelnego tekstu (np. "min. 5 md"). */
function formatPrice(cena) {
  if (!cena) return '—';
  const labelsUnits = { okr: 'okr.', md: 'md', sr: 'sr', zk: 'zk' };
  const prefix = cena.orientacyjna ? 'min. ' : '';
  return `${prefix}${cena.wartosc} ${labelsUnits[cena.jednostka] || cena.jednostka}`;
}

/** Formatuje kwotę w okrawkach na czytelny tekst w rozbiciu na nominały (np. "1 zk 3 sr"). */
function formatCopperbits(copperbits) {
  if (!Number.isFinite(copperbits) || copperbits <= 0) return '0 okr.';
  let remaining = Math.floor(copperbits);
  const labels = { zk: 'zk', sr: 'sr', md: 'md', okr: 'okr.' };
  const parts = [];
  DENOMINATIONS_DESC.forEach(nominal => {
    const denominationValue = CONVERTER_TO_COPPERBITS[nominal];
    const ilosc = Math.floor(remaining / denominationValue);
    if (ilosc > 0) {
      parts.push(`${ilosc} ${labels[nominal]}`);
      remaining -= ilosc * denominationValue;
    }
  });
  return parts.length ? parts.join(' ') : '0 okr.';
}

/** Cena skupu (sprzedaży przez postać) przedmiotu w okrawkach - połowa ceny bazowej, zaokrąglona w dół. */
function priceBuybackCopperbits(cena) {
  return Math.floor(priceOnCopperbits(cena) * BUYBACK_RATE);
}

/**
 * Rozwija listę przedmiotów danego poziomu zamożności na atomowe wybory
 * gracza (jedna karta UI = jeden atom) - analogicznie do rozwinJednostke()
 * w logic/magic.js. Gwarantowane pozycje (bez wyboru) nie generują atomu.
 */
function calculateAtomsGear(zamoznoscId) {
  const wealthentry = WEALTH[zamoznoscId];
  if (!wealthentry) return [];
  const atoms = [];
  wealthentry.przedmioty.forEach((p, idx) => {
    if (p.wybor) {
      atoms.push({
        id: `${zamoznoscId}-w${idx}`,
        rodzaj: 'wybor_przedmiotu',
        opcje: p.wybor,
        opisWyboru: p.opisWyboru || null
      });
    }
  });
  if (wealthentry.wyborDodatkowy) {
    atoms.push({
      id: `${zamoznoscId}-dodatkowy`,
      rodzaj: 'wybor_dodatkowy',
      opcje: wealthentry.wyborDodatkowy.opcje,
      opis: wealthentry.wyborDodatkowy.opis
    });
  }
  return atoms;
}

/** Zwraca gwarantowane (bez wyboru) pozycje wyposażenia danego poziomu zamożności - katalogowe i opisowe. */
function getGuaranteedEntries(zamoznoscId) {
  const wealthentry = WEALTH[zamoznoscId];
  if (!wealthentry) return [];
  return wealthentry.przedmioty.filter(p => !p.wybor);
}

const WEAPON_CATEGORIES = ['bron_biala', 'bron_dystansowa', 'tarcze'];

/**
 * Formatuje statystyki i właściwości przedmiotu (broń/tarcza: obrażenia,
 * chwyt, właściwości, wymagania; zbroja: obrona, wymagania) do jednej
 * czytelnej linijki tekstu. Zwraca `null` dla przedmiotów bez takich pól
 * (np. wyposażenie ogólne, jedzenie).
 */
function formatStatsItem(item) {
  if (!item) return null;
  if (WEAPON_CATEGORIES.includes(item.kategoria)) {
    const parts = [];
    if (item.obrazenia) parts.push(`Obrażenia ${item.obrazenia}`);
    if (item.chwyt) parts.push(`Chwyt: ${item.chwyt}`);
    if (item.wlasciwosci) parts.push(`Właściwości: ${item.wlasciwosci}`);
    if (item.wymagania) parts.push(`Wymagania: ${item.wymagania}`);
    return parts.length ? parts.join(' · ') : null;
  }
  if (item.kategoria === 'zbroje') {
    const parts = [];
    if (item.obrona) parts.push(`Obrona: ${item.obrona}`);
    if (item.wymagania) parts.push(`Wymagania: ${item.wymagania}`);
    return parts.length ? parts.join(' · ') : null;
  }
  return null;
}

/**
 * Przelicza zapis kości obrażeń (np. "1k6 + 1", "2k6", "1k3", albo płaskie
 * "1") na średnią liczbową, żeby dało się sortować po obrażeniach. Zwraca
 * `null` dla przedmiotów bez pola obrażeń (czyli nie-broni).
 */
function averageDamage(save) {
  if (!save) return null;
  const kosci = save.match(/(\d+)\s*k\s*(\d+)/i);
  let base = 0;
  if (kosci) {
    base = parseInt(kosci[1], 10) * (parseInt(kosci[2], 10) + 1) / 2;
  } else {
    const flat = parseFloat(save);
    if (Number.isNaN(flat)) return null;
    base = flat;
  }
  const bonus = save.match(/\+\s*(\d+)/);
  if (bonus) base += parseInt(bonus[1], 10);
  return base;
}

/**
 * Wyciąga liczbową wartość Obrony (np. "17" -> 17). Zbroje, których Obrona
 * zależy od Zręczności postaci (np. "Zręczność + 2"), nie mają stałej
 * liczby do porównania - zwraca wtedy `null`.
 */
function defenseValue(obrona) {
  if (obrona === null || obrona === undefined || obrona === '') return null;
  const number = parseInt(obrona, 10);
  return Number.isNaN(number) ? null : number;
}

/**
 * Sortuje listę przedmiotów katalogu wg wybranego kryterium ('nazwa',
 * 'cena', 'obrazenia', 'obrona' albo 'rzadkosc') i kierunku ('asc'/'desc').
 * Przedmioty, dla których dane kryterium nie ma sensu (np. Obrażenia dla
 * zbroi), lądują zawsze na końcu listy, niezależnie od kierunku - są
 * wtedy dodatkowo posortowane alfabetycznie, żeby lista była stabilna.
 */
function sortItems(list, sortBy, sortDir) {
  const direction = sortDir === 'desc' ? -1 : 1;
  const wartosc = (item) => {
    switch (sortBy) {
    case 'cena': return item.cena ? priceOnCopperbits(item.cena) : null;
    case 'obrazenia': return averageDamage(item.obrazenia);
    case 'obrona': return defenseValue(item.obrona);
    case 'rzadkosc': return item.rzadkosc ? RARITY_RANK[item.rzadkosc] : null;
    case 'nazwa':
    default: return null;
    }
  };
  return list.slice().sort((a, b) => {
    const aval = wartosc(a);
    const bval = wartosc(b);
    const aMissing = aval === null || aval === undefined;
    const bMissing = bval === null || bval === undefined;
    if (aMissing && bMissing) return a.nazwa.localeCompare(b.nazwa, localeTag());
    if (aMissing) return 1;
    if (bMissing) return -1;
    if (aval !== bval) return (aval - bval) * direction;
    return a.nazwa.localeCompare(b.nazwa, localeTag());
  });
}

export {
  CONVERTER_TO_COPPERBITS,
  BUYBACK_RATE,
  RARITY_CODES,
  CATEGORY_CODES_EQ,
  getItem,
  priceOnCopperbits,
  formatPrice,
  formatCopperbits,
  priceBuybackCopperbits,
  calculateAtomsGear,
  getGuaranteedEntries,
  formatStatsItem,
  SORT_CODES,
  sortItems,
  getWealthForRoll
};
