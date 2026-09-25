/**
 * Narzędzia do obsługi tabel losowania dla pochodzeń
 */

import ORIGIN_TABLES from './origin_tables.js';

/**
 * Losuje wynik z tabeli dla danego pochodzenia
 * @param {string} originId - ID pochodzenia
 * @param {string} tableName - Nazwa tabeli
 * @returns {Object} Wynik losowania z rzutem, wynikiem i efektem
 */
function rollTable(originId, tableName) {
  const origin = ORIGIN_TABLES[originId];
  if (!origin) {
    throw new Error(`Nie znaleziono pochodzenia: ${originId}`);
  }
  
  // Znajdź tabelę po znormalizowanym kluczu
  let table = null;
  
  for (const key of Object.keys(origin)) {
    const normalizedKey = key.toLowerCase()
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
    
    if (normalizedKey === tableName) {
      table = origin[key];
      break;
    }
  }
  
  if (!table) {
    throw new Error(`Nie znaleziono tabeli ${tableName} dla pochodzenia ${originId}`);
  }

  let roll;
  let result;

  // Określ typ rzutu na podstawie typu tabeli
  if (table.typ === 'k20') {
    roll = Math.floor(Math.random() * 20) + 1;
    result = table.wyniki[roll];
  } else if (table.typ === '3k6') {
    roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    result = table.wyniki[roll];
  } else if (table.typ === 'k6') {
    roll = Math.floor(Math.random() * 6) + 1;
    result = table.wyniki[roll];
  } else if (table.typ === 'k3') {
    roll = Math.floor(Math.random() * 3) + 1;
    result = table.wyniki[roll];
  } else {
    throw new Error(`Nieznany typ tabeli: ${table.typ}`);
  }

  if (!result) {
    throw new Error(`Nie znaleziono wyniku dla rzutu ${roll} w tabeli ${tableName}`);
  }

  return {
    rzut: roll,
    wynik: result.wynik,
    efekt: result.efekt || 'Brak efektu mechanicznego'
  };
}

/**
 * Pobiera listę dostępnych tabel dla danego pochodzenia
 * @param {string} originId - ID pochodzenia
 * @returns {Array} Lista dostępnych tabel
 */
function getAvailableTables(originId) {
  const origin = ORIGIN_TABLES[originId];
  if (!origin) {
    return [];
  }

  return Object.keys(origin).map(tableName => ({
    nazwa: origin[tableName].nazwa,
    typ: origin[tableName].typ,
    opis: origin[tableName].opis,
    klucz: tableName // Dodaj klucz tabeli dla API
  }));
}

/**
 * Pobiera szczegóły tabeli
 * @param {string} originId - ID pochodzenia
 * @param {string} tableName - Nazwa tabeli
 * @returns {Object} Szczegóły tabeli
 */
function getTableDetails(originId, tableName) {
  const origin = ORIGIN_TABLES[originId];
  if (!origin) {
    throw new Error(`Nie znaleziono pochodzenia: ${originId}`);
  }

  // Znajdź tabelę po znormalizowanym kluczu
  let table = null;
  
  for (const key of Object.keys(origin)) {
    const normalizedKey = key.toLowerCase()
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
    
    if (normalizedKey === tableName) {
      table = origin[key];
      break;
    }
  }
  
  if (!table) {
    throw new Error(`Nie znaleziono tabeli ${tableName} dla pochodzenia ${originId}`);
  }

  return {
    nazwa: table.nazwa,
    typ: table.typ,
    opis: table.opis,
    wyniki: table.wyniki
  };
}

/**
 * Sprawdza czy pochodzenie ma tabele losowania
 * @param {string} originId - ID pochodzenia
 * @returns {boolean} True jeśli pochodzenie ma tabele
 */
function hasTables(originId) {
  const origin = ORIGIN_TABLES[originId];
  return !!(origin && Object.keys(origin).length > 0);
}

/**
 * Pobiera wszystkie dostępne pochodzenia z tabelami
 * @returns {Array} Lista pochodzeń z tabelami
 */
function getOriginsWithTables() {
  return Object.keys(ORIGIN_TABLES).map(originId => ({
    id: originId,
    nazwa: originId.charAt(0).toUpperCase() + originId.slice(1),
    ma_tabele: hasTables(originId),
    tabele: getAvailableTables(originId)
  }));
}

export {
  rollTable,
  getAvailableTables,
  getTableDetails,
  hasTables,
  getOriginsWithTables
};
