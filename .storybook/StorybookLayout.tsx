import React from "react";
import { DM_Sans, DM_Mono, DM_Serif_Text } from "next/font/google";
import { ThemeProvider } from "../context/ThemeContext";
import { AgGridProvider } from "../components/providers/ag-grid-provider";
import { cn } from "../lib/utils";

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

// ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️
// WARNING - YOU MUST KEEP THIS IN SYNC WITH THE APP LAYOUT
// TODO - obviously don't have duplicates here, but do it in
// a way that takes advantage of importing symbols in the real
// html head and ideally doesn't add another root div element
// ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️

export default function StorybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');`,
        }}
      />
      <div
        className={cn(
          `${dmSans.variable} ${dmMono.variable} ${dmSerifText.variable} antialiased`,
          // additional styles to ensure components appear correctly
          // in dark mode w/o a full app wrapper
          "bg-sidebar p-2 w-full",
        )}
      >
        <ThemeProvider>
          <AgGridProvider>{children}</AgGridProvider>
        </ThemeProvider>
      </div>
    </>
  );
}
