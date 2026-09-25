/**
 * Logika ścieżek dla danego poziomu wyboru - przeniesiona z dawnego
 * endpointu GET /api/paths/:level w src/server.js
 */

import PATHS from '../data/paths.js';
import { PATH_CATEGORIES } from '../data/path_categories.js';
import { getTalentDescription } from './talents.js';
import { descriptionMagic } from './magic.js';

/**
 * Zwraca grupę ścieżek (obiekt id -> ścieżka) z danych PATHS odpowiadającą
 * progowi wyboru (1 = nowicjusz, 3 = ekspert, 7 = mistrz).
 * @param {number} poziom - Próg wyboru ścieżki (1, 3 lub 7)
 * @returns {Object}
 * @throws {Error} Gdy próg poziomu jest nieprawidłowy
 */
function getPathGroupForLevel(poziom) {
  if (poziom === 1) return PATHS.sciezki_nowicjuszy;
  if (poziom === 3) return PATHS.sciezki_ekspertow;
  if (poziom === 7) return PATHS.sciezki_mistrzow;
  throw new Error('Nieprawidłowy poziom wyboru ścieżki');
}

/**
 * Zwraca listę ścieżek dostępnych do wyboru na danym progu poziomu (1, 3, 7)
 * zgodnie z PG, w kształcie oczekiwanym przez UI.
 *
 * Każda ścieżka (niezależnie od progu) przechowuje swoje korzyści przy
 * wyborze pod kluczem `poziom_1` w danych źródłowych - to korzyści
 * przyznawane w chwili wyboru ścieżki, nie realny poziom drużyny.
 * @param {number} poziom - Próg wyboru ścieżki (1, 3 lub 7)
 * @returns {Array} Lista ścieżek
 * @throws {Error} Gdy próg poziomu jest nieprawidłowy
 */
function getPathsForLevel(poziom) {
  const group = getPathGroupForLevel(poziom);

  return Object.values(group).map(path => {
    const pkt = path.poziom_1 || {};
    // "Magia" jest jedyną kategorią wyliczaną automatycznie: ścieżka ją ma,
    // jeśli KTÓRYKOLWIEK jej blok poziom_N przyznaje magię - nie tylko ten
    // pod kluczem poziom_1, żeby np. ścieżka z magią dopiero na wyższym
    // progu i tak trafiała do filtra "Magia". Reszta kategorii (w tym
    // "Czarna magia") jest przypisana ręcznie w data/path_categories.js.
    const maMagie = Object.keys(path).some(k => k.startsWith('poziom_') && path[k] && path[k].magia);
    const kategorie = [...(maMagie ? ['magia'] : []), ...(PATH_CATEGORIES[path.id] || [])];
    return {
      id: path.id,
      nazwa: path.nazwa,
      zrodlo: path.zrodlo || 'PG',
      opis: path.opis,
      kategorie,
      korzysci: {
        [poziom]: {
          talenty: (pkt.talenty || []).map(t => ({
            nazwa: t,
            opis: getTalentDescription(t)
          })),
          zaklecia: (pkt.magia ? [{
            nazwa: 'Magia',
            opis: descriptionMagic(pkt.magia)
          }] : []),
          // Wymuszone podwyżki atrybutów (bez wyboru gracza) - np. Moloch z
          // Chwalebnej Śmierci dostaje sztywne +1 do Siły obok jednej
          // podwyżki do wyboru.
          mod_atrybuty: pkt.mod_atrybuty || {},
          atrybuty_glowne: pkt.atrybuty_glowne || null,
          mod_drugorzedne: {
            zdrowie: parseInt(pkt.zdrowie?.replace('+', '') || '0'),
            moc: parseInt(pkt.moc?.replace('+', '') || '0'),
            obrona: parseInt(pkt.obrona?.replace('+', '') || '0'),
            predkosc: parseInt(pkt.predkosc?.replace('+', '') || '0'),
            splugawienie: parseInt(pkt.splugawienie?.replace('+', '') || '0')
          },
          bieglosci: pkt.jezyki_profesje ? [pkt.jezyki_profesje.opis] : [],
          jezyki_profesje: pkt.jezyki_profesje || null,
          sprzet: []
        }
      }
    };
  });
}

/**
 * Oblicza sloty zwiększenia atrybutów głównych przyznane przez wybrane
 * ścieżki (PG: "Zwiększ dwa/trzy dowolne o 1" przy wyborze ścieżki
 * eksperckiej/mistrzowskiej, a u Maga/Wojownika także na poziomie 1).
 * @param {Object} params
 * @param {string} params.sciezkaNowicjuszaId
 * @param {string} params.sciezkaEksperckaId
 * @param {string} params.sciezkaMistrzowskaId
 * @returns {Array<{id: string, source: string, ilosc: number, wartosc: number, dostepne: string[]}>}
 */
function calculateSlotsAttributes({ pathNoviceId, pathExpertId, pathMasterId }) {
  const slots = [];

  const add = (groupKey, pathId, etykieta) => {
    if (!pathId) return;
    const group = PATHS[groupKey];
    const sciezka = group && group[pathId];
    const grant = sciezka && sciezka.poziom_1 && sciezka.poziom_1.atrybuty_glowne;
    if (!grant) return;
    slots.push({
      id: `${pathId}-atr`,
      source: `Ścieżka: ${sciezka.nazwa} (${etykieta})`,
      ilosc: grant.ilosc,
      wartosc: grant.wartosc,
      dostepne: grant.dostepne
    });
  };

  add('sciezki_nowicjuszy', pathNoviceId, 'poziom 1');
  add('sciezki_ekspertow', pathExpertId, 'poziom 3');
  add('sciezki_mistrzow', pathMasterId, 'poziom 7');

  return slots;
}

export { getPathsForLevel, calculateSlotsAttributes };
