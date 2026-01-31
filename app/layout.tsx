import "./globals.css";
import AuthGate from "@/components/providers/AuthGate";
import { Toaster } from "sonner";
export const metadata = {
  title: "Mfumo wa Fursa za Vijana - Mlele",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sw" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <AuthGate>
          {children}
          <Toaster richColors position="top-right" />

        </AuthGate>
      </body>
    </html>
  );
}
