import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthStore {
  isLoggedIn: boolean;
  isAuthInitialized: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  setAuthInitialized: (isInitialized: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isAuthInitialized: false,
      login: (accessToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        set({ isLoggedIn: true });
      },
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ isLoggedIn: false });
      },
      setAuthInitialized: (isInitialized: boolean) =>
        set({ isAuthInitialized: isInitialized }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }), // Only persist isLoggedIn
      onRehydrateStorage: () => (state) => {
        state?.setAuthInitialized(true);
      },
    }
  )
);
