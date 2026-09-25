/**
 * Ścieżki postaci - system progresji
 * Źródło: Podręcznik Główny (PG), rozdział 3 (ścieżki nowicjuszy i eksperckie)
 * i rozdział 5 (ścieżki mistrzowskie)
 *
 * Każda ścieżka przechowuje swoje korzyści pod kluczem `poziom_1` -
 * niezależnie od tego, na którym faktycznym poziomie drużyny (1, 3 albo 7)
 * ścieżka zostaje wybrana - to korzyści przyznawane w chwili jej wyboru
 * (zgodnie z konwencją już używaną przez ścieżki nowicjuszy).
 *
 * Pole `jezyki_profesje` (gdy obecne) opisuje strukturalnie przyznawany
 * bonus językowy/profesyjny:
 * - typ 'wybor': jedno z dwóch - nowy język mówiony ALBO profesja z `kategorie`
 * - typ 'tylko_profesja': wyłącznie profesja z `kategorie`, bez opcji językowej
 * - typ 'oba': jednocześnie nowy język mówiony ORAZ profesja z `kategorie`
 * - typ 'automatyczne_naukowa' (tylko Magik): automatyczne czytanie/pisanie
 *   we wszystkich znanych językach + wybrana profesja naukowa
 * `kategorie` używa kluczy z PROFESSIONS.tables (naukowe/pospolite/
 * przestepcze/wojenne/koczownicze/religijne) albo ['dowolna'].
 *
 * Pole `magia` (gdy obecne) opisuje strukturalnie przyznawane korzyści
 * magiczne na danym poziomie. Wartość to jeden obiekt "jednostki nadania"
 * albo tablica kilku takich jednostek (gdy dany poziom przyznaje więcej
 * niż jedną odrębną korzyść, np. Kleryk/Magik na poziomie 1):
 * - { typ: 'tradycja', kategoria: [...] }: wymuszone poznanie nowej
 *   tradycji z podanej kategorii tradycji (bez alternatywy w postaci
 *   zaklęcia); `kategoria` to ['dowolna'] albo ['religijne'] albo lista
 *   konkretnych id tradycji (np. Druid: ['zycie','natura','magia_pierwotna']).
 * - { typ: 'wybor', opcje: ['tradycja','zaklecie'], kategoria: [...], ilosc: N }:
 *   N-krotny (powtarzalny) wybór między poznaniem nowej tradycji z
 *   `kategoria` a nauczeniem się jednego zaklęcia z już znanej tradycji.
 * - { typ: 'wybor', opcje: ['tradycja','zaklecie'], tradycjaNazwa: 'x', ilosc: 1 }:
 *   wybór ograniczony do JEDNEJ konkretnej tradycji (id z traditions.js) -
 *   w praktyce deterministyczny: gdy nieznana, poznajesz ją; gdy już
 *   znana, uczysz się z niej dodatkowego zaklęcia.
 * - { typ: 'zaklecie', ilosc: N }: nauka N kolejnych zaklęć z tradycji już
 *   znanych, bez opcji poznania nowej tradycji.
 * Kategorie tradycji i lista tradycji religijnych: zob. `traditions.js`.
 */

