import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import db from "@/lib/supabase/db";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/lib/providers/next-theme-providers";
import Header from "@/components/landing-page/header";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaForge",
  description: "Create Workspaces with an ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log(db);
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header/> */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
