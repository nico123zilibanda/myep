import en from "./locales/en.json";
import sw from "./locales/sw.json";

type Dictionary = typeof en;

export const dictionaries: Record<"en" | "sw", Dictionary> = {
  en,
  sw,
};

export type Locale = keyof typeof dictionaries;