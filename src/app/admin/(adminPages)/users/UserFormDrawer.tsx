/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer, Form, FormInstance, Input, Select, Space } from "antd";
import React from "react";

interface Props {
  open: boolean;
  closeDrawer: () => void;
  onFinish: () => void;
  form: FormInstance<any>;
  mode?: "edit" | "create";
}

const onFinishFailed = () => {
  console.log("failed");
};

const UserFormDrawer: React.FC<Props> = ({ open, closeDrawer, onFinish, form, mode='create' }) => {
  return (
    <div className="!text-white">
      <Drawer
        title="Create a new account"
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
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
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
        </Form>
      </Drawer>
    </div>
  );
};

export default UserFormDrawer;
