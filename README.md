# 창호종합건설(주) 웹사이트 — Next.js 프로젝트

## 🚀 프로젝트 개요

기존 정적 HTML 홈페이지(`D:\WebServices\changho\`)를 **Next.js 16 (App Router)** 기반으로 전환한 프로젝트입니다.
`D:\pmc-consulting` 프로젝트와 동일한 기술 스택·코딩 방식(App Router, TypeScript, 인라인 스타일 + CSS 변수, 공용 Header/Footer/PageHero 컴포넌트)을 따릅니다.

---

## 📁 디렉토리 구조

```
new/
├── app/
│   ├── layout.tsx          ← 루트 레이아웃 (메타데이터, SEO, OG 태그, 폰트)
│   ├── page.tsx             ← 메인 홈페이지
│   ├── globals.css          ← 전역 CSS (디자인 토큰, 모바일 유틸리티)
│   ├── components/
│   │   ├── Header.tsx       ← 반응형 헤더 (스크롤 감지, 모바일 메뉴)
│   │   ├── Footer.tsx       ← 푸터
│   │   ├── PageHero.tsx     ← 하위 페이지 공용 히어로
│   │   └── InquiryForm.tsx  ← 문의 폼 (클라이언트 컴포넌트)
│   ├── about/page.tsx       ← 회사소개 (인사말/개요/경영이념/비전/연혁/조직도)
│   ├── safety/page.tsx      ← 안전경영
│   ├── business/page.tsx    ← 사업분야
│   ├── projects/page.tsx    ← 공사실적
│   └── contact/page.tsx     ← 오시는길 & 문의
└── public/
    └── images/
        ├── brand/logo.jpg
        └── projects/*.jpg   ← 실제 시공현장 사진
```

---

## ⚙️ 기술 스택

| 항목 | 스택 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 (설치) + 인라인 스타일 / CSS 변수 방식 |
| 폰트 | Noto Sans KR + Montserrat |
| 아이콘 | lucide-react |

> pmc-consulting과 달리 별도 회원/게시판/관리자 기능이 필요하지 않아 `@supabase`, `middleware.ts`, `framer-motion`은 포함하지 않았습니다. 추후 문의 폼 백엔드나 공지사항 게시판이 필요해지면 그때 추가하는 것을 권장합니다.

---

## 🎨 디자인 시스템

CSS 변수 (`app/globals.css`):
```css
--navy-950: #06172c   /* 헤더/푸터/히어로 배경 */
--navy-900: #0a2540
--orange:   #f5760f   /* 포인트 컬러 (버튼/강조) — 안전을 상징 */
--blue-light: #eef3f8 /* 섹션 배경 */
```

---

## 🛠️ 개발 시작

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

---

## ✅ 추가 개발 필요 사항

1. **`/public/images/og-image.png`** — 1200×630px OG 공유 이미지 제작 및 삽입
2. **`/public/favicon.ico`** — 파비콘 별도 제작 (현재는 로고 이미지로 대체)
3. **문의 폼 백엔드** — 현재는 `mailto:` 방식으로 동작. 실제 서버 처리(Next.js API Route + 이메일 발송 서비스)가 필요하면 `app/contact/page.tsx`와 `app/components/InquiryForm.tsx`를 연동
4. **도메인 연결** — `app/layout.tsx`의 `siteUrl`을 실제 도메인으로 교체
5. **배포** — Vercel 권장 (Next.js 공식 호스팅). 정적 내보내기가 필요하면 `next.config.ts`에서 `output: "export"` 활성화
