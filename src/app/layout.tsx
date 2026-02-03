import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "بادر - Bader",
  description: "منصة شاملة للنجارين - أدوات، قياسات، وأكثر",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B7355" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        <main className="font-cairo antialiased">
          {children}
        </main>
      </body>
    </html>
  );
}
