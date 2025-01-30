/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "@/global/interface";
import React from "react";
import { Pagination } from "antd";

interface Props {
  showItems?: string[];
  data?: User[];
  params: any;
  meta: any;
  updateParams: (newParams: any) => void;
}

const AdminGrid: React.FC<Props> = ({ showItems, data = [], params, meta, updateParams }) => {
  const handlePageChange = (page: number, pageSize?: number) => {
    updateParams({ page, limit: pageSize });
  };

  // Dynamically generate grid items based on `showItems`
  const renderGridItems = () =>
    data.map((item: any) => (
      <div
        key={item._id}
        className="bg-gray-600 shadow-sm rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
      >
        {showItems?.map((i, ind) => (
          <h2 key={ind} className="font-semibold text-lg">
            {item[i]}
          </h2>
        ))}
        {/* {showItems?.includes("name") && <h2 className="font-semibold text-lg">{item.name}</h2>}
        {showItems?.includes("email") && <p className="text-gray-300">{item.email}</p>}
        {showItems?.includes("role") && <span className="text-sm text-gray-400">{item.role}</span>} */}
      </div>
    ));

  return (
    <div className="flex flex-col gap-6">
      {/* Grid Container */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{renderGridItems()}</div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={params.page || 1}
          pageSize={params.limit || 10}
          total={meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "50"]}
        />
      </div>
    </div>
  );
};

export default AdminGrid;
