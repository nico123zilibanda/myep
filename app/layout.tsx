import "./globals.css";

export const metadata = {
  title: "Mfumo wa Fursa za Vijana - Mlele",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sw">
      <body className="">{children}</body>
    </html>
  );
}
