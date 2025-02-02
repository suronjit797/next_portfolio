"use client";

import { useAuth } from "@/contexts/authContext";
import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
// import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { isLogin } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLogin) {
      router.push("/admin");
    }
  }, [isLogin, router]);

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
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <Form layout="vertical" onFinish={onFinish}>
          {/* Username Field */}
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
            <Input placeholder="Enter your username" />
          </Form.Item>

          {/* Password Field with Show/Hide Toggle */}
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password placeholder="Enter your password" autoComplete="off" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Log in
            </Button>
          </Form.Item>
        </Form>

        {/* Signup Link */}
        {/* <div className="flex justify-center text-sm">
          <span className="text-gray-500">Don&apos;t have an account?</span>
          <Link href="signup" className="ml-1 text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
