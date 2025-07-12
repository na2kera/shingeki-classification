import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shingeki-classification.vercel.app'),
  title: "進撃の巨人 GitHub適性診断",
  description:
    "GitHubアカウントを分析して、進撃の巨人の9つの巨人のうちどれに最も適性があるかを診断します",
  keywords: [
    "GitHub",
    "進撃の巨人",
    "Attack on Titan",
    "診断",
    "プログラミング",
    "開発者",
  ],
  authors: [{ name: "Shingeki Classification Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: "/meta.png",
    shortcut: "/meta.png",
    apple: "/meta.png",
  },
  openGraph: {
    title: "進撃の巨人 GitHub適性診断",
    description:
      "GitHubアカウントを分析して、進撃の巨人の9つの巨人のうちどれに最も適性があるかを診断します",
    type: "website",
    locale: "ja_JP",
    siteName: "進撃の巨人 GitHub適性診断",
    url: "https://shingeki-classification.vercel.app",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "進撃の巨人 GitHub適性診断 - あなたはどの巨人の適性がありますか？",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "進撃の巨人 GitHub適性診断",
    description:
      "GitHubアカウントを分析して、進撃の巨人の9つの巨人のうちどれに最も適性があるかを診断します",
    images: ["/meta.png"],
    creator: "@shingeki_diagnosis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
