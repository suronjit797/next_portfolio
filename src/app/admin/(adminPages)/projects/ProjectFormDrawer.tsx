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

const onFinishFailed = (values: any) => {
  console.log("failed", values);
};

const ProjectFormDrawer: React.FC<Props> = ({
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
      title={`${mode === "create" ? "Create a new" : "Update"} project`}
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
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {/* Position */}
          <Form.Item label="Position" name="position" rules={[{ required: true, message: "Position is required" }]}>
            <Input type="number" placeholder="Enter position" />
          </Form.Item>

          {/* Name */}
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="Enter project name" />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
            <Input.TextArea rows={3} placeholder="Enter project description" />
          </Form.Item>

          {/* Packages */}
          <Form.Item label="Packages" name="packages" rules={[{ required: true, message: "At least one package is required" }]}>
            <Select mode="tags" placeholder="Add packages (e.g., React, Express)" />
          </Form.Item>

          {/* Tags */}
          <Form.Item label="Tags" name="tags" rules={[{ required: true, message: "At least one tag is required" }]}>
            <Select mode="tags" placeholder="Add tags (e.g., Fullstack, MERN)" />
          </Form.Item>

          {/* Live URL */}
          <Form.Item label="Live URL" name="liveUrl" rules={[{ type: "url", message: "Enter a valid URL" }]}>
            <Input placeholder="Enter live project URL" />
          </Form.Item>

          {/* GitHub URLs */}
          <Form.Item label="GitHub (Frontend)" name={["githubUrl", "frontend"]} rules={[{ type: "url", message: "Enter a valid URL" }]}>
            <Input placeholder="Enter frontend repo URL" />
          </Form.Item>

          <Form.Item label="GitHub (Backend)" name={["githubUrl", "backend"]} rules={[{ type: "url", message: "Enter a valid URL" }]}>
            <Input placeholder="Enter backend repo URL" />
          </Form.Item>

          {/* Thumbnail Upload (Single Image) */}
          <UploadImage
            {...{
              label: "Thumbnail",
              listType: "picture",
              maxCount: 1,
              name: "thumbnail",
              isLoading,
              setIsLoading,
              form,
            }}
          />

          {/* Images Upload (Multiple) */}
          <UploadImage
            {...{
              label: "Project Images",
              listType: "picture-card",
              maxCount: 5,
              name: "images",
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

export default ProjectFormDrawer;
