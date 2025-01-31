/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import React from "react";

interface Props {
  columns: any[];
  data?: any[] | null;
  params: any;
  meta?: any;
  updateParams: (newParams: any) => void;
}

const AdminTable: React.FC<Props> = ({ columns, data, params, meta, updateParams }) => {
  // Handle pagination change
  const handleTableChange = (pagination: any) => {
    updateParams({ page: pagination.current, limit: pagination.pageSize });
  };

  if (Array.isArray(data) && Array.isArray(columns) && data?.length > 0 && columns?.length > 0) {
    return <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record._id}
      pagination={{
        current: Number(params?.page) || 1,
        pageSize: Number(params?.limit) || 10,
        total: meta?.total || 0,
        showSizeChanger: true,
        className:"bg-black/50 !px-3 !py-2 !text-white disabled:!text-white disabled:opacity-100 rounded-md"
      }}
      onChange={handleTableChange}
      className="rounded-md"
    />;
  } else {
    return <p className="text-center text-gray-500">No data available</p>;
  }
};

export default AdminTable;
