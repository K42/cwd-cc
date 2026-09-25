/**
 * Zamożność - warstwa kodu.
 *
 * Nazwy i opisy poziomów zamożności to treść gry
 * (data/<język>/wealth.js); tutaj zostaje wyłącznie odwzorowanie rzutu 3k6.
 */

import CONTENT from './content.js';

const WEALTH = CONTENT.WEALTH;

/** Zwraca poziom zamożności odpowiadający danemu wynikowi rzutu 3k6. */
function getWealthForRoll(wynik3k6) {
  return Object.values(WEALTH).find(z => wynik3k6 >= z.zakres3k6[0] && wynik3k6 <= z.zakres3k6[1]) || null;
}

export { WEALTH, getWealthForRoll };
