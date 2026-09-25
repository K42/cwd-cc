/**
 * Logika budowania postaci - przeniesiona z dawnego src/server.js
 * Czyste funkcje bez efektów ubocznych, wywoływane bezpośrednio przez UI
 * zamiast przez endpointy /api/build, /api/build-complete i /api/calculate-level-benefits.
 */

import GAME_DATA from '../data/game-data.js';
import { getBenefitKeyForLevel } from '../data/paths.js';

/**
 * Buduje postać na podstawie specyfikacji zgodnie z zasadami z PDF
 * @param {Object} spec - Specyfikacja postaci
 * @param {string} spec.pochodzenie - ID pochodzenia
 * @param {string|string[]} [spec.wybor_atrybutu] - Atrybut(y) wybrane jako bonus
 *   z pochodzenia (np. Człowiek: 1 atrybut, Elf: 2 atrybuty)
 * @param {string} [spec.sciezka] - ID ścieżki
 * @param {number} [spec.poziom] - Poziom postaci (0-10, domyślnie 0)
 * @returns {Object} Obiekt postaci
 */
function buildCharacter(spec) {
  // Walidacja danych wejściowych
  if (!spec.pochodzenie) {
    throw new Error('Brak pochodzenia postaci');
  }

  const pochodzenie = GAME_DATA.pochodzenia[spec.pochodzenie];
  if (!pochodzenie) {
    throw new Error(`Nieznane pochodzenie: ${spec.pochodzenie}`);
  }

  // Poziom postaci - domyślnie 1 (Nowicjusz) - gra nie ma poziomu 0
  const levelCharacter = spec.poziom !== undefined ? parseInt(spec.poziom) : 1;

  // Sprawdzenie czy poziom istnieje
  const levelData = GAME_DATA.poziomy[levelCharacter];
  if (!levelData) {
    throw new Error(`Nieznany poziom: ${levelCharacter}`);
  }

  // Oblicz atrybuty zgodnie z zasadami z PDF
  const attributesFinal = GAME_DATA.obliczenia.oblicz_atrybuty_poczatkowe(pochodzenie, spec.wybor_atrybutu);

  // Oblicz atrybuty drugorzędne z modyfikatorami rozmiaru
  const secondary = GAME_DATA.obliczenia.atrybuty_drugorzedne(attributesFinal, pochodzenie, levelCharacter);

  // Pobierz ścieżkę jeśli podana
  let pathData = null;
  if (spec.sciezka) {
    // Sprawdź w odpowiedniej kategorii ścieżek na podstawie poziomu
    if (levelCharacter >= 1 && levelCharacter <= 2 && GAME_DATA.sciezki_nowicjuszy[spec.sciezka]) {
      pathData = GAME_DATA.sciezki_nowicjuszy[spec.sciezka];
    } else if (levelCharacter >= 3 && levelCharacter <= 6 && GAME_DATA.sciezki_ekspertow[spec.sciezka]) {
      pathData = GAME_DATA.sciezki_ekspertow[spec.sciezka];
    } else if (levelCharacter >= 7 && GAME_DATA.sciezki_mistrzow[spec.sciezka]) {
      pathData = GAME_DATA.sciezki_mistrzow[spec.sciezka];
    }
  }

  // Dodaj korzyści z pochodzenia na poziomie 4
  let benefitsOrigin = {};
  if (levelCharacter === 4) {
    benefitsOrigin = GAME_DATA.obliczenia.korzysci_pochodzenia_poziom_4(pochodzenie);
  }

  // Składanie finalnego obiektu postaci
  return {
    pochodzenie,
    poziom: levelData,
    atrybuty: attributesFinal,
    atrybuty_drugorzedne: secondary,
    sciezka: pathData,
    korzysci_pochodzenia: benefitsOrigin,
    profesje: pochodzenie.profesje,
    jezyki: pochodzenie.jezyki,
    cechy_specjalne: pochodzenie.cechy_specjalne,
    utworzono: new Date().toISOString()
  };
}

/**
 * Oblicza korzyści dla wybranego poziomu
 * @param {number} poziom - Wybrany poziom (0-10)
 * @param {Object} spec - Specyfikacja postaci
 * @param {string} spec.pochodzenie - ID pochodzenia
 * @param {string} [spec.sciezka_nowicjusza] - ID ścieżki nowicjusza
 * @param {string} [spec.sciezka_ekspercka] - ID ścieżki eksperckiej
 * @param {string} [spec.sciezka_mistrzowska] - ID ścieżki mistrzowskiej
 * @returns {Object} Korzyści dla poziomu
 */
