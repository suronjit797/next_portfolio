"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { login, auth } = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuth) {
      router.push("/admin");
    }
  }, [auth.isAuth, router]);

  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      message.success("Login successful!");
    } catch (error) {
      console.log(error);
      message.error("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">Login</h2>
        <Form layout="vertical" onFinish={onFinish}>
          {/* Username Field */}
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
            <Input placeholder="Enter your username" />
          </Form.Item>

          {/* Password Field with Show/Hide Toggle */}
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password
              placeholder="Enter your password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Log in
            </Button>
          </Form.Item>
        </Form>

        {/* Signup Link */}
        <div className="flex justify-center text-sm">
          <span className="text-gray-500">Don&apos;t have an account?</span>
          <Link href="signup" className="ml-1 text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
