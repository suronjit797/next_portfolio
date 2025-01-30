/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/global/interface";

export interface BaseProps {
  name: string;
  uri: string;
  showItems: string[];
  query?: Record<string, string>;
  dataFormate?:
    | {
        data: string;
        meta: string;
      }
    | string;
}

export type UpdateParams = (newParams: string) => object;
export interface AdminProps {
  isListView: boolean;
  setIsListView: React.Dispatch<React.SetStateAction<boolean>>;
  showItems?: string[];
  data?: User[];
  updateParams?: any;
  params: any;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
