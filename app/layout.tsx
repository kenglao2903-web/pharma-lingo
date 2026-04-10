import type { Metadata } from "next";
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

// 👇 แก้ไขข้อมูล Metadata ตรงนี้ครับ 👇
export const metadata: Metadata = {
  title: "Pharma Lingo",
  description: "Assistance Dispenser App",
  appleWebApp: {
    capable: true, // ทำให้เป็นแอปแบบ PWA (ซ่อน URL bar บน iOS)
    statusBarStyle: "black-translucent", // แถบแบตเตอรี่/เวลาด้านบนโปร่งใส
    title: "Pharma Lingo", // ชื่อแอปที่จะโชว์บนหน้าจอ Home Screen
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
