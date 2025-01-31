"use client";
import { gql } from "@/__generated__";
import { UsersListQuery } from "@/__generated__/graphql";
import AdminTable from "@/components/admin/AdminTable";
import AdminTableHeader from "@/components/admin/AdminTableHeader";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Space, Spin, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// GraphQL Queries and Mutations
const ALL_USERS = gql(`
  query UsersList($pagination: PaginationInput, $query: UserQuery) {
    users(pagination: $pagination, query: $query) {
      meta { page limit total }
      data { _id name email role isActive }
    }
  }
`);

const REMOVE_USER = gql(`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      _id
    }
  }
`);

const UPDATE_USER = gql(`
  mutation UpdateUser($updateUserId: ID!, $body: UpdateUserInput) {
    updateUser(id: $updateUserId, body: $body) {
      email
      name
      role
    }
  }
`);

const Users: React.FC = () => {
  const { params, updateParams } = useSearchParamsState({ page: "1", limit: "10" });
  const { page, limit } = params;

  // GraphQL Hooks
  const variables = { pagination: { page: parseInt(page), limit: parseInt(limit) }, query: {} };
  const { loading, data, refetch } = useQuery(ALL_USERS, { variables });

  const [deleteUser] = useMutation(REMOVE_USER, { refetchQueries: ["UsersList"] });
  const [updateUser] = useMutation( UPDATE_USER, { refetchQueries: ["UsersList"] });

  // const data: DataType[] = [
  const columns: ColumnsType<UsersListQuery["users"]["data"][]> = [
    {
      title: "SL No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (parseInt(page) - 1) * parseInt(limit) + index + 1,
      align: "center",
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "isActive",
      align: "center",
      render: (value, record) => (
        <div className="flex items-center justify-center">
          {Boolean(record?.isActive) ? (
            <Tag className="!bg-green-600">Active</Tag>
          ) : (
            <Tag className="!bg-red-600">Inactive</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space className="text-xl ">
          <div className=" cursor-pointer mx-2 ">
            <EditOutlined />
          </div>
          <div className=" cursor-pointer mx-2 " onClick={() => deleteHandler(record._id)}>
            <DeleteOutlined />
          </div>
          {record?.isActive ? (
            <div className=" cursor-pointer mx-2 text-red-400" title="Deactivate">
              <FiUserX />
            </div>
          ) : (
            <div className=" cursor-pointer mx-2 text-green-400" title="Activate">
              <FiUserCheck />
            </div>
          )}
        </Space>
      ),
      align: "center",
    },
  ];

  // handler
  const refetchData = () => {
    refetch(variables);
  };

  const deleteHandler = (deleteUserId: string) => {
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
          await deleteUser({ variables: { deleteUserId } });
          toast.success("User deleted successfully!");
        } catch (error) {
          console.error("Failed to delete user!", error);
          toast.error("Failed to delete user!");
        }
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <AdminTableHeader {...{ refetch: refetchData }} />
      <AdminTable {...{ columns, data: data?.users?.data, params, meta: data?.users?.meta, updateParams }} />
    </Spin>
  );
};

export default Users;
