import { Button, Tooltip } from "antd";
import {
  // FilterOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

interface Props {
  refetch: () => void;
  setOpen: (open: boolean) => void;
  name?: string;
}

const AdminTableHeader: React.FC<Props> = ({ refetch, setOpen, name }) => {
  return (
    <div className="flex bg-black/40 mb-4 justify-between items-center p-4 rounded-md shadow-sm">
      {/* Left Section */}
      <div className="text-lg font-medium ">{name && "All " + name}</div>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        {/* View Mode Icons */}
        <div className="flex gap-2">
          {/* Filter Icon */}
          {/* <Tooltip title="Filter">
            <Button
              shape="circle"
              icon={<FilterOutlined />}
              className="hover:bg-gray-200 text-gray-500 "
              onClick={() => console.log("filter")}
            />
          </Tooltip> */}

          <Tooltip title="Refetch">
            <Button
              shape="circle"
              icon={<ReloadOutlined />}
              variant="solid"
              onClick={refetch}
              className="hover:bg-gray-200 text-gray-500"
            />
          </Tooltip>
          <Tooltip title={`Add ${name || "Item"}`}>
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              variant="solid"
              onClick={() => setOpen(true)}
              className="hover:bg-gray-200 text-gray-500"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AdminTableHeader;
