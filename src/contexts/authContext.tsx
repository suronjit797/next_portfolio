/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";
import { User } from "@/global/interface";

interface Auth {
  isAuth: boolean;
  user: User | null;
}
interface AuthContextType {
  token: string | null;
  auth: Auth;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const localToken = localStorage.getItem("auth_token");
  const [token, setToken] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth>({
    isAuth: false,
    user: null,
  });

  // set base url
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ROUTE;

  useEffect(() => {
    if (localToken) {
      setToken(localToken);
    }
  }, [localToken]);

  useEffect(() => {
    if (token) {
      userProfile(token);
    }
  }, [token]);

  // get user profile
  const userProfile = async (authToken: string) => {
    try {
      const { data } = await axios.get("/users/profile", {
        // withCredentials: true,
        headers: { Authorization: authToken },
      });
      if (data?.success) {
        setAuth({ isAuth: true, user: data.data });
      } else {
        setAuth({ isAuth: false, user: null });
      }
    } catch (error) {
      console.error("Auth failed:", error);
      logout();
    }
  };

  // login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/users/login", { email, password });
      setToken(`Bearer ${data.token}`);
      localStorage.setItem("auth_token", `Bearer ${data.token}`);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setAuth({ isAuth: false, user: null });
  };

  return <AuthContext.Provider value={{ token, login, logout, auth }}>{children}</AuthContext.Provider>;
};
