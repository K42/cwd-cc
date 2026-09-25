/**
 * Rozszerzone pochodzenia - warstwa kodu.
 *
 * Dane rozszerzonych pochodzeń to treść gry
 * (data/<język>/origins_extended.js); tutaj zostają funkcje pomocnicze.
 */

import CONTENT from './content.js';

const EXTENDED_ORIGINS = CONTENT.ORIGINS_EXTENDED;
const HUMAN_EXTENDED = EXTENDED_ORIGINS.czlowiek;


/**
 * Funkcja pomocnicza do walidacji struktury pochodzenia
 * @param {Object} origin - Obiekt pochodzenia do walidacji
 * @returns {Object} Wynik walidacji z błędami i ostrzeżeniami
 */
function validateOrigin(origin) {
  const bledy = [];
  const ostrzezenia = [];
  
  // Sprawdź wymagane pola
  const wymaganePola = ['id', 'nazwa', 'zrodlo', 'tworzenie_postaci', 'tabele'];
  wymaganePola.forEach(pole => {
    if (!origin[pole]) {
      bledy.push(`Brakuje wymaganego pola: ${pole}`);
    }
  });
  
  // Sprawdź strukturę tworzenie_postaci
  if (origin.tworzenie_postaci) {
    const wymaganeTp = ['atrybuty_bazowe', 'percepcja', 'obrona', 'zdrowie', 'rozmiar', 'predkosc'];
    wymaganeTp.forEach(pole => {
      if (!origin.tworzenie_postaci[pole]) {
        bledy.push(`Brakuje pola w tworzenie_postaci: ${pole}`);
      }
    });
  }
  
  // Sprawdź tabele
  if (origin.tabele) {
    const wymaganeTabele = ['wiek', 'budowa_ciala', 'wyglad', 'przeszlosc', 'osobowosc'];
    wymaganeTabele.forEach(tabela => {
      if (!origin.tabele[tabela]) {
        ostrzezenia.push(`Brakuje tabeli: ${tabela}`);
      }
    });
  }
  
  return {
    poprawne: bledy.length === 0,
    bledy,
    ostrzezenia
  };
}

/**
 * Funkcja do losowania z tabeli
 * @param {string} typRzutu - Typ rzutu ('k6', 'k20', '2k6', '3k6')
 * @param {Object} tabela - Obiekt tabeli z opcjami
 * @returns {Object} Wynik losowania z rzutem i opisem
 */
function rollFromTable(typRzutu, tabela) {
  if (!tabela || !tabela.opcje) {
    throw new Error('Nieprawidłowa tabela');
  }
  
  // Symuluj rzut kośćmi
  let wynik = 0;
  switch (typRzutu) {
  case 'k6':
    wynik = Math.floor(Math.random() * 6) + 1;
    break;
  case 'k20':
    wynik = Math.floor(Math.random() * 20) + 1;
    break;
  case '2k6':
    wynik = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    break;
  case '3k6':
    wynik = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    break;
  default:
    throw new Error(`Nieznany typ rzutu: ${typRzutu}`);
  }
  
  // Znajdź odpowiednią opcję
  const opcja = tabela.opcje.find(kandydat => {
    if (kandydat.rzut.includes('-')) {
      const [min, max] = kandydat.rzut.split('-').map(Number);
      return wynik >= min && wynik <= max;
    } else {
      return kandydat.rzut === wynik.toString();
    }
  });
  
  if (!opcja) {
    throw new Error(`Nie znaleziono opcji dla rzutu ${wynik} w tabeli ${tabela.nazwa}`);
  }
  
  return {
    rzut: wynik.toString(),
    wynik: opcja.wynik,
    wartosc_rzutu: wynik,
    efekt: opcja.efekt || null
  };
}

export {
  EXTENDED_ORIGINS,
  HUMAN_EXTENDED,
  validateOrigin,
  rollFromTable
};
