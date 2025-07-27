import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type AuthContextValue = {
  isAuthInitialized: boolean;
  setIsAuthInitialized: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  logIn: (accessToken: string, redirectTo?: string) => void;
  logOut: () => void;
};

const initialAuthContextValue: AuthContextValue = {
  isAuthInitialized: false,
  setIsAuthInitialized: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext<AuthContextValue>(initialAuthContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const logIn = useCallback((accessToken: string, redirectTo?: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("accessToken", accessToken);
    if (redirectTo) router.replace(redirectTo);
  }, []);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    router.replace("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isAuthInitialized,
      setIsAuthInitialized,
      isLoggedIn,
      setIsLoggedIn,
      logIn,
      logOut,
    }),
    [isAuthInitialized, isLoggedIn, logIn, logOut]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuth = () => useContext(AuthContext);
