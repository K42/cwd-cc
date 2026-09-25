/**
 * Polski zestaw treści gry - punkt wejścia.
 *
 * Zbiera dane, których wartości są tekstem w konkretnym języku: nazwy i
 * opisy pochodzeń, ścieżek, zaklęć, talentów, profesji, kuriozów,
 * przedmiotów, poziomów i tabel losowych.
 *
 * Dodanie kolejnego języka polega na skopiowaniu tego katalogu,
 * przetłumaczeniu wartości i zarejestrowaniu katalogu w data/content.js.
 *
 * WAŻNE dla tłumacza: identyfikatory muszą zostać BEZ ZMIAN - pola `id`
 * oraz klucze obiektów (np. `czlowiek`, `wojownik`, `pospolity`). Na nich
 * opiera się logika kreatora, a także postacie już zapisane i
 * wyeksportowane przez graczy. Tłumaczy się wyłącznie wartości opisowe:
 * `nazwa`, `opis`, teksty tabel i podobne.
 */

import SPELLS from './spells.js';
import ORIGIN_TABLES from './origin_tables.js';
import ORIGINS, { OPTION_TALENT_PREFIX } from './origins.js';
import CURIOS from './curios.js';
import PROFESSIONS from './professions.js';
import EQUIPMENT from './equipment.js';
import ITEMS from './items.js';
import LEVELS from './levels.js';
import PROGRESSION from './progression.js';
import { ORIGIN_DESCRIPTIONS_SHORT, ORIGIN_DESCRIPTIONS_EXTENDED } from './origin_descriptions.js';
import PATHS, { ROGUERY_TALENTS } from './paths.js';
import { TRADITIONS, RELIGIOUS_TRADITIONS } from './traditions.js';
import { WEALTH } from './wealth.js';
import { TALENT_DESCRIPTIONS } from './talents.js';
import { EXTENDED_ORIGINS } from './origins_extended.js';

export default {
  SPELLS,
  ORIGIN_TABLES,
  ORIGINS,
  ORIGIN_OPTION_TALENT_PREFIX: OPTION_TALENT_PREFIX,
  CURIOS,
  PROFESSIONS,
  EQUIPMENT,
  ITEMS,
  LEVELS,
  PROGRESSION,
  ORIGIN_DESCRIPTIONS_SHORT,
  ORIGIN_DESCRIPTIONS_EXTENDED,
  PATHS,
  ROGUERY_TALENTS,
  TRADITIONS,
  RELIGIOUS_TRADITIONS,
  WEALTH,
  TALENTS: TALENT_DESCRIPTIONS,
  ORIGINS_EXTENDED: EXTENDED_ORIGINS
};
