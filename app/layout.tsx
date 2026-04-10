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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* 👇 คำสั่งที่ชัวร์ที่สุดสำหรับ iOS Safari: อ้างอิงไฟล์จาก public ตรงๆ 👇 */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col overscroll-none">
        {children}
      </body>
    </html>
  );
}
