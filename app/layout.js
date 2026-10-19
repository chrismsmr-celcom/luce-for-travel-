import { Nunito } from "next/font/google";
import "./globals.css";

const sans = Nunito({ subsets: ["latin"], variable: "--sans" });

export const metadata = { title: "Luce – votre agent de voyage", description: "Dites où vous allez. Luce prépare le voyage, vous validez." };
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#aab1dc" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
