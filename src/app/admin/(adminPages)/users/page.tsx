"use client";
import { gql } from "@/__generated__";
import AdminTable from "@/components/admin/AdminTable";
import AdminTableHeader from "@/components/admin/AdminTableHeader";
import TableImagePreview from "@/components/TableImagePreview";
import { User } from "@/global/interface";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { AVATAR } from "@/lib/constants";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Empty, Form, Space, Spin, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserFormDrawer from "./UserFormDrawer";

// GraphQL Queries and Mutations
const ALL_USERS = gql(`
  query UsersList($pagination: PaginationInput, $query: UserQuery) {
      users(pagination: $pagination, query: $query) {
        meta { page limit total }
        data { _id name email role isActive avatar { uid name status url } }
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
    updateUser(id: $updateUserId, body: $body) { name }
  }
`);

const CREATE_USER = gql(`
    mutation createUser($body: CreateUserInput!) {
    register(body: $body) { _id }
  }  
`);

const Users: React.FC = () => {
  const { params, updateParams } = useSearchParamsState({ page: "1", limit: "10" });
  const { page, limit } = params;
  const [form] = Form.useForm();

  // states`
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);
  const [mode, setMode] = useState<"edit" | "create">("create");

  // GraphQL Hooks
  const variables = { pagination: { page: parseInt(page), limit: parseInt(limit) }, query: {} };
  const { loading, data, refetch } = useQuery(ALL_USERS, { variables });

  const [deleteUser] = useMutation(REMOVE_USER, { refetchQueries: ["UsersList"] });
  const [updateUser] = useMutation(UPDATE_USER, { refetchQueries: ["UsersList"] });
  const [createUser] = useMutation(CREATE_USER, { refetchQueries: ["UsersList"] });

  // const data: DataType[] = [
  // const columns: ColumnsType<UsersListQuery["users"]["data"]> = [
  const columns: ColumnsType<User> = [
    {
      title: "SL No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (parseInt(page) - 1) * parseInt(limit) + index + 1,
      align: "center",
    },
    {
      title: "Avatar",
      dataIndex: "index",
      key: "index",
      render: (_, record) => (
        <div className="flex justify-center">
          <TableImagePreview src={record?.avatar?.url || AVATAR(record?.name)} />
        </div>
      ),
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
            <Tag className="!bg-green-600 w-14 !text-center">Active</Tag>
          ) : (
            <Tag className="!bg-red-600 w-14 !text-center">Inactive</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space className="text-xl ">
          <div className=" cursor-pointer mx-2 text-blue-400" onClick={() => updateHandler(record)}>
            <EditOutlined />
          </div>
          <div className=" cursor-pointer mx-2 text-red-400" onClick={() => deleteHandler(record?._id)}>
            <DeleteOutlined />
          </div>
          <div
            onClick={() =>
              updateUser({ variables: { body: { isActive: !Boolean(record?.isActive) }, updateUserId: record?._id } })
            }
          >
            {record?.isActive ? (
              <div className=" cursor-pointer mx-2 text-red-400" title="Deactivate">
                <FiUserX />
              </div>
            ) : (
              <div className=" cursor-pointer mx-2 text-green-400" title="Activate">
                <FiUserCheck />
              </div>
            )}
          </div>
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

  const closeDrawer = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      const { name, email, password, isActive, role, avatar } = form.getFieldsValue();
      const body = {
        name,
        email,
        isActive,
        role,
        avatar: (Array.isArray(avatar) ? avatar[0] : avatar) || {},
      };
      if (mode === "create") {
        await createUser({ variables: { body: { ...body, password } } });
      } else {
        await updateUser({
          variables: { body, updateUserId: editUser?._id as string },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      closeDrawer();
    }
  };

  const updateHandler = (data: Partial<User>) => {
    const { name, email, role, isActive, avatar } = data;
    form.setFieldsValue({ name, email, role, isActive, avatar });

    setEditUser(data);
    setOpen(true);
    setMode("edit");
  };

  return (
    <Spin spinning={loading}>
      <AdminTableHeader {...{ refetch: refetchData, setOpen, name: "Users" }} />
      {Array.isArray(data?.users?.data) && data?.users?.data?.length > 0 ? (
        <AdminTable {...{ columns, data: data?.users?.data, params, meta: data?.users?.meta, updateParams }} />
      ) : (
        <div className="py-10 bg-black/40 rounded-md">
          <Empty description="No data found">
            <Button type="primary" onClick={() => setOpen(true)}>
              Create Now
            </Button>
          </Empty>
        </div>
      )}
      <UserFormDrawer {...{ open, closeDrawer, onFinish, form, isLoading, setIsLoading }} />
    </Spin>
  );
};

export default Users;
