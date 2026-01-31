import type { MessageKey } from "@/lib/messages";

export interface ApiResponse {
  success: boolean;
  messageKey: MessageKey;
}
