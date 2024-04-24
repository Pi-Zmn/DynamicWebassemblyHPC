import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOINC",
  description: "Darmstadt Open Infrastructure for Network Computing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <main>
        <div>
          <h2>DOINC: Darmstadt Open Infrastructure for Network Computing</h2>
          <Link href="/">Home Page</Link>
        </div>
        {children}
      </main>
    </body>
    </html>
  );
}
