// lib/audit.ts
import { supabaseAdmin } from "@/lib/supabaseAdmin";
export type AuditAction =
  | "CREATE"
  | "LOGIN_BLOCKED"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "READ"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "REGISTER_SUCCESS"
  | "REGISTER_FAILED"
  | "REGISTER"
  | "PUBLISH"
  | "ANSWER"
  | "SAVE";


export type AuditEntity =
  | "USER"
  | "CATEGORY"
  | "OPPORTUNITY"
  | "TRAINING"
  | "PROFILE"
  | "QUESTION"
  | "AUTH"
  | "YOUTH"
  | "SAVED_OPPORTUNITY";


interface AuditLogInput {
  action: AuditAction;
  entity: AuditEntity;
  entityId?: string | number | null;

  userId?: string | null;
  role?: "ADMIN" | "YOUTH" | null;

  description: string;

  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function logAudit(data: AuditLogInput) {
  try {
    await supabaseAdmin.from("AuditLog").insert({
      action: data.action,
      entity: data.entity,
      entityId: data.entityId ? String(data.entityId) : null,

      userId: data.userId ?? null,
      role: data.role ?? null,

      description: data.description,

      ipAddress: data.ipAddress ?? null,
      userAgent: data.userAgent ?? null,
    });
  } catch (error) {
    // 🔥 IMPORTANT: logging failure must NEVER crash system
    console.error("AUDIT LOG ERROR:", error);
  }
}
