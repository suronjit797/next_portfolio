"use client";

import { gql } from "@/__generated__";
import AdminHeader from "@/components/header/AdminHeader";
import AdminSidebar from "@/components/header/AdminSidebar";
import { useAuth } from "@/contexts/authContext";
import { setAuthToken, setUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

const GET_PROFILE = gql(`
  query GetProfile {
    profile { _id name email role }
  }
`);

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogin, token, user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();

  const [isActive, setIsActive] = useState(false);

  // Apollo Client Query Hook
  const { data, error, loading } = useQuery(GET_PROFILE, {
    skip: !isLogin || !token, // Skip the query if user is not logged in
    context: {
      headers: { Authorization: token }, // Attach Authorization header
    },
  });

  axios.defaults.headers["Authorization"] = token;
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ROUTE;

  // check auth
  useEffect(() => {
    if (!loading) {
      if (data?.profile) {
        dispatch(setUser(data.profile));
      } else if (error) {
        console.error("Failed to fetch user profile:", error);
        dispatch(setUser(null));
        dispatch(setAuthToken({ token: "" }));
        router.push("/admin/login");
      }
    }
  }, [data, error, dispatch, router, loading]);

  // If not logged in, don't render children
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!isLogin || !user) {
    router.push("/admin/login");
  }

  return (
    <>
      <div className="relative">
        {user && (
          <div className="flex">
            <div
              className={` ${
                isActive ? "left-0  md:left-[-500px] md:w-0" : "left-[-500px] md:left-0 md:w-[450] "
              } w-[300] absolute md:relative z-10 transition-all `}
            >
              <AdminSidebar {...{ user }} />
            </div>
            <div className="w-full h-screen overflow-y-auto">
              <AdminHeader {...{ setIsActive, logout }} />
              <div className="p-8 ">{children}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthLayout;
