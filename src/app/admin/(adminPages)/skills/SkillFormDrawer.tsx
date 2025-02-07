/* eslint-disable @typescript-eslint/no-explicit-any */
import UploadImage from "@/components/UploadImage";
import { Button, Drawer, Form, FormInstance, Input, Select, Space, Spin } from "antd";
import React from "react";

interface Props {
  open: boolean;
  closeDrawer: () => void;
  onFinish: () => void;
  form: FormInstance<any>;
  mode?: "edit" | "create";
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const typeOptions = ["Frontend", "Backend", "State & Data Management", "Development & Design Tools"];

const onFinishFailed = (values: any) => {
  console.log("failed", values);
};

const SkillFormDrawer: React.FC<Props> = ({
  open,
  closeDrawer,
  onFinish,
  form,
  mode = "create",
  isLoading,
  setIsLoading,
}) => {
  return (
    <Drawer
      title={`${mode === "create" ? "Create a new" : "Update"} skill`}
      width={540}
      onClose={closeDrawer}
      open={open}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button danger type="primary" onClick={closeDrawer}>
            Cancel
          </Button>
          <Button onClick={() => form.submit()} type="primary" disabled={isLoading}>
            Submit
          </Button>
        </Space>
      }
    >
      <Spin spinning={isLoading}>
        <Form name="projectForm" layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {/* Name */}
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="Enter project name" />
          </Form.Item>

          {/* Type */}
          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Type is required" }]}>
            <Select placeholder="Add type" options={typeOptions.map(type=> ({label:type, value:type}))} />
          </Form.Item>

          {/* Thumbnail Upload (Single Image) */}
          <UploadImage
            {...{
              label: "Image",
              listType: "picture",
              maxCount: 1,
              name: "image",
              isLoading,
              setIsLoading,
              form,
            }}
          />
        </Form>
      </Spin>
    </Drawer>
  );
};

export default SkillFormDrawer;
