/**
 * Krok 5 - profesje, języki, kurioza.
 *
 * Nazwy pojedynczych profesji i kuriozów to treść gry (data/pl/).
 */

export default {
  /**
   * Nazwy kategorii profesji. Klucze to kody z PROFESSION_CATEGORIES
   * (logic/professions-curios.js) - dane trzymają wyłącznie kod, więc te
   * napisy można tłumaczyć swobodnie, bez wpływu na logikę.
   */
  categories: {
    naukowe: 'Naukowe',
    pospolite: 'Pospolite',
    przestepcze: 'Przestępcze',
    wojenne: 'Wojenne',
    koczownicze: 'Koczownicze',
    religijne: 'Religijne',
    mroczniackie: 'Mroczniackie'
  },

  anyCategory: 'dowolną',
  newLanguage: 'Nowy język',
  writingKnownLanguage: 'Pismo w znanym języku',
  noOriginSelected: 'Brak wybranego pochodzenia.',
  loadError: 'Nie udało się załadować profesji i kuriozów:',

  slotProfession: 'Profesja',
  modeNewLanguage: 'Nowy język',
  modeWriting: 'Pismo w znanym języku',
  slotLanguage: 'Język',
  chooseProfession: 'Wybierz profesję',
  chooseLanguage: 'Wybierz język',

  languagesKnown: {
    one: 'Znany język: {count}',
    few: 'Znane języki: {count}',
    many: 'Znanych języków: {count}'
  },

  curiosToChoose: {
    one: '{count} kurioz do wyboru',
    few: '{count} kurioza do wyboru',
    many: '{count} kuriozów do wyboru'
  },

  /**
   * Pełne nazwy podręczników - widoczne w popupie filtra i etykietach źródeł.
   *
   * To tytuły wydanych książek, więc w innym języku należy użyć tytułu
   * tamtejszego wydania, a nie tłumaczyć dosłownie. Dodatki bez polskiego
   * wydania mają angielski oryginał w nawiasie.
   *
   * Uwaga na skróty: GWP to "Głód w Pustce", a GP to "Grobowce Pustkowia".
   */
  sources: {
    PG: 'Podręcznik Główny',
    SUP: 'Suplement Władcy Demonów',
    NW: 'Niepewna Wiara',
    RA: 'Rozkoszna Agonia',
    SP: 'Straszliwe Piękno',
    GP: 'Grobowce Pustkowia',
    GWP: 'Głód w Pustce',
    CS: 'Chwalebna Śmierć',
    ZDW: 'Zrodzeni do Walki (Bred for Battle)',
    PZ: 'Potomkowie Zdrajcy (Scions of the Betrayer)',
    'UŁ': 'Urodzeni Łotrzykowie (Natural Born Scoundrels)',
    PS: 'Powołani do Służby (Called to Serve)'
  },

  /** Etykieta tabeli kuriozów, np. "Tabela 3". */
  curioTable: 'Tabela {number}',

  culturalHeading: 'Kulturowe',
  professionsColon: 'Profesje:',
  rollingEllipsis: 'Losowanie...',
  knownLanguagesSummary: 'Znane języki: <strong>{languages}</strong>',
  spokenOnly: 'mówiony',
  spokenAndScript: 'mówiony • pismo',
  autoScriptAllKnown: 'Magik automatycznie czyta i pisze we wszystkich znanych sobie językach {source}.',

  beta: 'beta',
  betaTitle: 'Tłumaczenie własne - dodatek nie ma polskiego wydania',

  sourcesPicker: {
    enableAll: 'Włącz wszystkie',
    disableAll: 'Wyłącz wszystkie',
    enableBeta: 'Włącz beta',
    disableBeta: 'Wyłącz beta',
    alwaysOn: 'zawsze włączony',
    hint: 'Odznacz podręcznik, żeby kreator przestał proponować pochodzenia, ścieżki, profesje, tradycje, zaklęcia i przedmioty z tej książki - także przy losowaniu. Podręcznika Głównego nie da się wyłączyć, bo na nim opiera się reszta zasad.',
    changeNote: 'Zmiana dotyczy tego, co możesz wybrać dalej. Elementy wybrane wcześniej zostają w postaci - jeśli chcesz się ich pozbyć, zmień je ręcznie albo zacznij nową postać.',
    elementCount: {
      one: '{count} element',
      few: '{count} elementy',
      many: '{count} elementów'
    }
  }
};
