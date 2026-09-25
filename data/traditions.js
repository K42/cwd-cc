/**
 * Tradycje magiczne - warstwa kodu.
 *
 * Nazwy i opisy tradycji to treść gry (data/<język>/traditions.js); tutaj
 * zostaje wyłącznie funkcja pomocnicza, wspólna dla wszystkich języków.
 */

import CONTENT from './content.js';

const TRADITIONS = CONTENT.TRADITIONS;
const RELIGIOUS_TRADITIONS = CONTENT.RELIGIOUS_TRADITIONS;

/** Zwraca listę id tradycji, które są prawdziwymi, samodzielnie poznawalnymi tradycjami. */
function getLearnableTraditionsList() {
  return Object.entries(TRADITIONS)
    .filter(([, t]) => t.realTradycja !== false)
    .map(([id]) => id);
}

export { TRADITIONS, RELIGIOUS_TRADITIONS, getLearnableTraditionsList };
