"use client";

import { useLanguage } from "./LanguageContext";
import { dictionaries } from "./dictionaries";

export function useDictionary() {
  const { lang } = useLanguage();

  return (key: string) => {
    return dictionaries[lang]?.[key as keyof typeof dictionaries.en] || key;
  };
}