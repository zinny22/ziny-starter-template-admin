export interface Users {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
  deletedAt: string | null;
}
