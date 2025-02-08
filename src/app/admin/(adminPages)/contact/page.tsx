"use client";

import { gql } from "@/__generated__";
import { InputMaybe, SortOrder } from "@/__generated__/graphql";
import AdminTable from "@/components/admin/AdminTable";

import { Message } from "@/global/interface";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Empty, Space, Spin, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ContactTableHeader from "./ContactTableHeader";

// GraphQL Queries and Mutations
const ALL_MESSAGES = gql(`
  query Messages($pagination: PaginationInput, $query: MessagesQueryInput) {
    messages(pagination: $pagination, query: $query) { meta { page limit total unread }
    data { _id name email unread}
    }
  }
`);

const UPDATE_MESSAGE = gql(`
  mutation UpdateMessage($updateMessageId: ID!, $body: UpdateMessagesInput) {
    updateMessage(id: $updateMessageId, body: $body) { _id }
}
`);

const REMOVE_MESSAGE = gql(`
  mutation RemoveMessage($deleteMessageId: ID!) { deleteMessage(id: $deleteMessageId) { _id }}
`);

const Messages: React.FC = () => {
  const { params, updateParams } = useSearchParamsState({
    page: "1",
    limit: "10",
    sortOrder: "asc",
    sortBy: "position",
  });
  const { page, limit, sortOrder, sortBy } = params;

  // GraphQL Hooks
  const variables = {
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      sortOrder: sortOrder as InputMaybe<SortOrder>,
      sortBy,
    },
    // query: {},
  };
  const { loading, data, refetch } = useQuery(ALL_MESSAGES, { variables });

  const [updateMessage] = useMutation(UPDATE_MESSAGE, { refetchQueries: ["Messages"] });
  const [deleteMessage] = useMutation(REMOVE_MESSAGE, { refetchQueries: ["Messages"] });

  const columns: ColumnsType<Message> = [
    {
      title: "SL No",
      render: (_, __, index) => (parseInt(page) - 1) * parseInt(limit) + index + 1,
      align: "center",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Unread",
      render: (_, record) => (
        <div
          onClick={() =>
            updateMessage({ variables: { body: { unread: !Boolean(record?.unread) }, updateMessageId: record?._id } })
          }
          className="cursor-pointer"
        >
          {record.unread ? <Tag color="red">Unread</Tag> : <Tag color="green">Read</Tag>}
        </div>
      ),
      align: "center",
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space className="text-xl ">
          <div className=" cursor-pointer mx-2 text-blue-400">
            <Link href={`contact/${record?._id}`}>
              <EyeOutlined />
            </Link>
          </div>
          <div className=" cursor-pointer mx-2 text-red-400" onClick={() => deleteHandler(record?._id)}>
            <DeleteOutlined />
          </div>
        </Space>
      ),
      align: "center",
      width: 100,
    },
  ];

  // handler
  const refetchData = () => {
    refetch(variables);
  };

  const deleteHandler = (deleteMessageId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMessage({ variables: { deleteMessageId } });
          toast.success("Message deleted successfully!");
        } catch (error) {
          console.error("Failed to delete user!", error);
          toast.error("Failed to delete user!");
        }
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <ContactTableHeader {...{ refetch: refetchData, unread: data?.messages?.meta?.unread || 0, name: "Messages" }} />
      {Array.isArray(data?.messages?.data) && data?.messages?.data?.length > 0 ? (
        <AdminTable {...{ columns, data: data?.messages?.data, params, meta: data?.messages?.meta, updateParams }} />
      ) : (
        <div className="py-10 bg-black/40 rounded-md">
          <Empty description="No data found" />
        </div>
      )}
    </Spin>
  );
};

export default Messages;
