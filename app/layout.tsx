import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/header";
import { NextAuthProvider } from "./next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dudda",
  description: "Question everything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <NextAuthProvider>
        <body>
          <Header />
          {children}
        </body>
      </NextAuthProvider>
      <Analytics />
    </html>
  );
}
