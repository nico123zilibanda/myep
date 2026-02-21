"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

type Lang = "sw" | "en";

type TranslationKey = keyof typeof translations.sw;

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("sw");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me");
      const result = await res.json();

      if (result.success) {
        setLang(result.data.language);
      }

      setLoaded(true);
    }

    loadUser();
  }, []);

  const t = (key: TranslationKey) => {
    return translations[lang][key] || key;
  };

  if (!loaded) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
};
