import {
  // FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";

interface Props {
  refetch: () => void;
  name?: string;
  unread?: number;
}

const ContactTableHeader: React.FC<Props> = ({ refetch, name, unread }) => {
  return (
    <div className="flex bg-black/40 mb-4 justify-between items-center p-4 rounded-md shadow-sm">
      <div className="text-lg font-medium ">
        {name && "All " + name} {Number(unread) > 0 && <span className="text-red-500"> ({unread}) </span>}
      </div>
      <div className="flex items-center gap-8">
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

export default ContactTableHeader;
