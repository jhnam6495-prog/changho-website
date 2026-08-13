# 풀스택 홈페이지 개발 프레임워크 설계서

> 창호종합건설(주) 홈페이지 프로젝트에서 확립한 구조를 표준화한 문서. 다음 고객사 홈페이지 제작 시, 회사소개서(또는 그에 준하는 기본 자료) 한 세트만 있으면 이 문서의 절차와 컴포넌트를 그대로 적용해 동일한 수준의 결과물을 만들 수 있도록 하는 것이 목적이다.
>
> 기준 프로젝트: 창호종합건설(주) · 스택: Next.js 16 · TypeScript · Vercel · 동반 문서: [트러블슈팅 로그](./troubleshooting-log.md)
> 최종 갱신: 2026-08-13 — 공지사항 CMS를 공사실적/인증서·등록증/회사연혁까지 확장하고, 파일 업로드를 서버 경유 방식에서 **클라이언트→Blob 직접 업로드(presigned URL)** 방식으로 전면 교체한 버전 기준

## 목차

1. [기술 스택](#1-기술-스택)
2. [디자인 토큰](#2-디자인-토큰)
3. [표준 사이트 구조](#3-표준-사이트-구조)
4. [재사용 컴포넌트](#4-재사용-컴포넌트)
5. [반응형·호환 규칙](#5-반응형호환-규칙)
6. [CMS 공통 구조](#6-cms-공통-구조)
7. [파일 업로드 아키텍처 (필수 준수)](#7-파일-업로드-아키텍처-필수-준수)
8. [홈페이지 팝업 (다중 공지 캐러셀)](#8-홈페이지-팝업-다중-공지-캐러셀)
9. [착수 자료 체크리스트](#9-착수-자료-체크리스트)
10. [배포 표준 절차](#10-배포-표준-절차)
11. [표준 범위와 확장 지점](#11-표준-범위와-확장-지점)

---

## 1. 기술 스택

정적 콘텐츠와 소규모 관리자 기능(공지사항·실적·인증서·연혁 CRUD)을 하나의 배포 파이프라인으로 함께 운영하는 것을 전제로, 별도 서버·데이터베이스 없이 완결되는 구성을 표준으로 삼는다.

| 영역 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | `Next.js 16` (App Router, Turbopack) | 정적 페이지와 서버 라우트를 한 저장소에서 관리 |
| 언어 | `TypeScript` | 페이지·컴포넌트·서버 액션 전 구간 적용 |
| 스타일링 | 인라인 style prop + CSS 변수 토큰 | Tailwind는 프리플라이트 리셋 용도로만 사용. 별도 클래스 체계 없이 `globals.css`의 토큰을 직접 참조 |
| 아이콘 | `lucide-react` | 일관된 선 굵기의 아이콘 세트 |
| 파일 저장 / 경량 CMS | `@vercel/blob` (OIDC 연결) | 첨부파일과 게시물 데이터(JSON)를 동일한 스토리지에 저장 — 별도 DB 불필요. 파일 업로드는 **반드시 클라이언트→Blob 직접 업로드**로 구현한다 (7장 필독 — 서버가 파일을 대신 받는 구조는 표준에서 제외됨) |
| 배포 | GitHub → Vercel 자동 배포 | `master` 브랜치 push 시 자동 재배포 |
| 비용 기준선 | Vercel Hobby(무료) + Blob 무료 티어 | 소규모 회사 소개 사이트 트래픽 기준 무료 한도 내 운영 가능 |

> **표준화 원칙** — 이 스택은 "서버 관리 없이, 코드 저장소 하나로 콘텐츠 사이트 + 간이 게시판/CMS까지 완결한다"는 목표에서 나왔다. 트래픽이나 기능이 커지는 프로젝트라면 11장의 확장 지점을 먼저 검토한다.

## 2. 디자인 토큰

모든 색상은 `globals.css`의 CSS 변수로 선언하고, 컴포넌트는 값이 아니라 변수명을 참조한다. 새 고객사 적용 시 **이 표의 값만 교체하면 전체 사이트의 톤이 바뀌는 구조**가 표준이다.

| 변수 | 값 | 역할 |
|---|---|---|
| `--navy-950` | `#06172c` | 헤더·히어로 최상단 다크 배경 |
| `--navy-900` | `#0a2540` | 다크 배경 서브톤 |
| `--blue` | `#1c5f9e` | 정보성 링크/배지 |
| `--blue-mid` | `#2b7bc4` | 링크, 활성 강조 |
| `--blue-light` | `#eef3f8` | 섹션 교차 배경(off-white 대체) |
| `--orange` | `#f5760f` | CTA, 활성 탭, 핵심 강조 |
| `--orange-dark` | `#e35a06` | 강조 텍스트, hover |
| `--orange-light` | `#fdeadb` | 강조 배지 배경 |

기본 역할 배정: `navy-950/900`은 헤더·히어로·강조 배경, `blue` 계열은 정보성 배지·링크, `orange` 계열은 CTA·활성 탭·강조 포인트 한 곳에만 집중 사용한다. 새 고객사는 이 3계열(다크 베이스 / 블루 서브 / 오렌지 액센트) 구조를 유지한 채 색상값만 교체하는 것을 권장 — 구조 자체를 바꾸면 컴포넌트들의 대비 설계가 함께 깨진다.

**타이포그래피**

- 한글 본문/제목: `Noto Sans KR` (300/400/500/600/700/800)
- 영문·숫자 라벨(eyebrow, 연도, 코드): `Montserrat` — 섹션 상단의 영문 라벨("COMPANY OVERVIEW" 등)에 전용으로 사용해 "한글 제목 + 영문 라벨" 조합을 사이트 전체의 시각적 리듬으로 고정

## 3. 표준 사이트 구조

업종에 따라 업종 특화 페이지(안전경영 등)는 교체되지만, 나머지 공개 페이지는 대부분의 회사소개 사이트에 그대로 재사용 가능하다.

| 경로 | 페이지 | 표준 섹션 구성 |
|---|---|---|
| `/` | 홈 | 히어로, 핵심 지표, 사업분야 요약, CTA, (있으면) 홈 팝업 |
| `/about` | 회사소개 | 대표인사말 · 회사개요 · 등록현황(사업자/업종 등록증) · 경영이념 · 비전 · 연혁 · 조직도 |
| `/safety` 등 | 업종 특화 페이지 | 건설업이면 안전경영, 제조업이면 품질관리 등으로 교체 |
| `/business` | 사업분야 | 분야별 소개, 보유 역량 |
| `/projects` | 실적 | 대표 실적 갤러리 + 전체 목록 (관리자 CMS 연동) |
| `/notices` | 공지사항 | 공개 목록/상세 (관리자 CMS 연동) |
| `/contact` | 오시는길 | 연락처, 지도, 문의 폼 |

**관리자 CMS 구조** — 비밀번호 기반 관리자 영역은 단일 게시판이 아니라 **허브 + 섹션형**으로 구성하는 것이 표준이다.

| 경로 | 역할 |
|---|---|
| `/admin` | 로그인 폼 |
| `/admin/dashboard` | 관리 섹션 카드 허브 (아래 섹션들로 진입) |
| `/admin/notices` | 공지사항 관리 — 첨부파일, "홈페이지 팝업 노출" 체크박스 포함 |
| `/admin/projects` | 공사실적(또는 업종에 맞는 "실적") 관리 — 대표 사진 1장 |
| `/admin/documents` | 인증서·등록증 등 공식 문서 관리 — 카드용 이미지 |
| `/admin/history` | 연혁 관리 — 텍스트만(파일 없음), 연도·구분·이벤트 목록 |

이 4개 섹션은 전부 6장의 **동일한 공용 CMS 패턴**(공용 Blob 저장소 헬퍼 + `AdminTopBar` 공통 내비게이션)으로 구현되어 있어, 새 섹션을 추가할 때도 기존 섹션 하나를 그대로 복제해 필드만 바꾸면 된다.

**페이지 내부 패턴**

서브페이지는 예외 없이 **`PageHero` + `SectionTabs` + 섹션 반복** 구조를 따른다. 헤더 메뉴의 드롭다운 서브메뉴, 탭 내비게이션, 페이지 안의 섹션 id는 모두 `nav-config.ts` 한 파일에서 파생되는 **단일 소스**다 — 새 섹션을 추가할 때 이 파일 하나만 수정하면 헤더 드롭다운과 페이지 탭에 동시 반영된다.

```ts
// app/nav-config.ts
export const aboutSections: SubItem[] = [
  { label: "대표인사말", id: "greeting" },
  { label: "회사개요", id: "overview" },
  { label: "등록현황", id: "registration" },
  // ...
];
export const nav: NavItem[] = [
  { label: "회사소개", href: "/about", sub: aboutSections },
  // ...
];
```

## 4. 재사용 컴포넌트

**공개 페이지**

| 컴포넌트 | 역할 |
|---|---|
| `Header.tsx` | 스크롤 시 배경 전환, 데스크톱 드롭다운(JS state 제어), 모바일 슬라이드 메뉴. `nav-config.ts`만 참조하므로 메뉴 구조 변경 시 이 파일은 손댈 필요 없음 |
| `PageHero.tsx` | 서브페이지 공통 상단 영역 — breadcrumb, 영문 eyebrow, 제목, 설명 |
| `SectionTabs.tsx` | 페이지 내 섹션 사이를 이동하는 sticky 탭. `IntersectionObserver`로 현재 보고 있는 섹션을 자동 하이라이트 |
| `DocumentGrid.tsx` | 인증서·등록증 등 공식 문서를 카드형 이미지로 보여주고 원본 파일 링크 제공. PDF는 반드시 이미지로 변환해 넣는다(5장 참고) |
| `HomeNoticePopup.tsx` | 홈 진입 팝업 — "홈페이지 팝업 노출"로 지정된 공지 **여러 건**을 이전/다음 화살표로 넘겨보는 캐러셀 (8장 참고) |
| `InquiryForm.tsx` | 오시는길 페이지의 메일 발송형 문의 폼 |
| `Footer.tsx` | 연락처, 퀵메뉴, 인증현황 요약 |

**관리자 CMS**

| 컴포넌트 | 역할 |
|---|---|
| `AdminTopBar.tsx` | 대시보드/공지사항/실적/문서/연혁/로그아웃 탭형 내비게이션. 관리 섹션 페이지 상단에 공통으로 배치 |
| `BlobFileInput.tsx` | 파일 첨부 입력 — 선택 즉시 브라우저에서 Blob으로 직접 업로드하고, 완료된 파일 메타데이터(JSON)만 hidden input으로 폼에 실어 보냄. **서버는 원본 파일 바이트를 한 번도 받지 않는다** (7장 필독) |
| `DeleteButton.tsx` | 확인 대화상자(`confirm()`)를 거친 뒤에만 폼을 제출하는 삭제 버튼 |

## 5. 반응형·호환 규칙

실제 트러블슈팅에서 확인된, 다음 프로젝트에서 반복하지 말아야 할 규칙들을 표준으로 못박는다. 근거는 [트러블슈팅 로그](./troubleshooting-log.md)에 상세히 기록되어 있다.

- [ ] **`html` 요소에 `overflow-x: hidden`을 걸지 않는다.** 가로 스크롤 방지는 `body`에만 적용한다. `html`에 걸면 `body`의 overflow가 뷰포트로 전파되지 않아 `position: sticky`가 전부 깨진다.
- [ ] **PDF로 받은 인증서·등록증은 반드시 이미지로 변환해 카드에 노출한다.** 모바일 브라우저는 iframe 내 PDF 인라인 렌더링을 지원하지 않는 경우가 많다. "원본 보기"만 PDF 링크로 남긴다.
- [ ] **비율을 맞춰야 하는 박스는 CSS `aspect-ratio` + `max-width` 조합에 의존하지 않는다.** 좁은 화면에서 비율이 깨지는 경우가 있어, `ResizeObserver`로 컨테이너 크기를 실측해 계산하는 방식을 표준으로 한다.
- [ ] **이름·직함처럼 중간에 줄바꿈되면 안 되는 텍스트는** 문단으로 흘려쓰지 않고 의미 단위로 줄을 나눠 명시적으로 배치한다.
- [ ] **모바일 브레이크포인트는 768px**, `mob-col` / `mob-pad` / `mob-sec` / `mob-scroll` / `mob-hide` 유틸리티 클래스를 `globals.css`에 유지한다.
- [ ] **내용 길이가 서로 다른 항목을 같은 팝업/모달로 순차 노출할 때는 오버레이를 화면 중앙 정렬(`alignItems:"center"`)하지 않는다.** 항목마다 높이가 달라 상단 위치가 매번 움직인다. 상단 고정(`alignItems:"flex-start"` + 고정 `paddingTop`)을 표준으로 한다.

## 6. CMS 공통 구조

별도 데이터베이스 없이 **Vercel Blob 하나를 파일 저장소이자 JSON 데이터 저장소로 겸용**하는 것이 이 프레임워크의 핵심 설계다. 공지사항/실적/문서/연혁 4개 섹션이 전부 이 패턴을 공유한다.

```
{섹션}-data/{id}.json         ← 게시물 메타데이터(제목/내용/첨부목록/일시 등)
{섹션}-files/{경로}           ← 실제 첨부파일 (업로드는 7장 방식으로 클라이언트가 직접 기록)
```

예: `notices-data/{id}.json` + `notices-files/{timestamp}-{filename}`, `projects-data/`, `documents-data/`, `history-data/`(파일 없음, 텍스트만).

**공용 헬퍼 — `app/lib/blob-store.ts`**

섹션마다 반복되는 로직을 하나로 모은다. 새 섹션을 추가할 때는 이 헬퍼를 그대로 가져다 쓰고, 섹션 전용 로직(`app/lib/{섹션}.ts`, `app/admin/{섹션}/actions.ts`)만 새로 작성한다.

```ts
export function makeId(): string
export async function listRecords<T>(prefix: string): Promise<T[]>   // 캐시버스팅 fetch 포함
export async function getRecord<T>(pathname: string): Promise<T | null>
export async function putJson(pathname: string, data: unknown, opts?: { allowOverwrite?: boolean }): Promise<void>
export async function deleteBlobs(urlsOrPathnames: string[]): Promise<void>
export interface UploadedFile { name: string; url: string; downloadUrl: string; size: number }
export function parseUploadedFiles(raw: FormDataEntryValue | null): UploadedFile[]
```

**인증 & 보호**

- 단일 관리자 비밀번호(`ADMIN_PASSWORD`) 대조 후, `SESSION_SECRET`으로 HMAC 서명한 토큰을 HttpOnly 쿠키로 발급
- `middleware.ts`가 `/admin/dashboard`, `/admin/notices`, `/admin/projects`, `/admin/documents`, `/admin/history`(각 `:path*`)를 가드 — 서명 검증은 Edge 런타임 호환을 위해 Node `crypto`가 아닌 **Web Crypto API(`crypto.subtle`)**로 구현
- 파일 업로드 토큰 발급 라우트(`/api/blob-upload`)는 미들웨어 matcher 대상이 아니므로, **라우트 내부에서 별도로 같은 쿠키 검증을 반복**해야 한다 (7장)

**CRUD 흐름**

- **작성** — 브라우저가 파일을 Blob에 직접 업로드(7장) → 완료된 URL 메타데이터를 폼과 함께 Server Action에 제출 → Server Action은 그 메타데이터만 담아 게시물 JSON을 새 경로에 저장
- **수정** — 같은 JSON 경로를 `allowOverwrite:true`로 덮어씀. 이때 CDN 캐시 대응이 필요 (트러블슈팅 로그 B5 참고)
- **삭제** — 게시물 JSON을 읽어 첨부파일 URL 목록을 얻은 뒤, 첨부파일과 JSON을 함께 `del()`
- **다운로드** — 첨부파일 링크는 `blob.url`이 아니라 **`blob.downloadUrl`**을 사용 (다른 도메인 리소스라 `<a download>` 속성이 무시되기 때문)

> **재사용 시** — 이 구조는 섹션당 게시물 수가 많지 않은(수십~수백 건) 소규모 사이트에 최적화되어 있다. 목록 조회마다 모든 게시물 JSON을 개별 fetch하므로, 게시물이 수천 건 이상으로 늘어나는 사이트라면 실제 데이터베이스 도입을 검토한다.

## 7. 파일 업로드 아키텍처 (필수 준수)

**이 장은 표준이지 선택이 아니다.** 첫 구현에서는 Server Action이 `File`을 직접 받아 `put()`으로 업로드하는 방식을 썼다가, 실사용 중 6MB 안팎의 첨부파일에서 "페이지를 표시할 수 없음" 오류로 실패하는 것을 뒤늦게 발견하고 전면 재작업했다 (트러블슈팅 로그 B7). 새 프로젝트는 처음부터 아래 구조로 시작한다.

**왜 서버 경유 업로드를 쓰면 안 되는가** — Vercel 서버리스 함수는 요청 본문 크기에 **플랫폼 레벨 하드 캡(약 4.5MB)**이 있다. `next.config.ts`의 `experimental.serverActions.bodySizeLimit`을 아무리 올려도 이 캡은 넘을 수 없다. 즉 Server Action이 `FormData`로 `File`을 직접 받는 구조는 "파일당 최대 50MB" 같은 안내 문구를 붙여도 실제로는 5MB 근처에서 조용히 깨진다.

**표준 구조 — 브라우저가 Blob에 직접 업로드**

```
[브라우저] --1. 업로드 토큰 요청--> [/api/blob-upload/ 라우트]
[브라우저] <--2. presigned URL 발급-- [/api/blob-upload/ 라우트]  (여기서 관리자 쿠키 인증)
[브라우저] --3. 파일 바이트를 Blob에 직접 PUT--> [Vercel Blob 스토리지]  (Next.js 서버를 거치지 않음)
[브라우저] --4. 완료된 {name,url,downloadUrl,size} 메타데이터만 hidden input에 담아 폼 제출--> [Server Action]
```

**서버 라우트 — `app/api/blob-upload/route.ts`**

```ts
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { issueSignedToken } from "@vercel/blob";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadPresignedBody;
  try {
    const jsonResponse = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        const store = await cookies();
        const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
        if (!authed) throw new Error("인증되지 않은 요청입니다.");
        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          maximumSizeInBytes: 50 * 1024 * 1024,
          validUntil: Date.now() + 5 * 60 * 1000,
        });
        return { token };
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[blob-upload]", error); // 반드시 로깅 — 안 하면 실패 원인이 어디에도 안 남는다
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "업로드 처리 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}
```

> **`handleUpload`/`upload()`(구식 client-token 방식)를 쓰지 않는다.** 이 프로젝트처럼 Blob 스토어를 OIDC로 연결한 경우(`BLOB_READ_WRITE_TOKEN` 같은 고정 시크릿이 없는 경우) 구식 방식은 "No read-write token found"로 실패한다. 반드시 `handleUploadPresigned` + `issueSignedToken` + 클라이언트의 `uploadPresigned()` 조합을 쓴다. 이 라우트는 `middleware.ts`의 보호 대상이 아니므로 `getSignedToken` 콜백 내부에서 직접 쿠키를 검증해야 한다.

**클라이언트 컴포넌트 — `app/admin/BlobFileInput.tsx`의 핵심**

```ts
import { uploadPresigned } from "@vercel/blob/client";

const pathname = `${pathPrefix}/${Date.now()}-${encodeURIComponent(file.name)}`;
const blob = await uploadPresigned(pathname, file, {
  access: "public",
  handleUploadUrl: "/api/blob-upload/", // 끝 슬래시 필수 — 아래 참고
});
```

- **파일명은 반드시 `encodeURIComponent`로 감싼다.** 한글 등 비-ASCII 파일명을 그대로 경로에 쓰면 presigned 토큰 검증 단계에서 라이브러리 내부 인코딩 버그로 업로드가 거부된다 (트러블슈팅 로그 B10). 화면에 보여줄 원래 파일명은 별도의 `name` 필드로 그대로 보존한다.
- **`handleUploadUrl`은 끝에 슬래시를 붙인다.** `next.config.ts`에 `trailingSlash: true`가 있으면 슬래시 없는 URL은 308 리다이렉트되고, 이 과정에서 인증이 깨진다 (트러블슈팅 로그 B8).
- 실제 `<input type="file">`에는 **`name` 속성을 주지 않는다.** 업로드가 끝난 뒤의 메타데이터만 별도 `hidden input`(`name={fieldName}`, `value={JSON.stringify(files)}`)으로 폼에 실어 보내, 원본 바이트가 Server Action으로 절대 넘어가지 않게 한다.

**Server Action에서 받는 쪽**

```ts
const files = parseUploadedFiles(formData.get("files")); // app/lib/blob-store.ts
```

## 8. 홈페이지 팝업 (다중 공지 캐러셀)

공지사항 관리에서 "홈페이지 팝업으로 노출"을 체크한 게시물은 **몇 건이든 전부** 홈 진입 팝업 후보가 된다(과거에는 1건만 노출하는 제약이 있었으나 표준에서 제거됨).

- `app/lib/notices.ts`의 `getFeaturedNotices()`가 해당 공지 전체를 배열로 반환
- `HomeNoticePopup`이 배열을 받아 캐러셀로 렌더링 — 2건 이상일 때만 상단에 이전/다음 화살표 + "N / M" 카운터 표시
- "오늘 하루 이 창을 열지 않음" 체크는 게시물별로 독립적으로 `localStorage`에 기록(`notice-popup-dismissed-{id}`), 체크 즉시 해당 항목만 목록에서 제거되고 다음 항목으로 넘어감
- 오버레이는 5장의 규칙대로 **상단 고정 정렬**을 써서, 캐러셀 항목마다 이미지 유무·본문 길이가 달라도 팝업 상단 위치가 움직이지 않는다

## 9. 착수 자료 체크리스트

다음 항목이 담긴 회사소개서(또는 대체 자료)만 있으면, 이 프레임워크의 페이지 구조를 그대로 채워 넣어 완성할 수 있다.

| 구분 | 필요 자료 | 반영 위치 |
|---|---|---|
| 기본정보 | 회사명, 대표자, 설립일, 자본금/총자산, 직원수, 주소, 대표전화/팩스, 이메일 | 회사개요 표, Footer, 오시는길 |
| 인사말 | 대표이사 인사말 텍스트, 프로필(학력·경력), 서명 이미지 | 회사소개 > 대표인사말 |
| 경영 철학 | 핵심가치 3~4개, 비전 3~4개(각 제목+한줄설명) | 회사소개 > 경영이념 / 비전 |
| 연혁 · 조직 | 연도별 주요 이력(관리자 CMS로 이후에도 계속 추가 가능), 조직도 구성 | 회사소개 > 연혁 / 조직도 |
| 공식 서류 | 사업자등록증, 업종별 등록증, ISO 등 인증서(PDF 또는 이미지) — 관리자 CMS로 이후 추가/교체 가능 | 회사소개 > 등록현황, 업종 특화 페이지 > 인증현황 |
| 실적 | 대표 실적 사진 6장 내외 + 전체 실적 목록(명칭/분야/연도) — 관리자 CMS로 이후 추가/수정 가능 | 실적 페이지 |
| 브랜드 자산 | 로고 이미지, (선택) 브랜드 컬러 지정값 — 없으면 2장의 기본 팔레트 사용 | Header, 전체 디자인 토큰 |

## 10. 배포 표준 절차

트러블슈팅에서 확인된 함정을 반영한 순서다. 특히 **Blob 스토어는 처음부터 Public으로 생성**하는 것이 가장 중요 — 생성 후에는 접근 모드를 바꿀 수 없다.

1. GitHub 저장소 생성 → 로컬 `git init` → push
2. Vercel에서 저장소 Import (자동으로 첫 배포 진행)
3. Vercel 프로젝트 → **Storage → Create Database → Blob**, 접근 모드 **Public** 선택 후 프로젝트에 연결 (Production, Preview 환경 체크). **OIDC 연결 방식을 쓰면 `BLOB_STORE_ID`, `BLOB_WEBHOOK_PUBLIC_KEY`가 자동으로 환경변수에 추가된다 — 별도의 고정 `BLOB_READ_WRITE_TOKEN`은 필요 없다** (7장 참고)
4. Environment Variables에 `ADMIN_PASSWORD`, `SESSION_SECRET` 추가 (관리자만 아는 값으로, 개발자가 값을 알 필요는 없음)
5. **Deployments → Redeploy**로 새 환경변수/스토어 연결을 반영 (환경변수 추가만으로는 기존 배포에 적용되지 않음)
6. 헤드리스 브라우저 또는 실제 브라우저로 로그인 → 글 작성(파일 첨부 포함, 가능하면 5MB 이상 & 한글 파일명으로) → 첨부 다운로드 → 수정 → 삭제까지 전체 플로우를 **CMS 4개 섹션 각각**에 대해 검증 후 마무리
7. **로컬 개발 환경은 Blob 데이터를 읽거나 쓸 수 없다.** 이 프로젝트의 OIDC 연결은 Production/Preview 환경에만 활성화되어 있어, `next dev`나 `vercel env pull`로 받은 로컬 OIDC 토큰은 "OIDC is enabled for this project, but not for the 'development' environment" 오류로 거부된다. `ADMIN_PASSWORD`/`SESSION_SECRET`도 Vercel이 "Sensitive"로 표시해 `env pull`로는 빈 값만 받아진다. **CMS/업로드 관련 기능 검증은 항상 배포 후 프로덕션에서 헤드리스 브라우저로 한다** (로컬은 UI 레이아웃 확인 용도로만 사용).

## 11. 표준 범위와 확장 지점

이 프레임워크가 **기본으로 포함하지 않는** 것들 — 필요해지면 별도로 설계한다.

- 다국어 지원 (현재는 한국어 단일 언어 전제)
- 관리자 다중 계정 / 권한 분리 (현재는 단일 비밀번호)
- 검색엔진 최적화 고급 설정(구조화 데이터, 사이트맵 자동화 등은 기본 메타데이터 수준까지만 포함)
- 대용량 게시물(수천 건 이상) 대응 데이터베이스 전환
- 이미지 CDN 최적화(`next/image` 최적화는 현재 `unoptimized:true`로 비활성 — 정적 export 호환을 우선했기 때문)
- 팝업 자동 순환/일시정지(auto-rotate) — 현재는 수동 이전/다음 넘김만 지원

---

*창호종합건설(주) 홈페이지 프로젝트 · 동반 문서: [트러블슈팅 로그](./troubleshooting-log.md)*
