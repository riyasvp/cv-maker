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
  title: {
    default: "YallaCV - Free CV & Resume Builder for UAE Professionals",
    template: "%s | YallaCV"
  },
  description: "Create professional CVs and resumes for free. YallaCV helps UAE professionals build impressive resumes instantly. AI-powered enhancement, ATS-optimized templates.",
  keywords: ["CV maker", "resume builder", "Dubai resume", "UAE CV", "ATS friendly resume", "professional resume", "free CV maker", "AI resume", "job search", "career", "YallaCV"],
  authors: [{ name: "YallaCV Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "YallaCV | Build CEO-Level Resumes in Seconds",
    description: "Create stunning, ATS-optimized resumes with AI. Professional templates, instant PDF download.",
    url: "https://yallacv.online",
    siteName: "YallaCV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YallaCV | Build CEO-Level Resumes in Seconds",
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
