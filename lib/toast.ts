// lib/toast.ts
// Centralized toast handler using `sonner`
// Senior pattern: UI messages resolved from messageKey

import { toast } from "sonner";
import { messages, MessageKey } from "@/lib/messages";

export function showSuccess(messageKey: MessageKey) {
  toast.success(messages[messageKey]);
}

export function showError(messageKey: MessageKey) {
  toast.error(messages[messageKey]);
}

export function showInfo(messageKey: MessageKey) {
  toast(messages[messageKey]);
}
