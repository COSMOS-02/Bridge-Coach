import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bridge Coach — AI Career Navigator from School to Career",
  description:
    "Lifelong AI career coach for Indian and global users. Stream selection, college, jobs, interview prep — personalized paths with pros, cons, and fit scores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
