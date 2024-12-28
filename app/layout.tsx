import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GREE | Kalkulator doboru pompy ciepła",
  description: "Kalkulator doboru pompy ciepła to specjalistyczne narzędzie online lub aplikacja, które pomaga określić optymalną moc i rodzaj pompy ciepła dla konkretnego budynku. Na podstawie wprowadzonych danych.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} antialiased flex flex-col items-center`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
