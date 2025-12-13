# Ziny Admin Starter Template

이 프로젝트는 **Next.js 16 (App Router)**와 **Tailwind CSS**, **Shadcn/ui**를 기반으로 한 어드민 대시보드 스타터 템플릿입니다.  
개발자들이 빠르게 어드민 페이지를 구축할 수 있도록 기본적인 레이아웃, 인증(로그인/회원가입), 폴더 구조가 미리 세팅되어 있습니다.

## ✨ 주요 기능 (Features)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + Tailwind Merge
- **UI Components**: Shadcn/ui (Radix UI 기반)
- **Icons**: Lucide React
- **Authentication**: 로그인, 회원가입 UI 및 인증 컨텍스트 (`AuthProvider`)
- **Layout**: 반응형 사이드바, 헤더, Breadcrumb(경로 표시) 자동 생성
- **State Management**: Zustand (전역 상태 관리)
- **Charts**: Recharts (데이터 시각화)
- **Theme**: 다크 모드/라이트 모드 지원 (시스템 설정 감지)

## 📂 폴더 구조 (Project Structure)

이 프로젝트는 유지보수성과 확장성을 고려하여 **Feature-Sliced Design(FSD)**의 개념을 일부 차용한 구조를 따르고 있습니다.

```bash
src/
├── app/                    # Next.js App Router (페이지 라우팅)
│   ├── (auth)/             # 인증 관련 라우트 그룹
│   │   ├── (public)/       # 공개 페이지 (로그인, 회원가입)
│   │   └── (private)/      # 비공개 페이지 (대시보드 등 - 인증 필요)
│   ├── globals.css         # 전역 스타일 (Tailwind 설정)
│   └── layout.tsx          # 루트 레이아웃
├── components/             # UI 컴포넌트
│   ├── layout/             # 레이아웃 관련 (Sidebar, Header, Nav)
│   └── ui/                 # Shadcn/ui 공통 컴포넌트 (Button, Input, Card...)
├── features/               # 도메인별 기능 (Domain Driven Design)
│   ├── auth/               # 인증 관련 기능 (components, hooks, utils...)
│   └── user/               # 사용자 관련 기능
├── lib/                    # 유틸리티 및 라이브러리 설정 (cn 등)
└── shared/                 # 공용 모듈 (Shared Layer)
    ├── hooks/              # 커스텀 훅
    ├── providers/          # 전역 Provider (AuthProvider 등)
    ├── stores/             # 전역 상태 (Zustand)
    ├── ui/                 # 공용 UI (로딩 스피너 등)
    └── utils/              # 유틸리티 함수 (포맷팅, 경로 계산 등)
```

## 🚀 시작하기 (Getting Started)

이 템플릿을 사용하여 프로젝트를 시작하는 방법입니다.

### 1. 클론 및 설치 (Clone & Install)

```bash
# 레포지토리 클론
git clone https://github.com/zinny22/ziny-starter-template-admin.git my-admin-project

# 디렉토리 이동
cd my-admin-project

# 패키지 설치
npm install
# or
yarn install
# or
pnpm install
```

### 2. 개발 서버 실행 (Run Dev Server)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🛠️ 사용 방법 (Usage Guide)

### 메뉴 설정 (Navigation)

`src/components/layout/nav.config.tsx` 파일에서 사이드바 메뉴를 설정할 수 있습니다.

```tsx
export const navData = [
  {
    title: "Dashboard",
    url: "/",
    icon: <Home />,
    items: [...]
  },
  // ...
];
```

### 인증 처리 (Authentication)

`src/shared/providers/AuthProvider.tsx`에 인증 로직이 구현되어 있습니다.
현재는 Mock업 상태이므로, 실제 API 연동 시 `logIn` 함수 내부를 수정하여 토큰을 처리하세요.

```tsx
const logIn = useCallback((accessToken: string, redirectTo?: string) => {
  setIsLoggedIn(true);
  localStorage.setItem("accessToken", accessToken); // 토큰 저장
  if (redirectTo) router.replace(redirectTo);
}, []);
```

### 새로운 UI 컴포넌트 추가

Shadcn/ui를 사용 중이므로, 필요한 컴포넌트가 있다면 [Shadcn UI 문서](https://ui.shadcn.com/)를 참고하여 추가할 수 있습니다.

## 📦 주요 라이브러리 (Dependencies)

- **Core**: `next`, `react`, `react-dom`
- **Style**: `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`
- **Icon**: `lucide-react`
- **State**: `zustand`
- **Chart**: `recharts`
- **UI**: `@radix-ui/*` (Primitives)

## 🤝 기여하기 (Contributing)

이슈 제보나 기능 제안은 언제나 환영합니다! Pull Request를 보내주세요.