const PATHS = {
  // Ścieżki nowicjuszy (poziom 1) - PG rozdział 3
  sciezki_nowicjuszy: {
    kleryk: {
      id: 'kleryk',
      nazwa: 'Kleryk',
      opis: 'Sługa bóstwa, leczy i wspiera sojuszników modlitwą.',
      poziom_1: {
        zdrowie: '+3',
        magia: [
          { typ: 'tradycja', kategoria: ['religijne'] },
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['religijne'], ilosc: 2 }
        ],
        talenty: ['Modlitwa', 'Wspólna odnowa']
      },
      poziom_2: {
        zdrowie: '+4',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['religijne'], ilosc: 2 }
        ]
      },
      poziom_5: {
        zdrowie: '+4',
        moc: '+1',
        magia: [
          { typ: 'zaklecie', ilosc: 1 }
        ],
        talenty: ['Boskie uderzenie']
      },
      poziom_8: {
        zdrowie: '+4',
        magia: [
          { typ: 'zaklecie', ilosc: 1 }
        ],
        talenty: ['Inspirująca modlitwa', 'Udoskonalona wspólna odnowa']
      },
      strona_zrodlowa: 58
    },

    lotr: {
      id: 'lotr',
      nazwa: 'Łotr',
      opis: 'Skrytobójca i złodziej, specjalizujący się w atakach z zaskoczenia.',
      poziom_1: {
        zdrowie: '+3',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['pospolite', 'przestepcze', 'koczownicze'],
          opis: 'Uczysz się mówić jednym językiem lub zyskujesz jedną profesję pospolitą, przestępczą lub koczowniczą.'
        },
        talenty: ['Szybka odnowa', 'Podstęp']
      },
      poziom_2: {
        zdrowie: '+3',
        talenty: ['Wykorzystanie okazji', 'Łotrowski talent']
      },
      poziom_5: {
        zdrowie: '+3',
        talenty: ['Nieczyste zagrania', 'Łotrowski spryt']
      },
      poziom_8: {
        zdrowie: '+3',
        talenty: ['Łotrowski talent']
      },
      strona_zrodlowa: 59
    },

    mag: {
      id: 'mag',
      nazwa: 'Magik',
      opis: 'Użytkownik magii, specjalizujący się w zaklęciach.',
      poziom_1: {
        atrybuty_glowne: {
          typ: 'wybor',
          ilosc: 2,
          wartosc: 1,
          dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola']
        },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'automatyczne_naukowa',
          kategorie: ['naukowe'],
          opis: 'Umiesz czytać i pisać we wszystkich znanych ci językach. Zyskujesz także wybraną przez siebie profesję naukową.'
        },
        magia: [
          { typ: 'tradycja', kategoria: ['dowolna'] },
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 3 }
        ],
        talenty: ['Sztuczki', 'Wyczucie magii']
      },
      poziom_2: {
        zdrowie: '+2',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 2 }
        ],
        talenty: ['Odzyskanie zaklęcia']
      },
      poziom_5: {
        zdrowie: '+2',
        moc: '+1',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
        ],
        talenty: ['Kontrmagia']
      },
      poziom_8: {
        zdrowie: '+2',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
        ],
        talenty: ['Udoskonalone odzyskanie zaklęcia']
      },
      strona_zrodlowa: 60
    },

    wojownik: {
      id: 'wojownik',
      nazwa: 'Wojownik',
      opis: 'Mistrz walki wręcz i bronią białą.',
      poziom_1: {
        atrybuty_glowne: {
          typ: 'wybor',
          ilosc: 2,
          wartosc: 1,
          dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola']
        },
        zdrowie: '+5',
        jezyki_profesje: {
          typ: 'tylko_profesja',
          kategorie: ['pospolite', 'wojenne', 'koczownicze'],
          opis: 'Zyskujesz jedną profesję pospolitą, wojenną lub koczowniczą.'
        },
        talenty: ['Chwila wytchnienia', 'Wyszkolenie w walce']
      },
      poziom_2: {
        zdrowie: '+5',
        talenty: ['Sprawność bojowa', 'Potężne uderzenie']
      },
      poziom_5: {
        obrona: '+1',
        zdrowie: '+5',
        talenty: ['Doświadczenie bojowe']
      },
      poziom_8: {
        zdrowie: '+5',
        talenty: ['Wytrwałość', 'Mistrzostwo bojowe']
      },
      strona_zrodlowa: 56
    },

    // === Zrodzeni do Walki (ZDW) - warianty ścieżki Wojownika ===
    // Dodatek "Bred for Battle" (Paths of Shadow) nie ma polskiego wydania,
    // więc poniższe ścieżki to tłumaczenie własne. UI oznacza je etykietą
    // "beta" na podstawie samego kodu źródła (BETA_SOURCES w script.js) -
    // nie ma tu osobnej flagi, żeby nie trzymać tej informacji w dwóch
    // miejscach. Każda z tych ścieżek zastępuje standardowego Wojownika,
    // a nie uzupełnia go.

    giermek: {
      id: 'giermek',
      nazwa: 'Giermek',
      zrodlo: 'ZDW',
      opis: 'Wojownik wyszkolony przez rycerza - walczy kopią i mieczem, a w boju polega na wierzchowcu.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['wojenne'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję giermka.'
        },
        ekwipunek: 'Koń bojowy.',
        talenty: ['Ogłada', 'Wyszkolenie rycerskie', 'Odnowa w siodle']
      },
      poziom_2: {
        zdrowie: '+4',
        talenty: ['Sprawność bojowa', 'Waleczne uderzenie']
      },
      poziom_5: {
        obrona: '+1',
        zdrowie: '+4',
        talenty: ['Biegłość w zbroi', 'Doświadczenie jeździeckie']
      },
      poziom_8: {
        zdrowie: '+4',
        talenty: ['Udoskonalona odnowa w siodle', 'Mistrzostwo jeździeckie']
      },
      strona_zrodlowa: 4
    },

    barbarzynca: {
      id: 'barbarzynca',
      nazwa: 'Barbarzyńca',
      zrodlo: 'ZDW',
      opis: 'Dzikus z rubieży cywilizacji, który walczy instynktem i wściekłością zamiast wyuczonej techniki.',
      poziom_1: {
        mod_atrybuty: { sila: 1, zrecznosc: 1 },
        zdrowie: '+6',
        jezyki_profesje: {
          typ: 'tylko_profesja',
          kategorie: ['koczownicze'],
          opis: 'Zyskujesz wybraną przez siebie profesję koczowniczą.'
        },
        ekwipunek: 'Wybrana prosta broń biała.',
        talenty: ['Barbarzyńskie wyszkolenie w walce', 'Zmysł walki', 'Wściekła odnowa']
      },
      poziom_2: {
        zdrowie: '+6',
        talenty: ['Sprawność bojowa', 'Miażdżące uderzenie']
      },
      poziom_5: {
        zdrowie: '+6',
        talenty: ['Doświadczenie bojowe', 'Udoskonalony zmysł walki']
      },
      poziom_8: {
        zdrowie: '+6',
        talenty: ['Mistrzostwo bojowe', 'Udoskonalona wściekła odnowa']
      },
      strona_zrodlowa: 5
    },

    charakternik: {
      id: 'charakternik',
      nazwa: 'Charakternik',
      zrodlo: 'ZDW',
      opis: 'Weteran krwawych aren i jam walki, który przetrwał tam, gdzie inni ginęli dla rozrywki tłumu.',
      poziom_1: {
        mod_atrybuty: { sila: 1, zrecznosc: 1 },
        zdrowie: '+5',
        ekwipunek: 'Wybrana wojskowa broń biała.',
        talenty: ['Brutalna odnowa', 'Wyszkolenie w walce']
      },
      poziom_2: {
        zdrowie: '+5',
        talenty: ['Sprawność bojowa', 'Okrutne uderzenie']
      },
      poziom_5: {
        zdrowie: '+5',
        talenty: ['Doświadczenie bojowe', 'Nieustępliwy zabójca']
      },
      poziom_8: {
        zdrowie: '+5',
        talenty: ['Udoskonalona odnowa', 'Mistrzostwo bojowe']
      },
      strona_zrodlowa: 7
    },

    siepacz: {
      id: 'siepacz',
      nazwa: 'Siepacz',
      zrodlo: 'ZDW',
      opis: 'Zbir, dla którego strach i ból są bronią równie dobrą jak stal - groźbę zawsze wciela w czyn.',
      poziom_1: {
        mod_atrybuty: { sila: 1, wola: 1 },
        zdrowie: '+5',
        jezyki_profesje: {
          typ: 'tylko_profesja',
          kategorie: ['przestepcze'],
          opis: 'Zyskujesz wybraną przez siebie profesję przestępczą.'
        },
        ekwipunek: 'Wybrana wojskowa broń biała.',
        talenty: ['Chwila wytchnienia', 'Zastraszenie', 'Łamacz ducha']
      },
      poziom_2: {
        zdrowie: '+5',
        talenty: ['Najokrutniejsze uderzenie', 'Groźne uderzenie']
      },
      poziom_5: {
        zdrowie: '+5',
        talenty: ['Okrutny napór']
      },
      poziom_8: {
        zdrowie: '+5',
        talenty: ['Wytrwałość', 'Sól na ranę']
      },
      strona_zrodlowa: 7
    },

    szermierz: {
      id: 'szermierz',
      nazwa: 'Szermierz',
      zrodlo: 'ZDW',
      opis: 'Wojownik stawiający na szybkość i precyzję - tnie z wielu stron i nie daje się dosięgnąć.',
      poziom_1: {
        mod_atrybuty: { zrecznosc: 1, intelekt: 1 },
        zdrowie: '+4',
        ekwipunek: 'Wybrana szybka broń biała.',
        talenty: ['Wyszkolenie w broni finezyjnej', 'Szybka odnowa']
      },
      poziom_2: {
        zdrowie: '+4',
        talenty: ['Zabójcza precyzja', 'Błyskawiczne uderzenie']
      },
      poziom_5: {
        zdrowie: '+4',
        talenty: ['Doświadczenie bojowe', 'Brawurowa obrona']
      },
      poziom_8: {
        zdrowie: '+4',
        talenty: ['Mistrzostwo bojowe', 'Błyskawiczna odnowa']
      },
      strona_zrodlowa: 9
    },

    mysliwy: {
      id: 'mysliwy',
      nazwa: 'Myśliwy',
      zrodlo: 'ZDW',
      opis: 'Tropiciel, który potrafi odnaleźć zwierzynę i zdjąć ją z dystansu, nim zdąży go zauważyć.',
      poziom_1: {
        mod_atrybuty: { zrecznosc: 1, intelekt: 1 },
        percepcja: '+1',
        zdrowie: '+4',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['koczownicze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję myśliwego.'
        },
        ekwipunek: 'Łuk i kołczan z 30 strzałami.',
        talenty: ['Wyszkolenie łowieckie', 'Szybka odnowa', 'Ukradkowość']
      },
      poziom_2: {
        zdrowie: '+4',
        talenty: ['Krwawiące uderzenie', 'Sprawność bojowa']
      },
      poziom_5: {
        zdrowie: '+4',
        predkosc: '+2',
        talenty: ['Doświadczenie łowieckie']
      },
      poziom_8: {
        zdrowie: '+4',
        talenty: ['Błyskawiczna odnowa', 'Mistrzostwo łowieckie']
      },
      strona_zrodlowa: 11
    },

    mnich: {
      id: 'mnich',
      nazwa: 'Mnich',
      zrodlo: 'ZDW',
      opis: 'Klasztorny asceta, który przez lata ćwiczeń uczynił z własnych pięści i stóp żywą broń.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        predkosc: '+2',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję naukową: filozofię lub religię.'
        },
        talenty: ['Obronna odnowa', 'Sztuki walki', 'Wyszkolenie w walce bez broni', 'Obrona bez zbroi']
      },
      poziom_2: {
        zdrowie: '+4',
        talenty: ['Ogłuszające uderzenie', 'Sprawność w walce bez broni']
      },
      poziom_5: {
        zdrowie: '+4',
        predkosc: '+2',
        talenty: ['Doświadczenie w walce bez broni']
      },
      poziom_8: {
        zdrowie: '+4',
        talenty: ['Udoskonalona obronna odnowa', 'Mistrzostwo w walce bez broni']
      },
      strona_zrodlowa: 12
    },

    zolnierz: {
      id: 'zolnierz',
      nazwa: 'Żołnierz',
      zrodlo: 'ZDW',
      opis: 'Karny wojak wyszkolony do walki w szyku - trzyma linię i pilnuje pleców towarzyszy.',
      poziom_1: {
        mod_atrybuty: { sila: 1, wola: 1 },
        zdrowie: '+5',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['wojenne'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję żołnierza.'
        },
        ekwipunek: 'Zbroja średnia, mundur i włócznia.',
        talenty: ['Wspólna odnowa', 'Wyszkolenie w walce']
      },
      poziom_2: {
        zdrowie: '+5',
        talenty: ['Sprawność bojowa', 'Taktyczne uderzenie']
      },
      poziom_5: {
        zdrowie: '+5',
        talenty: ['Doświadczenie bojowe', 'Walka w szyku']
      },
      poziom_8: {
        zdrowie: '+5',
        talenty: ['Okrzyk bojowy', 'Mistrzostwo bojowe']
      },
      strona_zrodlowa: 13
    },

    straznik_magii: {
      id: 'straznik_magii',
      nazwa: 'Strażnik magii',
      zrodlo: 'ZDW',
      opis: 'Wojownik, który równolegle ćwiczył fechtunek i sztukę zaklęć, łącząc oręż z magią.',
      poziom_1: {
        // Dodatek wymaga pary wyborów: Siła ALBO Zręczność +1, a potem Intelekt
        // ALBO Wola +1. Model danych nie wyraża par, więc zapisane jako dwa
        // swobodne punkty - gracz powinien trzymać się podziału z podręcznika.
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję naukową: magię lub religię.'
        },
        ekwipunek: 'Różdżka lub inny przedmiot służący za narzędzie magiczne.',
        magia: [
          { typ: 'tradycja', kategoria: ['dowolna'] },
          { typ: 'zaklecie', ilosc: 2 }
        ],
        talenty: ['Odzyskanie zaklęcia', 'Wyszkolenie w walce']
      },
      poziom_2: {
        zdrowie: '+3',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Sprawność bojowa', 'Uderzenie strażnika']
      },
      poziom_5: {
        zdrowie: '+3',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Doświadczenie strażnika magii']
      },
      poziom_8: {
        zdrowie: '+3',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Mistrzostwo strażnika magii']
      },
      strona_zrodlowa: 15
    },

    weteran: {
      id: 'weteran',
      nazwa: 'Weteran',
      zrodlo: 'ZDW',
      opis: 'Ogrzany w bojach najemnik bez złudzeń co do walki - robi swoje i robi to dobrze.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: {
          typ: 'tylko_profesja',
          kategorie: ['pospolite', 'wojenne', 'koczownicze'],
          opis: 'Zyskujesz jedną profesję pospolitą, wojenną lub koczowniczą.'
        },
        ekwipunek: 'Zbroja średnia i wybrana wojskowa broń biała.',
        talenty: ['Chwila wytchnienia', 'Wyszkolenie w walce']
      },
      poziom_2: {
        zdrowie: '+5',
        talenty: ['Sprawność bojowa', 'Potężne uderzenie']
      },
      poziom_5: {
        obrona: '+1',
        zdrowie: '+5',
        talenty: ['Doświadczenie bojowe']
      },
      poziom_8: {
        zdrowie: '+5',
        talenty: ['Wytrwałość', 'Mistrzostwo bojowe']
      },
      strona_zrodlowa: 16
    },

    // === Potomkowie Zdrajcy (PZ) - dodatek "Scions of the Betrayer" ===
    // Brak polskiego wydania: tłumaczenie własne, oznaczane w UI etykietą
    // "beta" na podstawie kodu źródła (BETA_SOURCES w script.js).
    sluga_diabla: {
      id: 'sluga_diabla',
      nazwa: 'Sługa Diabła',
      zrodlo: 'PZ',
      opis: 'Kapłan kultu Diabła, który leczy i wspiera sojuszników, kusząc ich splugawieniem.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        splugawienie: '+1',
        jezyki_profesje: {
          typ: 'oba',
          kategorie: ['przestepcze'],
          opis: 'Zyskujesz profesję kultysty (a jeśli już ją masz - inną profesję). Dodatkowo albo uczysz się czytać w znanym już sobie języku, albo poznajesz nowy język mówiony.'
        },
        magia: [
          { typ: 'tradycja', kategoria: ['uroki', 'ogien', 'magia_cienia'] },
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['uroki', 'ogien', 'magia_cienia'], ilosc: 2 }
        ],
        talenty: ['Kusząca odnowa']
      },
      poziom_2: {
        zdrowie: '+4',
        splugawienie: '+1',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['uroki', 'ogien', 'magia_cienia'], ilosc: 2 }
        ],
        talenty: ['Diabelska modlitwa']
      },
      poziom_5: {
        zdrowie: '+4',
        moc: '+1',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['uroki', 'ogien', 'magia_cienia'], ilosc: 1 }
        ],
        talenty: ['Diabelskie uderzenie']
      },
      poziom_8: {
        zdrowie: '+4',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['uroki', 'ogien', 'magia_cienia'], ilosc: 1 }
        ],
        talenty: ['Nagroda Diabła', 'Wielka pokusa']
      },
      strona_zrodlowa: 19
    },

    // === Urodzeni Łotrzykowie (UŁ) - dodatek "Natural Born Scoundrels" ===
    // Tłumaczenie własne, oznaczane w UI etykietą "beta" (BETA_SOURCES).
    // Dodatek podaje własną, przerobioną wersję ścieżki Łotra - zastępuje ona
    // Łotra z PG, a nie uzupełnia go, stąd osobna nazwa.
    hultaj: {
      id: 'hultaj',
      nazwa: 'Hultaj',
      zrodlo: 'UŁ',
      opis: 'Przerobiona wersja Łotra - zamiast sztywnych talentów dostaje Krętactwo i wybór specjalności łotrzykowskiej.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['pospolite', 'przestepcze', 'koczownicze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję pospolitą, przestępczą lub koczowniczą.'
        },
        ekwipunek: 'Wojskowa albo szybka broń biała oraz jedno z: zestaw do charakteryzacji, wytworne ubranie, narzędzie magiczne, wytrychy, zestaw narzędzi albo zwój z zaklęciem kręgu 0.',
        talenty: ['Szybka odnowa', 'Krętactwo']
      },
      poziom_2: {
        zdrowie: '+3',
        talenty: ['Wykorzystanie okazji'],
        talenty_do_wyboru: { pula: 'lotrzykowskie', ilosc: 1 }
      },
      poziom_5: {
        zdrowie: '+3',
        talenty: ['Brudne zagrania', 'Łotrzykowski spryt']
      },
      poziom_8: {
        zdrowie: '+3',
        talenty_do_wyboru: { pula: 'lotrzykowskie', ilosc: 1 }
      },
      strona_zrodlowa: 5
    }
  },

  // Ścieżki eksperckie (poziom 3) - PG rozdział 4, 16 ścieżek w 4 kategoriach
  sciezki_ekspertow: {
    // Chwalebna Śmierć str. 9-10
    moloch: {
      id: 'moloch',
      nazwa: 'Moloch',
      zrodlo: 'CS',
      opis: 'Wojownik, który miażdży wrogów gołymi pięściami, wykorzystując potężny rozmiar i siłę.',
      poziom_1: {
        // PG-owy zapis "Zwiększ Siłę o 1 i jeden inny atrybut o 1": jedna
        // podwyżka jest wymuszona, druga do wyboru gracza.
        mod_atrybuty: { sila: 1 },
        atrybuty_glowne: { typ: 'wybor', ilosc: 1, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+6',
        talenty: ['Potężne pięści', 'Niepowstrzymany']
      },
      poziom_6: {
        zdrowie: '+6',
        talenty: ['Mój wróg moją bronią']
      },
      poziom_9: {
        zdrowie: '+6',
        talenty: ['To wcale nie boli']
      },
      strona_zrodlowa: 9
    },

    berserker: {
      id: 'berserker',
      nazwa: 'Berserker',
      opis: 'Wojownik ogarnięty gniewem, wpadający w berserk podczas walki.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+6',
        talenty: ['Berserk', 'Żelazna skóra']
      },
      poziom_6: {
        zdrowie: '+6',
        talenty: ['Dziki szał', 'Przerażający szał']
      },
      poziom_9: {
        zdrowie: '+6',
        talenty: ['Uderzenie na oślep']
      },
      strona_zrodlowa: 64
    },

    czarnoksiężnik: {
      id: 'czarnoksiężnik',
      nazwa: 'Czarnoksiężnik',
      opis: 'Złodziej magii, potrafiący wydzierać zaklęcia z cudzych umysłów.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['przestepcze'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję przestępczą.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Kradzież zaklęcia', 'Zniknięcie']
      },
      poziom_6: {
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+2', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Mistrz kradzieży zaklęć', 'Przesunięcie']
      },
      strona_zrodlowa: 65
    },

    czarodziej: {
      id: 'czarodziej',
      nazwa: 'Czarodziej',
      opis: 'Naukowiec wśród magików, gromadzący wiedzę w grymuarach.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję naukową.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Grymuar']
      },
      poziom_6: {
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+2', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Mistrzostwo w magii']
      },
      strona_zrodlowa: 66
    },

    czarownik: {
      id: 'czarownik',
      nazwa: 'Czarownik',
      opis: 'Włada niesamowitymi pokładami magicznej energii kosztem ryzyka.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Czarownictwo', 'Eksplozja mocy']
      },
      poziom_6: {
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+2', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Wyzwolenie mocy']
      },
      strona_zrodlowa: 67
    },

    druid: {
      id: 'druid',
      nazwa: 'Druid',
      opis: 'Zaprzysiężony sługa natury, władający jej pradawnymi tajemnicami.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['religijne', 'koczownicze'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję religijną lub koczowniczą.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['zycie', 'natura', 'magia_pierwotna'], ilosc: 1 },
        talenty: ['Tajemnice druidów']
      },
      poziom_6: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+4', moc: '+1',
        magia: { typ: 'zaklecie', ilosc: 1 },
        talenty: ['Odporność na żywioły']
      },
      strona_zrodlowa: 68
    },

    kaplan: {
      id: 'kaplan',
      nazwa: 'Kapłan',
      opis: 'Religijny lider zapewniający duchowe przewodnictwo.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe', 'religijne'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję naukową lub religijną.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['religijne'], ilosc: 1 },
        talenty: ['Niezłomny', 'Symbol wiary']
      },
      poziom_6: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+4', moc: '+1',
        magia: { typ: 'zaklecie', ilosc: 1 },
        talenty: ['Boska moc']
      },
      strona_zrodlowa: 69
    },

    lowca: {
      id: 'lowca',
      nazwa: 'Łowca',
      opis: 'Tropiciel i myśliwy, niezrównany w wyśledzeniu zdobyczy.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+8',
        percepcja: '+1',
        jezyki_profesje: {
          typ: 'tylko_profesja',
          kategorie: ['koczownicze'],
          opis: 'Wybierz dodatkową profesję koczowniczą.'
        },
        talenty: ['Czujność', 'Polowanie', 'Tajniki natury']
      },
      poziom_6: {
        zdrowie: '+4',
        talenty: ['Wprawny przewodnik', 'Wprawny tropiciel']
      },
      poziom_9: {
        zdrowie: '+4',
        talenty: ['Niezrównany myśliwy', 'Nieubłagany pościg']
      },
      strona_zrodlowa: 70
    },

    paladyn: {
      id: 'paladyn',
      nazwa: 'Paladyn',
      opis: 'Wojownik łączący siłę fizyczną z mocą bożą.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['religijne'], ilosc: 1 },
        talenty: ['Boskie powołanie', 'Boskie porażenie', 'Uzdrawiająca wiara']
      },
      poziom_6: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+4', moc: '+1',
        magia: { typ: 'zaklecie', ilosc: 1 },
        talenty: ['Święty blask']
      },
      strona_zrodlowa: 71
    },

    skrytobojca: {
      id: 'skrytobojca',
      nazwa: 'Skrytobójca',
      opis: 'Do perfekcji opanował sztukę zabijania z zaskoczenia.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1', zdrowie: '+3',
        jezyki_profesje: { typ: 'wybor', kategorie: ['pospolite', 'przestepcze'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję pospolitą lub przestępczą.' },
        talenty: ['Skrytobójstwo', 'Wprawna charakteryzacja', 'Dobry refleks']
      },
      poziom_6: {
        zdrowie: '+3',
        talenty: ['Przygotowanie trucizny']
      },
      poziom_9: {
        zdrowie: '+3',
        talenty: ['Oko zabójcy']
      },
      strona_zrodlowa: 72
    },

    wiedzma: {
      id: 'wiedzma',
      nazwa: 'Wiedźma',
      opis: 'Władczyni starej magii, nauczonej dawno temu od Pięknego Ludu.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe', 'pospolite', 'koczownicze'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję naukową, pospolitą lub koczowniczą.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Wsparcie', 'Wiedźmi ogień']
      },
      poziom_6: {
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+2', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Trwała więź']
      },
      strona_zrodlowa: 73
    },

    wynalazca: {
      id: 'wynalazca',
      nazwa: 'Wynalazca',
      opis: 'Łączy naukę i magię, konstruując mechaniczne osobliwości.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe'],
          opis: 'Uczysz się mówić nowym językiem lub zyskujesz jedną profesję naukową.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Sakwa wynalazcy']
      },
      poziom_6: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+2', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Mechaniczni słudzy']
      },
      strona_zrodlowa: 74
    },

    wyrocznia: {
      id: 'wyrocznia',
      nazwa: 'Wyrocznia',
      opis: 'Nawiedzona przez nadprzyrodzoną istotę, przemawiającą przez jej ciało.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['dowolna'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['religijne'], ilosc: 1 },
        talenty: ['Boska ekstaza']
      },
      poziom_6: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+3', moc: '+1',
        magia: { typ: 'zaklecie', ilosc: 1 },
        talenty: ['Awatar']
      },
      strona_zrodlowa: 75
    },

    zaklinacz: {
      id: 'zaklinacz',
      nazwa: 'Zaklinacz',
      opis: 'Nasyca oręż magiczną mocą przy użyciu zaklętej broni.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: []
      },
      poziom_6: {
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
      },
      poziom_9: {
        zdrowie: '+3', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Magiczna broń', 'Poświęcenie']
      },
      strona_zrodlowa: 76
    },

    zbrojny: {
      id: 'zbrojny',
      nazwa: 'Zbrojny',
      opis: 'Wszechstronny wojownik, dla którego wszystko jest bronią.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['dowolna'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.'
        },
        talenty: ['Wszystko jest bronią', 'Talent zbrojnego']
      },
      poziom_6: {
        zdrowie: '+5',
        talenty: ['Wytrzymałość', 'Talent zbrojnego']
      },
      poziom_9: {
        obrona: '+1', zdrowie: '+5',
        talenty: ['Zahartowany', 'Mistrz oręża', 'Siarczyste uderzenie', 'Precyzyjny atak', 'Sprawne przeładowanie', 'Szybkostrzelność', 'Grzmotnięcie tarczą', 'Uderzenie trzonkiem', 'Walka dwiema broniami']
      },
      strona_zrodlowa: 77
    },

    zlodziej: {
      id: 'zlodziej',
      nazwa: 'Złodziej',
      opis: 'Zręczny kieszonkowiec, specjalista od zamków i pułapek.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1',
        zdrowie: '+3',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['przestepcze'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję przestępczą.'
        },
        talenty: ['Dobry refleks', 'Złodziejski talent']
      },
      poziom_6: {
        percepcja: '+1', zdrowie: '+3',
        talenty: ['Unik', 'Złodziejski talent']
      },
      poziom_9: {
        zdrowie: '+3',
        talenty: ['Oportunizm', 'Złodziejski talent', 'Bezszelestny ruch', 'Kradzież kieszonkowa', 'Mistrz ucieczek', 'Otwieranie zamków', 'Ukrycie w cieniu', 'Wykrycie pułapek', 'Wyostrzone zmysły', 'Zręczna wspinaczka']
      },
      strona_zrodlowa: 78
    },

    zwiadowca: {
      id: 'zwiadowca',
      nazwa: 'Zwiadowca',
      opis: 'Zbiera informacje dla sojuszników, wyśmienicie tropiąc dziczy.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1',
        zdrowie: '+3',
        predkosc: '+2',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['koczownicze'],
          opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję koczowniczą.'
        },
        talenty: ['Czujność', 'Przednia straż', 'Dobry refleks', 'Bez śladu']
      },
      poziom_6: {
        zdrowie: '+3',
        talenty: ['Słaby punkt']
      },
      poziom_9: {
        talenty: ['Cios poniżej pasa']
      },
      strona_zrodlowa: 79
    },

    // === Potomkowie Zdrajcy (PZ) - dodatek "Scions of the Betrayer" ===
    // Tłumaczenie własne, oznaczane w UI etykietą "beta" (BETA_SOURCES).
    kusiciel: {
      id: 'kusiciel',
      nazwa: 'Kusiciel',
      zrodlo: 'PZ',
      opis: 'Sługa Diabła, który wabi śmiertelników darami i obietnicami, wiodąc ich ku potępieniu.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        splugawienie: '+1',
        jezyki_profesje: {
          typ: 'tylko_profesja',
          kategorie: ['religijne'],
          opis: 'Zyskujesz profesję czciciela. Jeśli już ją masz, zyskujesz losową profesję przestępczą.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['uroki', 'ogien', 'magia_cienia'], ilosc: 1 }
        ],
        talenty: ['Wysłannik Piekła', 'Złotousty', 'Zasłona niewinności']
      },
      poziom_6: {
        zdrowie: '+4',
        splugawienie: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Skalany dar']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        splugawienie: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Wyznawca ciemności']
      },
      strona_zrodlowa: 21
    },

    // === Urodzeni Łotrzykowie (UŁ) - dodatek "Natural Born Scoundrels" ===
    // Tłumaczenie własne, oznaczane w UI etykietą "beta" (BETA_SOURCES).
    zagonczyk: {
      id: 'zagonczyk',
      nazwa: 'Zagończyk',
      zrodlo: 'UŁ',
      opis: 'Uderza szybko i znienacka - podchodzi niepostrzeżenie, sieje zamęt i wycofuje się, nim wróg zdąży się zebrać.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        predkosc: '+2',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['wojenne'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję wojenną.'
        },
        talenty: ['Brutalne natarcie', 'Szybki refleks']
      },
      poziom_6: {
        zdrowie: '+3',
        talenty: ['Cichy podchód']
      },
      poziom_9: {
        zdrowie: '+4',
        talenty: ['Udoskonalone brutalne natarcie']
      },
      strona_zrodlowa: 14
    },

    emisariusz: {
      id: 'emisariusz',
      nazwa: 'Emisariusz',
      zrodlo: 'UŁ',
      opis: 'Agent swojej religii, który w trudnej chwili spala zaklęcie, by zamienić wiarę w szybkość i celność.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['religijne'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję religijną.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['religijne'], ilosc: 1 }
        ],
        talenty: ['Wezwanie']
      },
      poziom_6: {
        zdrowie: '+2',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Niezachwiane oddanie']
      },
      poziom_9: {
        zdrowie: '+2',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Błogosławione skrzydła']
      },
      strona_zrodlowa: 15
    },

    rzezimieszek: {
      id: 'rzezimieszek',
      nazwa: 'Rzezimieszek',
      zrodlo: 'UŁ',
      opis: 'Zbir z półświatka, który bierze przewagę zastraszeniem i dobija tych, którym strach odebrał rezon.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['przestepcze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję przestępczą.'
        },
        talenty: ['Dręczyciel', 'Pospieszny odwrót', 'Groźna postawa']
      },
      poziom_6: {
        zdrowie: '+4',
        talenty: ['Terroryzowanie']
      },
      poziom_9: {
        zdrowie: '+4',
        talenty: ['Budząca grozę napaść']
      },
      strona_zrodlowa: 17
    },

    maska: {
      id: 'maska',
      nazwa: 'Maska',
      zrodlo: 'UŁ',
      opis: 'Szpieg, który zmienia twarz równie łatwo jak ubranie i wchodzi tam, gdzie nikt go nie wpuści.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['przestepcze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję przestępczą.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
        ],
        talenty: ['Stań się kimkolwiek', 'Szybki refleks']
      },
      poziom_6: {
        zdrowie: '+2',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Zmiana głosu', 'Biegły naśladowca']
      },
      poziom_9: {
        zdrowie: '+2',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Trwałe przebranie', 'Błyskawiczne przebranie', 'Niespodziewana zdrada']
      },
      strona_zrodlowa: 17
    },

    spiskowiec: {
      id: 'spiskowiec',
      nazwa: 'Spiskowiec',
      zrodlo: 'UŁ',
      opis: 'Siedzi w centrum siatki wpływów i posyła w niebezpieczeństwo swoich agentów zamiast siebie.',
      // Ścieżka jest nietypowa: w całości opiera się na prowadzeniu trzech
      // agentów (osobnych postaci), bazie i funduszach, a nie na premiach do
      // karty postaci - dlatego nie przyznaje Zdrowia ani Mocy. Kreator nie
      // modeluje postaci agentów; ich stworzenie trzeba ustalić przy stole.
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['dowolna'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną dowolną profesję.'
        },
        talenty: ['Agenci', 'Baza operacyjna', 'Finansowanie']
      },
      poziom_6: {
        talenty: ['Ukryci współpracownicy', 'Gruntowne przygotowania']
      },
      poziom_9: {
        talenty: ['Plan w planie']
      },
      strona_zrodlowa: 18
    },

    majster: {
      id: 'majster',
      nazwa: 'Majster',
      zrodlo: 'UŁ',
      opis: 'Z części, narzędzi i odrobiny Technomancji składa zaczarowane urządzenia o nieprzewidywalnych właściwościach.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję naukową.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'technomancja', ilosc: 1 }
        ],
        talenty: ['Drobiazgi i szpargały', 'Cudowne urządzenia']
      },
      poziom_6: {
        zdrowie: '+2',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Mistrzowskie majsterkowanie']
      },
      poziom_9: {
        zdrowie: '+2',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Doskonalsze urządzenia']
      },
      strona_zrodlowa: 20
    },

    // === Powołani do Służby (PS) - dodatek "Called to Serve" ===
    // Tłumaczenie własne, oznaczane w UI etykietą "beta" (BETA_SOURCES).
    // Dodatek powtarza też ścieżkę nowicjusza Kapłana z PG - pominięta, bo
    // mechanicznie pokrywa się z istniejącym Klerykiem.
    kronikarz: {
      id: 'kronikarz',
      nazwa: 'Kronikarz',
      zrodlo: 'PS',
      opis: 'Krasnoludzki strażnik pamięci przodków - dzieje swojego ludu nosi wypisane runami na własnej skórze.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'tylko_profesja',
          kategorie: ['naukowe'],
          opis: 'Zyskujesz profesję naukową: historię. Jeśli już ją masz, zyskujesz inną profesję naukową.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['magia_bitewna', 'zycie', 'magia_runiczna'], ilosc: 1 }
        ],
        talenty: ['Niezawodna pamięć', 'Runiczne pismo']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Runiczna moc']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Błyskawiczna runiczna moc']
      },
      strona_zrodlowa: 9
    },

    krzyzowiec: {
      id: 'krzyzowiec',
      nazwa: 'Krzyżowiec',
      zrodlo: 'PS',
      opis: 'Zbrojne ramię swojej wiary - im gorliwiej się modli, tym celniej uderza.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['wojenne'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję wojenną.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['magia_niebianska', 'zycie', 'teurgia'], ilosc: 1 }
        ],
        talenty: ['Furia wiary', 'Wsparcie wiary']
      },
      poziom_6: {
        zdrowie: '+5',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Tarcza Boga']
      },
      poziom_9: {
        zdrowie: '+5',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Wezwanie do broni']
      },
      strona_zrodlowa: 10
    },

    cora_ksiezyca: {
      id: 'cora_ksiezyca',
      nazwa: 'Córa Księżyca',
      zrodlo: 'PS',
      opis: 'Kapłanka księżycowego kultu, która splata ze sobą zaklęcia i odbija cudzą magię.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję naukową.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['sztuki_tajemne', 'magia_niebianska', 'czas'], ilosc: 1 }
        ],
        talenty: ['Przenikanie magii']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Sekrety magii']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Błogosławieństwo Dziewicy']
      },
      strona_zrodlowa: 11
    },

    opiekun: {
      id: 'opiekun',
      nazwa: 'Opiekun',
      zrodlo: 'PS',
      opis: 'Strażnik dzikich ostępów Starej Wiary, który przybiera zwierzęcą postać.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['koczownicze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję koczowniczą.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['zycie', 'natura', 'magia_pierwotna'], ilosc: 1 }
        ],
        talenty: ['Zmiana kształtu']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Trwała przemiana']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Udoskonalona zmiana kształtu', 'Krzepiąca przemiana']
      },
      strona_zrodlowa: 12
    },

    swieta_matrona: {
      id: 'swieta_matrona',
      nazwa: 'Święta Matrona',
      zrodlo: 'PS',
      opis: 'Najstarsza i najpobożniejsza z kultu Matki Świata - leczy dotykiem i zdejmuje klątwy.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['pospolite', 'koczownicze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję rolnika, zbieracza, uzdrowiciela, nomady lub pioniera.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['ziemia', 'zycie', 'natura'], ilosc: 1 }
        ],
        talenty: ['Dłoń Córki']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Dłoń Matki']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Korona Staruchy']
      },
      strona_zrodlowa: 13
    },

    rogaty: {
      id: 'rogaty',
      nazwa: 'Rogaty',
      zrodlo: 'PS',
      opis: 'Kapłan Rogatego Króla - zwierzęta idą za nim, a dzikość wzmacnia jego ciosy.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['koczownicze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję koczowniczą.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['magia_pierwotna', 'spirytyzm', 'transformacja'], ilosc: 1 }
        ],
        talenty: ['Przyjaciel zwierząt', 'Wzmocnione zwierzęta', 'Ukradkowość']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Moc Rogatego Króla']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Niewidzialny dla zwierząt']
      },
      strona_zrodlowa: 14
    },

    apostol_lodu: {
      id: 'apostol_lodu',
      nazwa: 'Apostoł Lodu',
      zrodlo: 'PS',
      opis: 'Głosiciel kultu zimy z Pustkowi - mróz go nie tyka, a jego oręż skuwa wrogów chłodem.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['magia_bitewna', 'magia_burzy', 'woda'], ilosc: 1 }
        ],
        talenty: ['Dar Anemoi', 'Tarcza zimy']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Oręż szronu']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Nienawiść zimy']
      },
      strona_zrodlowa: 15
    },

    sedzia: {
      id: 'sedzia',
      nazwa: 'Sędzia',
      zrodlo: 'PS',
      opis: 'Wysłannik prawa bogów, który przeklina winnych i ściąga na nich karę.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję naukową.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['klatwy', 'jasnowidzenie', 'telepatia'], ilosc: 1 }
        ],
        talenty: ['Słowo Jasnowidza']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Wydanie wyroku']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Brzemię winy']
      },
      strona_zrodlowa: 17
    },

    zloczynca: {
      id: 'zloczynca',
      nazwa: 'Złoczyńca',
      zrodlo: 'PS',
      opis: 'Sługa Mrocznych Bogów, który rzuca klątwy przez kukły i zabiera wrogów ze sobą, gdy ginie.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        splugawienie: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['przestepcze'],
          opis: 'Uczysz się mowy mrocznej. Jeśli już ją znasz, uczysz się innego języka albo zyskujesz dowolną profesję.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['klatwy', 'uroki'], ilosc: 1 }
        ],
        talenty: ['Gorzki koniec', 'Złośliwość', 'Skaza nikczemności']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Upiorna kukła']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Związanie sługi']
      },
      strona_zrodlowa: 18
    },

    hulaka: {
      id: 'hulaka',
      nazwa: 'Hulaka',
      zrodlo: 'PS',
      opis: 'Wyznawca Roześmianego Boga - im bardziej pijany i szalony, tym groźniejszy.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['przestepcze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję pijaka.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['uroki', 'magia_fey', 'iluzja'], ilosc: 1 }
        ],
        talenty: ['Pijacka jasność', 'Szaleństwo hulanki']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Rozpalenie szału']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Opieka hulanki']
      },
      strona_zrodlowa: 19
    },

    pustoszyciel: {
      id: 'pustoszyciel',
      nazwa: 'Pustoszyciel',
      zrodlo: 'PS',
      opis: 'Nagi w boju fanatyk zniszczenia, który spala zaklęcia na ciosy i chętnie oddaje rozum za furię.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['wojenne', 'koczownicze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję wojenną lub koczowniczą.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['magia_bitewna', 'zniszczenie', 'magia_runiczna'], ilosc: 1 }
        ],
        talenty: ['Zbroja dla tchórzy', 'Mroczna dzikość']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Aura zniszczenia']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Boska furia']
      },
      strona_zrodlowa: 21
    },

    zalobnik: {
      id: 'zalobnik',
      nazwa: 'Żałobnik',
      zrodlo: 'PS',
      opis: 'Kapłan śmierci, który chodzi w cieniu i sam wymyka się zgonowi.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['religijne'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję religijną.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['smierc', 'ochrona', 'magia_cienia'], ilosc: 1 }
        ],
        talenty: ['Wybraniec Śmierci', 'Ukojenie zmarłych']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Dłoń Śmierci']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Ocalony od śmierci']
      },
      strona_zrodlowa: 22
    },

    dziecie_lata: {
      id: 'dziecie_lata',
      nazwa: 'Dziecię Lata',
      zrodlo: 'PS',
      opis: 'Naczynie Letniej Królowej - włosy zmienia w ogień, a wrogów w zauroczonych wielbicieli.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['pospolite'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz profesję artysty.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['uroki', 'magia_fey', 'ogien'], ilosc: 1 }
        ],
        talenty: ['Mylący urok']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Płomienie namiętności']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Płomienie lata']
      },
      strona_zrodlowa: 23
    },

    madrosc: {
      id: 'madrosc',
      nazwa: 'Mądrość',
      zrodlo: 'PS',
      opis: 'Wiejska zielarka i doradczyni Pana i Pani - warzy mikstury i użycza swojej mądrości innym.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 2, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        moc: '+1',
        jezyki_profesje: {
          typ: 'wybor',
          kategorie: ['naukowe', 'pospolite', 'religijne', 'koczownicze'],
          opis: 'Uczysz się mówić nowym językiem albo zyskujesz jedną profesję naukową, pospolitą, religijną lub koczowniczą.'
        },
        magia: [
          { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['jasnowidzenie', 'zycie'], ilosc: 1 }
        ],
        talenty: ['Warzenie ziół', 'Oddanie Światłu']
      },
      poziom_6: {
        zdrowie: '+4',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Obdarzenie mądrością']
      },
      poziom_9: {
        zdrowie: '+4',
        moc: '+1',
        magia: [{ typ: 'zaklecie', ilosc: 1 }],
        talenty: ['Wezwanie Pana i Pani']
      },
      strona_zrodlowa: 26
    }
  },

  // Ścieżki mistrzowskie (poziom 7) - PG rozdział 5, 64 ścieżki w porządku alfabetycznym
  sciezki_mistrzow: {
    // Chwalebna Śmierć str. 10
    duch_walki: {
      id: 'duch_walki',
      nazwa: 'Duch walki',
      zrodlo: 'CS',
      opis: 'Wojownik, który oddaje się bitewnemu szaleństwu i czerpie z niego moc.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        talenty: ['Niechęć do pancerza', 'Hart ducha']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Wielki hart ducha']
      },
      strona_zrodlowa: 10
    },

    // Chwalebna Śmierć str. 10-11
    kriomanta: {
      id: 'kriomanta',
      nazwa: 'Kriomanta',
      zrodlo: 'CS',
      opis: 'Mag ujarzmiający magię Wody, by przemieniać ją w lód i śnieg.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'woda', ilosc: 1 },
        talenty: ['Odporność na zimno', 'Lodowa wędrówka']
      },
      poziom_10: {
        zdrowie: '+2',
        magia: { typ: 'zaklecie', ilosc: 1 },
        talenty: ['Mistrzostwo magii lodu']
      },
      strona_zrodlowa: 10
    },

    // Chwalebna Śmierć str. 11
    skald: {
      id: 'skald',
      nazwa: 'Skald',
      zrodlo: 'CS',
      opis: 'Poeta i historyk klanu, który pieśnią zagrzewa wojowników do boju.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['naukowe'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję naukową.' },
        talenty: ['Zagranie do boju', 'Poruszający występ']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Wysokie morale', 'Trwałe morale']
      },
      strona_zrodlowa: 11
    },

    // Chwalebna Śmierć str. 11
    wieszcz: {
      id: 'wieszcz',
      nazwa: 'Wieszcz',
      zrodlo: 'CS',
      opis: 'Obdarzony darem widzenia przyszłości, ogłasza przeznaczenie otaczających go istot.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'jasnowidzenie', ilosc: 1 },
        talenty: ['Przepowiedzenie wyrdu']
      },
      poziom_10: {
        zdrowie: '+3',
        magia: { typ: 'zaklecie', ilosc: 1 },
        talenty: ['Jeszcze nie pora']
      },
      strona_zrodlowa: 11
    },

    aeromanta: {
      id: 'aeromanta',
      nazwa: 'Aeromanta',
      opis: 'Wzmacnia więź z dżinnami powietrza, by władać jego mocą.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', predkosc: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'powietrze', ilosc: 1 },
        talenty: ['Powietrzny krok']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 82
    },
    akrobata: {
      id: 'akrobata',
      nazwa: 'Akrobata',
      opis: 'Rozwija mobilność i szybkość, by wymanewrowywać przeciwników.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3', predkosc: '+2',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Akrobatyka']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Mobilność']
      },
      strona_zrodlowa: 82
    },
    astromanta: {
      id: 'astromanta',
      nazwa: 'Astromanta',
      opis: 'Studiuje magię krain niebiańskich, czerpiąc moc ze światła.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'magia_niebianska', ilosc: 1 },
        talenty: ['Wewnętrzny blask', 'Palące światło']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 83
    },
    bard: {
      id: 'bard',
      nazwa: 'Bard',
      opis: 'Zdolny artysta, wplatający w muzykę magię Pieśni.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3', moc: '+1',
        jezyki_profesje: {
          typ: 'oba',
          kategorie: ['pospolite'],
          opis: 'Uczysz się mówić nowym językiem i zyskujesz profesję muzyka lub artysty rozrywkowego.'
        },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'piesni', ilosc: 1 },
        talenty: ['Wiedza ezoteryczna']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 83
    },
    chronomanta: {
      id: 'chronomanta',
      nazwa: 'Chronomanta',
      opis: 'Zgłębia arkana magii Czasu, manipulując jego przepływem.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'czas', ilosc: 1 },
        talenty: ['Pęd']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 84
    },
    cudotworca: {
      id: 'cudotworca',
      nazwa: 'Cudotwórca',
      opis: 'Wierzy tak silnie, że czynione przez niego cuda przekraczają zwykłe czary.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+6',
        talenty: ['Stygmaty', 'Dar języków']
      },
      poziom_10: {
        zdrowie: '+6',
        talenty: ['Czynienie cudów']
      },
      strona_zrodlowa: 84
    },
    czempion: {
      id: 'czempion',
      nazwa: 'Czempion',
      opis: 'Doskonali techniki bitewne, by walczyć w obronie ważnych spraw.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Postawa bojowa']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Wytrwałość czempiona']
      },
      strona_zrodlowa: 85
    },
    derwisz: {
      id: 'derwisz',
      nazwa: 'Derwisz',
      opis: 'Tańczy po polu bitwy, władając bronią w obu rękach.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Oburęczność', 'Oburęczna obrona']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Mistrzostwo w dwóch broniach']
      },
      strona_zrodlowa: 85
    },
    dyplomata: {
      id: 'dyplomata',
      nazwa: 'Dyplomata',
      opis: 'Mistrz negocjacji, rozwiązujący konflikty pokojowo.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Mistrz dyplomacji', 'Litość']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Kojące słowa', 'Nieoczekiwany sojusznik']
      },
      strona_zrodlowa: 85
    },
    egzekutor: {
      id: 'egzekutor',
      nazwa: 'Egzekutor',
      opis: 'Traktuje zabijanie jak sztukę, znając czułe punkty ofiar.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Egzekucja']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Wyćwiczony atak']
      },
      strona_zrodlowa: 85
    },
    egzorcysta: {
      id: 'egzorcysta',
      nazwa: 'Egzorcysta',
      opis: 'Specjalizuje się w wypędzaniu i niszczeniu demonów oraz duchów.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['religijne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję religijną.' },
        magia: 'Zaklęcie egzorcyzm',
        talenty: ['Magia egzorcysty']
      },
      poziom_10: {
        zdrowie: '+4',
        talenty: ['Na pohybel nieczystym', 'Żelazna wola']
      },
      strona_zrodlowa: 86
    },
    fechtmistrz: {
      id: 'fechtmistrz',
      nazwa: 'Fechtmistrz',
      opis: 'Specjalizuje się w pojedynkach jeden na jednego.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Wyzwanie', 'Riposta']
      },
      poziom_10: {
        zdrowie: '+4'
      },
      strona_zrodlowa: 86
    },
    geomanta: {
      id: 'geomanta',
      nazwa: 'Geomanta',
      opis: 'Zacieśnia więź z dżinnami ziemi, zyskując kontrolę nad skałami.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'ziemia', ilosc: 1 },
        talenty: ['Kamienna ochrona']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 86
    },
    gladiator: {
      id: 'gladiator',
      nazwa: 'Gladiator',
      opis: 'Mistrz aren, gotowy na wszystko, by przetrwać kolejne starcie.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['wojenne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję wojenną.' },
        talenty: ['Nieczysta walka', 'Za wszelką cenę']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Decydujący cios']
      },
      strona_zrodlowa: 87
    },
    goliat: {
      id: 'goliat',
      nazwa: 'Goliat',
      opis: 'Poświęca niezliczone godziny budowaniu siły i witalności.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+8',
        talenty: ['Krzepa']
      },
      poziom_10: {
        zdrowie: '+8',
        talenty: ['Potężne muskuły']
      },
      strona_zrodlowa: 87
    },
    hydromanta: {
      id: 'hydromanta',
      nazwa: 'Hydromanta',
      opis: 'Pogłębia więź z dżinnami wody, wzmacniając zaklęcia Wody.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'woda', ilosc: 1 },
        talenty: ['Płynność', 'Wprawny pływak']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 87
    },
    iluzjonista: {
      id: 'iluzjonista',
      nazwa: 'Iluzjonista',
      opis: 'Zaciera granice między prawdą a urojeniem magią Iluzji.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'iluzja', ilosc: 1 },
        talenty: ['Wiarygodne iluzje']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 88
    },
    infiltrator: {
      id: 'infiltrator',
      nazwa: 'Infiltrator',
      opis: 'Dostaje się w najlepiej strzeżone miejsca dzięki charakteryzacji.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1', zdrowie: '+3',
        jezyki_profesje: { typ: 'wybor', kategorie: ['przestepcze'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję przestępczą.' },
        talenty: ['Bez twarzy']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Zdradziecki cios', 'Gra pozorów']
      },
      strona_zrodlowa: 88
    },
    inkwizytor: {
      id: 'inkwizytor',
      nazwa: 'Inkwizytor',
      opis: 'Tropi splugawienie i wypleniania niegodziwców w imię wiary.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Straszliwa groźba', 'Mistrz tortur', 'Lustracja']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Wyrok inkwizytora']
      },
      strona_zrodlowa: 88
    },
    inzynier: {
      id: 'inzynier',
      nazwa: 'Inżynier',
      opis: 'Zyskuje renomę, konstruując cudowne urządzenia i eidolony.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        jezyki_profesje: { typ: 'wybor', kategorie: ['naukowe'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję naukową.' },
        talenty: ['Eidolon']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Kokpit', 'Potężny eidolon']
      },
      strona_zrodlowa: 89
    },
    jasnowidz: {
      id: 'jasnowidz',
      nazwa: 'Jasnowidz',
      opis: 'Odkrywa przyszłość, widząc i słysząc odległe miejsca.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        obrona: '+1', zdrowie: '+1', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'jasnowidzenie', ilosc: 1 },
        talenty: ['Omeny']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 89
    },
    kapelan: {
      id: 'kapelan',
      nazwa: 'Kapelan',
      opis: 'Zapewnia sojusznikom duchowe przewodnictwo w bitwie.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        jezyki_profesje: { typ: 'wybor', kategorie: ['wojenne', 'religijne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję wojenną lub religijną.' },
        talenty: ['Hymn bitewny']
      },
      poziom_10: {
        zdrowie: '+4',
        talenty: ['Zagrzewająca pieśń', 'Sukurs']
      },
      strona_zrodlowa: 90
    },
    kawalerzysta: {
      id: 'kawalerzysta',
      nazwa: 'Kawalerzysta',
      opis: 'Wykorzystuje przewagę walki z grzbietu wierzchowca.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['pospolite', 'wojenne', 'koczownicze'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję pospolitą, wojenną lub koczowniczą.' },
        talenty: ['Jeździectwo bojowe']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Niszczycielska szarża', 'Mistrz jeździectwa']
      },
      strona_zrodlowa: 90
    },
    klatwiarz: {
      id: 'klatwiarz',
      nazwa: 'Klątwiarz',
      opis: 'Napawa się mocą magii Klątw, pozbawiając wrogów sił życiowych.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'klatwy', ilosc: 1 },
        talenty: ['Złe oko']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 90
    },
    kowal_run: {
      id: 'kowal_run',
      nazwa: 'Kowal run',
      opis: 'Zdobi broń i zbroję runami nasyconymi magiczną mocą.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'magia_runiczna', ilosc: 1 },
        talenty: ['Pieczęcie mocy']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 90
    },
    lesny_duch: {
      id: 'lesny_duch',
      nazwa: 'Leśny duch',
      opis: 'Zaprzysiężony obrońca dziczy, coraz bardziej przypominający rośliny.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['koczownicze'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję koczowniczą.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'natura', ilosc: 1 },
        talenty: ['Potęga natury', 'Dziecię lasu']
      },
      poziom_10: {
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
      },
      strona_zrodlowa: 91
    },
    lupiezca: {
      id: 'lupiezca',
      nazwa: 'Łupieżca',
      opis: 'Rzuca się w bój z szaleńczym ferworem, nie zważając na niebezpieczeństwo.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5', predkosc: '+2',
        talenty: ['Potężna szarża']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Żądza krwi', 'Siła z bólu']
      },
      strona_zrodlowa: 91
    },
    mag_bitewny: {
      id: 'mag_bitewny',
      nazwa: 'Mag bitewny',
      opis: 'Wspomaga umiejętności bojowe zaklęciami Magii Bitewnej.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['wojenne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję wojenną.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'magia_bitewna', ilosc: 1 },
        talenty: ['Eskalacja przemocy']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 91
    },
    mag_zaglady: {
      id: 'mag_zaglady',
      nazwa: 'Mag zagłady',
      opis: 'Zgłębia mroczne tajniki Sztuk Zakazanych, nie zważając na koszt.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', splugawienie: '+1', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'sztuki_zakazane', ilosc: 1 },
        talenty: ['Przerażające gesty']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 92
    },
    magus: {
      id: 'magus',
      nazwa: 'Magus',
      opis: 'Członek sekretnego zgromadzenia, rozpoznawany po magicznym kosturze.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['naukowe'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję naukową.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 },
        talenty: ['Magiczny kostur']
      },
      poziom_10: {
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 1 }
      },
      strona_zrodlowa: 92
    },
    medrzec: {
      id: 'medrzec',
      nazwa: 'Mędrzec',
      opis: 'Skupia się na poznawaniu wielu zaklęć kosztem ogólnej Mocy.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], kategoria: ['dowolna'], ilosc: 2 },
        talenty: ['Preferowane tradycje']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 2 }
      },
      strona_zrodlowa: 92
    },
    mistrz_oreza: {
      id: 'mistrz_oreza',
      nazwa: 'Mistrz oręża',
      opis: 'Osiąga prestiżowy status, skupiając szkolenie na jednym rodzaju broni.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Ulubiona broń']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Specjalizacja w broni']
      },
      strona_zrodlowa: 92
    },
    mistrz_przemian: {
      id: 'mistrz_przemian',
      nazwa: 'Mistrz Przemian',
      opis: 'Bada płynną naturę wszechrzeczy magią Przemiany.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'przemiany', ilosc: 1 },
        talenty: ['Optymalizacja']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 93
    },
    mistrz_sztuk_tajemnych: {
      id: 'mistrz_sztuk_tajemnych',
      nazwa: 'Mistrz Sztuk Tajemnych',
      opis: 'Zgłębia magię Sztuk Tajemnych, by wzmacniać własne zaklęcia.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'sztuki_tajemne', ilosc: 1 },
        talenty: ['Mistrzostwo w Sztukach Tajemnych']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 93
    },
    mistrz_urokow: {
      id: 'mistrz_urokow',
      nazwa: 'Mistrz Uroków',
      opis: 'Do perfekcji opanowuje magię kontrolującą innych jak marionetki.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'uroki', ilosc: 1 },
        talenty: ['Obrona przed urokami', 'Subtelny urok']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 93
    },
    msciciel: {
      id: 'msciciel',
      nazwa: 'Mściciel',
      opis: 'Walczy z niesprawiedliwością, czerpiąc moc z przysiąg zemsty.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Przysięga zemsty']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Gniew mściciela']
      },
      strona_zrodlowa: 94
    },
    myrmidon: {
      id: 'myrmidon',
      nazwa: 'Myrmidon',
      opis: 'Specjalizuje się w walce z użyciem tarczy.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['wojenne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję wojenną.' },
        talenty: ['Odepchnięcie tarczą', 'Blok tarczą']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Mistrz tarczy']
      },
      strona_zrodlowa: 94
    },
    negator: {
      id: 'negator',
      nazwa: 'Negator',
      opis: 'Dąży do mistrzostwa w defensywnej magii Ochrony.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'ochrona', ilosc: 1 },
        talenty: ['Magiczna protekcja']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 94
    },
    nekromanta: {
      id: 'nekromanta',
      nazwa: 'Nekromanta',
      opis: 'Zgłębia mroczną sztukę Nekromancji, zyskując władzę nad śmiercią.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+1', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['naukowe'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję naukową.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'nekromancja', ilosc: 1 },
        talenty: ['Obyty ze śmiercią', 'Władanie nieumarłymi']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 94
    },
    niszczyciel: {
      id: 'niszczyciel',
      nazwa: 'Niszczyciel',
      opis: 'Poskramia ryzykowne czary Zniszczenia, przekierowując ich efekty.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'zniszczenie', ilosc: 1 },
        talenty: ['Okiełznać zniszczenie']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 95
    },
    nozownik: {
      id: 'nozownik',
      nazwa: 'Nożownik',
      opis: 'Mistrz walki na ostrza, zadający precyzyjne, krwawiące rany.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Krwotok']
      },
      poziom_10: {
        zdrowie: '+4',
        talenty: ['Szybkie cięcie']
      },
      strona_zrodlowa: 95
    },
    obronca: {
      id: 'obronca',
      nazwa: 'Obrońca',
      opis: 'Chroni sojuszników, przyjmując na siebie ciosy przeznaczone dla innych.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+6',
        talenty: ['Asekuracja']
      },
      poziom_10: {
        zdrowie: '+6',
        talenty: ['Cios wyprzedzający', 'Odwet']
      },
      strona_zrodlowa: 95
    },
    odkrywca: {
      id: 'odkrywca',
      nazwa: 'Odkrywca',
      opis: 'Znosi trudy dalekich podróży, nie bacząc na niebezpieczne ekspedycje.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1', zdrowie: '+3', predkosc: '+2',
        jezyki_profesje: { typ: 'wybor', kategorie: ['koczownicze'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję koczowniczą.' },
        talenty: ['Nadludzkie zmysły', 'Niezłomność', 'Wytchnienie']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Zawziętość']
      },
      strona_zrodlowa: 96
    },
    pancerniak: {
      id: 'pancerniak',
      nazwa: 'Pancerniak',
      opis: 'Zakuty w ciężki pancerz, niemal niezniszczalny.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['wojenne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję wojenną.' },
        talenty: ['Zakuty w stal', 'Niewzruszony']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Odporność na broń']
      },
      strona_zrodlowa: 96
    },
    piromanta: {
      id: 'piromanta',
      nazwa: 'Piromanta',
      opis: 'Posiada niezrównaną władzę nad żywiołem ognia.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'ogien', ilosc: 1 },
        talenty: ['Błogosławieństwo ognia']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 96
    },
    podroznik: {
      id: 'podroznik',
      nazwa: 'Podróżnik',
      opis: 'Opanował magię Teleportacji, przemieszczając się z impetem.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', predkosc: '+2', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'teleportacja', ilosc: 1 },
        talenty: ['Pośpieszna ucieczka']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 96
    },
    przywolywacz: {
      id: 'przywolywacz',
      nazwa: 'Przywoływacz',
      opis: 'Tworzy potężniejsze i przerażające potwory magią Przywołań.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'przywolania', ilosc: 1 },
        talenty: ['Przywołanie drobnego potwora', 'Przerażające wynaturzenia']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 97
    },
    rewolwerowiec: {
      id: 'rewolwerowiec',
      nazwa: 'Rewolwerowiec',
      opis: 'Ekspert broni palnej, modyfikujący oręż dla większej celności.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Sześciostrzałowiec']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Sokole oko', 'Szybkoładowarka']
      },
      strona_zrodlowa: 97
    },
    strzelec_wyborowy: {
      id: 'strzelec_wyborowy',
      nazwa: 'Strzelec wyborowy',
      opis: 'Specjalizuje się w łukach i kuszach, oddając strzał za strzałem z celnością.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1', zdrowie: '+4',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Przycelowanie']
      },
      poziom_10: {
        zdrowie: '+4',
        talenty: ['Perfekcyjny strzał']
      },
      strona_zrodlowa: 97
    },
    szelma: {
      id: 'szelma',
      nazwa: 'Szelma',
      opis: 'Zna się po trochu na wszystkim, nie będąc ekspertem w żadnej dziedzinie.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+3',
        jezyki_profesje: {
          typ: 'oba',
          kategorie: ['dowolna'],
          opis: 'Uczysz się mówić nowym językiem, a także zyskujesz profesję.'
        },
        talenty: ['Biegłość', 'Elastyczne kwalifikacje', 'Magiczne olśnienie']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Cudowne dziecko', 'Niezwykła sprawność']
      },
      strona_zrodlowa: 98
    },
    taumaturg: {
      id: 'taumaturg',
      nazwa: 'Taumaturg',
      opis: 'Wita nieprzewidywalną magię Chaosu z otwartymi ramionami.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'chaos', ilosc: 1 },
        talenty: ['Okiełznanie chaosu']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 98
    },
    technomanta: {
      id: 'technomanta',
      nazwa: 'Technomanta',
      opis: 'Łączy magię i technologię, budując potężne urządzenia.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'technomancja', ilosc: 1 },
        talenty: ['Wynalazek']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 98
    },
    templariusz: {
      id: 'templariusz',
      nazwa: 'Templariusz',
      opis: 'Strzeże ważnych dla wiary miejsc i przedmiotów przed profanatorami.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1', zdrowie: '+4',
        jezyki_profesje: { typ: 'wybor', kategorie: ['religijne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję religijną.' },
        talenty: ['Bastion wiary']
      },
      poziom_10: {
        zdrowie: '+4',
        talenty: ['Strażnik świątyni']
      },
      strona_zrodlowa: 99
    },
    tenebrysta: {
      id: 'tenebrysta',
      nazwa: 'Tenebrysta',
      opis: 'Przyjmuje wszystkie dary Cienia, mimo złowieszczej reputacji tej magii.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'magia_cienia', ilosc: 1 },
        talenty: ['Cienisty płaszcz']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 99
    },
    teurg: {
      id: 'teurg',
      nazwa: 'Teurg',
      opis: 'Posiada bezpośrednią więź z Nowym Bogiem, na którego moc się powołuje.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['religijne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję religijną.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'teurgia', ilosc: 1 },
        talenty: ['Rozkwit wiary']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 99
    },
    truciciel: {
      id: 'truciciel',
      nazwa: 'Truciciel',
      opis: 'Wyrabia najbardziej śmiercionośne trucizny, zdolne powalić każdego.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        talenty: ['Mistrz trucizn']
      },
      poziom_10: {
        zdrowie: '+3',
        talenty: ['Zatruty dotyk']
      },
      strona_zrodlowa: 100
    },
    uzdrowiciel: {
      id: 'uzdrowiciel',
      nazwa: 'Uzdrowiciel',
      opis: 'Poświęca się bez reszty pomaganiu innym magią Życia.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+4', moc: '+1',
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'zycie', ilosc: 1 },
        talenty: ['Leczenie na odległość']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 100
    },
    wartownik: {
      id: 'wartownik',
      nazwa: 'Wartownik',
      opis: 'Wyostrzone zmysły pozwalają mu wykrywać to, co niedostrzegalne.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        percepcja: '+1', zdrowie: '+5',
        talenty: ['Świadomość otoczenia']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Warta']
      },
      strona_zrodlowa: 100
    },
    wladca_bestii: {
      id: 'wladca_bestii',
      nazwa: 'Władca bestii',
      opis: 'Tworzy więzi z zauroczonymi zwierzętami dzięki Magii Pierwotnej.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['koczownicze'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję koczowniczą.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'magia_pierwotna', ilosc: 1 },
        talenty: ['Pierwotna bestia', 'Pierwotna więź']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 101
    },
    wladca_burz: {
      id: 'wladca_burz',
      nazwa: 'Władca burz',
      opis: 'Kontroluje moc nawałnicy, ciskając pioruny i wywołując grzmoty.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', predkosc: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'magia_burzy', ilosc: 1 },
        talenty: ['Błysk przed oczami']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 101
    },
    zabijaka: {
      id: 'zabijaka',
      nazwa: 'Zabijaka',
      opis: 'Preferuje wielką, ciężką broń, zdolną wyrządzać poważne szkody.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+6',
        talenty: ['Brutalny zamach']
      },
      poziom_10: {
        zdrowie: '+6',
        talenty: ['Góra trupów']
      },
      strona_zrodlowa: 101
    },
    zdobywca: {
      id: 'zdobywca',
      nazwa: 'Zdobywca',
      opis: 'Urodzony dowódca, kierujący sojusznikami dla taktycznej korzyści.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+5',
        jezyki_profesje: { typ: 'wybor', kategorie: ['wojenne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję wojenną.' },
        talenty: ['Rozkaz ataku', 'Manewr taktyczny']
      },
      poziom_10: {
        zdrowie: '+5',
        talenty: ['Dowodzenie bitwą']
      },
      strona_zrodlowa: 101
    },
    zelota: {
      id: 'zelota',
      nazwa: 'Zelota',
      opis: 'Wędrowny kaznodzieja, odmawiający sobie wygód, by zbliżyć się do bogów.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+6',
        jezyki_profesje: { typ: 'wybor', kategorie: ['religijne'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję religijną.' },
        talenty: ['Żarliwość', 'Niepohamowany obłęd']
      },
      poziom_10: {
        zdrowie: '+6',
        talenty: ['Boska potęga']
      },
      strona_zrodlowa: 102
    },
    zmiennoksztaltny: {
      id: 'zmiennoksztaltny',
      nazwa: 'Zmiennokształtny',
      opis: 'Przybiera potężniejsze formy dzięki znajomości magii Transformacji.',
      poziom_1: {
        atrybuty_glowne: { typ: 'wybor', ilosc: 3, wartosc: 1, dostepne: ['sila', 'zrecznosc', 'intelekt', 'wola'] },
        zdrowie: '+2', moc: '+1',
        jezyki_profesje: { typ: 'wybor', kategorie: ['dowolna'], opis: 'Uczysz się mówić nowym językiem bądź zyskujesz profesję.' },
        magia: { typ: 'wybor', opcje: ['tradycja', 'zaklecie'], tradycjaNazwa: 'transformacja', ilosc: 1 },
        talenty: ['Ulepszona transformacja']
      },
      poziom_10: {
        magia: { typ: 'zaklecie', ilosc: 1 }
      },
      strona_zrodlowa: 102
    }
  }
};

