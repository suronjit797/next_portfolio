import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";

interface Props {
  src: string;
}

const TableImagePreview: React.FC<Props> = ({ src }) => {
  return (
    <Tooltip
      placement="bottomLeft"
    //   arrow={false}
      title={<Image src={src} alt="Preview" width={300} height={300} className="rounded-md" />}
      classNames={{ body: "!p-0" }}
    >
      <Image src={src} alt="userImage" width={48} height={48} className="rounded-full w-10 h-10 cursor-pointer" />
    </Tooltip>
  );
};

export default TableImagePreview;
