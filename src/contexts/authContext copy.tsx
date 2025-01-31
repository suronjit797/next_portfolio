"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setAuthToken, setUser } from "@/redux/features/authSlice";

interface AuthContextType {
  token: string | null;
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
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  // set base url
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ROUTE;

  useEffect(() => {
    if (token) {
      axios.defaults.headers["Authorization"] = token;
    }
  }, [token]);

  // login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/users/login", { email, password });
      dispatch(setAuthToken({ token: `Bearer ${data.token}` }));
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
