"use client";

import React from "react";

import GovernmentFormShell from "@/components/government/GovernmentFormShell";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

/**
 * AuthLayout
 * --------------------------------------------------------------
 * Thin wrapper that re-exposes the legacy (title, subtitle)
 * shape used by the existing auth pages, while delegating all
 * visual presentation to the reusable `GovernmentFormShell`.
 *
 * The shell handles:
 *   - Tanzania logo identity panel (left)
 *   - Halmashauri identity card
 *   - Form title + description
 *   - Responsive stacking (mobile)
 *   - Government footer line
 *
 * Individual forms remain unchanged — they keep their own
 * submit logic and field definitions.
 */
export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <GovernmentFormShell
      title={title}
      description={subtitle}
      maxWidth="md"
    >
      {children}
    </GovernmentFormShell>
  );
}
