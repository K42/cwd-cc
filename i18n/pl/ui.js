/**
 * Teksty interfejsu (chrome) - nagłówki kroków, przyciski nawigacji, podpowiedzi.
 *
 * Odpowiada statycznej treści z index.html oraz stałym etykietom z script.js.
 * Klucze są angielskie, wartości polskie - patrz i18n/index.js.
 *
 * Wartości mogą zawierać HTML (np. <strong>); o tym, czy trafiają do
 * innerHTML czy textContent, decyduje miejsce wywołania t().
 *
 * Formy mnogie zapisujemy jako obiekt z kategoriami CLDR
 * ({ one, few, many }) i wywołujemy z params.count - polski ma trzy formy,
 * więc nie da się ich skleić w kodzie.
 */

const UI = {
  app: {
    title: 'Kreator Postaci - Cień Władcy Demonów',
    heading: 'Kreator Postaci',
    subheading: 'Cień Władcy Demonów',
    tagline: 'Stwórz postać krok po kroku lub wybierz opcje losowe',
    help: 'POMOC',
    helpAria: 'Otwórz pomoc',
    helpTitle: 'Pomoc (F1)'
  },

  sideMenu: {
    aria: 'Menu postaci',
    newCharacter: 'Nowa postać',
    newCharacterTooltip: 'Nowa postać — resetuje wszystkie ustawienia i wraca do Kroku 1, by stworzyć zupełnie nową postać',
    loadCharacter: 'Wczytaj postać',
    loadCharacterTooltip: 'Wczytaj postać — pokazuje listę postaci zapisanych w pamięci tej przeglądarki',
    randomCharacter: 'Wylosuj postać',
    randomCharacterTooltip: 'Wylosuj postać — wybierz poziom, resztę (wszystkie kroki) losuje kreator i od razu pokazuje podsumowanie w Kroku 8',
    sources: 'Podręczniki',
    sourcesTooltip: 'Podręczniki — wybierz, z których podręczników i dodatków kreator ma proponować treść',
    scrollTop: 'Przewiń na górę'
  },

  breadcrumbs: {
    step1: '1. Pochodzenie',
    step2: '2. Poziom i Atrybuty',
    step3: '3. Ścieżki',
    step4: '4. Rozwój Atrybutów',
    step5: '5. Profesje i Kurioza',
    step6: '6. Magia',
    step7: '7. Ekwipunek',
    step8: '8. Podgląd i Eksport'
  },

  /** Przyciski powtarzające się w wielu krokach. */
  common: {
    next: 'Dalej',
    back: 'Wstecz',
    clear: 'Wyczyść',
    clearChoice: 'Wyczyść wybór',
    expand: 'Rozwiń',
    collapse: 'Zwiń',
    choose: 'Wybierz',
    cancel: 'Anuluj',
    close: 'Zamknij',
    roll: 'Losuj',
    none: 'brak',
    noSelection: '-- brak wyboru --',
    selectOption: '-- Wybierz opcję --',
    chooseOptionColon: 'Wybierz opcję:'
  },

  /**
   * Nazwy atrybutów - termin gry powtarzający się w kilkunastu miejscach
   * (Krok 2, Krok 4, podsumowanie, karta postaci), więc mieszka w jednej
   * grupie. `withColon` to wariant etykiety przed wartością.
   */
  attributes: {
    strength: 'Siła',
    agility: 'Zręczność',
    intellect: 'Intelekt',
    will: 'Wola',
    speed: 'Prędkość',
    health: 'Zdrowie',
    defense: 'Obrona',
    power: 'Moc',
    perception: 'Percepcja',
    corruption: 'Splugawienie',
    insanity: 'Obłęd',
    strengthColon: 'Siła:',
    agilityColon: 'Zręczność:',
    intellectColon: 'Intelekt:',
    willColon: 'Wola:',
    speedColon: 'Prędkość:',
    healthColon: 'Zdrowie:',
    defenseColon: 'Obrona:',
    powerColon: 'Moc:',
    perceptionColon: 'Percepcja:',
    corruptionColon: 'Splugawienie:',
    heading: 'Atrybuty',
    headingColon: 'Atrybuty:',
    nthAttribute: 'Atrybut {number}:',
    toAssign: 'Do rozdania:',
    healingRate: 'Szybkość Zdrowienia',
    healingRateColon: 'Szybkość Zdrowienia:',
    baseSpeedColon: 'Prędkość bazowa:',
    secondaryHeadingColon: 'Atrybuty drugorzędne:',
    modifiersColon: 'Modyfikatory atrybutów:',
    mainHeading: 'Atrybuty główne',
    secondaryHeading: 'Atrybuty drugorzędne',
    calculatedHeading: 'Obliczone atrybuty (z modyfikatorami pochodzenia):'
  },

  origins: {
    unknownOrigin: 'Nieznane pochodzenie.'
  },

  step1: {
    heading: 'Krok 1: Wybór Pochodzenia',
    intro: 'Wybierz pochodzenie swojej postaci. Każde pochodzenie ma unikalne cechy i modyfikatory atrybutów.',
    resetTitle: 'Wyczyść wybór pochodzenia',
    tileHint: 'Kliknij, aby rozwinąć lub zwinąć',
    randomCharacter: 'Losuj postać',
    importCharacter: 'Importuj postać',
    quickFillHint: 'Wybierze losowe pochodzenie i wylosuje wszystkie jego tabele (przeszłość, wygląd itd.) za jednym kliknięciem, albo zaimportuje wcześniej wyeksportowaną postać z pliku JSON.'
  },

  step2: {
    heading: 'Krok 2: Atrybuty i Poziom Postaci',
    intro: 'Określ wartości atrybutów swojej postaci i wybierz poziom rozwoju.',
    levelHeading: 'Poziom Postaci (0-10)',
    levelResetTitle: 'Wróć do poziomu 0',
    benefitsHeading: 'Korzyści Poziomu',
    /**
     * Zdanie przerwane elementem, w którym JS podmienia numer poziomu
     * (#selected-level-name). Trzyma cały <span> w tekście, bo szyk zdania
     * bywa inny w innych językach - rozcięcie na przedrostek i przyrostek
     * zmusiłoby tłumacza do polskiej kolejności.
     */
    benefitsUpToFull: 'Korzyści postaci od poziomu 1 do poziomu <span id="selected-level-name">0</span> (włącznie):',
    originBenefitsHeading: 'Korzyści z Pochodzenia (Poziom 4)',
    originBenefitsIntro: 'Na poziomie 4 zyskujesz korzyści wynikające z twojego pochodzenia.',
    useDefaultAttributes: 'Użyj domyślnych wartości atrybutów (bazujących na pochodzeniu)',
    swapHeading: 'Zmiana wartości atrybutów pochodzenia:',
    swapResetTitle: 'Wyczyść zamianę atrybutów',
    chooseOneOption: 'Wybierz jedną z poniższych opcji:',
    attributePool: 'Pula atrybutów pochodzenia: {pool} (suma się nie zmienia po zamianie).',
    swapHint: 'Możesz jeden raz obniżyć wartość jednego atrybutu o 1 i podnieść wartość innego atrybutu o 1. Suma atrybutów (pula) się nie zmienia.',
    swapDecrease: 'Obniż o 1:',
    swapIncrease: 'Podnieś o 1:',
    swapNoChange: '-- brak zmiany --',
    bonusResetTitle: 'Wyczyść wybór bonusu do atrybutu',
    resourcesHeading: 'Zasoby na wyższym poziomie',
    resourcesSilver: 'Za każdy poziom powyżej 0: 2k6 srebrników.',
    resourcesCurios: 'Poziomy wyboru ścieżek (1, 3, 7): dodatkowe kurioza.',
    silverNotRolled: 'Srebrniki: 0 (nie wylosowano)',
    rollSilver: 'Losuj srebrniki',
    curiosSummaryZero: 'Kurioza: 0',
    originAttributeBonusHeading: 'Bonus do atrybutu z pochodzenia',
    /** Nazwy progów na kartach poziomów (0-10). */
    tierBeginner: 'Początkujący',
    tierNovice: 'Nowicjusz',
    tierExpert: 'Ekspert',
    tierMaster: 'Mistrz',
    levelCard: {
      startingCharacter: 'Postać początkowa',
      chooseNovicePath: 'Wybierz ścieżkę nowicjusza',
      chooseExpertPath: 'Wybierz ścieżkę ekspercką',
      chooseMasterPath: 'Wybierz ścieżkę mistrzowską',
      novicePathBenefits: 'Korzyści ścieżki nowicjusza',
      expertPathBenefits: 'Korzyści ścieżki eksperckiej',
      masterPathBenefits: 'Korzyści ścieżki mistrzowskiej',
      originBenefits: 'Korzyści z pochodzenia'
    }
  },

  step3: {
    heading: 'Krok 3: Wybór Ścieżek',
    intro: 'Wybierz ścieżki rozwoju swojej postaci zgodnie z wybranym poziomem. Wszystkie szczegóły widać w kafelkach poniżej.',
    searchPlaceholder: 'Szukaj ścieżki po nazwie lub opisie...',
    resetFilter: 'Wyczyść filtr',
    filterEmpty: 'Żadna ścieżka nie spełnia filtra - zmień szukaną frazę albo odznacz kategorię.',
    novicePath: 'Ścieżka Nowicjusza (poziom 1)',
    expertPath: 'Ścieżka Ekspercka (poziom 3)',
    masterPath: 'Ścieżka Mistrzowska (poziom 7)',
    resetPathTitle: 'Wyczyść wybór tej ścieżki',
    resetPathSlotTitle: 'Wyczyść wybór dla tej ścieżki',
    firstPathHint: 'Pierwszą ścieżkę (nowicjusza) wybierzesz po podniesieniu poziomu do 1.',
    noAttributeSlots: 'Żadna z wybranych ścieżek nie daje na tym poziomie możliwości zwiększenia atrybutów.'
  },

  step4: {
    heading: 'Krok 4: Rozwój Atrybutów',
    intro: 'Niektóre ścieżki przy wyborze pozwalają zwiększyć wartości atrybutów. Rozdaj poniższe punkty zgodnie z opisanymi opcjami.'
  },

  step5: {
    heading: 'Krok 5: Profesje i Kurioza',
    intro: 'Wybierz profesje i kurioza dla swojej postaci zgodnie z dostępnymi opcjami.',
    rollRemaining: 'Losuj pozostałe',
    resetChoice: 'Resetuj wybór',
    resetChoiceTitle: 'Wyczyść wszystkie profesje i języki, by wybrać je ponownie',
    slotsHint: 'Dostępne profesje i języki zależą od Twojego pochodzenia i wybranych ścieżek. Rozdaj poniższe sloty zgodnie z opisanymi opcjami.',
    languagesHeading: 'Języki',
    languagesColon: 'Języki:',
    clearSlotTitle: 'Wyczyść wybór dla tego slotu',
    selectLanguagePlaceholder: '-- wybierz język --',
    selectProfessionPlaceholder: '-- wybierz profesję --',
    alreadyChosenElsewhere: 'Już wybrane w innym slocie',
    curiosResetTitle: 'Wyczyść wybrane kurioza',
    professionsHeading: 'Profesje',
    selectedProfessions: 'Wybrane Profesje:',
    selectedCurios: 'Wybrane Kurioza:',
    /** Nagłówek z licznikiem - JS podmienia #curios-count, dlatego cały <span> jest w tekście. */
    curiosHeadingFull: 'Kurioza (<span id="curios-count">0</span> do wyboru)'
  },

  step6: {
    heading: 'Krok 6: Magia - tradycje i zaklęcia (opcjonalnie)',
    intro: 'Poniżej znajdują się wyłącznie korzyści magiczne faktycznie przyznane przez twoje pochodzenie i wybrane ścieżki na obecnym poziomie postaci, zgodnie z zasadami podręcznika. Ten krok jest opcjonalny - możesz go pominąć i przejść dalej bez rozwiązania wszystkich kart.',
    resetTitle: 'Wyczyść wszystkie wybory magii'
  },

  step7: {
    heading: 'Krok 7: Ekwipunek',
    intro: 'Ustal początkowe wyposażenie swojej postaci na podstawie Zamożności (PG, "Początkowe wyposażenie"), a następnie odwiedź sklep, by sprzedać zbędne przedmioty za połowę ceny i kupić inne z pełnego katalogu. Kurioza są ustalane osobno w Kroku 5.',
    wealthHeading: 'Zamożność',
    wealthResetTitle: 'Wyczyść wybraną zamożność i ekwipunek',
    wealthHint: 'Wybierz zamożność ręcznie, klikając kafelek, albo wylosuj ją rzutem 3k6 zgodnie z zasadami podręcznika.',
    catalogHeading: 'Katalog przedmiotów',
    rollWealth: 'Losuj (3k6)'
  },

  step8: {
    heading: 'Krok 8: Podgląd i Eksport',
    intro: 'Kompletna karta twojej postaci ze wszystkimi wybranymi opcjami. Gdy wszystko się zgadza, wyeksportuj ją do pliku JSON.',
    saveCharacter: 'Zapisz postać',
    saveCharacterTitle: 'Zapisz postać w pamięci przeglądarki (nadpisuje ten sam zapis, jeśli postać była już zapisana lub wczytana)',
    levelUp: 'Awans',
    levelUpTitle: 'Awans - podnosi poziom postaci o 1 i pokazuje, co trzeba wybrać na nowym poziomie',
    nameLabel: 'Imię postaci (opcjonalnie)',
    /** Przykładowe imię w polu tekstowym - w innym języku naturalne będzie inne. */
    namePlaceholder: 'np. Aldric Volkov',
    exportHeading: 'Eksport Postaci',
    exportJson: 'Eksportuj do JSON'
  },

  /** Popupy (modale) współdzielone przez kroki. */
  modals: {
    sourcesHeading: 'Podręczniki',
    talentHeading: 'Wybierz talent',
    loadCharacterHeading: 'Wczytaj postać',
    randomCharacterHeading: 'Wylosuj postać',
    randomCharacterIntro: 'Wybierz poziom postaci - to jedyna rzecz, którą wybierasz. Wszystko inne (pochodzenie, ścieżki, atrybuty, profesje, kurioza, wyposażenie...) zostanie wylosowane.',
    randomCharacterConfirm: 'Losuj postać'
  },

  help: {
    heading: 'Pomoc - Kreator Postaci',
    closeAria: 'Zamknij pomoc',
    tabStart: 'Szybki Start',
    tabGlossary: 'Słownik',
    tabFaq: 'FAQ',
    tabShortcuts: 'Skróty'
  }
};

export default UI;
