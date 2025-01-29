"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import React, { useEffect } from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuth) {
      router.push("/login");
    }
  }, [auth.isAuth, router]);

  return <>{children}</>;
};

export default AuthLayout;
