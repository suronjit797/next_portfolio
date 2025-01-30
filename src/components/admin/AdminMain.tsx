"use client";

import React, { useEffect, useState } from "react";
import AdminBody from "./AdminBody";
import { AdminProps, BaseProps } from "./AdminInterface";
import axios from "axios";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

const AdminMain: React.FC<BaseProps> = (props) => {
  const { uri, name, dataFormate, showItems } = props;
  const { params, updateParams } = useSearchParamsState({ page: 1, limit: 10 });
  const [isListView, setIsListView] = useState(true);
  const [adminBodyProps, setAdminBodyProps] = useState<AdminProps>({
    showItems,
    updateParams,
    params,
    isListView,
    setIsListView,
  });

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(uri + name, { params });
      console.log({ data: data });

      if (dataFormate) {
        if (typeof dataFormate === "string") {
          setAdminBodyProps((pre) => ({ ...pre, params, data: data[dataFormate] }));
        } else {
          setAdminBodyProps((pre) => ({ ...pre, params, data: data[dataFormate.data], meta: data[dataFormate.meta] }));
        }
      }
    };
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.limit, params.page]);

  return <AdminBody {...adminBodyProps} {...{ isListView, setIsListView }} />;
};

export default AdminMain;
