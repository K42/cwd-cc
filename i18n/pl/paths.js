/**
 * Krok 3 - ścieżki: nagłówki progów, kategorie filtra, opisy kafelków.
 *
 * UWAGA: nazwy i opisy samych ścieżek to treść gry i mieszkają w
 * data/pl/paths.js, nie tutaj. Tu są wyłącznie etykiety interfejsu.
 */

export default {
  /**
   * Kategorie filtra ścieżek. Klucze muszą zgadzać się z tagami w
   * data/path_categories.js - tam są identyfikatory, tu ich nazwy.
   */
  categories: {
    magia: 'Magia',
    czarna: 'Czarna magia',
    wrecz: 'Walka wręcz',
    dystans: 'Walka dystansowa',
    skryt: 'Skrytość i zwiad',
    wsparcie: 'Wsparcie i leczenie',
    dowodzenie: 'Dowodzenie i drużyna',
    spoleczny: 'Wpływ społeczny',
    wiedza: 'Wiedza i rzemiosło',
    natura: 'Bestie i natura'
  },

  /**
   * Nagłówek sekcji ścieżek - inny dla każdego poziomu postaci (1-10).
   * Klucz to numer poziomu; `sectionGeneric` to wariant awaryjny.
   */
  section: {
    1: 'Ścieżka Nowicjusza',
    2: 'Kontynuacja Nowicjusza',
    3: 'Ścieżka Eksperta',
    4: 'Kontynuacja Eksperta',
    5: 'Ścieżka Mistrza',
    6: 'Kontynuacja Mistrza',
    7: 'Ścieżka Legendy',
    8: 'Kontynuacja Legendy',
    9: 'Wszystkie Ścieżki',
    10: 'Wszystkie Ścieżki'
  },
  sectionGeneric: 'Ścieżki',

  noPath: 'Brak ścieżki',
  noPathOption: '<option value="">Brak ścieżki</option>',
  choosePath: 'Wybierz tę ścieżkę',
  changePath: 'Zmień ścieżkę',
  chosen: 'Wybrana',
  pickLevel: 'Poziom wyboru {level}',
  loadError: 'Nie udało się załadować ścieżek:',

  /** Pule talentów przyznawane przez ścieżki (np. łotrzykowskie). */
  chosenPathColon: 'Wybrana ścieżka:',
  appliedLevelBenefits: '– zastosowano korzyści poziomu {level}',
  levelBenefitsHeading: 'Korzyści poziomu {level}',
  talentPoolFallbackName: 'Talenty do wyboru',
  talentPoolClickHint: '. Kliknij talent, by go wybrać lub cofnąć wybór.',
  talentPoolDifferentSkill: 'Przy powtórnym wyborze tej grupy weź inną biegłość.',
  talentPoolHeader: '{pool} - {path} (poziom {level})',
  talentPoolGrantLabel: '{pool} (poziom {level}):',
  talentPoolChoose: 'Wybierz talent',
  talentPoolRemaining: {
    one: 'pozostał {count} talent do wyboru',
    few: 'pozostały {count} talenty do wyboru',
    many: 'pozostało {count} talentów do wyboru'
  }
};
