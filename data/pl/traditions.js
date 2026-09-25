/**
 * Metadane tradycji magicznych - lista i atrybuty zweryfikowane wg tabeli
 * "Tradycje i atrybuty" z Podręcznika Głównego (str. 115); tradycje z suplementów
 * dodane z najlepszą wiedzą o ich charakterze (nie ma dla nich analogicznej tabeli).
 *
 * `czarnaMagia: true` oznacza tradycję czarnej magii (PG str. 115: Klątwy, Sztuki
 * Zakazane, Nekromancja - jedyne potwierdzone w PG). Poznanie takiej tradycji
 * przyznaje 1 punkt Splugawienia; każde nauczenie się z niej kolejnego zaklęcia
 * niesie ryzyko kolejnego punktu (rzut k6 < liczba już znanych zaklęć czarnej magii).
 *
 * `realTradycja: false` oznacza wpis, który w źródle występuje jako nazwa ścieżki
 * przyznającej jedno konkretne, zablokowane zaklęcie (np. "Zaklęcie egzorcyzm"
 * Egzorcysty), a nie jako prawdziwą, samodzielnie poznawalną tradycję magiczną -
 * takie wpisy są wyłączone z listy tradycji do wyboru w Kroku 4.5, ale ich zaklęcia
 * pozostają wyszukiwalne w bibliotece.
 */

