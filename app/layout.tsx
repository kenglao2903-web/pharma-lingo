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

// 🛠️ ตั้งค่าการแสดงผลหน้าจอ (ป้องกันการซูมและกำหนดสีธีม)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

// 🛠️ ตั้งค่าข้อมูลพื้นฐานของแอป
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* 👇 คำสั่งบังคับ iPhone ให้ใช้ไอคอนที่เราเตรียมไว้ในโฟลเดอร์ public 👇 */}
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* 👇 เชื่อมต่อไฟล์ manifest เพื่อพฤติกรรมแบบแอปแท้ 👇 */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* แท็กเสริมเพื่อความชัวร์สำหรับ iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col overscroll-none">
        {children}
      </body>
    </html>
  );
}
