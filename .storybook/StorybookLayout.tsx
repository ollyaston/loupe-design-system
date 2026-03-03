import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../context/ThemeContext";
import { AgGridProvider } from "../components/providers/ag-grid-provider";
import { cn } from "../lib/utils";

import "../styles/globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
          `${geist.variable} ${geistMono.variable} antialiased`,
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
