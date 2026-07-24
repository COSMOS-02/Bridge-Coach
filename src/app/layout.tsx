import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserProvider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bridge Coach — AI Career Navigator from School to Career",
  description:
    "Lifelong AI career coach for Indian and global users. Stream selection, college, jobs, interview prep — personalized paths with pros, cons, and fit scores.",
  metadataBase: new URL("https://bridge-coach-p6on0wwdt-cosmos-02s-projects.vercel.app"),
  openGraph: {
    title: "Bridge Coach",
    description: "Personalized career guidance from school to career.",
    type: "website",
  },
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
        <Analytics />
      </body>
    </html>
  );
}
