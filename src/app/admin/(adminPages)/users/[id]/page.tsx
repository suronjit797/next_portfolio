"use client";

import { gql } from "@/__generated__";
import { User } from "@/global/interface";
import { AVATAR } from "@/lib/constants";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button, Card, Descriptions, Spin, Tag } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const { Meta } = Card;

const GET_USER = gql(`
  query User($userId: ID!) {
    user(id: $userId) { name email role avatar { url } isActive createdAt updatedAt
    }
  }
`);

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const { loading, data } = useQuery<{ user: User }>(GET_USER, {
    variables: { userId: id as string },
  });

  const user = data?.user;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-semibold ">User not found!</h1>
      </div>
    );
  }

  return (
    <Spin spinning={loading}>
      <div className="p-4">
        <div className="relative">
          <Card
            bordered={false}
            className="shadow-lg rounded-2xl bg-gray-800 border-gray-700"
            cover={
              <div className="bg-gray-700 flex py-6">
                <Link href={user?.avatar?.url || AVATAR(user?.name)} target="_blank">
                  <Image
                    src={user?.avatar?.url || AVATAR(user?.name)}
                    width={300}
                    height={300}
                    className="shadow-lg h-44 w-44 rounded-full mx-auto"
                    alt="avatar"
                  />
                </Link>
              </div>
            }
          >
            <Meta
              title={<div className="text-center text-2xl font-semibold text-gray-200 capitalize">{user.name}</div>}
              description={
                <div className="text-center ">
                  <Link className="!text-gray-400" href={`mailto:${user.email}`} target="_blank">
                    {user.email}
                  </Link>
                </div>
              }
            />
          </Card>
          <div className=" absolute top-2 right-2">
            <Button
              type="text"
              icon={<EditOutlined />}
              key={1}
              onClick={() => alert("Edit Profile need change")}
              size="large"
            />
          </div>
        </div>

        <div className="mt-10">
          <Descriptions title="User Details" bordered column={1} className="rounded-lg shadow-md ">
            <Descriptions.Item label="Role">
              <Tag
                color={user.role === "superAdmin" ? "red" : user.role === "admin" ? "blue" : "yellow"}
                className="capitalize"
              >
                {user.role}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Active Status">
              <Tag color={user.isActive ? "green" : "volcano"}>{user.isActive ? "Active" : "Inactive"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">{dayjs(user.createdAt).format("DD MMM,YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Updated At">{dayjs(user.updatedAt).format("DD MMM,YYYY")}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Spin>
  );
};

export default UserProfile;
