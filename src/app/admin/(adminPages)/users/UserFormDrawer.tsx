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

const UserFormDrawer: React.FC<Props> = ({
  open,
  closeDrawer,
  onFinish,
  form,
  mode = "create",
  isLoading,
  setIsLoading,
}) => {
  return (
    <div>
      <Drawer
        title={`${mode === "create" ? "Create  a new" : "Update a"} user`}
        width={540}
        onClose={closeDrawer}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
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
            {/* Name Field */}
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder="Enter your name" />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Status" name="isActive" rules={[{ required: true, message: "Status is required" }]}>
              <Select
                placeholder="Select Status"
                options={[
                  { label: "Active", value: true },
                  { label: "Inactive", value: false },
                ]}
              />
            </Form.Item>

            <Form.Item label="Role" name="role" rules={[{ required: true, message: "Role is required" }]}>
              <Select
                placeholder="Select User Role"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                ]}
              />
            </Form.Item>

            {/* Password Field */}
            {mode === "edit" && (
              <>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Password is required" },
                    { min: 6, message: "Password must be at least 6 characters" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                {/* Confirm Password Field */}
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
              </>
            )}

            <UploadImage
              {...{
                label: "Profile Picture",
                listType: "picture",
                maxCount: 1,
                name: "avatar",
                isLoading,
                setIsLoading,
                form,
              }}
            />
          </Form>
        </Spin>
      </Drawer>
    </div>
  );
};

export default UserFormDrawer;
