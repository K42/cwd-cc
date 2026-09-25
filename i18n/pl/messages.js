/**
 * Komunikaty: błędy, ostrzeżenia, potwierdzenia, stan zapisu.
 *
 * Trzymane osobno, bo to teksty, które użytkownik czyta w sytuacji problemu -
 * najbardziej wrażliwe na jakość tłumaczenia.
 */

export default {
  selectOriginFirst: 'Wybierz pochodzenie postaci!',
  selectOriginBeforeExport: 'Wybierz pochodzenie postaci, zanim wyeksportujesz kartę!',
  selectOriginInStep1: 'Najpierw wybierz pochodzenie w Kroku 1.',
  maxLevelReached: 'Postać jest już na 10 poziomie - to maksimum Tabeli Rozwoju.',

  confirmNewCharacter: 'Rozpocząć nową postać? Bieżące, niezapisane zmiany zostaną utracone.',

  unsavedChanges: 'Masz niezapisane zmiany.',
  notSavedYet: 'Postać nie jest jeszcze zapisana.',
  nothingToSave: 'Brak zmian do zapisania.',

  loadOriginsError: 'Nie udało się załadować metadanych pochodzeń:',
  loadBenefitsError: 'Błąd ładowania korzyści:',
  rollTableError: 'Błąd losowania z tabeli:',
  loadFromCacheError: 'Błąd wczytywania postaci z cache:',

  import: {
    notJson: 'Nie udało się odczytać pliku - to nie jest poprawny plik JSON.',
    failed: 'Nie udało się zaimportować postaci - plik zawiera błędy:',
    error: 'Błąd importu postaci:',
    unreadable: 'Nie udało się odczytać wybranego pliku.',
    missingChoices: 'Plik nie zawiera wymaganej sekcji "wybory".',
    missingOrigin: 'Brak pochodzenia postaci w pliku.',
    notObject: 'Plik nie zawiera poprawnego obiektu JSON (oczekiwano danych postaci wyeksportowanych z tego kreatora).',
    unsupportedVersion: 'Nieobsługiwana wersja pliku ({found}) - ten kreator obsługuje wersję {expected}.',
    unknownOrigin: 'Nieznane pochodzenie: "{id}" nie istnieje w aktualnej bazie danych.',
    invalidLevel: 'Nieprawidłowy poziom postaci: "{value}" (oczekiwano liczby całkowitej 0-10).',
    unknownPath: 'Nieznana ścieżka ({tier}): "{id}" nie istnieje w aktualnej bazie danych.',
    invalidAttributeSlot: 'Nieprawidłowa struktura slotu atrybutów "{slot}" (oczekiwano tablicy).',
    unknownAttribute: 'Nieznany atrybut "{attribute}" w slocie zwiększenia "{slot}".',
    unknownProfession: 'Nieznana profesja: "{id}" (slot "{slot}") nie istnieje w aktualnej bazie danych.',
    unknownLanguage: 'Nieznany język: "{id}" (slot "{slot}") nie istnieje w aktualnej bazie danych.',
    unknownCurio: 'Nieznane kurioza: "{id}" nie istnieje w aktualnej bazie danych.',
    unknownTradition: 'Nieznana tradycja magiczna: "{id}" (wybór "{atom}") nie istnieje w aktualnej bazie danych.',
    unknownSpell: 'Nieznane zaklęcie: "{id}" (wybór "{atom}") nie istnieje w aktualnej bazie danych.',
    invalidSilver: 'Nieprawidłowa wartość srebrników: "{value}" (oczekiwano liczby albo null).',
    unknownWealth: 'Nieznany poziom zamożności: "{id}" nie istnieje w aktualnej bazie danych.',
    unknownItem: 'Nieznany przedmiot ekwipunku: "{id}" (wybór "{atom}") nie istnieje w aktualnej bazie danych.',
    unknownScrollTradition: 'Nieznana tradycja magiczna: "{id}" (zwój, wybór "{atom}") nie istnieje w aktualnej bazie danych.',
    unknownScrollSpell: 'Nieznane zaklęcie: "{id}" (zwój, wybór "{atom}") nie istnieje w aktualnej bazie danych.',
    unknownBoughtItem: 'Nieznany przedmiot ekwipunku: "{id}" (zakupiony) nie istnieje w aktualnej bazie danych.',
    unexpectedError: 'Wystąpił nieoczekiwany błąd podczas importu: {message}',
    succeeded: 'Postać została pomyślnie zaimportowana. Przejdź przez kolejne kroki (albo skocz od razu do Kroku 8), by ją obejrzeć.',
    succeededNotSaved: 'Postać została pomyślnie zaimportowana, ale nie udało się jej zapisać w pamięci przeglądarki.',
    tablesLoadError: 'Nie udało się załadować tabel dla pochodzenia {id}:',
    originDataLoadError: 'Nie udało się załadować danych dla pochodzenia {id}:'
  },

  saves: {
    saved: 'Zapisano w pamięci przeglądarki.',
    saveFailed: 'Nie udało się zapisać w pamięci przeglądarki (może być pełna albo zablokowana).',
    preferenceNotStored: 'Nie udało się zapamiętać wyboru w pamięci przeglądarki - zadziała do końca tej sesji.',
    confirmClearAll: 'Usunąć wszystkie postacie zapisane w pamięci tej przeglądarki? Tej operacji nie można odwrócić.',
    loaded: 'Postać została wczytana z pamięci przeglądarki. Przejdź przez kolejne kroki (albo skocz od razu do Kroku 8), by ją obejrzeć.',
    loadUnexpectedError: 'Wystąpił nieoczekiwany błąd podczas wczytywania postaci: {message}',
    optionsLoadError: 'Nie można załadować opcji: {message}',
    clearAll: 'Wyczyść pamięć przeglądarki',
    clearAllTitle: 'Usuń wszystkie postacie zapisane w pamięci tej przeglądarki'
  },

  levelUp: {
    /** Liczba rzeczy do wybrania po awansie - polski wymaga trzech form. */
    toChoose: {
      one: 'Awans na poziom {level}. Do wybrania: {count} rzecz - lista poniżej.',
      few: 'Awans na poziom {level}. Do wybrania: {count} rzeczy - lista poniżej.',
      many: 'Awans na poziom {level}. Do wybrania: {count} rzeczy - lista poniżej.'
    },
    nothingToChoose: 'Awans na poziom {level}. Ten poziom nie wymaga żadnych dodatkowych wyborów.'
  },

  /**
   * Licznik zapisanych postaci. Wcześniej kod sklejał tylko dwie formy
   * ("postać zapisana" / "postaci zapisanych"), co dla liczb 2-4 dawało
   * niepoprawne "2 postaci zapisanych" - polski wymaga trzech form.
   */
  savedCharacterCount: {
    one: '{count} postać zapisana w tej przeglądarce.',
    few: '{count} postacie zapisane w tej przeglądarce.',
    many: '{count} postaci zapisanych w tej przeglądarce.'
  },

  errorPrefix: 'Błąd:',
  applyChoice: 'Zastosuj wybór',
  scrollTopAria: 'przewiń na górę'
};
