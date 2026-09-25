/**
 * Treść gry w aktywnym języku - patrz data/content.js.
 *
 * Ten plik jest wyłącznie przekierowaniem: same dane mieszkają w
 * data/<język>/origin_tables.js. Dzięki temu miejsca korzystające z danych importują
 * je tą samą, stabilną ścieżką, a język treści wybiera się w jednym pliku.
 */

import CONTENT from './content.js';

export default CONTENT.ORIGIN_TABLES;
