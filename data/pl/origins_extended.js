/**
 * Rozszerzone pochodzenia postaci - Sprint 2
 * Pełne dane z podręcznika głównego zgodnie z sekcjami "Tworzenie postaci"
 * Źródło: Podręcznik Główny (PG)
 */

/**
 * Prototyp: Człowiek - pełna struktura danych
 * Źródło: PG str. 11-13, linie 740-861
 */
const HUMAN_EXTENDED = {
  id: 'czlowiek',
  nazwa: 'Człowiek',
  zrodlo: 'PG',
  
  // === OPIS I FLUFF ===
  opis: 'Determinacja, zaradność i zwykła liczebność sprawiły, że mimo prymitywnych początków ludzkość rozwinęła się w największą i najbardziej rozprzestrzenioną populację na świecie.',
  
  opis_pelny: {
    roznorodnosc: 'Ludzie dzielą się na wiele odmiennych grup etnicznych. Spotyka się przedstawicieli o najróżniejszych kolorach skóry: od prawie czarnego po śnieżnobiały, a nawet zielony, niebieski, różowy czy inne. Niektórzy mają rozmaite wzory na skórze, cętki lub pręgi, charakteryzują się gęstym owłosieniem bądź zupełnym jego brakiem. Ich wzrost i waga również są zróżnicowane: od 1 do ponad 2 metrów i od 25 do ponad 250 kilogramów. Większość ludzi dożywa wieku około siedemdziesięciu lat.',
    kultura: 'W kupie siła: W ludzkiej cywilizacji ważną rolę odgrywa wspólnota. Jej członkowie są silniejsi, działając razem niż w pojedynkę. Wynikająca z tego plemienna kultura to jedno ze źródeł potęgi i czynnik ułatwiający ekspansję, ale z drugiej strony często prowadzi ona do konfliktów i przemocy między rywalizującymi grupami.',
    osobowosc: 'Wyrafinowani czy nieokrzesani, cnotliwi czy źli do szpiku kości, odważni czy tchórzliwi – większość ludzi plasuje się gdzieś pomiędzy tymi ekstremami, a ich zachowaniem kieruje dbanie o korzyści własne lub bliskich.',
    religia: 'Nieliczni ludzie poddają w wątpliwość istnienie bogów, a wielu odnajduje sens życia w ich wyznawaniu. Na Północnych Rubieżach osoby te mogą przynależeć do Kościoła Nowego Boga, kierować się doktryną Starej Wiary bądź praktykować wiedźmie gusła.'
  },
  
  przykladowe_imiona: [
    'Aengus', 'Agnes', 'Aine', 'Alice', 'Anselm', 'Beatrice',
    'Breandan', 'Caitlin', 'Cormac', 'Ella', 'Fiona', 'Geoffrey',
    'Giselle', 'Henry', 'Joan', 'John', 'Kane', 'Kiera',
    'Margery', 'Richard', 'Roisin', 'Rordan', 'Saraid',
    'Seamus', 'Walter', 'Yvonne'
  ],
  
  // === TWORZENIE POSTACI ===
  tworzenie_postaci: {
    // Atrybuty bazowe
    atrybuty_bazowe: {
      sila: 10,
      zrecznosc: 10,
      intelekt: 10,
      wola: 10
    },
    wybor_atrybutu: {
      opis: 'Wybierz jeden z atrybutów i podnieś go o 1',
      opcje: ['sila', 'zrecznosc', 'intelekt', 'wola']
    },
    
    // Wzory obliczania
    percepcja: 'intelekt',
    obrona: 'zrecznosc',
    zdrowie: 'sila',
    szybkosc_zdrowienia: '1/4 Zdrowia (zaokr. w dół)',
    
    // Statystyki bazowe
    rozmiar: '1/2 lub 1',
    rozmiar_opcje: ['1/2', '1'],
    predkosc: 10,
    moc: 0,
    
    // Stany początkowe
    obrazenia: 0,
    szalenstwo: 0,
    splugawienie: 0,
    
    // Języki i profesje
    jezyki: ['wspólny'],
    jezyki_opcje: '1 dodatkowy język LUB losowa profesja',
    profesje: []
  },
  
  // Człowiek nie ma cech specjalnych na poziomie 0
  cechy_specjalne: {},
  
  // === POZIOM 4 (EKSPERT) ===
  poziom_4: {
    zdrowie_bonus: 5,
    opis: 'Atrybuty drugorzędne: Zdrowie +5',
    opcje: [
      {
        typ: 'zaklecie',
        ilosc: 1,
        opis: 'Możesz nauczyć się jednego zaklęcia'
      },
      {
        typ: 'talent',
        nazwa: 'Determinacja',
        opis: 'Gdy wyrzucisz 1 na kości ułatwienia, możesz rzucić ponownie i wybrać, którego wyniku użyć.',
        mechanika: {
          trigger: 'Wynik 1 na kości ułatwienia',
          efekt: 'Ponowny rzut, wybór wyniku',
          typ: 'pasywna'
        }
      }
    ]
  },
  
  // === TABELE LOSOWANIA ===
  tabele: {
    wiek: {
      nazwa: 'Człowiek: wiek',
      typ: '3k6',
      opis: 'Większość ludzi dożywa wieku około siedemdziesięciu lat.',
      opcje: [
        { rzut: '3', wynik: 'Dziecko, 11 lat lub mniej.' },
        { rzut: '4-7', wynik: 'Młodociany, 12–17 lat.' },
        { rzut: '8-12', wynik: 'Młody dorosły, 18–35 lat.' },
        { rzut: '13-15', wynik: 'Dorosły w średnim wieku, 36–55 lat.' },
        { rzut: '16-17', wynik: 'Starszy dorosły, 56–75 lat.' },
        { rzut: '18', wynik: 'Sędziwy dorosły, 76 lat lub więcej.' }
      ]
    },
    
    budowa_ciala: {
      nazwa: 'Człowiek: budowa ciała',
      typ: '3k6',
      opis: 'Wzrost i waga ludzi są zróżnicowane: od 1 do ponad 2 metrów i od 25 do ponad 250 kilogramów.',
      opcje: [
        { rzut: '3', wynik: 'Jesteś niski i szczupły.' },
        { rzut: '4', wynik: 'Jesteś niski i krępy.' },
        { rzut: '5-6', wynik: 'Jesteś niski.' },
        { rzut: '7-8', wynik: 'Jesteś smukły.' },
        { rzut: '9-12', wynik: 'Jesteś średniego wzrostu i wagi.' },
        { rzut: '13-14', wynik: 'Masz lekką nadwagę.' },
        { rzut: '15-16', wynik: 'Jesteś wysoki.' },
        { rzut: '17', wynik: 'Jesteś wysoki i szczupły.' },
        { rzut: '18', wynik: 'Jesteś bardzo wysoki i masywny.' }
      ]
    },
    
    wyglad: {
      nazwa: 'Człowiek: wygląd',
      typ: '3k6',
      opis: 'Ludzie różnią się wyglądem: od brzydkich po pięknych.',
      opcje: [
        { 
          rzut: '3', 
          wynik: 'Jesteś szpetny. Wyglądasz jak maszkara. Dzieci płaczą na twój widok, osoby co słabszego serca mdleją, a raz ktoś nawet zwymiotował po tym, jak dokładnie przyjrzał się twojej twarzy.' 
        },
        { 
          rzut: '4', 
          wynik: 'Jesteś brzydki; twoja twarz nie podoba się innym z powodu blizny, torbieli, krzaczastych brwi, krost, czyraków, zeza lub innych podobnych defektów.' 
        },
        { rzut: '5-6', wynik: 'Nie jesteś brzydki, ale większość nie uważa cię za atrakcyjnego.' },
        { 
          rzut: '7-8', 
          wynik: 'Jesteś z twarzy podobny zupełnie do nikogo. Inni ludzie cię zauważają, ale nie robisz szczególnego wrażenia.' 
        },
        { rzut: '9-12', wynik: 'Masz przeciętną aparycję. Wyglądasz jak wszyscy inni.' },
        { 
          rzut: '13-14', 
          wynik: 'Posiadasz cechę, którą inni uważają za atrakcyjną. Mogą to być ładne oczy, usta lub włosy, zgrabna figura albo coś innego.' 
        },
        { rzut: '15-16', wynik: 'Posiadasz kilka cech fizycznych, które dodają ci atrakcyjności.' },
        { 
          rzut: '17', 
          wynik: 'Jesteś jedną z najpiękniejszych osób na tych ziemiach, o niemal nieskazitelnej urodzie. Przyciągasz spojrzenia innych.' 
        },
        { 
          rzut: '18', 
          wynik: 'Twoja uroda jest tak zjawiskowa, że gdziekolwiek się pojawisz, wszyscy wodzą za tobą wzrokiem. Samą obecnością mieszasz ludziom w głowach; gdy z tobą rozmawiają, są rozkojarzeni i plączą im się języki. Jednak granica między uwielbieniem a nienawiścią bywa cienka. Jeśli odrzucisz czyjeś awanse, istnieje szansa, że ta osoba zwróci się przeciw tobie.' 
        }
      ]
    },
    
    przeszlosc: {
      nazwa: 'Człowiek: przeszłość',
      typ: 'k20',
      opis: 'Przeszłość twojej postaci określa jej wcześniejsze doświadczenia.',
      opcje: [
        { 
          rzut: '1', 
          wynik: 'Umarłeś i powróciłeś do żywych. Zaczynasz grę z 1k6 punktów Szaleństwa.',
          efekt: { szalenstwo: '1k6' }
        },
        { 
          rzut: '2', 
          wynik: 'Przez krótki czas byłeś opętany przez demona. Zaczynasz grę z 1 punktem Splugawienia.',
          efekt: { splugawienie: 1 }
        },
        { rzut: '3', wynik: 'Spędziłeś 1k6 lat w więzieniu.' },
        { 
          rzut: '4', 
          wynik: 'Zabiłeś kogoś z zimną krwią. Zaczynasz grę z 1 punktem Splugawienia.',
          efekt: { splugawienie: 1 }
        },
        { rzut: '5', wynik: 'Przeszedłeś ciężką chorobę.' },
        { 
          rzut: '6', 
          wynik: 'Należałeś do kultu i byłeś świadkiem wielu dziwnych rzeczy. Zaczynasz grę z 1 punktem Szaleństwa.',
          efekt: { szalenstwo: 1 }
        },
        { rzut: '7', wynik: 'Przez 1k20 lat byłeś więźniem faerie.' },
        { rzut: '8', wynik: 'Nigdy nie otrząsnąłeś się z żalu po utracie bliskiej osoby.' },
        { rzut: '9', wynik: 'Straciłeś palec, kilka zębów albo ucho lub nosisz bliznę.' },
        { rzut: '10', wynik: 'Utrzymujesz się z pracy w swojej profesji.' },
        { rzut: '11', wynik: 'Zakochałeś się; związek ten nadal trwa lub zakończył się dobrze.' },
        { rzut: '12', wynik: 'Masz żonę lub męża i 1k6 − 2 dzieci (minimum 0).' },
        { 
          rzut: '13', 
          wynik: 'Odbyłeś wiele podróży w różne strony świata. Umiesz mówić w jednym dodatkowym języku.',
          efekt: { jezyk_dodatkowy: 1 }
        },
        { 
          rzut: '14', 
          wynik: 'Posiadasz formalne wykształcenie. Umiesz czytać i pisać w języku wspólnym.',
          efekt: { czytanie_pisanie: 'wspólny' }
        },
        { rzut: '15', wynik: 'Obroniłeś rodzinne miasto przed okropnymi potworami.' },
        { rzut: '16', wynik: 'Powstrzymałeś spisek na życie ważnej persony lub schwytałeś zabójcę.' },
        { rzut: '17', wynik: 'Dokonałeś wielkich czynów i w swoich rodzinnych stronach jesteś bohaterem.' },
        { rzut: '18', wynik: 'Znalazłeś starą mapę wiodącą do skarbu.' },
        { rzut: '19', wynik: 'Ktoś ważny i wpływowy jest ci winien przysługę.' },
        { 
          rzut: '20', 
          wynik: 'Odziedziczyłeś w spadku pieniądze; zaczynasz grę z 2k6 miedziaków.',
          efekt: { pieniadze: '2k6_mc' }
        }
      ]
    },
    
    osobowosc: {
      nazwa: 'Człowiek: osobowość',
      typ: '3k6',
      opis: 'Osobowość określa moralne kompasy i motywacje postaci.',
      opcje: [
        { 
          rzut: '3', 
          wynik: 'Jesteś okrutny, niegodziwy i samolubny. Lubisz sprawiać innym ból.' 
        },
        { 
          rzut: '4', 
          wynik: 'Jesteś kapryśny i nieprzewidywalny. Rzadko dotrzymujesz słowa i dajesz się ponosić impulsom.' 
        },
        { 
          rzut: '5-6', 
          wynik: 'Kierujesz się prawem silniejszego. Posłuszeństwo wobec władzy jest najwyższym ideałem.' 
        },
        { 
          rzut: '7-8', 
          wynik: 'Dbasz przede wszystkim o siebie. Jesteś w stanie zdradzić nawet przyjaciół.' 
        },
        { 
          rzut: '9-12', 
          wynik: 'Ponad wszystkim innym stawiasz dobro swoje i swoich bliskich.' 
        },
        { rzut: '13-14', wynik: 'Pomagasz innym, bo tak należy.' },
        { 
          rzut: '15-16', 
          wynik: 'Starasz się postępować słusznie, nawet jeśli jest to wbrew prawu czy normom społecznym.' 
        },
        { rzut: '17', wynik: 'We wszystkim kierujesz się honorem i lojalnością.' },
        { 
          rzut: '18', 
          wynik: 'Jesteś oddany dobrym i szlachetnym celom i nie zdradzisz swoich przekonań nawet za cenę życia.' 
        }
      ]
    },
    
    religia: {
      nazwa: 'Człowiek: religia',
      typ: '3k6',
      opis: 'Religijne przekonania ludzi są zróżnicowane.',
      opcje: [
        { rzut: '3', wynik: 'Jesteś członkiem kultu wyznającego jakąś mroczną siłę.' },
        { rzut: '4', wynik: 'Należysz do sekty heretyków.' },
        { rzut: '5-6', wynik: 'Wychowałeś się na wiedźmiarskich naukach.' },
        { rzut: '7-10', wynik: 'Kierujesz się doktryną Starej Wiary.' },
        { rzut: '11-15', wynik: 'Jesteś wyznawcą Nowego Boga.' },
        { rzut: '16-18', wynik: 'Nie jesteś religijny.' }
      ]
    }
  },
  
  // === METADANE ===
  strona_zrodlowa: 11,
  linie_zrodlowe: '740-861',
  status: 'kompletne',
  data_aktualizacji: '2025-10-06'
};

/**
 * Rozszerzone pochodzenia - wszystkie 6 z podręcznika głównego
 * TODO: Migracja pozostałych 5 pochodzeń
 */
const EXTENDED_ORIGINS = {
  czlowiek: HUMAN_EXTENDED,
  // TODO: automaton, goblin, krasnolud, odmieniec, ork
};

export { EXTENDED_ORIGINS, HUMAN_EXTENDED };
