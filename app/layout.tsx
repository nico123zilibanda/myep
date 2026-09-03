import type { Metadata } from "next";

import "./globals.css";

import AuthGate from "@/components/providers/AuthGate";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Mlele DC Fursa Portal",

  description:
    "Mfumo rasmi wa kidijitali wa Halmashauri ya Wilaya ya Mlele kwa ajili ya fursa za ajira, mafunzo, mikopo na huduma nyingine za maendeleo kwa wananchi.",

  applicationName: "Mlele DC Digital Services",

  authors: [
    { name: "Mlele Fursa Potal" },
  ],

  keywords: [
    "Halmashauri ya Mlele",
    "Mlele District Council",
    "Serikali ya Tanzania",
    "Fursa",
    "Mafunzo",
    "Ajira",
  ],
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

          text-foreground
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