/**
 * Krok 7 - ekwipunek, zamożność, sklep.
 *
 * Nazwy przedmiotów i ich opisy to treść gry (data/pl/equipment.js).
 * Tutaj są nazwy kategorii, rzadkości, sortowania i komunikaty sklepu -
 * wcześniej mieszkały jako stałe RARITY_LABELS / SORT_LABELS /
 * CATEGORY_LABELS_EQ w logic/equipment.js.
 */

export default {
  /**
   * Rzadkość przedmiotu.
   *
   * UWAGA dla tłumacza: te wartości są porównywane z polem `rzadkosc`
   * w danych przedmiotów. Zobacz uwagę przy professions.categories.
   */
  rarity: {
    pospolity: 'Pospolity',
    niepospolity: 'Niepospolity',
    rzadki: 'Rzadki',
    egzotyczny: 'Egzotyczny'
  },

  /** Nazwy kolumn sortowania w katalogu przedmiotów. */
  sort: {
    nazwa: 'Nazwa',
    cena: 'Cena',
    obrazenia: 'Obrażenia',
    obrona: 'Obrona',
    rzadkosc: 'Rzadkość'
  },

  /** Kategorie katalogu przedmiotów. */
  categories: {
    bron_biala: 'Broń biała',
    bron_dystansowa: 'Broń dystansowa',
    tarcze: 'Tarcze',
    amunicja: 'Amunicja',
    zbroje: 'Zbroje i pancerze',
    wyposazenie: 'Wyposażenie',
    ubior: 'Ubiór i akcesoria',
    narzedzia: 'Narzędzia',
    jedzenie_zakwaterowanie: 'Jedzenie i zakwaterowanie',
    zwierzeta: 'Zwierzęta i sprzęt',
    eliksiry: 'Eliksiry',
    substancje_alchemiczne: 'Substancje alchemiczne',
    przedmioty_zakazane: 'Przedmioty zakazane',
    wynalazki: 'Wynalazki'
  },

  chooseOneItem: 'wybór jednego przedmiotu',
  showDescription: 'Pokaż opis',
  hideDescription: 'Ukryj opis',
  alreadyOwned: 'Już posiadane',
  notEnoughCash: 'Za mało gotówki',
  scrollWithSpell: 'zwój z zaklęciem',
  searchItem: 'Szukaj przedmiotu po nazwie lub opisie...',

  buy: 'Kup',
  sell: 'Sprzedaj',
  purse: 'Sakiewka',
  wealthNotChosen: 'Nie wybrano Zamożności',
  cashColon: 'Gotówka:',
  cashWithValue: 'Gotówka: {amount}',
  priceHeading: 'Cena',
  itemHeading: 'Przedmiot',
  yourItems: 'Twoje przedmioty',
  shopHeading: 'Sklep',
  statsHeading: 'Statystyki',
  wealthRoll3d6: 'Wynik rzutu 3k6: {result}',
  range3d6: '3k6: {range}',
  sortColon: 'Sortuj:',
  searchItemShort: 'Szukaj przedmiotu...',
  startingCashColon: 'Startowa gotówka:',
  hideUnavailable: 'Ukryj niedostępne (za drogie, już posiadane)',
  browseCatalog: 'Przeglądaj katalog',
  startingGearHeading: 'Wyposażenie startowe ({wealth})',
  equipmentSectionHeading: 'Ekwipunek (Zamożność: {wealth})',
  pouchWith: '(sakiewka z {dice} {unit})',
  unitCopperbits: 'okrawków',
  unitCoppers: 'miedziaków',
  unitSilvers: 'srebrników'
};