function calculateBenefitsLevel(poziom, spec) {
  const levelData = GAME_DATA.poziomy[poziom];
  if (!levelData) {
    throw new Error(`Nieznany poziom: ${poziom}`);
  }

  const pochodzenie = GAME_DATA.pochodzenia[spec.pochodzenie];
  if (!pochodzenie) {
    throw new Error(`Nieznane pochodzenie: ${spec.pochodzenie}`);
  }

  const result = {
    poziom,
    nazwa_poziomu: levelData.nazwa,
    opis_poziomu: levelData.opis,
    zrodlo_korzysci: levelData.zrodlo_korzysci,
    korzyści: {}
  };

  /**
   * Wpisuje do wyniku korzyści wybranej ścieżki dla bieżącego poziomu.
   * Klucz korzyści bierze z data/paths.js, bo dla ścieżek eksperckich i
   * mistrzowskich pierwszy pakiet leży pod `poziom_1` (moment wyboru
   * ścieżki), a nie pod numerem poziomu postaci.
   */
  const przypiszKorzysciSciezki = (groupKey, pathId) => {
    if (!pathId) return;
    const sciezka = GAME_DATA[groupKey] && GAME_DATA[groupKey][pathId];
    if (!sciezka) return;
    const klucz = getBenefitKeyForLevel(groupKey, poziom);
    result.korzyści = (klucz && sciezka[klucz]) || {};
    result.nazwa_sciezki = sciezka.nazwa;
    result.zrodlo_sciezki = sciezka.zrodlo;
  };

  // Zależnie od źródła korzyści
  switch (levelData.zrodlo_korzysci) {
  case 'pochodzenie':
    // Poziom 4 - korzyści z pochodzenia
    if (poziom === 4 && pochodzenie.poziom_4) {
      result.korzyści = pochodzenie.poziom_4;
    }
    break;

  case 'sciezka_nowicjusza':
    przypiszKorzysciSciezki('sciezki_nowicjuszy', spec.sciezka_nowicjusza);
    break;

  case 'sciezka_ekspercka':
    przypiszKorzysciSciezki('sciezki_ekspertow', spec.sciezka_ekspercka);
    break;

  case 'sciezka_mistrzowska':
    przypiszKorzysciSciezki('sciezki_mistrzow', spec.sciezka_mistrzowska);
    break;
  }

  return result;
}

/**
 * Buduje kompletną postać z progresją poziomów (1-10)
 * @param {Object} spec - Specyfikacja postaci
 * @returns {Object} Kompletny obiekt postaci z progresją
 */
function buildCharacterComplete(spec) {
  // Buduj podstawową postać
  const characterBase = buildCharacter(spec);

  // Dodaj progresję atrybutów na podstawie poziomu
  const bonusesLevel = GAME_DATA.progresja.obliczBonusyAtrybutow(characterBase.poziom.id);

  // Dodaj bonusy ze ścieżek
  const sciezki = spec.sciezki || [];
  const bonusesHealth = GAME_DATA.progresja.obliczBonusyZdrowia(sciezki);
  const bonusesPower = GAME_DATA.progresja.obliczBonusyMocy(sciezki);

  // Oblicz finalne atrybuty z progresją
  const attributesFinal = {
    sila: characterBase.atrybuty.sila + (bonusesLevel.sila || 0),
    zrecznosc: characterBase.atrybuty.zrecznosc + (bonusesLevel.zrecznosc || 0),
    intelekt: characterBase.atrybuty.intelekt + (bonusesLevel.intelekt || 0),
    wola: characterBase.atrybuty.wola + (bonusesLevel.wola || 0)
  };

  // Aktualizuj atrybuty drugorzędne
  const attributesSecondary = GAME_DATA.obliczenia.atrybuty_drugorzedne(attributesFinal, characterBase.pochodzenie);
  attributesSecondary.zdrowie += bonusesHealth;
  attributesSecondary.moc += bonusesPower;

  // Dodaj informacje o progresji
  const progresja = {
    poziom: characterBase.poziom,
    bonusy_poziomu: bonusesLevel,
    bonusy_zdrowia: bonusesHealth,
    bonusy_mocy: bonusesPower,
    wybrane_sciezki: sciezki,
    opis_poziomu: GAME_DATA.progresja.pobierzOpisPoziomu(characterBase.poziom.id)
  };

  return {
    ...characterBase,
    atrybuty: attributesFinal,
    atrybuty_drugorzedne: attributesSecondary,
    progresja,
    typ_eksportu: 'kompletna'
  };
}

export { buildCharacter, calculateBenefitsLevel, buildCharacterComplete };
