/**
 * Pochodzenia postaci - wszystkie dostępne w podręcznikach
 * Źródło: Podręcznik główny + suplementy
 */

const ORIGINS = {
  // Podręcznik Główny
  czlowiek: {
    id: 'czlowiek',
    nazwa: 'Człowiek',
    zrodlo: 'PG', // Podręcznik Główny
    opis: 'Wszechstronni i ambitni, ludzie dominują w większości cywilizowanych krain.',
    atrybuty_bazowe: {
      sila: 10,
      zrecznosc: 10,
      intelekt: 10,
      wola: 10
    },
    // PG str. 11: "Wybierz jeden z atrybutów i podnieś go o 1."
    wybor_atrybutu: { ilosc: 1, wartosc: 1, opis: '+1 do wybranego atrybutu' },
    rozmiar: '1/2 lub 1', // Poprawione zgodnie z PG str. 750
    predkosc: 10,
    jezyki: ['wspólny'],
    // PG str. 15: "potrafisz mówić w jeszcze jednym języku LUB zyskujesz
    // losową profesję" - to wybór, nie gwarantowana profesja.
    profesje: ['dowolna'],
    bonus_jezyk_lub_profesja: true,
    // Korzyści na poziomie 4 (ekspert)
    poziom_4: {
      zdrowie: '+5',
      opcje: ['1 zaklęcie', 'talent Determinacja']
    },
    strona_zrodlowa: 11,
    status: 'kompletne'
  },

  automaton: {
    id: 'automaton',
    nazwa: 'Automaton',
    zrodlo: 'PG', // Podręcznik Główny
    opis: 'Mechaniczne istoty stworzone przez dawnych magów, poszukujące własnej tożsamości.',
    atrybuty_bazowe: {
      sila: 9, // POPRAWIONE z PG str. 874 (nielosowe wartości)
      zrecznosc: 8, // POPRAWIONE z PG str. 874
      intelekt: 9, // POPRAWIONE z PG str. 874
      wola: 9 // POPRAWIONE z PG str. 874
    },
    rozmiar: '1', // PG str. 884
    predkosc: 8, // POPRAWIONE z PG str. 884
    jezyki: ['wspólny'],
    // PG str. 13: "Umiesz mówić w języku wspólnym." - brak dodatkowej
    // profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na uśpienie i wyczerpanie, a także na choroby i trucizny, i pochodzące od nich obrażenia.',
      klucz: 'Gdzieś na twoim ciele, w miejscu, do którego sam nie zdołasz sięgnąć, znajduje się klucz. Gdy zostanie nakręcony i obraca się, na potrzeby mechaniki gry jesteś uznawany za stworzenie. Gdy się zatrzyma, liczysz się jako obiekt.',
      forma_obiektu: 'Gdy jesteś obiektem, masz Obronę 5, Zdrowie 15, Prędkość 0 i nie możesz podejmować akcji.'
    },
    poziom_4: {
      zdrowie: '+5',
      opcje: ['1 zaklęcie', 'talent Wysokie obroty']
    },
    strona_zrodlowa: 13,
    status: 'kompletne'
  },

  goblin: {
    id: 'goblin',
    nazwa: 'Goblin',
    zrodlo: 'PG', // Podręcznik Główny
    opis: 'Małe, zwinne istoty o wielkiej przebiegłości i zamiłowaniu do mechaniki.',
    atrybuty_bazowe: {
      sila: 8, // PG str. 1039
      zrecznosc: 12, // PG str. 1039
      intelekt: 10, // POPRAWIONE z PG str. 1039
      wola: 9 // PG str. 1039
    },
    rozmiar: '1/2', // PG str. 1047
    predkosc: 10, // PG str. 1047
    jezyki: ['wspólny', 'elficki'], // POPRAWIONE z PG str. 1051
    // PG str. 15: "Umiesz mówić w języku wspólnym i elfickim." - brak
    // dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na zauroczenie, a także na choroby i pochodzące od nich obrażenia.',
      wrażliwosc_na_zelazo: 'Jesteś osłabiony, gdy dotykasz żelaza.',
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze jak w oświetlonych.',
      przebiegłość: 'Testy Zręczności na ukrywanie się lub ciche poruszanie wykonujesz z 1 ułatwieniem.'
    },
    poziom_4: {
      zdrowie: '+4',
      opcje: ['1 zaklęcie', 'talent Odskok']
    },
    strona_zrodlowa: 15,
    status: 'kompletne'
  },

  krasnolud: {
    id: 'krasnolud',
    nazwa: 'Krasnolud',
    zrodlo: 'PG', // Podręcznik Główny
    opis: 'Niskie, krępe istoty znane z wytrzymałości i umiejętności rzemieślniczych.',
    atrybuty_bazowe: {
      sila: 10, // PG str. 1200
      zrecznosc: 9, // PG str. 1200
      intelekt: 10, // PG str. 1200
      wola: 10 // PG str. 1200
    },
    rozmiar: '1/2', // PG str. 1210
    predkosc: 8, // PG str. 1210
    jezyki: ['wspólny', 'krasnoludzki'], // PG str. 1214
    // PG str. 18: "Umiesz mówić w języku wspólnym, a także mówić, pisać
    // i czytać w języku krasnoludzkim." - brak dodatkowej profesji/języka,
    // ale automatyczne pismo w krasnoludzkim (nie trzeba go zdobywać).
    profesje: [],
    jezyki_pismo_automatyczne: ['krasnoludzki'],
    cechy_specjalne: {
      widzenie_w_ciemności: 'W obszarach spowitych cieniem lub mrokiem widzisz na średni zasięg tak samo dobrze jak w oświetlonych. Poza średnim zasięgiem widzisz w cieniu jak w świetle, a w mroku jak w cieniu.',
      znienawidzony_wrog: 'Wybierz rodzaj stworzenia z tabeli Znienawidzone stworzenia. Wszystkie rzuty na atak przeciwko stworzeniom tego typu wykonujesz z 1 ułatwieniem.',
      naturalna_odpornosc: 'Otrzymujesz tylko połowę obrażeń od trucizny. Testy na uniknięcie lub pozbycie się zatrucia wykonujesz z 1 ułatwieniem.'
    },
    poziom_4: {
      zdrowie: '+6',
      opcje: ['1 zaklęcie', 'talent Nie do zdarcia']
    },
    strona_zrodlowa: 18,
    status: 'kompletne'
  },

  odmieniec: {
    id: 'odmieniec',
    nazwa: 'Odmieniec',
    zrodlo: 'PG', // Podręcznik Główny
    opis: 'Istoty zmienione przez magię, poszukujące swojego miejsca w świecie.',
    atrybuty_bazowe: {
      sila: 9, // PG str. 1341
      zrecznosc: 10, // PG str. 1341
      intelekt: 10, // PG str. 1341
      wola: 10 // PG str. 1341
    },
    rozmiar: '1', // PG str. 1349
    predkosc: 10, // PG str. 1349
    jezyki: ['wspólny'], // PG str. 1353
    // PG str. 20: "Umiesz mówić w języku wspólnym." - brak gwarantowanej
    // profesji/języka (tabela "przeszłość" może dać losową profesję, ale
    // to efekt losowania, nie stały bonus origin).
    profesje: [],
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na zauroczenie, a także na choroby i pochodzące od nich obrażenia.',
      wrażliwosc_na_zelazo: 'Jesteś osłabiony, gdy dotykasz żelaza.',
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze jak w oświetlonych.',
      kradziez_tozsamosci: 'Możesz wykorzystać akcję, by upodobnić się do innej żywej istoty, którą widzisz w bliskim zasięgu. Cel musi mieć Rozmiar 1 lub 1/2 i być humanoidem składającym się z ciała i krwi.'
    },
    poziom_4: {
      zdrowie: '+4',
      opcje: ['1 zaklęcie', 'talent Prymat sobowtóra']
    },
    strona_zrodlowa: 20,
    status: 'kompletne'
  },

  ork: {
    id: 'ork',
    nazwa: 'Ork',
    zrodlo: 'PG', // POPRAWIONE - Ork jest w PG
    opis: 'Silne, wojownicze istoty o dzikiej naturze i instynktach drapieżnika.',
    atrybuty_bazowe: {
      sila: 11, // POPRAWIONE z PG str. 1484
      zrecznosc: 10, // POPRAWIONE z PG str. 1484
      intelekt: 9, // POPRAWIONE z PG str. 1484
      wola: 9 // POPRAWIONE z PG str. 1484
    },
    rozmiar: '1', // PG str. 1492
    predkosc: 12, // POPRAWIONE z PG str. 1492
    jezyki: ['wspólny', 'mroczna_mowa'], // POPRAWIONE z PG str. 1496
    // PG str. 22: "Umiesz mówić w języku wspólnym i mrocznej mowie." - brak
    // dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze jak w oświetlonych.',
      splugawienie: 'Zaczynasz grę z 1 punktem Splugawienia.'
    },
    poziom_4: {
      zdrowie: '+6',
      opcje: ['1 zaklęcie', 'talent Furia']
    },
    strona_zrodlowa: 22,
    status: 'kompletne'
  },

  // Straszliwe Piękno - Nowe pochodzenia faerie
  chochlik: {
    id: 'chochlik',
    nazwa: 'Chochlik',
    zrodlo: 'SP', // Straszliwe Piękno
    opis: 'Maleńkie istoty faerie, które uwielbiają płatać figle i psocić.',
    atrybuty_bazowe: {
      sila: 5,
      zrecznosc: 12,
      intelekt: 10,
      wola: 8
    },
    rozmiar: '1/8',
    predkosc: 10,
    jezyki: ['elficki'],
    // Straszliwe Piękno str. 7: "Umiesz mówić w języku elfickim." - brak
    // dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na zauroczenie, a także na choroby i pochodzące od nich obrażenia.',
      trzepot: 'Możesz poruszać się lotem, ale jeśli wzniesiesz się na więcej niż 5 metrów nad ziemię, spadasz.',
      naturalna_niewidzialnosc: 'Jesteś niewidzialny dla większości stworzeń poza innymi chochlikami. Zwierzęta, demony, faerie, potwory, dzieci, istoty o wartości Intelektu 7 lub niższej oraz te z 5 lub więcej punktami Szaleństwa mogą wyraźnie cię widzieć.',
      rozblysk: 'Podczas swojej tury możesz wykorzystać akcję, aby stać się widoczny i rozświetlić obszar w promieniu 2 metrów od siebie.',
      wrażliwosc_na_zelazo: 'Jesteś osłabiony, gdy dotykasz żelaza.',
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze, jak w oświetlonych.',
      tyci: 'Twoje ataki bronią zadają połowę obrażeń. Za każdym razem, kiedy opis ścieżki nakazuje ci podnieść swoje Zdrowie, zwiększasz je jedynie o połowę podanej wartości.'
    },
    poziom_4: {
      zdrowie: '+2',
      opcje: ['1 zaklęcie', 'talent Kontrolowany szał']
    },
    strona_zrodlowa: 7,
    status: 'kompletne'
  },

  elf: {
    id: 'elf',
    nazwa: 'Elf',
    zrodlo: 'SP', // Straszliwe Piękno
    opis: 'Wysokie faerie, panowie i damy z ukrytych królestw.',
    atrybuty_bazowe: {
      sila: 9,
      zrecznosc: 10,
      intelekt: 10,
      wola: 9
    },
    // SP str. 9: "Wybierz dwa atrybuty i podnieś je o 1."
    wybor_atrybutu: { ilosc: 2, wartosc: 1, opis: '+1 do dwóch wybranych atrybutów' },
    rozmiar: '1',
    predkosc: 12,
    jezyki: ['wspólny', 'wysoki_archaik', 'elficki'],
    // Straszliwe Piękno str. 9: "Potrafisz także mówić po elficku oraz
    // czytać i pisać w tym języku." - automatyczne pismo w elfickim.
    // "Możesz zyskać dodatkowe profesje lub języki w zależności od swojego
    // wieku" to efekt losowania tabeli wieku, nie stały bonus origin.
    profesje: [],
    jezyki_pismo_automatyczne: ['elficki'],
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na zauroczenie, a także na choroby i pochodzące od nich obrażenia.',
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze, jak w oświetlonych.',
      ochrona_przed_magia: 'Elfy otrzymują tylko połowę obrażeń zadawanych przez zaklęcia, a wszystkie testy w celu odparcia ich efektów wykonują z 1 ułatwieniem.',
      charyzmatyczna_aura: 'Twoja magiczna natura pozwala ci wpływać na to, jak inni cię postrzegają i zachowują się w twojej obecności.',
      wrażliwosc_na_zelazo: 'Jesteś osłabiony, kiedy dotykasz żelaza. Dodatkowo tracisz Ochronę przed magią, dopóki pozostajesz z nim w kontakcie i na 1 minutę po jego przerwaniu.'
    },
    // SP str. 9: "Możesz nauczyć się jednego zaklęcia lub podnieść Zdrowie o +4."
    // - to wzajemnie wykluczający się wybór, elf nie ma żadnego automatycznego
    // bonusu do Zdrowia ani talentu na poziomie 4.
    poziom_4: {
      zdrowie: '+0',
      opcje: ['1 zaklęcie', 'zwiększenie Zdrowia o 4']
    },
    strona_zrodlowa: 9,
    status: 'kompletne'
  },

  hobgoblin: {
    id: 'hobgoblin',
    nazwa: 'Hobgoblin',
    zrodlo: 'SP', // Straszliwe Piękno
    opis: 'Szeregowi żołnierze w armiach magicznych krain faerie.',
    atrybuty_bazowe: {
      sila: 11,
      zrecznosc: 10,
      intelekt: 9,
      wola: 11
    },
    rozmiar: '1',
    predkosc: 10,
    jezyki: ['elficki'],
    // Straszliwe Piękno str. 12: "Umiesz mówić w języku elfickim i
    // posiadasz profesję wojenną." - gwarantowana profesja, bez opcji
    // zamiany na język.
    profesje: ['wojenna'],
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na zauroczenie, a także na choroby i pochodzące od nich obrażenia.',
      wrażliwosc_na_zelazo: 'Jesteś osłabiony, gdy dotykasz żelaza.',
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze, jak w oświetlonych.',
      szal: 'W trakcie walki rzuć k6 pod koniec każdej rundy, o ile nie jesteś ani obezwładniony, ani pod wpływem tego talentu. Przy wyniku 6 wpadasz w szał, który trwa przez 1 minutę.'
    },
    poziom_4: {
      zdrowie: '+5',
      opcje: ['1 zaklęcie', 'talent Kontrolowany szał']
    },
    strona_zrodlowa: 14,
    status: 'kompletne'
  },

  // Suplement Władcy Demonów
  faun: {
    id: 'faun',
    nazwa: 'Faun',
    zrodlo: 'SUP', // Suplement Władcy Demonów, "Tworzenie postaci: faun" (str. 5 wg spisu treści)
    opis: 'Potomkowie faerie i śmiertelników o kozich cechach fizycznych, nieprzynależący do żadnego z tych ludów.',
    atrybuty_bazowe: {
      sila: 10,
      zrecznosc: 11,
      intelekt: 11,
      wola: 9
    },
    rozmiar: '1/2 lub 1',
    predkosc: 12,
    jezyki: ['wspólny', 'elficki'],
    // Suplement Władcy Demonów str. 5: "Umiesz mówić w języku wspólnym
    // i elfickim." - brak dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      percepcja_wyzsza: 'Percepcja równa jest wartości Intelektu + 1.',
      pedziwiatr: 'Kiedy podejmujesz akcję, możesz poruszyć się przed nią lub po niej o 1 metr, pod warunkiem, że twoja Prędkość wynosi więcej niż 0.',
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze, jak w oświetlonych.',
      plochliwy: 'Wykonujesz testy Woli z 1 utrudnieniem.'
    },
    poziom_4: {
      zdrowie: '+5',
      opcje: ['1 zaklęcie', 'talent Walka lub ucieczka']
    },
    strona_zrodlowa: 6,
    status: 'kompletne'
  },

  niziol: {
    id: 'niziol',
    nazwa: 'Niziołek',
    zrodlo: 'SUP', // Suplement Władcy Demonów, "Tworzenie postaci: niziołek" (str. 8 wg spisu treści)
    opis: 'Niewielcy, nieustraszeni osadnicy o niezwykłym szczęściu, cenią sobie komfort i dobre jedzenie.',
    atrybuty_bazowe: {
      sila: 9,
      zrecznosc: 11,
      intelekt: 10,
      wola: 11
    },
    rozmiar: '1/2',
    predkosc: 8,
    jezyki: ['wspólny'],
    // Suplement Władcy Demonów str. 8: "Umiesz mówić w języku wspólnym."
    // - brak dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      usmiech_losu: 'Gdy stworzenie w twoim bliskim zasięgu wyrzuci 1 na jakiejkolwiek kości, możesz wykorzystać reakcję, by pozwolić na zignorowanie tego wyniku i powtórzenie rzutu.',
      niezwykla_odwaga: 'Gdy zostaniesz przestraszony, możesz wykorzystać reakcję, by wykonać test Woli. Sukces oznacza, że pozbywasz się tego stanu.'
    },
    poziom_4: {
      zdrowie: '+4',
      opcje: ['1 zaklęcie', 'talent Przypływ szczęścia']
    },
    strona_zrodlowa: 9,
    status: 'kompletne'
  },


  // Głód w Pustce
  fomor: {
    id: 'fomor',
    nazwa: 'Fomor',
    zrodlo: 'GWP', // Głód w Pustce, "Tworzenie fomora" (str. 45-46 wg stopki PDF)
    opis: 'Zwierzoludzie o cechach kozła, tchórzliwi w osamotnieniu, groźni w stadzie.',
    // Realne atrybuty bazowe to losowy rzut (Siła 1k3+8, Zręczność 1k3+10,
    // Intelekt 1k3+6, Wola 1k3+5) - patrz atrybuty_bazowe_losowe. Wartości
    // poniżej to średnia z rzutu (1k3 śr. 2), używana tylko do podglądu
    // kafelka pochodzenia przed właściwym tworzeniem postaci.
    atrybuty_bazowe: {
      sila: 10,
      zrecznosc: 12,
      intelekt: 8,
      wola: 7
    },
    atrybuty_bazowe_losowe: {
      sila: { kostka: 'k3', modyfikator: 8 },
      zrecznosc: { kostka: 'k3', modyfikator: 10 },
      intelekt: { kostka: 'k3', modyfikator: 6 },
      wola: { kostka: 'k3', modyfikator: 5 }
    },
    rozmiar: '1',
    predkosc: 10,
    jezyki: ['mroczna_mowa'],
    // Głód w Pustce str. 46: "Fomor umie mówić w mrocznej mowie." - brak
    // dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      percepcja_wyzsza: 'Percepcja równa jest wartości Intelektu + 2 (aplikacja liczy ją jak dla większości pochodzeń, jako Intelekt bez modyfikatora).',
      poczatkowe_stany: 'Zaczynasz grę z 1k3 punktami Szaleństwa i 1k3 punktami Splugawienia.',
      tchorzliwy: 'Jesteś przestraszony, jeśli znajdujesz się w bezpośrednim zasięgu co najmniej dwóch wrogich wobec ciebie stworzeń.',
      walka_w_stadzie: 'Gdy atakujesz cel znajdujący się w bezpośrednim zasięgu innego przyjaznego sobie stworzenia z talentem Walka w stadzie, rzut na atak wykonujesz z 1 ułatwieniem. W przeciwnym wypadku wykonujesz go z 1 utrudnieniem.'
    },
    poziom_4: {
      zdrowie: '+5',
      opcje: ['1 zaklęcie', 'talent Potęga zagnana w kozi róg']
    },
    strona_zrodlowa: 46,
    status: 'kompletne' // brak oficjalnych tabel losowania (wiek/wygląd/przeszłość/osobowość) - Głód w Pustce ich dla tego pochodzenia nie definiuje
  },

  niedzwiedziadlo: {
    id: 'niedzwiedziadlo',
    nazwa: 'Niedźwiedzidło', // poprawiona pisownia zgodna ze źródłem (było: "Niedźwiedziadło")
    zrodlo: 'GWP', // Głód w Pustce, "Niedźwiedzidło, poziom 4" (str. 48-49 wg stopki PDF)
    opis: 'Ogromni, brutalni zwierzoludzie o niedźwiedziej naturze, zwani też straszydłami.',
    // Realne atrybuty bazowe to losowy rzut (Siła 1k3+12, Zręczność 1k3+11,
    // Intelekt 1k3+8, Wola 1k3+8) - patrz atrybuty_bazowe_losowe. Wartości
    // poniżej to średnia z rzutu (1k3 śr. 2), używana tylko do podglądu
    // kafelka pochodzenia przed właściwym tworzeniem postaci.
    atrybuty_bazowe: {
      sila: 14,
      zrecznosc: 13,
      intelekt: 10,
      wola: 10
    },
    atrybuty_bazowe_losowe: {
      sila: { kostka: 'k3', modyfikator: 12 },
      zrecznosc: { kostka: 'k3', modyfikator: 11 },
      intelekt: { kostka: 'k3', modyfikator: 8 },
      wola: { kostka: 'k3', modyfikator: 8 }
    },
    rozmiar: '1',
    predkosc: 10,
    jezyki: ['mroczna_mowa'],
    // Głód w Pustce str. 48: "Niedźwiedzidło umie mówić w mrocznej mowie."
    // - brak dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      percepcja_wyzsza: 'Percepcja równa jest wartości Intelektu + 2 (aplikacja liczy ją jak dla większości pochodzeń, jako Intelekt bez modyfikatora).',
      zdrowie_wyzsze: 'Zdrowie równe jest wartości Siły + 10 (aplikacja liczy je jak dla większości pochodzeń, jako sama Siła).',
      poczatkowe_stany: 'Zaczynasz grę z 1k3 punktami Szaleństwa i 1k3 punktami Splugawienia.',
      szybki_chwyt: 'Kiedy całkowity wynik rzutu na atak z użyciem broni wyniesie 20 lub więcej i przebije poziom trudności o co najmniej 5, możesz spróbować pochwycić cel bez poświęcania akcji, jeśli masz wolną rękę.',
      przebieglosc: 'Testy Zręczności na ukrywanie się lub skradanie wykonujesz z 1 ułatwieniem.'
    },
    poziom_4: {
      zdrowie: '+7',
      opcje: ['1 zaklęcie', 'talent Niedźwiedzi uścisk']
    },
    strona_zrodlowa: 48,
    status: 'kompletne' // brak oficjalnych tabel losowania (wiek/wygląd/przeszłość/osobowość) - Głód w Pustce ich dla tego pochodzenia nie definiuje
  },

  warg: {
    id: 'warg',
    nazwa: 'Warg',
    zrodlo: 'GWP', // Głód w Pustce, "Tworzenie warga" (str. 49 wg stopki PDF)
    opis: 'Zaciekli zwierzoludzie o wilczej naturze, siła napędowa hord zwierzoludzi.',
    // Realne atrybuty bazowe to losowy rzut (Siła 1k3+11, Zręczność 1k3+10,
    // Intelekt 1k3+7, Wola 1k3+8) - patrz atrybuty_bazowe_losowe. Wartości
    // poniżej to średnia z rzutu (1k3 śr. 2), używana tylko do podglądu
    // kafelka pochodzenia przed właściwym tworzeniem postaci.
    atrybuty_bazowe: {
      sila: 13,
      zrecznosc: 12,
      intelekt: 9,
      wola: 10
    },
    atrybuty_bazowe_losowe: {
      sila: { kostka: 'k3', modyfikator: 11 },
      zrecznosc: { kostka: 'k3', modyfikator: 10 },
      intelekt: { kostka: 'k3', modyfikator: 7 },
      wola: { kostka: 'k3', modyfikator: 8 }
    },
    rozmiar: '1',
    predkosc: 12,
    jezyki: [],
    // Głód w Pustce str. 49: "Wargowie rozumieją mroczną mowę, ale nie
    // umieją mówić." - brak dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      percepcja_wyzsza: 'Percepcja równa jest wartości Intelektu + 2 (aplikacja liczy ją jak dla większości pochodzeń, jako Intelekt bez modyfikatora).',
      zdrowie_wyzsze: 'Zdrowie równe jest wartości Siły + 2 (aplikacja liczy je jak dla większości pochodzeń, jako sama Siła).',
      rozumie_ale_nie_mowi: 'Rozumiesz mroczną mowę, ale nie potrafisz w niej mówić.',
      poczatkowe_stany: 'Zaczynasz grę z 1k3 punktami Szaleństwa i 1k3 punktami Splugawienia.',
      zajadlosc: 'Gdy otrzymasz obrażenia od stworzenia w swoim bezpośrednim zasięgu, możesz wykorzystać reakcję, by je ugryźć. Wykonujesz oparty na Sile rzut na atak z 1 ułatwieniem przeciwko Obronie celu i zadajesz 1k6 obrażeń w razie trafienia.'
    },
    poziom_4: {
      zdrowie: '+6',
      opcje: ['1 zaklęcie', 'talent Okrutna zajadłość']
    },
    strona_zrodlowa: 49,
    status: 'kompletne' // brak oficjalnych tabel losowania (wiek/wygląd/przeszłość/osobowość) - Głód w Pustce ich dla tego pochodzenia nie definiuje
  },

  inkarnacja: {
    id: 'inkarnacja',
    nazwa: 'Inkarnacja',
    zrodlo: 'GWP', // Głód w Pustce, "Tworzenie postaci: inkarnacja" (str. 75-77 wg stopki PDF)
    opis: 'Nieziemskie istoty bez fizycznej formy, które pożyczają ciała śmiertelników.',
    // W źródle Siła to "–" (inkarnacja w naturalnej formie jej nie posiada).
    // Zdrowie liczy się w rzeczywistości z Woli, nie z Siły. Ponieważ silnik
    // aplikacji zawsze liczy Zdrowie = Siła (tak samo jak dla wszystkich
    // innych pochodzeń - to ograniczenie sprzed tego sprintu), ustawiono
    // sila = wola, dzięki czemu wynik jest poprawny mimo uproszczenia.
    atrybuty_bazowe: {
      sila: 10,
      zrecznosc: 10,
      intelekt: 10,
      wola: 10
    },
    rozmiar: '1/4',
    predkosc: 2,
    jezyki: [],
    profesje: [],
    cechy_specjalne: {
      zdrowie_z_woli: 'W naturalnej formie Zdrowie równe jest wartości Woli, nie Siły (aplikacja liczy je jak dla większości pochodzeń, ustawiając Siłę równą Woli).',
      widzenie_w_ciemnosci: 'W obszarach spowitych cieniem lub mrokiem widzisz na średni zasięg tak samo dobrze jak w oświetlonych. Poza średnim zasięgiem widzisz w cieniu jak w świetle, a w mroku jak w cieniu.',
      niewidzialnosc: 'W swojej naturalnej formie jesteś niewidzialny dla wszystkich stworzeń innych niż demony.',
      zawieszenie: 'Poruszasz się lotem i nigdy nie otrzymujesz obrażeń od upadku.',
      eteryczny: 'W naturalnej formie nie możesz dotknąć żadnych stworzeń ani obiektów. Nie jesteś w stanie mówić. Nie otrzymujesz obrażeń od broni ani z fizycznych źródeł, ale magia wywiera na ciebie wpływ. Potrafisz przenikać przez materialne obiekty i inne stworzenia oraz ignorujesz efekty trudnego terenu.',
      czysty_duch: 'Otrzymujesz karę do Zdrowia równą dwukrotności twojej wartości Splugawienia.',
      nietrwaly: 'Jeśli zostaniesz obezwładniony, twoja esencja wypływa z powrotem na granicę rzeczywistości, gdzie pozostaje, dopóki wszechświat nie ulegnie zniszczeniu.',
      kontakt: 'Możesz wykorzystać akcję, aby dotknąć umysłów dowolnej liczby stworzeń w bliskim zasięgu i komunikować się z nimi bez mówienia, dopóki się koncentrujesz i pozostajecie w bliskim zasięgu.',
      wcielenie: 'Możesz podjąć próbę wejścia do ciała żywego, śmiertelnego stworzenia z duszą w bliskim zasięgu (rzut na atak oparty na Woli przeciwko jego Woli). Sukces oznacza przejęcie jego ciała ("wcielona forma") do chwili, aż je opuścisz lub ono umrze; cel traci wspomnienia z tego okresu i zyskuje Szaleństwo równe twojej Woli. UWAGA: pełna mechanika wcielonej formy (używanie Siły/Zręczności/Obrony/Zdrowia/Prędkości "gospodarza" przy zachowaniu własnego Intelektu/Woli/Mocy) nie jest symulowana przez ten kreator - wymaga ręcznego prowadzenia dwóch kart postaci przez gracza/MG.',
      potezne_pochodzenie: 'Kiedy twoja drużyna osiąga 1 poziom, nie wybierasz ścieżki nowicjusza. Zamiast tego za każdym razem, kiedy tabela w podręczniku głównym mówi, że zyskałbyś korzyści ze ścieżki nowicjusza, otrzymujesz korzyści ze swojego pochodzenia dla danego poziomu.'
    },
    poziom_4: {
      zdrowie: '+1', // w źródle: naturalna forma +1, wcielona +4 (druga wartość niesymulowana - patrz cecha "wcielenie")
      opcje: ['1 zaklęcie', 'talent Zdeterminowany na wieki']
    },
    strona_zrodlowa: 76,
    status: 'kompletne' // mechanika "wcielonej formy" celowo opisana jako tekst (nie symulowana) - patrz cecha "wcielenie"
  },

  // Rozkoszna Agonia
  kambion: {
    id: 'kambion',
    nazwa: 'Kambion',
    zrodlo: 'RA', // Rozkoszna Agonia, Rozdział 3 "Postaci z Piekła rodem" -> "Tworzenie postaci: Kambion" (str. 44 wg stopki PDF - str. 55 to okładka reklamowa innej książki na końcu PDF-a, nie treść origin-u)
    opis: 'Potomkowie diabłów i śmiertelników, naznaczeni piekielnym dziedzictwem.',
    atrybuty_bazowe: {
      sila: 10,
      zrecznosc: 10,
      intelekt: 11,
      wola: 9
    },
    rozmiar: '1/2 lub 1',
    predkosc: 10,
    jezyki: ['wspólny'],
    // Rozkoszna Agonia str. 44: "Umiesz mówić w języku wspólnym." - brak
    // dodatkowej profesji lub języka.
    profesje: [],
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na obrażenia od choroby i trucizny, a także na chorobę i zatrucie.',
      widzenie_w_ciemnosci: 'W obszarach spowitych cieniem lub mrokiem widzisz na średni zasięg tak samo dobrze jak w oświetlonych. Poza średnim zasięgiem widzisz w cieniu jak w świetle, a w mroku jak w cieniu.',
      dziecie_piekla: 'Zyskujesz Odporność na ogień.',
      pietno_ciemnosci: 'Zaczynasz grę z jednym piętnem ciemności.',
      radosc_z_ciemnosci: 'Przez 1 minutę po tym, jak zyskasz Splugawienie, rzuty na atak i testy wykonujesz z 1 ułatwieniem.',
      wrazliwosc_na_zelazo: 'Jesteś osłabiony, gdy dotykasz żelaza.',
      splugawienie_poczatkowe: 'Zaczynasz grę z 2 punktami Splugawienia.'
    },
    poziom_4: {
      zdrowie: '+5',
      opcje: ['1 zaklęcie', 'talent Obdarzenie splugawieniem']
    },
    strona_zrodlowa: 44,
    status: 'kompletne'
  },

  // Dodatkowe pochodzenie z innych źródeł
  jotunn: {
    id: 'jotunn',
    nazwa: 'Jotun', // poprawiona pisownia zgodna ze źródłem (było: "Jötunn")
    zrodlo: 'CS', // Chwalebna Śmierć, sekcja "Serce zimy", "Tworzenie postaci: jotun" (str. 6-9 wg stopki PDF)
    opis: 'Potężni giganci z Mroźnego Bezdroża, dla których tchórzostwo jest największą hańbą.',
    atrybuty_bazowe: {
      sila: 13,
      zrecznosc: 9,
      intelekt: 8,
      wola: 10
    },
    rozmiar: '2',
    predkosc: 10,
    jezyki: ['wspólny', 'trolli'],
    // NIEZWERYFIKOWANE: źródło (Chwalebna Śmierć) nie jest dostępne w
    // sources/, więc nie potwierdzono dokładnego tekstu "Języki i profesje"
    // dla Jotuna. Wszystkie pozostałe pochodzenia sprawdzone względem
    // źródeł nie mają gwarantowanej profesji (najczęściej "profesje: []"),
    // więc `['dowolna']` może być błędne - wymaga weryfikacji przy okazji
    // dostępu do tego podręcznika.
    profesje: ['dowolna'],
    cechy_specjalne: {
      przywykly_do_zimna: 'Otrzymujesz połowę obrażeń od zimna i nigdy nie cierpisz z powodu wystawienia na działanie żywiołów w chłodnym środowisku.',
      potezne_pochodzenie: 'Kiedy twoja drużyna osiąga 1 poziom, nie wybierasz ścieżki nowicjusza. Zamiast tego za każdym razem, kiedy tabela w podręczniku głównym mówi, że zyskałbyś korzyści ze ścieżki nowicjusza, otrzymujesz korzyści ze swojego pochodzenia dla danego poziomu.',
      losowa_profesja: 'Zaczynasz grę z jedną profesją wylosowaną z tabeli Jotun: profesje.'
    },
    poziom_4: {
      zdrowie: '+6',
      opcje: ['1 zaklęcie', 'talent Krew olbrzymów']
    },
    strona_zrodlowa: 7,
    status: 'kompletne'
  },

  // Potomkowie Zdrajcy (PZ) - dodatek "Scions of the Betrayer" (SDL1806).
  // Brak polskiego wydania: tłumaczenie własne, UI oznacza je etykietą "beta"
  // na podstawie kodu źródła (BETA_SOURCES w script.js).
  mroczniak: {
    id: 'mroczniak',
    nazwa: 'Mroczniak',
    zrodlo: 'PZ',
    opis: 'Upadłe faerie związane paktem Zdrajcy z Diabłem, przeżarte splugawieniem i nienawiścią do ludzi.',
    atrybuty_bazowe: {
      sila: 9,
      zrecznosc: 10,
      intelekt: 10,
      wola: 8
    },
    // PZ str. 7: "wybierz dwa różne atrybuty i zwiększ każdy o 1".
    wybor_atrybutu: { ilosc: 2, wartosc: 1, opis: '+1 do dwóch różnych wybranych atrybutów' },
    rozmiar: '1',
    predkosc: 10,
    jezyki: ['elficki', 'wysoki_archaik'],
    // PZ str. 7: "Mówisz, czytasz i piszesz w językach elfickim i wysokim
    // archaiku." Dodatkowe profesje lub języki wynikają z wylosowanego wieku
    // (jedna profesja albo język za każde przeżyte dwa stulecia), a nie ze
    // stałego bonusu pochodzenia.
    profesje: [],
    jezyki_pismo_automatyczne: ['elficki', 'wysoki_archaik'],
    // PZ str. 13: mroczniak ustala profesje początkowe ze swojej tabeli
    // zamiast z tabel z Podręcznika Głównego. To pole sprawia, że kategoria
    // 'mroczniackie' jest dopuszczona w KAŻDYM slocie profesji tej postaci,
    // niezależnie od tego, jakie kategorie narzuca ścieżka - i odwrotnie:
    // postaci innych pochodzeń w ogóle tej kategorii nie widzą.
    wlasne_profesje: 'mroczniackie',
    cechy_specjalne: {
      niewrazliwosc: 'Niewrażliwość na obrażenia od choroby, a także na zauroczenie i chorobę.',
      percepcja_wyzsza: 'Percepcja równa jest wartości Intelektu + 1 (aplikacja liczy ją jak dla większości pochodzeń, jako Intelekt bez modyfikatora).',
      widzenie_w_cieniu: 'Widzisz w zacienionych obszarach tak samo dobrze, jak w oświetlonych.',
      diabel: 'Jesteś diabłem i otrzymujesz połowę obrażeń od ognia.',
      zlowroga_aura: 'Twoja magiczna natura objawia się wyczuwalną aurą groźby. Rzuty na atak w sytuacjach towarzyskich, gdy grozisz lub zastraszasz, wykonujesz z 1 ułatwieniem.',
      ochrona_przed_magia: 'Otrzymujesz połowę obrażeń od zaklęć, a testy w celu oparcia się ich efektom wykonujesz z 1 ułatwieniem. Stworzenie atakujące cię zaklęciem wykonuje rzut na atak z 1 utrudnieniem.',
      wrazliwosc_na_zelazo: 'Jesteś osłabiony, gdy dotykasz żelaza. Dodatkowo, jeśli dotkniesz przedmiotu z żelaza lub on dotknie ciebie, tracisz Złowrogą aurę i Ochronę przed magią, dopóki pozostajesz z nim w kontakcie i na 1 minutę po przerwaniu kontaktu.',
      pietno_ciemnosci: 'Zaczynasz grę z jednym piętnem ciemności wylosowanym z tabeli Mroczniak: piętna ciemności.',
      wlasne_profesje_opis: 'Ustalając profesje, korzystasz z profesji mroczniackich zamiast z tabel z Podręcznika Głównego - mroczniaki żyją na obrzeżach świata śmiertelnych i część tamtejszych zajęć nic dla nich nie znaczy. W Kroku 5 znajdziesz je jako osobną kategorię "Mroczniackie", dostępną w każdym twoim slocie profesji.',
      splugawienie_poczatkowe: 'Zaczynasz grę z 1k3 punktami Szaleństwa oraz 1k3 + 1 punktami Splugawienia.'
    },
    // PZ str. 7: "Zyskujesz jedną z poniższych opcji: Zdrowie +4 albo poznanie
    // jednego zaklęcia." - to wybór wykluczający, bez automatycznego Zdrowia.
    poziom_4: {
      zdrowie: '+0',
      opcje: ['1 zaklęcie', 'zwiększenie Zdrowia o 4']
    },
    strona_zrodlowa: 7,
    status: 'kompletne'
  }
};

/**
 * Przedrostek, którym w `poziom_4.opcje` oznaczona jest opcja przyznająca
 * talent - np. 'talent Determinacja'. Reszta napisu to nazwa talentu,
 * dokładnie taka jak klucz w data/<język>/talents.js.
 *
 * Mieszka razem z danymi, a nie w kodzie UI, bo to część zapisu tych danych:
 * w innym języku opcje będą zapisane innym słowem i wtedy wystarczy zmienić
 * tę stałą obok przetłumaczonych opcji.
 */
const OPTION_TALENT_PREFIX = 'talent ';

export default ORIGINS;
export { OPTION_TALENT_PREFIX };
