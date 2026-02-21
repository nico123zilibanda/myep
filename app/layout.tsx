import "./globals.css";
import AuthGate from "@/components/providers/AuthGate";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Toaster } from "sonner";

export const metadata = {
  title: "Mleledc.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sw" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthGate>
             <LanguageProvider>
            {children}
             <Toaster richColors position="top-right" />
             </LanguageProvider>
          </AuthGate>
        </ThemeProvider>
      </body>
    </html>
  );
}


