import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eyesightworks Infrastructure",
  description: "Real Estate & Asset Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}