/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/global/interface";
import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import React from "react";

interface Props {
  columns?: ColumnsType<AnyObject>;
  data?: User[];
  params: any;
  meta: any;
  updateParams: (newParams: any) => void;
}

const AdminTable: React.FC<Props> = ({ columns, data, params, meta, updateParams }) => {
  // Handle pagination change
  const handleTableChange = (pagination: any) => {
    updateParams({ page: pagination.current, limit: pagination.pageSize });
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record._id}
      pagination={{
        current: Number(params?.page) || 1,
        pageSize: Number(params?.limit) || 10,
        total: meta?.total || 0,
        showSizeChanger: true,
      }}
      onChange={handleTableChange}
      className="bg-gray-900 text-white rounded-md"
    />
  );
};

export default AdminTable;
