/**
 * Polska paczka językowa - punkt wejścia.
 *
 * Teksty są podzielone na pliki tematyczne, żeby plik językowy dał się czytać
 * i tłumaczyć partiami. Dodanie kolejnego języka polega na skopiowaniu tego
 * katalogu, przetłumaczeniu wartości (klucze zostają bez zmian) i
 * zarejestrowaniu go w LOCALES w i18n/index.js.
 */

import ui from './ui.js';
import paths from './paths.js';
import professions from './professions.js';
import magic from './magic.js';
import equipment from './equipment.js';
import summary from './summary.js';
import messages from './messages.js';
import help from './help.js';

export default {
  ...ui,
  paths,
  professions,
  magic,
  equipment,
  summary,
  messages,
  help: { ...ui.help, ...help }
};
