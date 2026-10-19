import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--serif" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--sans" });

export const metadata = { title: "Luce – votre agent de voyage", description: "Dites où vous allez. Luce prépare le voyage, vous validez." };
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#15112b" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
