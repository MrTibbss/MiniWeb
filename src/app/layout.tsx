import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "MiniWeb",
  description: "A sleek in-app style browser with WalletConnect + Farcaster"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
