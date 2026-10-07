"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthType {
  isAuth: boolean | null;
  setIsAuth: (value: boolean) => void;
}

const AuthContext = createContext<AuthType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuthState] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("isAuth");
    setIsAuthState(stored ? JSON.parse(stored) : false);
  }, []);

  const setIsAuth = (value: boolean) => {
    setIsAuthState(value);
    localStorage.setItem("isAuth", JSON.stringify(value));
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error(`useAuthContext must be used within a AuthContext.Provider`);
};

export { AuthProvider, useAuthContext };
