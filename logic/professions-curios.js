/**
 * Spłaszczanie tabel profesji i kuriozów z podręcznika do list przyjaznych UI
 * - przeniesione z dawnych endpointów GET /api/professions i GET /api/curios
 * w src/server.js
 */

import PROFESSIONS from '../data/professions.js';
import CURIOS from '../data/curios.js';

/**
 * Zwraca kategorie i spłaszczoną listę profesji
 * @returns {Object} { kategorie, profesje }
 */
/**
 * Kategorie profesji.
 *
 * `kod` to identyfikator używany w logice (zgodny z kluczami
 * PROFESSIONS.tables i z `slot.kategorie`) oraz kluczem w pliku językowym.
 *
 * `prefiksId` istnieje wyłącznie po to, żeby zachować dotychczasowe `id`
 * profesji. Wcześniej `id` powstawało z polskiej etykiety
 * ('Przestępcze'.toLowerCase() -> 'przestępcze_1'), a te identyfikatory są
 * zapisywane w zapamiętanych i eksportowanych postaciach - zmiana formy
 * uniemożliwiłaby wczytanie starszych zapisów.
 */
const PROFESSION_CATEGORIES = [
  { kod: 'naukowe', prefiksId: 'naukowe', tabela: 'naukowe', zrodlo: 'PG' },
  { kod: 'pospolite', prefiksId: 'pospolite', tabela: 'pospolite', zrodlo: 'PG' },
  { kod: 'przestepcze', prefiksId: 'przestępcze', tabela: 'przestepcze', zrodlo: 'PG' },
  { kod: 'wojenne', prefiksId: 'wojenne', tabela: 'wojenne', zrodlo: 'PG' },
  { kod: 'koczownicze', prefiksId: 'koczownicze', tabela: 'koczownicze', zrodlo: 'PG' },
  { kod: 'religijne', prefiksId: 'religijne', tabela: 'religijne', zrodlo: 'PG' },
  { kod: 'mroczniackie', prefiksId: 'mroczniackie', tabela: 'mroczniackie', zrodlo: 'PZ' }
];

function getProfessionsUi() {
  const kategorie = {};
  PROFESSION_CATEGORIES.forEach(({ kod }) => { kategorie[kod] = { kod }; });

  const profesje = [];
  if (PROFESSIONS && PROFESSIONS.tables) {
    PROFESSION_CATEGORIES.forEach(({ kod, prefiksId, tabela, zrodlo }) => {
      (PROFESSIONS.tables[tabela] || []).forEach((text, idx) => {
        profesje.push({
          id: `${prefiksId}_${idx + 1}`,
          nazwa: text,
          // Kod, nie polska etykieta - nazwę do pokazania bierze UI z pliku
          // językowego (professions.categories.<kod>).
          kategoria: kod,
          opis: '',
          zrodlo
        });
      });
    });
  }

  return { kategorie, profesje };
}

/**
 * Zwraca kategorie i spłaszczoną listę kuriozów
 * @returns {Object} { kategorie, kurioza }
 */
function getCuriosUi() {
  const kategorie = {};
  const kurioza = [];
  if (CURIOS && CURIOS.tables) {
    Object.entries(CURIOS.tables).forEach(([tableNum, items]) => {
      kategorie[tableNum] = { numerTabeli: Number(tableNum) };
      items.forEach((text, idx) => {
        kurioza.push({
          id: `t${tableNum}_k${idx + 1}`,
          nazwa: text,
          opis: '',
          efekt: '',
          wartosc: '',
          // Numer tabeli, nie gotowy napis "Tabela 3" - UI składa etykietę
          // z pliku językowego (professions.curioTable).
          numerTabeli: Number(tableNum),
          zrodlo: 'PG'
        });
      });
    });
  }

  return { kategorie, kurioza };
}

export { getProfessionsUi, getCuriosUi, PROFESSION_CATEGORIES };
