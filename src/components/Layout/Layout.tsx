import React, { ReactNode, useState } from "react";
import Sidebar from "../header/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import "./layout.css";
import { useLocation } from "react-router-dom";
import { LiaBarsSolid } from "react-icons/lia";
import { AiOutlineClose } from "react-icons/ai";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="Layout relative">
      <div
        className="bars d-block d-md-none fs-5"
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? <AiOutlineClose /> : <LiaBarsSolid />}
      </div>

      <div className="container-fluid">
        <div className="row">
          <div
            className={`left_nav col-lg-3 col-md-4 d-md-flex bg-dark ${
              isActive ? "active" : ""
            }`}
            style={{ minHeight: "100vh" }}
          >
            <Sidebar />
          </div>
          <div className="col-lg-9 col-md-8 pe-0">
            {/* <AnimatePresence exitBeforeEnter> */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.key}
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
    </div>
  );
};

export default Layout;
