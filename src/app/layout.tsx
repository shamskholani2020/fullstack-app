import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "البدر",
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
        <meta name="application-name" content="البدر" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-cairo antialiased bg-gray-50">
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="md:mr-64 pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
