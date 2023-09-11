import MainNavbar from "@/components/main-navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SocketioProvider from "@/components/providers/socketio-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketioProvider>
          <MainNavbar />
          <main className="pt-4">{children}</main>
        </SocketioProvider>
      </body>
    </html>
  );
}