import styles from "@/styles/sidebar.module.css";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Image from "next/image";
import user from "@/assets/user.jpeg";
import NavLink from "../NavLink";
import { store } from "@/redux/store";

const state = store.getState();
const isLogin = state.auth?.isLogin;

const NavItems = [
  { name: "home", path: "/" },
  { name: "My Skills", path: "/skills" },
  { name: "Recent Projects", path: "/projects" },
  { name: "About Me", path: "/about" },
  { name: "Contact Me", path: "/contact" },
];

if (isLogin) {
  NavItems.push({ name: "admin", path: "/admin" });
}

const Sidebar = () => {
  return (
    <div className="h-screen w-full max-w-screen py-3 px-3 overflow-y-auto overflow-x-hidden bg-[#212529]">
      <div className="flex items-center flex-col h-full">
        <Image src={user} height={200} width={200} alt="user" className={`${styles.userImage}`} />
        <div className="intro text-center mt-3 mb-2">
        <h1 className="text-3xl text-primary underline mb-1"> Suronjit Pal </h1>
        <h2 className="text-md"> MERN Stack Developer </h2>
        </div>

        {/* nav items */}
        <nav className="w-full lg:px-4 my-4">
          {NavItems.map((item, ind) => (
            <NavLink
              key={ind}
              className={`capitalize ${styles.nav_link}`}
              activeClassName={`${styles.active}`}
              href={item.path}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <hr className="w-full mt-auto" />

        {/* social items */}
        <div className="mt-3 flex justify-between">
          <div className={`${styles.icon} ${styles.facebook}`}>
            <a
              href="https://www.facebook.com/suronjit797/"
              target="_blank"
              aria-label="Facebook Profile"
              className="!text-white"
            >
              <FaFacebookF />
            </a>
          </div>
          <div className={`${styles.icon} ${styles.linkedin}`}>
            <a
              href="https://www.linkedin.com/in/suronjit797/"
              target="_blank"
              aria-label="LinkedIn Profile"
              className="!text-white"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <div className={`${styles.icon} ${styles.gmail}`}>
            <a href="mailto:suronjit797@gmail.com" target="_blank" aria-label="Send an Email" className="!text-white">
              <BiLogoGmail />
            </a>
          </div>
          <div className={`${styles.icon} ${styles.github}`}>
            <a
              href="https://github.com/suronjit797"
              target="_blank"
              aria-label="GitHub Profile"
              className="!text-white"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
