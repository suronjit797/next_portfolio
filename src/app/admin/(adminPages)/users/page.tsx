import AdminMain from "@/components/admin/AdminMain";
import React from "react";

const Users: React.FC = () => {
  const adminMainProps = {
    name: "users",
    uri: process.env.NEXT_PUBLIC_API_ROUTE as string,
    dataFormate: { data: "data", meta: "meta" },
    showItems: ["name", "email", "role"],
  };

  return <AdminMain {...adminMainProps} />;
};

export default Users;
