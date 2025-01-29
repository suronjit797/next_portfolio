import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/authContext";
import '@ant-design/v5-patch-for-react-19';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const merriweather = Merriweather_Sans({
  weight: ["300", "400", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suronjit Pal",
  description: "Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${merriweather.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
