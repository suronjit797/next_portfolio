"use client";

import { ReactNode, useState, useCallback } from "react";
import { LiaBarsSolid } from "react-icons/lia";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "@/components/header/Sidebar";
import styles from "@/styles/mainLayout.module.css";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  // Optimize state update
  const toggleSidebar = useCallback(() => setIsActive((prev) => !prev), []);

  return (
    <div className="relative">
      {/* Sidebar Toggle Button */}
      <div className={`${styles.bars} block md:hidden text-xl`} onClick={toggleSidebar}>
        {isActive ? <AiOutlineClose /> : <LiaBarsSolid />}
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={` ${
            isActive ? "left-0 md:left-[-500px] md:w-0" : "left-[-500px] md:left-0 md:w-[450px]"
          } w-[300px] absolute md:relative z-10 transition-all duration-300`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="h-screen w-full overflow-y-auto p-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
