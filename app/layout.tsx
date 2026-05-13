import AuthProvider from "@/components/providers/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "adflite",
  description: "classifieds for internet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

      <AuthProvider>

        <Header />

          <main className="min-h-screen">
            {children}
          </main>

        <Footer />

      </AuthProvider>
        
      </body>
    </html>
  );
}