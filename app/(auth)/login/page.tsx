
import type { Metadata } from "next";

import AuthLayout from "@/components/auth/AuthLayout";

import LoginForm from "@/components/auth/LoginForm";

/* ================= METADATA ================= */

export const metadata: Metadata = {
  title: "Ingia | Mlele DC Fursa Portal",

  description:
    "Ingia kwenye mfumo wa Mlele DC Fursa Portal kuendelea kupata fursa, mafunzo na huduma mbalimbali za maendeleo kwa vijana.",
};

/* ================= PAGE ================= */

export default function LoginPage() {
  return (
    <AuthLayout
      title="Karibu Tena 👋"
      subtitle="
        Ingia kwenye akaunti yako
        kuendelea kutumia mfumo.
      "
    >
      <LoginForm />
    </AuthLayout>
  );
}

