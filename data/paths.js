/**
 * Ścieżki rozwoju postaci - warstwa kodu.
 *
 * Same dane ścieżek (nazwy, opisy, korzyści) to treść gry i mieszkają w
 * data/<język>/paths.js; ten plik dokłada do nich mapowania i funkcje
 * pomocnicze, które są wspólne dla wszystkich języków.
 */

import CONTENT from './content.js';

const PATHS = CONTENT.PATHS;
const ROGUERY_TALENTS = CONTENT.ROGUERY_TALENTS;

/**
 * Mapowanie klucza korzyści ścieżki na poziom postaci, przy którym te
 * korzyści są przyznawane.
 *
 * Klucz `poziom_1` oznacza "korzyści przyznawane w chwili wyboru ścieżki",
 * a nie poziom postaci - dla ścieżek eksperckich wypada on na poziomie 3,
 * a dla mistrzowskich na 7 (PG, tabela Rozwój). Pozostałe klucze są już
 * bezwzględnymi poziomami postaci.
 *
 * To jedyne miejsce, w którym ta zależność jest zapisana - logic/character.js
 * i logic/magic.js muszą korzystać z niej, a nie odtwarzać jej u siebie,
 * bo rozjazd między nimi powodował, że korzyści ścieżek eksperckich i
 * mistrzowskich w ogóle nie były pokazywane w Kroku 2.
 */
const PATH_LEVEL_KEYS = {
  sciezki_nowicjuszy: { poziom_1: 1, poziom_2: 2, poziom_5: 5, poziom_8: 8 },
  sciezki_ekspertow: { poziom_1: 3, poziom_6: 6, poziom_9: 9 },
  sciezki_mistrzow: { poziom_1: 7, poziom_10: 10 }
};

/**
 * Zwraca klucz korzyści (np. "poziom_1") danej grupy ścieżek dla podanego
 * poziomu postaci albo `null`, gdy na tym poziomie grupa nic nie przyznaje.
 * @param {string} groupKey - sciezki_nowicjuszy | sciezki_ekspertow | sciezki_mistrzow
 * @param {number} poziom - Poziom postaci (0-10)
 * @returns {string|null}
 */
function getBenefitKeyForLevel(groupKey, poziom) {
  const mapa = PATH_LEVEL_KEYS[groupKey];
  if (!mapa) return null;
  return Object.keys(mapa).find(klucz => mapa[klucz] === poziom) || null;
}

/**
 * Rejestr pul talentów, z których ścieżki pozwalają wybierać. Blok `poziom_N`
 * odwołuje się do puli przez `talenty_do_wyboru: { pula, ilosc }`, a UI po tym
 * kluczu buduje okno wyboru. Każda pula dzieli talenty na grupy (specjalność,
 * tradycja itp.): grupa wybrana po raz pierwszy daje swój pierwszy talent,
 * wybrana ponownie - kolejny.
 */
const TALENT_POOLS = {
  lotrzykowskie: {
    nazwa: 'Talenty łotrzykowskie',
    etykietaGrupy: 'Specjalność',
    grupy: ROGUERY_TALENTS
  }
};

export default PATHS;
export { PATH_LEVEL_KEYS, getBenefitKeyForLevel, ROGUERY_TALENTS, TALENT_POOLS };
