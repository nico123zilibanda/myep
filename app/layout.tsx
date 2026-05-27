import type { Metadata } from "next";

import "./globals.css";

import AuthGate from "@/components/providers/AuthGate";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "MLELE DC FURSA PORTAL",

  description:
    "Mfumo wa fursa kwa vijana wa Wilaya ya Mlele",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sw"
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen

          bg-background

          font-sans

          antialiased
        "
      >
        <ThemeProvider>
          <AuthGate>
            <LanguageProvider>
              {children}

              <Toaster
                richColors
                position="top-right"
                closeButton
                expand
                duration={4000}
              />
            </LanguageProvider>
          </AuthGate>
        </ThemeProvider>
      </body>
    </html>
  );
}