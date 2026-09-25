/**
 * Kategorie tematyczne ścieżek - do filtrowania w Kroku 3 (wyszukiwanie
 * tekstowe + chipy kategorii).
 *
 * "Magia" jest wyliczana automatycznie (patrz `getPathsForLevel()` w
 * `logic/paths.js` - ścieżka ma ją, jeśli którykolwiek jej blok `poziom_N`
 * ma pole `magia`), więc nie ma tu klucza `magia` przy żadnej ścieżce.
 * Wszystkie pozostałe kategorie, łącznie z "czarna" - są przypisane
 * ręcznie na podstawie opisu i mechaniki ścieżki: pole `magia.kategoria`
 * w danych ścieżek najczęściej dopuszcza dowolną tradycję ("dowolna"), więc
 * nie da się wiarygodnie wyliczyć tematu czarnej magii z samej struktury
 * danych - trzeba wiedzieć, o czym ścieżka faktycznie jest.
 *
 * Ścieżka bez wpisu w tym rejestrze po prostu nie ma żadnej kategorii
 * poza ewentualną automatyczną "Magią" - to nie błąd, niektóre ścieżki
 * (np. Wyrocznia, Cudotwórca) nie wpisują się jednoznacznie w żadną z nich.
 */

/**
 * Identyfikatory kategorii w kolejności, w jakiej mają się pokazać jako chipy
 * filtra. Same nazwy widoczne dla użytkownika są w pliku językowym
 * (i18n/pl/paths.js -> paths.categories) - tutaj zostaje wyłącznie lista
 * kodów, bo to część modelu danych, a nie tekst do tłumaczenia.
 */
const PATH_CATEGORY_CODES = [
  'magia', 'czarna', 'wrecz', 'dystans', 'skryt',
  'wsparcie', 'dowodzenie', 'spoleczny', 'wiedza', 'natura'
];

const PATH_CATEGORIES = {
  // --- Ścieżki nowicjusza ---
  kleryk: ['wsparcie'],
  lotr: ['skryt', 'wrecz'],
  wojownik: ['wrecz'],
  giermek: ['wrecz'],
  barbarzynca: ['wrecz'],
  charakternik: ['wrecz'],
  siepacz: ['wrecz', 'spoleczny'],
  szermierz: ['wrecz'],
  mysliwy: ['dystans', 'skryt', 'natura'],
  mnich: ['wrecz'],
  zolnierz: ['wrecz', 'dowodzenie'],
  straznik_magii: ['wrecz'],
  weteran: ['wrecz'],
  sluga_diabla: ['czarna', 'wsparcie'],
  hultaj: ['skryt', 'wrecz'],

  // --- Ścieżki eksperckie ---
  moloch: ['wrecz'],
  berserker: ['wrecz'],
  czarnoksiężnik: ['czarna'],
  czarodziej: ['wiedza'],
  druid: ['natura'],
  kaplan: ['wsparcie'],
  lowca: ['dystans', 'skryt', 'natura'],
  paladyn: ['wrecz', 'wsparcie'],
  skrytobojca: ['skryt', 'wrecz'],
  wiedzma: ['czarna'],
  wynalazca: ['wiedza'],
  zaklinacz: ['wrecz'],
  zbrojny: ['wrecz'],
  zlodziej: ['skryt'],
  zwiadowca: ['skryt', 'natura'],
  kusiciel: ['czarna', 'spoleczny'],
  zagonczyk: ['skryt', 'wrecz'],
  emisariusz: ['wsparcie'],
  rzezimieszek: ['wrecz', 'spoleczny'],
  maska: ['skryt', 'spoleczny'],
  spiskowiec: ['dowodzenie', 'spoleczny'],
  majster: ['wiedza'],
  kronikarz: ['wiedza', 'wsparcie'],
  krzyzowiec: ['wrecz', 'wsparcie'],
  opiekun: ['natura', 'wsparcie'],
  swieta_matrona: ['wsparcie'],
  rogaty: ['natura', 'wrecz'],
  apostol_lodu: ['wrecz'],
  sedzia: ['czarna', 'spoleczny'],
  zloczynca: ['czarna', 'spoleczny'],
  hulaka: ['spoleczny'],
  pustoszyciel: ['wrecz'],
  zalobnik: ['czarna'],
  dziecie_lata: ['spoleczny'],
  madrosc: ['wsparcie', 'wiedza'],

  // --- Ścieżki mistrzowskie ---
  duch_walki: ['wrecz'],
  skald: ['dowodzenie', 'spoleczny'],
  wieszcz: ['wiedza'],
  akrobata: ['wrecz'],
  bard: ['spoleczny', 'wsparcie'],
  cudotworca: ['wsparcie'],
  czempion: ['wrecz'],
  derwisz: ['wrecz'],
  dyplomata: ['spoleczny'],
  egzekutor: ['wrecz', 'skryt'],
  fechtmistrz: ['wrecz'],
  gladiator: ['wrecz'],
  goliat: ['wrecz'],
  iluzjonista: ['skryt', 'spoleczny'],
  infiltrator: ['skryt', 'spoleczny'],
  inkwizytor: ['spoleczny'],
  inzynier: ['wiedza'],
  jasnowidz: ['wiedza'],
  kapelan: ['wsparcie', 'dowodzenie'],
  kawalerzysta: ['wrecz'],
  klatwiarz: ['czarna'],
  kowal_run: ['wiedza', 'wrecz'],
  lesny_duch: ['natura'],
  lupiezca: ['wrecz'],
  mag_bitewny: ['wrecz'],
  mag_zaglady: ['czarna'],
  magus: ['wiedza', 'wrecz'],
  medrzec: ['wiedza'],
  mistrz_oreza: ['wrecz'],
  mistrz_sztuk_tajemnych: ['wiedza'],
  mistrz_urokow: ['spoleczny'],
  msciciel: ['wrecz'],
  myrmidon: ['wrecz'],
  negator: ['wsparcie'],
  nekromanta: ['czarna'],
  nozownik: ['wrecz'],
  obronca: ['wrecz', 'wsparcie'],
  odkrywca: ['natura'],
  pancerniak: ['wrecz'],
  rewolwerowiec: ['dystans'],
  strzelec_wyborowy: ['dystans'],
  technomanta: ['wiedza'],
  templariusz: ['wrecz', 'wsparcie'],
  tenebrysta: ['czarna'],
  teurg: ['wsparcie'],
  truciciel: ['skryt', 'wrecz'],
  uzdrowiciel: ['wsparcie'],
  wartownik: ['skryt'],
  wladca_bestii: ['natura'],
  zabijaka: ['wrecz'],
  zdobywca: ['dowodzenie', 'wrecz'],
  zelota: ['wsparcie', 'spoleczny'],
  zmiennoksztaltny: ['natura']
};

export { PATH_CATEGORIES, PATH_CATEGORY_CODES };
