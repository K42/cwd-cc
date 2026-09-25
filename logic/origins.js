/**
 * Logika pochodzeń i ich tabel losowania - przeniesiona z dawnych endpointów
 * GET /api/origins i GET /api/origins/:originId/tables w src/server.js
 */

import ORIGINS from '../data/origins.js';
import { hasTables, getAvailableTables, getTableDetails, getOriginsWithTables } from '../data/table_utils.js';

/**
 * Normalizuje nazwę tabeli do klucza używanego wewnętrznie (bez polskich znaków i spacji)
 * @param {string} nazwa - Nazwa lub klucz tabeli
 * @returns {string} Znormalizowany klucz
 */
function normalizeTableKey(nazwa) {
  return nazwa.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z');
}

/**
 * Zwraca listę wszystkich pochodzeń z informacją o dostępnych tabelach
 * @returns {Object} Lista pochodzeń i statystyki
 */
function getOriginsListUi() {
  const pochodzenia = Object.values(ORIGINS).map(pochodzenie => ({
    id: pochodzenie.id,
    nazwa: pochodzenie.nazwa,
    zrodlo: pochodzenie.zrodlo,
    ma_tabele: hasTables(pochodzenie.id),
    liczba_tabel: hasTables(pochodzenie.id) ? getAvailableTables(pochodzenie.id).length : 0,
    status: pochodzenie.status,
    strona_zrodlowa: pochodzenie.strona_zrodlowa
  }));

  return {
    pochodzenia,
    liczba_pochodzen: pochodzenia.length,
    pochodzenia_z_tabelami: pochodzenia.filter(p => p.ma_tabele).length
  };
}

/**
 * Zwraca wszystkie tabele losowania danego pochodzenia w kształcie oczekiwanym przez UI
 * @param {string} originId - ID pochodzenia
 * @returns {Object|null} Tabele pochodzenia lub null, gdy pochodzenie nie ma tabel
 */
function getOriginTablesUi(originId) {
  if (!hasTables(originId)) {
    return null;
  }

  const tablesList = getAvailableTables(originId);
  const tabele = {};

  tablesList.forEach(tabela => {
    const key = normalizeTableKey(tabela.klucz);
    const tableDetails = getTableDetails(originId, key);
    const opcje = Object.keys(tableDetails.wyniki).map(rzut => ({
      rzut: parseInt(rzut),
      wynik: tableDetails.wyniki[rzut].wynik
    }));

    tabele[key] = {
      ...tabela,
      opcje
    };
  });

  return tabele;
}

export { normalizeTableKey, getOriginsListUi, getOriginTablesUi, getOriginsWithTables };
