import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Maker Pro | Build CEO-Level Resumes in Seconds",
  description: "Create stunning, ATS-optimized resumes tailored for Dubai & UAE job market. AI-powered enhancement, professional templates, instant PDF download. Land your dream job faster!",
  keywords: ["CV maker", "resume builder", "Dubai resume", "UAE CV", "ATS friendly resume", "professional resume", "free CV maker", "AI resume", "job search", "career"],
  authors: [{ name: "CV Maker Pro Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CV Maker Pro | Build CEO-Level Resumes in Seconds",
    description: "Create stunning, ATS-optimized resumes with AI. Professional templates, instant PDF download.",
    url: "https://cv-maker-pro.com",
    siteName: "CV Maker Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Maker Pro | Build CEO-Level Resumes in Seconds",
    description: "Create stunning, ATS-optimized resumes with AI. Land your dream job faster!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6819535548939423" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6819535548939423"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
