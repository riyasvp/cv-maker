import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Dubai-CV-Pro | Build CEO-Level Resumes for the UAE Job Market",
  description: "Create ATS-optimized, professional resumes tailored specifically for Dubai and UAE job market. AI-powered enhancement, executive templates, and instant PDF download. Trusted by 10,000+ professionals.",
  keywords: ["Dubai resume", "UAE CV", "resume builder", "ATS friendly resume", "Dubai jobs", "UAE jobs", "professional resume", "CV builder", "career Dubai", "job search UAE"],
  authors: [{ name: "Dubai-CV-Pro Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Dubai-CV-Pro | Build CEO-Level Resumes for UAE",
    description: "Create ATS-optimized, professional resumes tailored for Dubai & UAE job market. AI-powered, executive templates, instant PDF.",
    url: "https://dubai-cv-pro.com",
    siteName: "Dubai-CV-Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai-CV-Pro | Build CEO-Level Resumes for UAE",
    description: "Create ATS-optimized, professional resumes tailored for Dubai & UAE job market.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
