import en from "./locales/en.json";
import sw from "./locales/sw.json";

export const dictionaries = {
  en,
  sw,
};

export type Locale = keyof typeof dictionaries;