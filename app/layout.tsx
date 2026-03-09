import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // optional, include the weights you’ll use
});

export const metadata = {
  title: "Toby's Signature",
  description: "Cake shop website",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" className={nunito.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>

          
          {children}
          
          </main>
      </body>
    </html>
  );
}
