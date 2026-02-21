"use client";

import { toast } from "sonner";
import translate from "./i18n/translate";
import { MessageKey } from "./messages";
import { useLanguage } from "./i18n/LanguageContext";
export function useAppToast() {
  const { lang } = useLanguage();

function showSuccess(messageKey: MessageKey) {
  toast.success(translate(messageKey, lang));
}

function showError(messageKey: MessageKey) {
  toast.error(translate(messageKey, lang));
}

function showInfo(messageKey: MessageKey) {
  toast(translate(messageKey, lang));
}

  return { showSuccess, showError, showInfo };
}