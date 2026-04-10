import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Pharma Lingo",
  description: "Assistance Dispenser App",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pharma Lingo",
  },
  // 👇 เพิ่มตรงนี้เพื่อให้ Next.js ส่งไอคอนให้ Apple โดยตรง
  icons: {
    apple: "/apple-icon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overscroll-none">
        {children}
      </body>
    </html>
  );
}
