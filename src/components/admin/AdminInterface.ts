import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";

export interface BaseProps {
  name: string;
  uri: string;
  showItems: string[];
  dataFormate?:
    | {
        data: string;
        meta: string;
      }
    | string;
}

export interface AdminProps {
  showItems?: string[];
  data?: ColumnsType<AnyObject>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
