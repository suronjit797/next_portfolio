/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import React from "react";

interface Props {
  columns?: ColumnsType<AnyObject>;
  data?: ColumnsType<AnyObject> ;
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
        current: Number(params.page),
        pageSize: Number(params.limit),
        total: meta?.total || 0,
        showSizeChanger: true,
      }}
      onChange={handleTableChange}
      className="bg-gray-900 text-white rounded-md"
    />
  );
};

export default AdminTable;
