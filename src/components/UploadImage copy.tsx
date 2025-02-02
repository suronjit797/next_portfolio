/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Upload } from "antd";
import { toast } from "react-toastify";

interface Props {
  maxCount: number;
  name: string;
  label: string;
  listType: "text" | "picture" | "picture-card" | "picture-circle";
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<any>;
}

const normFile = (e: any) => {
  console.log("Upload event:", e);
  let value;
  if (Array.isArray(e)) {
    value = e?.filter((file: any) => file.status !== "error");
  }
  value = e?.fileList?.filter((file: any) => file.status !== "error");

  if (value.length > 0) return value;
};

const App: React.FC<Props> = ({ maxCount, name, label, listType, setIsLoading, form }) =>{
  
  const file = form.getFieldValue(name)
  if(Array.isArray(file)){
    
  }

  return (
  <>
    <Form.Item {...{ name, label }} valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true }]}>
      <Upload
        action={process.env.NEXT_PUBLIC_API_ROUTE + "upload"}
        name="photo"
        listType={listType}
        maxCount={maxCount}
        onChange={({ file }) => {
          if (file.status === "uploading") setIsLoading(true);
          if (file.status === "done") setIsLoading(false);
          if (file.status === "error") toast.error(`${file.name} file upload failed.`);
        }}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>
  </>
)};

export default App;
