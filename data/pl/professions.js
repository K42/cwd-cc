/**
 * Profesje - dokładne tabele z Podręcznika Głównego (PG)
 * Kategorie: naukowe, pospolite, przestępcze, wojenne, koczownicze, religijne
 * Każda kategoria zawiera 20 pozycji (mapowanie rzutów k20)
 */

const PROFESSIONS = {
  tables: {
    naukowe: [
      'Architektura', 'Astrologia', 'Inżynieria', 'Etykieta i obyczaje', 'Podania ludowe',
      'Geografia', 'Heraldyka', 'Historia', 'Prawo', 'Literatura',
      'Magia', 'Medycyna', 'Nawigacja', 'Okultyzm', 'Filozofia',
      'Polityka', 'Przyroda', 'Religia', 'Nauka', 'Wojna'
    ],
    pospolite: [
      'Treser zwierząt', 'Aptekarz lub uzdrowiciel',
      'Rzemieślnik (wybierz fach; np. browarnik, brukarz, cieśla, drukarz, farbiarz, garbarz, garncarz, introligator, jubiler, kowal, krawiec, murarz, piekarz, szklarz, świecarz)',
      'Artysta (wybierz rodzaj; np. malarz, pisarz, poeta, rzeźbiarz; poeta/pisarz: umiesz czytać i pisać w jednym znanym języku)',
      'Przewoźnik', 'Rzeźnik', 'Kucharz', 'Pasterz',
      'Artysta rozrywkowy (aktor, atleta, bajarz, komik, kurtyzana, marionetkarz, mówca, śpiewak, tancerz)',
      'Rolnik', 'Rybak lub wielorybnik', 'Stajenny',
      'Wyrobnik (grabarz, kominiarz, ładowacz, tragarz, zamiatacz ulic)',
      'Handlarz (wybierz towar; np. broń, niewolnicy, przyprawy, tkaniny, zboże, zwierzęta hodowlane)',
      'Górnik', 'Muzyk (wybierz instrument; dęte, perkusyjne, strunowe)',
      'Żeglarz', 'Sługa lub lokaj', 'Sklepikarz', 'Woźnica'
    ],
    przestepcze: [
      'Agitator', 'Żebrak', 'Włamywacz', 'Pijak lub lubieżnik', 'Szarlatan lub oszust',
      'Kultysta', 'Paser', 'Fałszerz', 'Hazardzista', 'Hiena cmentarna',
      'Donosiciel', 'Morderca', 'Kieszonkowiec', 'Pirat', 'Prostytutka',
      'Buntownik lub terrorysta', 'Sabotażysta', 'Szpieg', 'Oprych', 'Ulicznik'
    ],
    wojenne: [
      'Konstabl', 'Śledczy', 'Strażnik', 'Strażnik', 'Stróż więzienny',
      'Oficer', 'Marynarz', 'Najemnik', 'Bojówkarz', 'Bojówkarz',
      'Dzielnicowy', 'Dzielnicowy', 'Poborowy', 'Poborowy', 'Poborowy',
      'Niewolnik', 'Żołnierz', 'Żołnierz', 'Giermek', 'Kat'
    ],
    koczownicze: [
      'Bandyta, rozbójnik lub rabuś', 'Barbarzyńca', 'Wygnaniec', 'Zbieracz',
      'Przewodnik', 'Przewodnik', 'Pustelnik', 'Myśliwy', 'Myśliwy', 'Nomada lub włóczęga',
      'Pionier', 'Kłusownik lub koniokrad', 'Poszukiwacz złota', 'Banita', 'Uchodźca',
      'Uchodźca', 'Grotołaz', 'Tropiciel', 'Traper', 'Drwal'
    ],
    religijne: [
      'Czciciel', 'Czciciel', 'Ewangelista', 'Ewangelista', 'Cierpiętnik',
      'Heretyk', 'Nowicjusz Starej Wiary', 'Nowicjusz Starej Wiary', 'Pastor', 'Pastor',
      'Akolita Nowego Boga', 'Akolita Nowego Boga', 'Pomocnik inkwizytora', 'Pielgrzym', 'Pielgrzym',
      'Pielgrzym', 'Uliczny kaznodzieja', 'Uliczny kaznodzieja', 'Wychowanek świątyni', 'Wychowanek świątyni'
    ],
    // Tabela profesji mroczniaka z dodatku "Potomkowie Zdrajcy" (PZ), który nie
    // ma polskiego wydania - tłumaczenie własne, w UI oznaczone etykietą "beta".
    // Dodatek każe mroczniakowi losować profesje początkowe z tej tabeli zamiast
    // z tabel z Podręcznika Głównego, bo mroczniaki żyją na obrzeżach świata
    // śmiertelnych i część tamtejszych zajęć nic dla nich nie znaczy.
    //
    // Większość pozycji to profesje, które istnieją już w tabelach wyżej -
    // powtarzają się tu z rozmysłem i celowo tym samym brzmieniem, żeby gracz
    // losujący z tej tabeli znalazł potem dokładnie tę samą nazwę na liście
    // wyboru. Wyjątkiem jest Dyletant, którego polskie tabele PG nie mają
    // w ogóle, dlatego ta tabela jest osobna, a nie dopisana do `pospolite`
    // (tamte mają po równo 20 pozycji, bo odpowiadają rzutom k20).
    mroczniackie: [
      'Artysta (wybierz rodzaj; np. malarz, pisarz, poeta, rzeźbiarz)', 'Włamywacz',
      'Pijak lub lubieżnik', 'Szarlatan lub oszust', 'Kultysta',
      'Dyletant', 'Artysta rozrywkowy (aktor, atleta, bajarz, komik, kurtyzana, marionetkarz, mówca, śpiewak, tancerz)',
      'Wygnaniec', 'Hazardzista', 'Myśliwy',
      'Morderca', 'Muzyk (wybierz instrument; dęte, perkusyjne, strunowe)', 'Nomada lub włóczęga',
      'Banita', 'Sabotażysta',
      'Uczony (wybierz dziedzinę; np. architektura, astrologia, historia, magia, medycyna, okultyzm, przyroda, wojna)',
      'Żołnierz', 'Szpieg', 'Kat', 'Tropiciel'
    ]
  }
};

export default PROFESSIONS;