"use client";

import type { ColumnsType } from "antd/es/table";
import { AdminProps } from "./AdminInterface";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { AnyObject } from "antd/es/_util/type";
import AdminTable from "./AdminTable";
import AdminHeader from "./AdminHeader";

const AdminBody: React.FC<AdminProps> = ({ data, showItems = [], meta }) => {
  const { params, updateParams } = useSearchParamsState({ page: 1, limit: 10 });

  const columns: ColumnsType<AnyObject> | undefined = (
    Array.isArray(data) && data.length > 0 ? Object.keys(data[0]) : []
  )
    .filter((key) => (showItems.length ? showItems.includes(key) : true))
    .map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize column name
      dataIndex: key,
      key,
    }));

  return (
    <>
      <AdminHeader />
      <AdminTable {...{ columns, data, params, meta, updateParams }} />
    </>
    // <Table
    //   columns={columns}
    //   dataSource={data as any}
    //   rowKey={(record) => record._id}
    //   pagination={{
    //     current: Number(params.page),
    //     pageSize: Number(params.limit),
    //     total: meta?.total || 0,
    //     showSizeChanger: true,
    //   }}
    //   onChange={handleTableChange}
    //   className="bg-gray-900 text-white rounded-md"
    // />
  );
};

export default AdminBody;
