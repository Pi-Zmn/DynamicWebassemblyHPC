import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Navigation from "@/app/components/navigation";

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
    <body>
      <main>
        <Navigation />
        {children}
      </main>
    </body>
    </html>
  );
}
