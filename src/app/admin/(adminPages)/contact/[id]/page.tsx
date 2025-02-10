"use client";

import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { Card, Divider, Spin, Tag } from "antd";
import dayjs from "dayjs"; // Import dayjs for date formatting
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const GET_MESSAGE = gql(`
  query message($messageId: ID!) {
      message(id: $messageId) { _id name email unread message createdAt updatedAt}
  }
`);

const ProductView: React.FC = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MESSAGE, {
    variables: { messageId: id as string },
  });

  const message = data?.message;

  return (
    <Spin spinning={loading}>
      <div className="">
        <Card className="bg-gray-900/20 text-white shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-semibold capitalize">{message?.name}</h2>
          <Link href={`mailto:${message?.email}`} target="_blank" className="!text-gray-400 hover:!underline">
            {message?.email}
          </Link>

          <Divider className="border-gray-700" />

          <p className="text-lg">{message?.message}</p>

          <Divider className="border-gray-700" />

          <div className="flex justify-between text-gray-400 text-sm">
            <p>Created: {dayjs(message?.createdAt).format("DD MMM YYYY, hh:mm A")}</p>
            <p>Updated: {dayjs(message?.updatedAt).format("DD MMM YYYY, hh:mm A")}</p>
          </div>

          <div className="mt-4">
            {message?.unread ? (
              <Tag color="red" className="text-white">
                Unread
              </Tag>
            ) : (
              <Tag color="green" className="text-white">
                Read
              </Tag>
            )}
          </div>
        </Card>
      </div>
    </Spin>
  );
};

export default ProductView;
