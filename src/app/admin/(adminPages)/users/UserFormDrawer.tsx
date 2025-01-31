/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer, Form, FormInstance, Input, Space } from "antd";
import React from "react";

interface Props {
  open: boolean;
  closeDrawer: () => void;
  onFinish: () => void;
  form: FormInstance<any>;
}

const UserFormDrawer: React.FC<Props> = ({ open, closeDrawer, onFinish, form }) => {
  return (
    <div className="!text-white">
      <Drawer
        title="Create a new account"
        width={720}
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
            <Button onClick={onFinish} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
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

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
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
            <Input.Password
              placeholder="Confirm your password"
              // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default UserFormDrawer;
