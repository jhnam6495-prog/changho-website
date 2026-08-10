import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.changho-const.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "창호종합건설(주) | 안전을 기반으로 신뢰를 짓는 종합건설사",
    template: "%s | 창호종합건설(주)",
  },
  description:
    "창호종합건설(주)는 경상북도 경주에 위치한 종합건설사로, ISO 9001·14001·45001 인증을 기반으로 안전 최우선 경영을 실천하며 건축·토목·인테리어·리모델링 전 분야를 수행합니다.",
  keywords: [
    "창호종합건설",
    "경주 건설사",
    "종합건설사",
    "건축공사",
    "토목공사",
    "리모델링",
    "안전보건경영시스템",
    "ISO 45001",
    "공사지명원",
  ],
  authors: [{ name: "창호종합건설(주)" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "창호종합건설(주)",
    title: "창호종합건설(주) | 안전을 기반으로 신뢰를 짓는 종합건설사",
    description:
      "ISO 9001·14001·45001 인증 기반 안전 최우선 경영. 건축·토목·인테리어·리모델링 전문 종합건설사, 창호종합건설(주)입니다.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "창호종합건설(주)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "창호종합건설(주) | 안전을 기반으로 신뢰를 짓는 종합건설사",
    description: "ISO 9001·14001·45001 인증 기반 안전 최우선 경영. 창호종합건설(주)입니다.",
    images: ["/images/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: {
    icon: "/images/brand/logo.jpg",
    apple: "/images/brand/logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#0a2540" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&family=Montserrat:wght@400;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
