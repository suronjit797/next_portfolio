import { Layout, Avatar, Dropdown } from "antd";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

interface Props {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const AdminHeader: React.FC<Props> = ({ setIsActive, logout }) => {
  const items = [
    { key: "1", label: <Link href="/admin/profile">Profile</Link> },
    { key: "2", danger: true, label: <div onClick={logout}>Logout</div> },
  ];

  return (
    <Header className="!bg-[#212529] flex !text-white justify-between items-center !px-4 shadow-md">
      <MenuFoldOutlined className="text-xl z-50 cursor-pointer" onClick={() => setIsActive((pre) => !pre)} />
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        openClassName="!bg-black"
        trigger={["hover"]}
        dropdownRender={(menu) => <div className="w-40 rounded-md">{menu}</div>}
      >
        <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer bg-gray-700" />
      </Dropdown>
    </Header>
  );
};

export default AdminHeader;
