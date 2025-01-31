import { Button, Tooltip } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";


interface Props {
  refetch: () => void;
}

const AdminTableHeader: React.FC<Props> = ({ refetch }) => {
  return (
    <div className="flex bg-gray-600 mb-4 justify-between items-center  p-4 rounded-md shadow-sm">
      {/* Left Section */}
      <div className="text-lg font-medium ">
        My Courses for <span className="text-blue-600 font-semibold">“All Courses”</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Filter Icon */}
        <Tooltip title="Filter">
          <Button shape="circle" icon={<FilterOutlined />} className="hover:bg-gray-200 text-gray-500 " />
        </Tooltip>

        {/* View Mode Icons */}
        <div className="flex gap-2">         

          <Tooltip title="Refetch">
            <Button
              shape="circle"
              icon={<ReloadOutlined />}
              variant="solid"
              onClick={refetch}
              className="hover:bg-gray-200 text-gray-500"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AdminTableHeader;
