/**
 * Progresja atrybutów i bonusy na poziomach
 * Źródło: System Cień Władcy Demonów
 */

const PROGRESSION = {
  /**
   * Oblicza bonusy atrybutów na podstawie poziomu postaci
   * @param {number} poziom - Poziom postaci (1-10)
   * @returns {Object} Bonusy atrybutów
   */
  obliczBonusyAtrybutow(poziom) {
    const bonusy = {
      sila: 0,
      zrecznosc: 0,
      intelekt: 0,
      wola: 0
    };

    // System progresji atrybutów na poziomach
    switch (poziom) {
    case 1:
    case 2:
      // Poziomy 1-2: Brak bonusów
      break;
    case 3:
      // Poziom 3: +1 do wybranego atrybutu (ekspert)
      bonusy.wybrany = 1;
      break;
    case 4:
      // Poziom 4: +1 do innego atrybutu (rozwój eksperta)
      bonusy.wybrany = 1;
      break;
    case 5:
      // Poziom 5: +1 do wybranego atrybutu (mistrz)
      bonusy.wybrany = 1;
      break;
    case 6:
      // Poziom 6: +1 do innego atrybutu (rozwój mistrza)
      bonusy.wybrany = 1;
      break;
    case 7:
      // Poziom 7: +1 do wybranego atrybutu (legenda)
      bonusy.wybrany = 1;
      break;
    case 8:
      // Poziom 8: +1 do innego atrybutu (rozwój legendy)
      bonusy.wybrany = 1;
      break;
    case 9:
      // Poziom 9: +1 do dwóch atrybutów (arcymistrz)
      bonusy.wybrany = 2;
      break;
    case 10:
      // Poziom 10: +1 do wszystkich atrybutów (nieśmiertelny)
      bonusy.sila = 1;
      bonusy.zrecznosc = 1;
      bonusy.intelekt = 1;
      bonusy.wola = 1;
      break;
    default:
      break;
    }

    return bonusy;
  },

  /**
   * Zwraca listę dostępnych ścieżek dla danego poziomu
   * @param {number} poziom - Poziom postaci
   * @returns {Array} Lista dostępnych ścieżek
   */
  pobierzSciezkiPoziomu(poziom) {
    const sciezkiPoziomu = {
      1: ['wojownik', 'mag', 'kapłan', 'łotr'],
      2: ['kontynuacja_nowicjusza'],
      3: ['berserker', 'czarodziej', 'uzdrowiciel', 'zabójca', 'strzelec', 'iluzjonista', 'paladyn', 'szpieg'],
      4: ['kontynuacja_eksperta'],
      5: ['barbarzyńca', 'arcymag', 'święty', 'cień', 'mistrz_łuku', 'mistrz_iluzji', 'mistrz_światła', 'mistrz_cienia'],
      6: ['kontynuacja_mistrza'],
      7: ['władca_wojny', 'władca_magii', 'władca_życia', 'władca_śmierci', 'władca_łuku', 'władca_iluzji', 'władca_światła', 'władca_cienia'],
      8: ['kontynuacja_legendy'],
      9: ['wszystkie_ścieżki'],
      10: ['wszystkie_ścieżki']
    };

    return sciezkiPoziomu[poziom] || [];
  },

  /**
   * Oblicza całkowite bonusy zdrowia z wszystkich ścieżek
   * @param {Array} sciezki - Lista wybranych ścieżek
   * @returns {number} Suma bonusów zdrowia
   */
  obliczBonusyZdrowia(sciezki) {
    let bonusZdrowia = 0;
    
    sciezki.forEach(sciezka => {
      if (sciezka.poziom_1 && sciezka.poziom_1.zdrowie) {
        const bonus = parseInt(sciezka.poziom_1.zdrowie.replace('+', ''));
        if (!isNaN(bonus)) {
          bonusZdrowia += bonus;
        }
      }
    });

    return bonusZdrowia;
  },

  /**
   * Oblicza całkowite bonusy mocy z wszystkich ścieżek
   * @param {Array} sciezki - Lista wybranych ścieżek
   * @returns {number} Suma bonusów mocy
   */
  obliczBonusyMocy(sciezki) {
    let bonusMocy = 0;
    
    sciezki.forEach(sciezka => {
      if (sciezka.poziom_1 && sciezka.poziom_1.moc) {
        const bonus = parseInt(sciezka.poziom_1.moc.replace('+', ''));
        if (!isNaN(bonus)) {
          bonusMocy += bonus;
        }
      }
    });

    return bonusMocy;
  },

  /**
   * Zwraca opis poziomu postaci
   * @param {number} poziom - Poziom postaci
   * @returns {Object} Informacje o poziomie
   */
  pobierzOpisPoziomu(poziom) {
    const opisy = {
      1: {
        nazwa: 'Nowicjusz',
        opis: 'Początkowa postać ucząca się podstaw swojej ścieżki.',
        kluczowe_cechy: ['Podstawowe umiejętności', 'Wybieranie ścieżki nowicjusza']
      },
      2: {
        nazwa: 'Nowicjusz+',
        opis: 'Rozwój podstawowych umiejętności nowicjusza.',
        kluczowe_cechy: ['Dodatkowe talenty', 'Większe zdrowie']
      },
      3: {
        nazwa: 'Ekspert',
        opis: 'Specjalizacja w konkretnej dziedzinie.',
        kluczowe_cechy: ['Wybór ścieżki eksperta', 'Pierwszy bonus atrybutu']
      },
      4: {
        nazwa: 'Ekspert+',
        opis: 'Zaawansowany rozwój ścieżki eksperta.',
        kluczowe_cechy: ['Dodatkowe umiejętności', 'Drugi bonus atrybutu']
      },
      5: {
        nazwa: 'Mistrz',
        opis: 'Osiągnięcie mistrzostwa w wybranej dziedzinie.',
        kluczowe_cechy: ['Wybór ścieżki mistrza', 'Trzeci bonus atrybutu']
      },
      6: {
        nazwa: 'Mistrz+',
        opis: 'Zaawansowane mistrzostwo.',
        kluczowe_cechy: ['Dodatkowe talenty mistrza', 'Czwarty bonus atrybutu']
      },
      7: {
        nazwa: 'Legenda',
        opis: 'Osiągnięcie legendarnych umiejętności.',
        kluczowe_cechy: ['Wybór ścieżki legendy', 'Piąty bonus atrybutu']
      },
      8: {
        nazwa: 'Legenda+',
        opis: 'Zaawansowane umiejętności legendarne.',
        kluczowe_cechy: ['Dodatkowe talenty legendy', 'Szósty bonus atrybutu']
      },
      9: {
        nazwa: 'Arcymistrz',
        opis: 'Dostęp do wszystkich ścieżek i umiejętności.',
        kluczowe_cechy: ['Wszystkie ścieżki', 'Podwójny bonus atrybutów']
      },
      10: {
        nazwa: 'Nieśmiertelny',
        opis: 'Maksymalny rozwój postaci - prawie boskie moce.',
        kluczowe_cechy: ['Wszystkie umiejętności', 'Bonus do wszystkich atrybutów']
      }
    };

    return opisy[poziom] || opisy[1];
  }
};

export default PROGRESSION;
