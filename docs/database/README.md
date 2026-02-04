# Database Design Overview

이 디렉토리는 어드민 대시보드 프로젝트의 백엔드 데이터 구조 설계를 도메인별로 설명합니다.

## 설계 원칙 (Design Principles)

### 1. 확장 가능한 RBAC (Role-Based Access Control)
단순한 관리자 역할(Role) 구분을 넘어, 세부적인 권한(Permission) 제어가 가능하도록 설계했습니다. 이를 통해 조직 구조 변경이나 새로운 직책 생성 시 코드 수정 없이 유연하게 대응할 수 있습니다.
- [상세 내용 보기](./auth.md)

## 스키마 목록 (Index)

- [Users (사용자)](./users.md)
- [Auth & Roles (권한 관리)](./auth.md)