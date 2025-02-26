"use client";

import { gql } from "@/__generated__";
import { setAuthToken, setUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMutation } from "@apollo/client";
import { createContext, ReactNode, useContext } from "react";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const LOGIN = gql(`
  mutation Login($body: LoginInput) {
    login(body: $body) { accessToken }
  }
`);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [loginUser] = useMutation(LOGIN);

  // login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginUser({ variables: { body: { email, password } } });
      dispatch(setAuthToken({ token: data?.login?.accessToken ? `Bearer ${data?.login?.accessToken}` : null }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // logout
  const logout = () => {
    dispatch(setAuthToken({ token: "" }));
    dispatch(setUser(null));
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};
