# Users Schema

시스템에 접근하는 모든 사용자(서비스 이용자 및 관리자)를 관리하는 테이블입니다.

## Table: Permissions

| Column Name | Data Type | Key | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | 사용자 고유 ID |
| `email` | VARCHAR(255) | UQ | 로그인 이메일 |
| `password` | VARCHAR | | 암호화된 비밀번호 (Argon2 or Bcrypt) |
| `name` | VARCHAR(100) | | 사용자 실명 |
| `role_id` | INT | FK | [Roles](./auth.md) 테이블 참조 |
| `is_active` | BOOLEAN | | 계정 활성화 여부 (Default: true) |
| `last_login_at` | TIMESTAMP | | 마지막 로그인 시간 |
| `created_at` | TIMESTAMP | | 생성일 |
| `deleted_at` | TIMESTAMP | | Soft Delete (NULL이면 활성) |

## Notes
- **is_active**: 퇴사이나 제재 등으로 인해 로그인을 즉시 차단해야 할 때 `false`로 설정합니다. `deleted_at`과 달리 데이터는 유지되지만 접근만 막는 용도입니다.