const TRADITIONS = {
  // --- Podręcznik Główny (PG str. 115, "Tradycje i atrybuty") ---
  // `opis` - jedno zdanie streszczające fabularny wstęp tradycji z podręcznika
  // (nie mechanika zaklęć), pokazywane jako podpis kafelka w popupie wyboru.
  sztuki_tajemne: { nazwa: 'Sztuki Tajemne', atrybut: 'intelekt', czarnaMagia: false, opis: 'Najstarsza znana śmiertelnym forma magii - niezawodne zaklęcia dopracowywane przez tysiące lat przez czarodziejów.' },
  magia_bitewna: { nazwa: 'Magia Bitewna', atrybut: 'intelekt', czarnaMagia: false, opis: 'Młoda tradycja stworzona przez orków-weteranów cesarskiej armii, wzmacniająca umiejętności bojowe.' },
  przywolania: { nazwa: 'Przywołania', atrybut: 'intelekt', czarnaMagia: false, opis: 'Tka obiekty i stworzenia ze splotów magicznej energii, a jej nauce towarzyszy nieustanny, narastający pomruk w uszach.' },
  klatwy: { nazwa: 'Klątwy', atrybut: 'intelekt', czarnaMagia: true, opis: 'Czarna magia zsyłająca nieszczęścia i niedolę, odbierająca ofiarom witalność i odwagę.' },
  jasnowidzenie: { nazwa: 'Jasnowidzenie', atrybut: 'intelekt', czarnaMagia: false, opis: 'Ukazuje możliwą przyszłość i zamierzchłą przeszłość tym, którzy urodzili się z darem widzenia.' },
  uroki: { nazwa: 'Uroki', atrybut: 'intelekt', czarnaMagia: false, opis: 'Manipuluje emocjami istot, by zmienić je w posłuszne sługi - często poznawana od faerie.' },
  sztuki_zakazane: { nazwa: 'Sztuki Zakazane', atrybut: 'intelekt', czarnaMagia: true, opis: 'Najmroczniejsza z mrocznych dziedzin magii, zakazana w większości społeczności i plugawiąca duszę ucznia.' },
  iluzja: { nazwa: 'Iluzja', atrybut: 'intelekt', czarnaMagia: false, opis: 'Oszukuje zmysły, pozwalając tworzyć iluzoryczne ubrania czy przybierać postać innych osób.' },
  nekromancja: { nazwa: 'Nekromancja', atrybut: 'intelekt', czarnaMagia: true, opis: 'Narusza cykl życia i śmierci, tworząc istoty trwające w zawieszeniu między tymi dwoma stanami.' },
  ochrona: { nazwa: 'Ochrona', atrybut: 'intelekt', czarnaMagia: false, opis: 'Broni stworzeń i przedmiotów, choć im więcej się jej poznaje, tym bardziej podejrzliwym stajesz się wobec innych.' },
  magia_runiczna: { nazwa: 'Magia Runiczna', atrybut: 'intelekt', czarnaMagia: false, opis: 'Zaklęcia w formie pisma wymyślone przez krasnoludy lub trolle, wyryte w prastarych monolitach i jaskiniach.' },
  magia_cienia: { nazwa: 'Magia Cienia', atrybut: 'intelekt', czarnaMagia: false, opis: 'Tworzy i kształtuje cienie oraz ciemność, stopniowo wysysając z maga kolor i witalność.' },
  technomancja: { nazwa: 'Technomancja', atrybut: 'intelekt', czarnaMagia: false, opis: 'Łączy magię z mechanizmami, konstruując urządzenia z zebranych trybów, sprężyn i blachy.' },
  teleportacja: { nazwa: 'Teleportacja', atrybut: 'intelekt', czarnaMagia: false, opis: 'Znajduje szczeliny w rzeczywistości i otwiera je na tyle szeroko, by przenieść wędrowca w odległe miejsce.' },
  czas: { nazwa: 'Czas', atrybut: 'intelekt', czarnaMagia: false, opis: 'Kontroluje przepływ czasu, a igranie z jej zaklęciami wzburza oś temporalną wokół czarującego.' },
  chaos: { nazwa: 'Chaos', atrybut: 'wola', czarnaMagia: false, opis: 'Niszczycielska energia czyniąca jej zaklęcia nieprzewidywalnymi i niebezpiecznymi nawet dla samego maga.' },
  magia_burzy: { nazwa: 'Magia Burzy', atrybut: 'wola', czarnaMagia: false, opis: 'Pozwala tworzyć i kontrolować zjawiska pogodowe w ich najbardziej gwałtownych postaciach.' },
  magia_pierwotna: { nazwa: 'Magia Pierwotna', atrybut: 'wola', czarnaMagia: false, opis: 'Tworzy więzi ze zwierzętami, a im więcej się jej poznaje, tym bardziej zwierzęcy staje się wygląd maga.' },
  natura: { nazwa: 'Natura', atrybut: 'wola', czarnaMagia: false, opis: 'Prastara tradycja kultywująca ziemię i przyspieszająca wzrost, najbardziej rozpowszechniona wśród wyznawców Starej Wiary.' },
  ogien: { nazwa: 'Ogień', atrybut: 'wola', czarnaMagia: false, opis: 'Tworzy i kontroluje płomienie, wzmagając naturalną porywczość - poznanie jej często wymaga pomocy dżinna.' },
  piesni: { nazwa: 'Pieśni', atrybut: 'wola', czarnaMagia: false, opis: 'Wplata magię w muzykę, wpływając na umysły słuchaczy - jej rzucanie wymaga śpiewu lub gry na instrumencie.' },
  powietrze: { nazwa: 'Powietrze', atrybut: 'wola', czarnaMagia: false, opis: 'Okiełznawia potęgę wiatru, który odtąd zawsze wiruje wokół czarującego, rozwiewając włosy i szaty.' },
  przemiany: { nazwa: 'Przemiany', atrybut: 'wola', czarnaMagia: false, opis: 'Obdarza nowymi zdolnościami i cechami, z czasem odbierając twarzy maga jej charakterystyczne rysy.' },
  teurgia: { nazwa: 'Teurgia', atrybut: 'wola', czarnaMagia: false, opis: 'Opiera się na wierze i pobożności, manifestując przy rzucaniu zaklęć chwilowy znak boskiej mocy.' },
  magia_niebianska: { nazwa: 'Magia Niebiańska', atrybut: 'wola', czarnaMagia: false, opis: 'Wykorzystuje moc światła słońca i gwiazd do walki z ogarniającą świat ciemnością.' },
  transformacja: { nazwa: 'Transformacja', atrybut: 'wola', czarnaMagia: false, opis: 'Pozwala przybierać różne formy, sprawiając, że wygląd maga nieznacznie zmienia się po każdym odpoczynku.' },
  woda: { nazwa: 'Woda', atrybut: 'wola', czarnaMagia: false, opis: 'Kontroluje i nadaje kształt cieczom - biegli w niej czarodzieje z czasem pokrywają się drobnymi łuskami.' },
  ziemia: { nazwa: 'Ziemia', atrybut: 'wola', czarnaMagia: false, opis: 'Obdarza władzą nad kamieniem i ziemią, pochodząc od dżinnów zamieszkujących jaskinie i góry.' },
  zniszczenie: { nazwa: 'Zniszczenie', atrybut: 'wola', czarnaMagia: false, opis: 'Kieruje czystą siłą woli, sprawiając, że stworzenia i obiekty eksplodują - kosztem ran samego maga.' },
  zycie: { nazwa: 'Życie', atrybut: 'wola', czarnaMagia: false, opis: 'Uśmierza ból, zasklepia rany i leczy choroby, ucząc głównie w słynnym Domu Uzdrowicieli.' },

  // --- Suplementy - klasyfikacja najlepszej wiedzy (brak analogicznej tabeli źródłowej) ---
  magia_fey: { nazwa: 'Magia Fey', atrybut: 'intelekt', czarnaMagia: false, zrodlo: 'SP', opis: 'Zwodzi i oszukuje, czyniąc z zaczarowanych podatnych na manipulację głupców - domena elfów i chochlików.' },
  spirytyzm: { nazwa: 'Spirytyzm', atrybut: 'wola', czarnaMagia: false, zrodlo: 'SUP', opis: 'Przyzywa duchy z Zaświatów, by wyświadczyły przysługę temu, kto zna odpowiednie zaklęcie.' },
  smierc: { nazwa: 'Śmierć', atrybut: 'intelekt', czarnaMagia: true, zrodlo: 'SUP', opis: 'Czarna magia kładąca kres życiu i wysyłająca dusze w Zaświaty, głównie poprzez rozmaite sposoby zabijania.' },
  telepatia: { nazwa: 'Telepatia', atrybut: 'intelekt', czarnaMagia: false, zrodlo: 'SUP', opis: 'Budzi utajone psychiczne zdolności, pozwalając zaglądać w cudze umysły lub niszczyć ich psychikę.' },
  alchemia: { nazwa: 'Alchemia', atrybut: 'intelekt', czarnaMagia: false, zrodlo: 'SUP', opis: 'Naukowa tradycja przemieniająca jedną substancję w inną za pomocą odczynników, chemikaliów i magii.' },
  cien: { nazwa: 'Cień', atrybut: 'intelekt', czarnaMagia: true, zrodlo: 'GWP', realTradycja: false },
  demonologia: { nazwa: 'Demonologia', atrybut: 'wola', czarnaMagia: true, zrodlo: 'GWP', opis: 'Czarna magia chwytająca i uwalniająca moc demonów, przyciągająca tylko destrukcyjnych nihilistów i szaleńców.' },
  magia_krwi: { nazwa: 'Magia Krwi', atrybut: 'intelekt', czarnaMagia: true, zrodlo: 'GP', opis: 'Stworzona przez wampiry, manipuluje krwią i zmusza ją do posłuszeństwa wobec rozkazów maga.' },
  telekineza: { nazwa: 'Telekineza', atrybut: 'intelekt', czarnaMagia: false, zrodlo: 'SUP', realTradycja: false },

  // --- Wpisy path-locked (jedno zaklęcie ściśle powiązane z konkretną ścieżką,
  // nie samodzielna tradycja) - wyłączone z wyboru nowej tradycji ---
  diabolista: { nazwa: 'Diabolista', atrybut: 'wola', czarnaMagia: true, zrodlo: 'RA', realTradycja: false },
  kleryk: { nazwa: 'Kleryk', atrybut: 'wola', czarnaMagia: false, zrodlo: 'NW', realTradycja: false },
  spaczeniec: { nazwa: 'Spaczeniec', atrybut: 'wola', czarnaMagia: true, zrodlo: 'GP', realTradycja: false },
  opiekun: { nazwa: 'Opiekun', atrybut: 'wola', czarnaMagia: false, zrodlo: 'SUP', realTradycja: false },
  szaman: { nazwa: 'Szaman', atrybut: 'wola', czarnaMagia: false, zrodlo: 'SUP', realTradycja: false }
};

/** Tradycje religijne (PG str. 58, tabela "Tradycje religijne") - używane, gdy ścieżka
 * (Kleryk/Kapłan/Paladyn/Wyrocznia) ogranicza wybór nowej tradycji do religijnych.
 * Uproszczenie: aplikacja nie śledzi osobno wybranej religii, więc pokazuje unię
 * tradycji ze wszystkich czterech religii. */
const RELIGIOUS_TRADITIONS = ['magia_niebianska', 'teurgia', 'zycie', 'magia_bitewna', 'ziemia', 'natura', 'magia_pierwotna', 'klatwy', 'uroki'];

export { TRADITIONS, RELIGIOUS_TRADITIONS };
