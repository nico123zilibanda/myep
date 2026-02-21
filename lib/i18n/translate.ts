import en from "./locales/en.json"
import sw from "./locales/sw.json"
import { MessageKey } from "../messages"

export type Language = "en" | "sw"

const dictionaries: Record<Language, typeof en> = {
  en,
  sw,
}

export default function translate(
  key: MessageKey,
  language: Language
): string {
  const translation = dictionaries[language][key]

  if (!translation) {
    console.warn(`Missing translation for key: ${key}`)
    return key
  }

  return translation
}