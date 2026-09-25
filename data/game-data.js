/**
 * Dane gry - wszystkie tabele lookup dla Cienia Władcy Demonów
 * Źródło: Podręcznik główny + suplementy
 */

// Import wszystkich modułów danych
import ORIGINS from './origins.js';
import LEVELS from './levels.js';
import PATHS from './paths.js';
import ITEMS from './items.js';
import SPELLS from './spells.js';
import PROGRESSION from './progression.js';

const GAME_DATA = {
  // Poziomy postaci - system progresji
  poziomy: LEVELS,

  // Pochodzenia - wszystkie dostępne w podręcznikach
  pochodzenia: ORIGINS,

  // Ścieżki nowicjuszy - str. 51-70
  sciezki_nowicjuszy: PATHS.sciezki_nowicjuszy,

  // Ścieżki ekspertów (poziom 3)
  sciezki_ekspertow: PATHS.sciezki_ekspertow,

  // Ścieżki mistrzów (poziom 5)
  sciezki_mistrzow: PATHS.sciezki_mistrzow,

  // Ścieżki legend (poziom 7)
  sciezki_legend: PATHS.sciezki_legend,

  // Ścieżki kontynuacji (poziomy 2, 4, 6, 8)
  sciezki_kontynuacji: PATHS.sciezki_kontynuacji,

  // System progresji
  progresja: PROGRESSION,

  // Kalkulatory atrybutów
  obliczenia: {
    /**
     * Generuje losowe wartości atrybutów (3-18)
     * @returns {Object} Obiekt z atrybutami
     */
    losowe_atrybuty() {
      return {
        sila: Math.floor(Math.random() * 16) + 3,
        zrecznosc: Math.floor(Math.random() * 16) + 3,
        intelekt: Math.floor(Math.random() * 16) + 3,
        wola: Math.floor(Math.random() * 16) + 3
      };
    },

    /**
     * Oblicza atrybuty drugorzędne zgodnie z zasadami z PDF
     * @param {Object} atrybuty - Atrybuty główne postaci
     * @param {Object} pochodzenie - Dane pochodzenia
     * @param {number} poziom - Poziom postaci (0-10)
     * @returns {Object} Atrybuty drugorzędne
     */
    atrybuty_drugorzedne(atrybuty, pochodzenie) {
      // AC-008: Usunięto błędne modyfikatory rozmiaru wpływające na obronę
      // Zgodnie z PDF str. 17 - nie ma modyfikatorów rozmiaru wpływających na atrybuty
      
      return {
        percepcja: atrybuty.intelekt,
        obrona: Math.max(atrybuty.zrecznosc, 1),
        zdrowie: atrybuty.sila,
        szybkosc_zdrowienia: Math.floor(atrybuty.sila / 4) || 1,
        rozmiar: pochodzenie.rozmiar,
        predkosc: pochodzenie.predkosc,
        moc: 0
      };
    },

    /**
     * Rzuca wskazaną kością pomocniczą używaną przez losowe atrybuty bazowe
     * @param {string} kostka - Typ kości ('k3' lub 'k6')
     * @returns {number} Wynik rzutu
     */
    rzucKostkaAtrybutu(kostka) {
      if (kostka === 'k3') return Math.floor(Math.random() * 3) + 1;
      if (kostka === 'k6') return Math.floor(Math.random() * 6) + 1;
      throw new Error(`Nieznana kostka atrybutu bazowego: ${kostka}`);
    },

    /**
     * Oblicza atrybuty postaci zgodnie z zasadami tworzenia
     *
     * Niektóre pochodzenia (np. zwierzoludzie z Głodu w Pustce) mają w źródle
     * losowe atrybuty bazowe w postaci "1kX + modyfikator" zamiast stałych
     * liczb. Taka konfiguracja jest opisana w `pochodzenie.atrybuty_bazowe_losowe`
     * (obiekt {kostka, modyfikator} per atrybut) i ma pierwszeństwo przed
     * stałymi wartościami w `atrybuty_bazowe` - te ostatnie w takim przypadku
     * pozostają jako reprezentatywna wartość średnia, używana wyłącznie do
     * podglądu kafelka pochodzenia przed rzeczywistym utworzeniem postaci.
     * @param {Object} pochodzenie - Dane pochodzenia
     * @param {string|string[]} wybor_atrybutu - Atrybut(y) wybrane przez gracza jako
     *   bonus z pochodzenia (np. Człowiek: 1 atrybut, Elf: 2 atrybuty); wartość
     *   bonusu do każdego brana jest z pochodzenie.wybor_atrybutu.wartosc (domyślnie 1)
     * @returns {Object} Finalne atrybuty postaci
     */
    oblicz_atrybuty_poczatkowe(pochodzenie, wybor_atrybutu) {
      let atrybuty;

      if (pochodzenie.atrybuty_bazowe_losowe) {
        atrybuty = {};
        for (const [klucz, formula] of Object.entries(pochodzenie.atrybuty_bazowe_losowe)) {
          atrybuty[klucz] = this.rzucKostkaAtrybutu(formula.kostka) + formula.modyfikator;
        }
      } else {
        atrybuty = { ...pochodzenie.atrybuty_bazowe };
      }

      // Dodaj wybór gracza (bonus z pochodzenia do wybranego atrybutu/atrybutów)
      const wartosc = (pochodzenie.wybor_atrybutu && pochodzenie.wybor_atrybutu.wartosc) || 1;
      const wybraneAtrybuty = Array.isArray(wybor_atrybutu) ? wybor_atrybutu : (wybor_atrybutu ? [wybor_atrybutu] : []);
      wybraneAtrybuty.forEach(atr => {
        if (atr && atrybuty[atr] !== undefined) atrybuty[atr] += wartosc;
      });

      return atrybuty;
    },

    /**
     * Oblicza korzyści pochodzenia na poziomie 4
     * @param {Object} pochodzenie - Dane pochodzenia
     * @returns {Object} Korzyści z pochodzenia
     */
    korzysci_pochodzenia_poziom_4(pochodzenie) {
      return pochodzenie.poziom_4 || {};
    },

    /**
     * Oblicza wartość modyfikatora na podstawie atrybutu
     * @param {number} atrybut - Wartość atrybutu
     * @returns {number} Modyfikator
     */
    modyfikator_atrybutu(atrybut) {
      return Math.floor((atrybut - 10) / 2);
    }
  },

  // Przedmioty i wyposażenie
  przedmioty: ITEMS,

  // Zaklęcia i magia
  zaklecia: SPELLS,

  // Dodatkowe funkcje pomocnicze
  utils: {
    /**
     * Formatuje modyfikator atrybutu
     * @param {number} modyfikator - Wartość modyfikatora
     * @returns {string} Sformatowany modyfikator
     */
    formatujModyfikator(modyfikator) {
      if (modyfikator >= 0) {
        return `+${modyfikator}`;
      }
      return `${modyfikator}`;
    },

    /**
     * Sprawdza czy pochodzenie istnieje
     * @param {string} id - ID pochodzenia
     * @returns {boolean} True jeśli pochodzenie istnieje
     */
    czyPochodzenieIstnieje(id) {
      return Object.prototype.hasOwnProperty.call(ORIGINS, id);
    },

    /**
     * Sprawdza czy poziom istnieje
     * @param {number} poziom - Poziom postaci
     * @returns {boolean} True jeśli poziom istnieje
     */
    czyPoziomIstnieje(poziom) {
      return Object.prototype.hasOwnProperty.call(LEVELS, poziom);
    },

    /**
     * Zwraca listę wszystkich dostępnych pochodzeń
     * @returns {Array} Lista ID pochodzeń
     */
    pobierzListePochodzen() {
      return Object.keys(ORIGINS);
    },

    /**
     * Zwraca listę wszystkich dostępnych poziomów
     * @returns {Array} Lista poziomów
     */
    pobierzListePoziomow() {
      return Object.keys(LEVELS).map(Number);
    }
  }
};

export default GAME_DATA;