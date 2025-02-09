"use client";

import { useEffect, useState } from "react";
import { TProject } from "@/interfaces/project";
import Loading from "@/components/loading/Loading";
import { BsSearch } from "react-icons/bs";
import ProjectCard from "@/components/ProjectCard";
import styles from "@/styles/projects.module.css";
import { gql } from "@/__generated__";
import { Spin } from "antd";
import { useQuery } from "@apollo/client";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { InputMaybe, SortOrder } from "@/__generated__/graphql";

const ALL_PROJECTS = gql(`
  query Projects($pagination: PaginationInput, $query: ProjectQueryInput) {
      projects(pagination: $pagination, query: $query) {
        meta { page limit total }
        data { _id name thumbnail{name url} position tags }
      }
    }
`);

const Projects = () => {
  const { params, updateParams } = useSearchParamsState({
    page: "1",
    limit: "10",
    sortOrder: "asc",
    sortBy: "position",
    search: "",
    tags: "",
  });
  const { page, limit, sortOrder, sortBy, search, tags } = params;

  // states
  // const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<object>({});

  useEffect(() => {
    Object.entries(query).filter((key, value) => value);
  }, [query]);

  // GraphQL Hooks
  const variables = {
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      sortOrder: sortOrder as InputMaybe<SortOrder>,
      sortBy,
    },
    query,
  };

  useEffect(() => {
    if (tags) {
      setQuery((prev) => ({ ...prev, search: tags }));
    }
  }, [tags]);

  const { loading, data, refetch } = useQuery(ALL_PROJECTS, { variables });
  const projects = data?.projects?.data || [];

  // handler
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery((prev) => ({ ...prev, search }));
  };

  const refetchHandler = () => {
    refetch(variables);
  };

  const clearHandler = () => {
  navigate('/projects')
  }

  return (
    <Spin spinning={loading}>
      <div className="project px-lg-5 py-5 px-3 ">
        <div className="flex items-center mb-1">
          <h3 className="heading text-capitalize">
            <span> Recent </span> Projects
          </h3>
          <form className={`${styles.project_search} ms-auto`} autoComplete="off" onSubmit={searchHandler}>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              value={search}
              onChange={(e) => updateParams({ search: e.target.value })}
            />
            <button type="submit">
              <BsSearch />
            </button>
          </form>
        </div>
        <hr className="mb-5" />
        <div className="project_body pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 align-items-stretch">
            {projects.length > 0 ? (
              projects.map((project) => <ProjectCard key={project._id} data={project} />)
            ) : (
              <p className="text-danger"> No Project Found </p>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Projects;
