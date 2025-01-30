"use client";

import AdminHeader from "@/components/header/AdminHeader";
import AdminSidebar from "@/components/header/AdminSidebar";
import { useAuth } from "@/contexts/authContext";
import { setAuthToken, setUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogin, token, user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();

  const [isActive, setIsActive] = useState(false);

  // check auth
  useEffect(() => {
    const fetchProfile = async () => {
      if (isLogin) {
        try {
          const { data } = await axios.get("/users/profile", { headers: { Authorization: token } });
          dispatch(setUser(data?.data));
        } catch (error) {
          console.error("Failed to get user profile:", error);
          dispatch(setUser(null));
          dispatch(setAuthToken({ token: "" }));
          router.push("/admin/login");
        }
      } else {
        router.push("/admin/login");
      }
    };

    fetchProfile();
  }, [isLogin, dispatch, router, token]);

  // If not logged in, don't render children
  if (!isLogin || !user) {
    return null;
  }

  return (
    <>
      {" "}
      <div className="relative">
        {/* <div className={`${styles.bars} block md:none text-xl`} onClick={() => setIsActive(!isActive)}>
          
        </div> */}

        <div className="flex">
          <div
            className={` ${
              isActive ? "left-0  md:left-[-500px] md:w-0" : "left-[-500px] md:left-0 md:w-[450] "
            } w-[300] absolute md:relative z-10 transition-all `}
          >
            <AdminSidebar {...{ user }} />
          </div>
          <div className="w-full">
            <AdminHeader {...{ setIsActive, logout }} />
            <div className="p-8">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
