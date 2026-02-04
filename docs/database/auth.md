# Authentication & Authorization Schema

RBAC (Role-Based Access Control) 모델을 구현하기 위한 테이블 구조입니다.

## Table: Roles (역할)
사용자의 대분류를 정의합니다.

| Column Name | Data Type | Key | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK | 역할 ID |
| `name` | VARCHAR(50) | UQ | 역할명 (예: SUPER_ADMIN, MANAGER, VIEWER) |
| `description` | TEXT | | 역할에 대한 설명 |

## Table: Permissions (권한)
시스템의 구체적인 기능을 수행할 수 있는 권한을 정의합니다.

| Column Name | Data Type | Key | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK | 권한 ID |
| `code` | VARCHAR(100) | UQ | 권한 코드 (예: `product:create`, `user:delete`) |
| `description` | TEXT | | 권한 설명 |

## Table: Role_Permissions (매핑)
역할과 권한의 N:M 관계를 정의합니다. 이를 통해 하나의 역할이 여러 권한을 가질 수 있고, 권한 구성을 유연하게 변경할 수 있습니다.

| Column Name | Data Type | Key | Description |
| :--- | :--- | :--- | :--- |
| `role_id` | INT | FK, PK | Roles 테이블 참조 |
| `permission_id` | INT | FK, PK | Permissions 테이블 참조 |
