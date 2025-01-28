"use client";

import { ReactNode, useState } from "react";
import { LiaBarsSolid } from "react-icons/lia";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "@/components/header/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import styles from "@/styles/mainLayout.module.css";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative">
      <div className={`${styles.bars} block md:none text-xl`} onClick={() => setIsActive(!isActive)}>
        {isActive ? <AiOutlineClose /> : <LiaBarsSolid />}
      </div>

      <div className="flex">
        <div
          className={`w-[450] absolute md:relative z-10 transition-all  ${
            isActive ? "left-0  md:left-[-500px] md:w-0" : "left-[-500px] md:left-0"
          }`}
        >
          <Sidebar />
        </div>
        <div className="w-full">
          {/* <AnimatePresence exitBeforeEnter> */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{
                opacity: 0,
                overflowY: "hidden",
                height: "100vh",
              }}
              animate={{
                opacity: 1,
                overflowY: "auto",
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container h-100">{children}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Layout;