/**
 * Talenty łotrzykowskie z dodatku "Urodzeni Łotrzykowie" (UŁ) - pula, z której
 * Hultaj wybiera na 2. i 8. poziomie. Każda specjalność przyznaje pierwszy
 * talent przy pierwszym wyborze, a drugi przy powtórnym; wyjątkiem jest
 * "specjalista", gdzie za każdym razem wybiera się inną biegłość.
 * Opisy wszystkich tych talentów są w `logic/talents.js`.
 */
const ROGUERY_TALENTS = {
  uczony: { nazwa: 'Uczony', talenty: ['Rozwiązywanie problemów', 'Mistrzowskie rozwiązywanie problemów'] },
  poszukiwacz_przygod: { nazwa: 'Poszukiwacz przygód', talenty: ['Diabelskie szczęście', 'Trwałe szczęście'] },
  amator_magii: { nazwa: 'Amator magii', talenty: ['Łotrzykowska magia', 'Udoskonalona łotrzykowska magia'] },
  mroczna_dusza: { nazwa: 'Mroczna dusza', talenty: ['Dar Diabła', 'Sługa Piekła'] },
  dogmatyk: { nazwa: 'Dogmatyk', talenty: ['Indoktrynacja', 'Wybraniec wiary'] },
  factotum: { nazwa: 'Factotum', talenty: ['Przeczucia i instynkt', 'Wnikliwa pomoc'] },
  podzegacz: { nazwa: 'Podżegacz', talenty: ['Podżeganie do przemocy', 'Zmiażdżyć ich'] },
  zabojca: { nazwa: 'Zabójca', talenty: ['Cios w plecy', 'Brutalny cios w plecy'] },
  lajdak: { nazwa: 'Łajdak', talenty: ['Nikczemne uderzenie', 'Znęcanie się'] },
  zbir: { nazwa: 'Zbir', talenty: ['Groźby', 'Spełnianie gróźb'] },
  oszust: { nazwa: 'Oszust', talenty: ['Wybieg', 'Zbijający z tropu wybieg'] },
  harcownik: { nazwa: 'Harcownik', talenty: ['Harc', 'Rączość'] },
  specjalista: {
    nazwa: 'Specjalista',
    talenty: ['Biegłość w Sile', 'Biegłość w Zręczności', 'Biegłość w Intelekcie', 'Biegłość w Woli'],
    wybierz_rozne: true
  },
  kretacz: { nazwa: 'Krętacz', talenty: ['Bojowy spryt', 'Wyższy bojowy spryt'] }
};

export default PATHS;
export { ROGUERY_TALENTS };
