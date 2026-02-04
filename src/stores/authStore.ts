import { Users } from "@/types/entities";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthStore {
  user: Users | null;
  isLoggedIn: boolean;
  isAuthInitialized: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  setAuthInitialized: (isInitialized: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isAuthInitialized: false,
      login: async (email: string) => {
        // NOTE: 실제 로그인 로직은 여기에 구현
        const mockUser: Users = {
          id: 1,
          email,
          name: "Test User",
          role: "MANAGER",
          permissions: ["user:read", "user:write", "product:read"],
          isActive: true,
          lastLoginAt: "2026-02-04T11:30:14.000Z",
          createdAt: "2026-02-04T11:30:14.000Z",
          deletedAt: null,
        };

        localStorage.setItem("accessToken", "mock_token_" + email);
        set({ isLoggedIn: true, user: mockUser });
      },
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ isLoggedIn: false, user: null });
      },
      setAuthInitialized: (isInitialized: boolean) =>
        set({ isAuthInitialized: isInitialized }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
      onRehydrateStorage: () => (state) => {
        state?.setAuthInitialized(true);
      },
    }
  )
);
