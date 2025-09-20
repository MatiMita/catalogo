import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O&C - Tu catálogo de productos premium",
  description: "Descubre una amplia selección de productos de alta calidad. Desde electrónicos hasta artículos para el hogar, tenemos todo lo que necesitas.",
  keywords: "catálogo, productos, electrónicos, hogar, calidad, premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script 
          src="https://widget.cloudinary.com/v2.0/global/all.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
