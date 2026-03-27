import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { uz } from "./locales/uz";

export const uiTranslations = { uz, en, ru };

export function getUiTranslations(locale) {
  return uiTranslations[locale] ?? uiTranslations.uz;
}
