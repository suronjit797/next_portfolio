"use client";

import { gql } from "@/__generated__";
import { InputMaybe, Project, SortOrder } from "@/__generated__/graphql";
import ProjectCard from "@/components/ProjectCard";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import styles from "@/styles/projects.module.css";
import { useQuery } from "@apollo/client";
import { Button, Pagination, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRepeat, BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const ALL_PROJECTS = gql(`
  query Projects($pagination: PaginationInput, $query: ProjectQueryInput) {
    projects(pagination: $pagination, query: $query) {
      meta { page limit total }
      data { _id name thumbnail{name url} position tags }
    }
  }
`);

const Projects = () => {
  const router = useRouter();

  // Fetch search params state
  const { params, updateParams } = useSearchParamsState({
    page: "1",
    limit: "10",
    sortOrder: "asc",
    sortBy: "position",
    search: "",
    q: "",
  });
  const { page, limit, sortOrder, sortBy, search, q } = params;

  // Local state for dynamic query adjustments
  const [query, setQuery] = useState<object>({});

  useEffect(() => {
    // If q or search changes, update the query state
    if (q) {
      setQuery((prev) => ({ ...prev, search: q }));
    }
  }, [q]);

  // Prepare variables for GraphQL query
  const variables = {
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      sortOrder: sortOrder as InputMaybe<SortOrder>,
      sortBy,
    },
    query,
  };

  // GraphQL Query Hook
  const { loading, data, refetch } = useQuery(ALL_PROJECTS, { variables });
  const projects = data?.projects?.data || [];

  // Handler for search submit
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery((prev) => ({ ...prev, search }));
    updateParams({ search }); // Update URL search param
  };

  // Refetch data on page load or query change
  const handleRefetch = () => {
    refetch(variables);
  };

  // Clear search handler
  const clearSearch = () => {
    updateParams({ search: "", q: "" });
    setQuery({}); // Clear query state
    router.push("/projects"); // Reset to initial state
  };

  // Handle pagination change
  const handlePaginationChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
  };

  return (
    <Spin spinning={loading}>
      <div className="project px-lg-5 py-5 px-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="heading text-capitalize">
              <span>Recent</span> Projects
            </h3>

            <Button
              type="primary"
              icon={<BsArrowRepeat />}
              onClick={handleRefetch}
              style={{ marginLeft: "10px" }}
              size="small"
            />
            {Object.keys(query).length > 0 && (
              <Button
                type="primary"
                danger
                icon={<IoClose />}
                onClick={clearSearch}
                style={{ marginLeft: "10px" }}
                size="small"
              />
            )}
          </div>
          <div className="search-actions flex items-center gap-3">
            <form className={`${styles.project_search} ms-auto`} autoComplete="off" onSubmit={searchHandler}>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                value={search || ""}
                onChange={(e) => updateParams({ search: e.target.value })}
              />
              <button type="submit">
                <BsSearch />
              </button>
            </form>
          </div>
        </div>
        <hr className="mb-5" />
        <div className="project_body pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 align-items-stretch">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Link key={project._id} href={`/projects/${project._id}`}>
                  <ProjectCard data={project as Partial<Project>} />
                </Link>
              ))
            ) : (
              <p className="text-danger">No Project Found</p>
            )}
          </div>
        </div>

        {/* Ant Design Pagination */}
        <div className="mt-4">
          <Pagination
            current={parseInt(page)}
            pageSize={parseInt(limit)}
            total={data?.projects?.meta?.total || 0}
            onChange={handlePaginationChange}
            showSizeChanger={false}
            className="pagination-container"
            style={{ textAlign: "center" }}
            align="end"
          />
        </div>
      </div>
    </Spin>
  );
};

export default Projects;
