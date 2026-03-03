import type { Metadata } from "next";
import { DM_Sans, DM_Mono, DM_Serif_Text } from "next/font/google";
import "../styles/globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  // eslint-disable-next-line agent-loupe-ui/sentence-case -- brand name
  title: "Loupe Design System",
  // eslint-disable-next-line agent-loupe-ui/sentence-case -- brand name
  description: "Loupe Design System component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${dmSerifText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
