import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderLayout from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monk Commerce Frontend Task",
  description: "Monk Commerce Frontend Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
