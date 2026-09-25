/**
 * Przedmioty i wyposażenie
 * Źródło: Podręcznik główny + suplementy
 */

const ITEMS = {
  // Broń
  bronie: {
    // Broń biała
    miecz: {
      id: 'miecz',
      nazwa: 'Miecz',
      typ: 'broń_biala',
      obrazenia: '1k6',
      koszt: 10,
      waga: '2 funty',
      opis: 'Uniwersalna broń biała, dobra do walki w zwarciu.'
    },
    topór: {
      id: 'topór',
      nazwa: 'Topór',
      typ: 'broń_biala',
      obrazenia: '1k6+1',
      koszt: 8,
      waga: '3 funty',
      opis: 'Broń sieczna, zadająca duże obrażenia.'
    },
    maczuga: {
      id: 'maczuga',
      nazwa: 'Maczuga',
      typ: 'broń_biala',
      obrazenia: '1k6',
      koszt: 5,
      waga: '4 funty',
      opis: 'Prosta broń obuchowa, skuteczna przeciw zbroi.'
    },
    sztylet: {
      id: 'sztylet',
      nazwa: 'Sztylet',
      typ: 'broń_biala',
      obrazenia: '1k4',
      koszt: 3,
      waga: '1 funt',
      opis: 'Mała broń kłuta, łatwa do ukrycia.'
    },

    // Broń dystansowa
    łuk: {
      id: 'łuk',
      nazwa: 'Łuk',
      typ: 'broń_dystansowa',
      obrazenia: '1k6',
      zasieg: '60/120',
      koszt: 15,
      waga: '2 funty',
      opis: 'Broń dystansowa, wymagająca strzał.'
    },
    kusza: {
      id: 'kusza',
      nazwa: 'Kusza',
      typ: 'broń_dystansowa',
      obrazenia: '1k8',
      zasieg: '80/160',
      koszt: 25,
      waga: '8 funtów',
      opis: 'Broń dystansowa o dużej sile przebicia.'
    },
    proc: {
      id: 'proc',
      nazwa: 'Proc',
      typ: 'broń_dystansowa',
      obrazenia: '1k4',
      zasieg: '30/60',
      koszt: 2,
      waga: '0.5 funta',
      opis: 'Prosta broń dystansowa, używa kamieni jako amunicji.'
    }
  },

  // Zbroje
  zbroje: {
    skórzana: {
      id: 'skórzana',
      nazwa: 'Zbroja skórzana',
      typ: 'zbroja',
      obrona: '+1',
      koszt: 10,
      waga: '10 funtów',
      opis: 'Podstawowa zbroja z grubej skóry.'
    },
    kolczuga: {
      id: 'kolczuga',
      nazwa: 'Kolczuga',
      typ: 'zbroja',
      obrona: '+2',
      koszt: 50,
      waga: '25 funtów',
      opis: 'Zbroja z metalowych pierścieni.'
    },
    płyty: {
      id: 'płyty',
      nazwa: 'Zbroja płytowa',
      typ: 'zbroja',
      obrona: '+3',
      koszt: 150,
      waga: '45 funtów',
      opis: 'Ciężka zbroja z metalowych płyt.'
    }
  },

  // Tarcze
  tarcze: {
    mała: {
      id: 'tarcza_mała',
      nazwa: 'Tarcza mała',
      typ: 'tarcza',
      obrona: '+1',
      koszt: 5,
      waga: '2 funty',
      opis: 'Mała tarcza, łatwa do noszenia.'
    },
    duża: {
      id: 'tarcza_duża',
      nazwa: 'Tarcza duża',
      typ: 'tarcza',
      obrona: '+2',
      koszt: 10,
      waga: '6 funtów',
      opis: 'Duża tarcza, oferująca lepszą ochronę.'
    }
  },

  // Narzędzia i przedmioty
  narzedzia: {
    lina: {
      id: 'lina',
      nazwa: 'Lina',
      typ: 'narzędzie',
      koszt: 2,
      waga: '10 funtów',
      opis: '50 stóp liny, przydatna do wspinaczki.'
    },
    latarnia: {
      id: 'latarnia',
      nazwa: 'Latarnia',
      typ: 'narzędzie',
      koszt: 5,
      waga: '2 funty',
      opis: 'Źródło światła na 30 stóp.'
    },
    klucze: {
      id: 'klucze',
      nazwa: 'Zestaw kluczy',
      typ: 'narzędzie',
      koszt: 25,
      waga: '1 funt',
      opis: 'Narzędzia do otwierania zamków.'
    }
  },

  // Jedzenie i napoje
  prowiant: {
    chleb: {
      id: 'chleb',
      nazwa: 'Chleb',
      typ: 'jedzenie',
      koszt: 0.02,
      waga: '0.5 funta',
      opis: 'Podstawowe pożywienie.'
    },
    woda: {
      id: 'woda',
      nazwa: 'Woda',
      typ: 'napoje',
      koszt: 0.01,
      waga: '1 funt',
      opis: 'Czysta woda pitna.'
    },
    piwo: {
      id: 'piwo',
      nazwa: 'Piwo',
      typ: 'napoje',
      koszt: 0.05,
      waga: '1 funt',
      opis: 'Alkoholowy napój.'
    }
  }
};

export default ITEMS;
