/**
 * Rejestr treści gry - JEDYNE miejsce, w którym wybiera się język danych.
 *
 * Podział odpowiedzialności:
 * - i18n/ trzyma teksty interfejsu (etykiety, komunikaty, pomoc) i potrafi je
 *   przełączyć na żywo, bez przeładowania strony,
 * - data/<język>/ trzyma treść gry (nazwy i opisy pochodzeń, ścieżek, zaklęć,
 *   talentów, przedmiotów) - tego jest kilkaset tysięcy znaków i ładuje się
 *   statycznie razem z modułami, więc zmiana języka treści wymaga
 *   przeładowania strony.
 *
 * Aby dodać język:
 *   1. skopiuj katalog data/pl na data/<kod> i przetłumacz wartości
 *      (identyfikatory zostawiając bez zmian - zob. komentarz w data/pl/index.js),
 *   2. zmień import poniżej na nowy katalog.
 *
 * Statyczny import jest tu celowy: gdyby treść doładowywała się dynamicznie,
 * każdy moduł czytający dane musiałby czekać na jej gotowość, a kreator
 * renderuje synchronicznie.
 */

import PL from './pl/index.js';

/** Kod języka, w którym jest aktualnie wbudowana treść gry. */
export const CONTENT_LOCALE = 'pl';

/** Aktywny zestaw treści gry. */
const CONTENT = PL;

export default CONTENT;
