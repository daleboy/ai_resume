import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import {ThemeProvider}  from "@/context/theme-provider"
import TopNav from "@/components/nav/top-nav";
import ResumeProvider from "@/context/resume"
import {ClerkProvider} from '@clerk/nextjs'

const inter = Inter({subsets:["latin"]});

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description: "AI powered resume builder to build a professional resume in minutes.Download print or share for free with anyone in the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <ResumeProvider>
        <TopNav/>
        {children}
        </ResumeProvider>
        </ThemeProvider>
      </body>
      
    </html>
    </ClerkProvider>
  );
}
