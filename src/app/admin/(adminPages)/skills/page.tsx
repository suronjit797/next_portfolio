"use client";

import { gql } from "@/__generated__";
import { InputMaybe, SortOrder } from "@/__generated__/graphql";
import AdminTable from "@/components/admin/AdminTable";
import AdminTableHeader from "@/components/admin/AdminTableHeader";
import TableImagePreview from "@/components/TableImagePreview";

import { Skill } from "@/global/interface";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Empty, Form, Space, Spin } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SkillFormDrawer from "./SkillFormDrawer";

// GraphQL Queries and Mutations
const ALL_SKILLS = gql(`
  query Skills($pagination: PaginationInput, $query: SkillsQueryInput) {
    skills(pagination: $pagination, query: $query) { meta { page limit total }
    data { _id name image { uid name status url size } type createdAt updatedAt
    }
    }
  }
`);

const CREATE_SKILL = gql(`
  mutation CreateSkill($body: CreateSkillsInput!) { createSkill(body: $body) { _id }}
`);

const GET_PROJECT = gql(`
  query skill($skillId: ID!) {
      skill(id: $skillId) { _id name image { uid name status url size } type createdAt updatedAt}
  }
`);

const UPDATE_PROJECT = gql(`
  mutation UpdateSkill($updateSkillId: ID!, $body: UpdateSkillsInput) { updateSkill(id: $updateSkillId, body: $body) { _id }}
`);

const REMOVE_PROJECT = gql(`
  mutation RemoveSkill($deleteSkillId: ID!) { deleteSkill(id: $deleteSkillId) { _id }}
`);

const Skills: React.FC = () => {
  const { params, updateParams } = useSearchParamsState({
    page: "1",
    limit: "10",
    sortOrder: "asc",
    sortBy: "position",
  });
  const { page, limit, sortOrder, sortBy } = params;
  const [form] = Form.useForm();

  // states
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"edit" | "create">("create");
  const [editSkill, setEditSkill] = useState<Partial<Skill> | null>(null);

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
  const { loading, data, refetch } = useQuery(ALL_SKILLS, { variables });

  const [fetchSkill] = useLazyQuery<{ skill: Skill }>(GET_PROJECT, { fetchPolicy: "no-cache" });

  const [createSkill] = useMutation(CREATE_SKILL, { refetchQueries: ["Skills"] });
  const [updateSkill] = useMutation(UPDATE_PROJECT, { refetchQueries: ["Skills"] });
  const [deleteSkill] = useMutation(REMOVE_PROJECT, { refetchQueries: ["Skills"] });

  const columns: ColumnsType<Skill> = [
    {
      title: "SL No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (parseInt(page) - 1) * parseInt(limit) + index + 1,
      align: "center",
      width: 100,
    },

    {
      title: "Image",
      key: "index",
      render: (_, record) => (
        <div className="flex justify-center">
          <TableImagePreview src={record?.image?.url} />
        </div>
      ),
      align: "center",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space className="text-xl ">
          <div className=" cursor-pointer mx-2 text-blue-400">
            <Link href={`skills/${record?._id}`}>
              <EyeOutlined />
            </Link>
          </div>
          <div className=" cursor-pointer mx-2 text-green-400" onClick={() => updateHandler(record?._id)}>
            <EditOutlined />
          </div>
          <div className=" cursor-pointer mx-2 text-red-400" onClick={() => deleteHandler(record?._id)}>
            <DeleteOutlined />
          </div>
        </Space>
      ),
      align: "center",
      width: 200,
    },
  ];

  // handler
  const refetchData = () => {
    refetch(variables);
  };

  const deleteHandler = (deleteSkillId: string) => {
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
          await deleteSkill({ variables: { deleteSkillId } });
          toast.success("Skill deleted successfully!");
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
    setMode("create");
  };

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue();
      const body = { ...values, image: values.image[0] };

      console.log({ values, body });

      if (mode === "create") {
        await createSkill({ variables: { body } });
      } else {
        await updateSkill({ variables: { body, updateSkillId: editSkill?._id as string } });
      }
    } catch (error) {
      console.error(error);
    } finally {
      closeDrawer();
    }
  };

  const updateHandler = async (skillId: string) => {
    try {
      const { data } = await fetchSkill({ variables: { skillId } });
      if (data?.skill) {
        form.setFieldsValue({ ...data.skill, image: [data.skill?.image] });
        // // setEditSkill(data);
        setEditSkill(data.skill);
        setMode("edit");
        setOpen(true);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Spin spinning={loading}>
      <AdminTableHeader {...{ refetch: refetchData, setOpen, name: "Skills" }} />
      {Array.isArray(data?.skills?.data) && data?.skills?.data?.length > 0 ? (
        <AdminTable {...{ columns, data: data?.skills?.data, params, meta: data?.skills?.meta, updateParams }} />
      ) : (
        <div className="py-10 bg-black/40 rounded-md">
          <Empty description="No data found">
            <Button type="primary" onClick={() => setOpen(true)}>
              Create Now
            </Button>
          </Empty>
        </div>
      )}
      <SkillFormDrawer {...{ open, closeDrawer, onFinish, form, isLoading, setIsLoading, mode }} />
    </Spin>
  );
};

export default Skills;
