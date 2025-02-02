"use client";
import { gql } from "@/__generated__";
import AdminTable from "@/components/admin/AdminTable";
import AdminTableHeader from "@/components/admin/AdminTableHeader";
import TableImagePreview from "@/components/TableImagePreview";
import { Project } from "@/global/interface";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { AVATAR } from "@/lib/constants";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button, Empty, Form, Space, Spin, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ProjectFormDrawer from "./ProjectFormDrawer";

// GraphQL Queries and Mutations
const ALL_PROJECTS = gql(`
  query ProjectsList($pagination: PaginationInput, $query: ProjectQuery) {
      projects(pagination: $pagination, query: $query) {
        meta { page limit total }
        data { _id name thumbnail {uid name status url} images {uid name status url} description packages tags liveUrl githubUrl { frontend   backend } }
      }
    }
`);

// const REMOVE_PROJECT = gql(`
//   mutation DeleteProject($deleteProjectId: ID!) {
//     deleteProject(id: $deleteProjectId) {
//       _id
//     }
//   }
// `);

// const UPDATE_PROJECT = gql(`
//   mutation UpdateProject($updateProjectId: ID!, $body: UpdateProjectInput) {
//     updateProject(id: $updateProjectId, body: $body) { name }
//   }
// `);

// const CREATE_PROJECT = gql(`
//     mutation createProject($body: CreateProjectInput!) {
//     register(body: $body) { _id }
//   }
// `);

const Projects: React.FC = () => {
  const { params, updateParams } = useSearchParamsState({ page: "1", limit: "10" });
  const { page, limit } = params;
  const [form] = Form.useForm();

  // states
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editProject, setEditProject] = useState<Partial<Project> | null>(null);
  const [mode, setMode] = useState<"edit" | "create">("create");

  // GraphQL Hooks
  const variables = { pagination: { page: parseInt(page), limit: parseInt(limit) }, query: {} };
  const { loading, data, refetch } = useQuery(ALL_PROJECTS, { variables });

  // const [deleteProject] = useMutation(REMOVE_PROJECT, { refetchQueries: ["ProjectsList"] });
  // const [updateProject] = useMutation(UPDATE_PROJECT, { refetchQueries: ["ProjectsList"] });
  // const [createProject] = useMutation(CREATE_PROJECT, { refetchQueries: ["ProjectsList"] });

  // const data: DataType[] = [
  // const columns: ColumnsType<ProjectsListQuery["users"]["data"]> = [
  const columns: ColumnsType<Project> = [
    {
      title: "SL No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (parseInt(page) - 1) * parseInt(limit) + index + 1,
      align: "center",
    },
    
    {
      title: "Thumbnail",
      dataIndex: "index",
      key: "index",
      render: (_, record) => (
        <div className="flex justify-center">
          <TableImagePreview src={record?.thumbnail?.url} />
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space className="text-xl ">
          <div className=" cursor-pointer mx-2 text-blue-400" onClick={() => updateHandler(record)}>
            <EditOutlined />
          </div>
          <div className=" cursor-pointer mx-2 text-red-400" onClick={() => deleteHandler(record?._id )}>
            <DeleteOutlined />
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

  const deleteHandler = (deleteProjectId: string) => {
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
          // await deleteProject({ variables: { deleteProjectId } });
          toast.success("Project deleted successfully!");
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
      // if (mode === "create") {
      //   await createProject({ variables: { body: { ...body, password } } });
      // } else {
      //   await updateProject({
      //     variables: { body, updateProjectId: editProject?._id as string },
      //   });
      // }
    } catch (error) {
      console.error(error);
    } finally {
      closeDrawer();
    }
  };

  const updateHandler = (data: Partial<Project>) => {
    const { name, email, role, isActive, avatar } = data;
    form.setFieldsValue({ name, email, role, isActive, avatar });

    setEditProject(data);
    setOpen(true);
    setMode("edit");
  };

  return (
    <Spin spinning={loading}>
      <AdminTableHeader {...{ refetch: refetchData, setOpen, name: "Projects" }} />
      {Array.isArray(data?.projects?.data) && data?.projects?.data?.length > 0 ? (
        <AdminTable {...{ columns, data: data?.projects?.data, params, meta: data?.projects?.meta, updateParams }} />
      ) : (
        <div className="py-10 bg-black/40 rounded-md">
          <Empty description="No data found">
            <Button type="primary" onClick={() => setOpen(true)}>
              Create Now
            </Button>
          </Empty>
        </div>
      )}
      <ProjectFormDrawer {...{ open, closeDrawer, onFinish, form, isLoading, setIsLoading }} />
    </Spin>
  );
};

export default Projects;
