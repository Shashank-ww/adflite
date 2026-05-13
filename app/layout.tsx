import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worklane",
  description: "Micro project marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}