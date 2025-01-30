import React from "react";
import AdminBody from "./AdminBody";
import { AdminProps, BaseProps } from "./AdminInterface";
import axios from "axios";

const AdminMain: React.FC<BaseProps> = async (props) => {
  const { uri, name, dataFormate, showItems } = props;

  try {
    const { data } = await axios.get(uri + name);
    console.log({ data: data });

    const adminBodyProps: AdminProps = { showItems };
    if (dataFormate) {
      if (typeof dataFormate === "string") {
        adminBodyProps.data = data[dataFormate];
      } else {
        adminBodyProps.data = data[dataFormate.data];
        adminBodyProps.meta = data[dataFormate.meta];
      }
    }

    return <AdminBody {...adminBodyProps} />;

    // if error
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return error.message;
    }

    return "Error happened";
  }
};

export default AdminMain;
