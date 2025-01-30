import { Select, Button, Tooltip } from "antd";
import { FilterOutlined, UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";

const AdminHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center  p-4 rounded-md shadow-sm">
      {/* Left Section */}
      <div className="text-lg font-medium ">
        My Courses for{" "}
        <span className="text-blue-600 font-semibold">“All Courses”</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Sort By Dropdown */}
        {/* <div className="flex items-center gap-2">
          <span className="text-gray-500">Sort By:</span>
          <Select
            defaultValue="All Categories"
            className="min-w-[150px]"
            options={[
              { value: "All Categories", label: "All Categories" },
              { value: "Category 1", label: "Category 1" },
              { value: "Category 2", label: "Category 2" },
            ]}
          />
        </div> */}

        {/* Filter Icon */}
        <Tooltip title="Filter">
          <Button
            shape="circle"
            icon={<FilterOutlined />}
            className="hover:bg-gray-200 text-gray-500"
          />
        </Tooltip>

        {/* View Mode Icons */}
        <div className="flex gap-2">
          <Tooltip title="List View">
            <Button
              shape="circle"
              icon={<UnorderedListOutlined />}
              className="hover:bg-gray-200 text-gray-500"
            />
          </Tooltip>
          <Tooltip title="Grid View">
            <Button
              shape="circle"
              icon={<AppstoreOutlined />}
              className="hover:bg-gray-200 text-gray-500"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
