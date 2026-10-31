import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DemoProvider } from "@/components/shared/demo-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SENTER - Sistem Energi Terpantau",
  description:
    "Sistem Energi Terpantau helps Indonesian MSMEs understand electricity consumption at appliance level.",
  applicationName: "SENTER",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full"><DemoProvider>{children}</DemoProvider></body>
    </html>
  );
}
