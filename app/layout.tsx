import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MembersChat from "@/components/MembersChat";

export const metadata: Metadata = {
  title: {
    default: "DOCLSE – Ducati Official Club London & South East",
    template: "%s | DOCLSE",
  },
  description:
    "Ducati Official Club London & South East. Founded April 2024. Bringing together riders, passengers and fans with a passion for Ducati.",
  openGraph: {
    siteName: "DOCLSE",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased min-h-screen flex flex-col bg-white text-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 min-h-screen">{children}</main>
          <Footer />
          <MembersChat />
        </AuthProvider>
      </body>
    </html>
  );
}
