import { User } from "@/global/interface";
import styles from "@/styles/sidebar.module.css";
import NavLink from "../NavLink";

const NavItems = [
  { name: "dashboard", path: "" },
  { name: "users", path: "/users" },
  { name: "Recent Projects", path: "/projects" },
  { name: "About Me", path: "/about" },
  { name: "Contact Me", path: "/contact" },
];

const AdminSidebar: React.FC<{ user: User; }> = ({ user }) => {
  return (
    <div className="h-screen w-full max-w-screen py-3 px-3 overflow-y-auto overflow-x-hidden bg-[#212529]">
      <div className="flex items-center flex-col h-full">
        <h1 className="capitalize">
          <span className="font-bold">{user?.name}</span> <span className="text-xs">({user?.role})</span>
        </h1>
        <hr className="w-full my-3" />
        {/* nav items */}
        <nav className="w-full lg:px-4">
          {NavItems.map((item, ind) => (
            <NavLink
              key={ind}
              className={`capitalize ${styles.nav_link}`}
              activeClassName={`${styles.active}`}
              href={"/admin" + item.path}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* <hr className="w-full mt-auto" />

        <div className={`mt-3 flex w-full px-4`}>
          <Link href="/admin/profile" className="!text-white capitalize cursor-pointer">
            <div>{user.name}</div>
            <div className="text-sm">({user.role})</div>
          </Link>
          <button className="text-red-400 ms-auto cursor-pointer" onClick={logout}>
            <BiLogOut />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AdminSidebar;
