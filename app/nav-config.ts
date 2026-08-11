export interface SubItem {
  label: string;
  id: string;
}

export interface NavItem {
  label: string;
  href: string;
  sub?: SubItem[];
}

export const aboutSections: SubItem[] = [
  { label: "대표인사말", id: "greeting" },
  { label: "회사개요", id: "overview" },
  { label: "등록현황", id: "registration" },
  { label: "경영이념", id: "values" },
  { label: "사업비전", id: "vision" },
  { label: "회사연혁", id: "history" },
  { label: "조직도", id: "organization" },
];

export const safetySections: SubItem[] = [
  { label: "안전보건경영방침", id: "policy" },
  { label: "인증현황", id: "certification" },
  { label: "안전관리체계", id: "system" },
  { label: "전문인력", id: "personnel" },
  { label: "기본수칙·중대재해처벌법", id: "compliance" },
];

export const businessSections: SubItem[] = [
  { label: "사업분야", id: "fields" },
  { label: "기술·기술자 보유현황", id: "capability" },
];

export const projectsSections: SubItem[] = [
  { label: "대표 실적", id: "gallery" },
  { label: "실적 전체보기", id: "list" },
];

export const contactSections: SubItem[] = [
  { label: "오시는길·연락처", id: "location" },
  { label: "온라인 문의", id: "inquiry" },
];

export const nav: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about", sub: aboutSections },
  { label: "안전경영", href: "/safety", sub: safetySections },
  { label: "사업분야", href: "/business", sub: businessSections },
  { label: "공사실적", href: "/projects", sub: projectsSections },
  { label: "오시는길", href: "/contact", sub: contactSections },
  { label: "공지사항", href: "/notices" },
];
