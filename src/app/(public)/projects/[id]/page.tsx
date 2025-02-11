"use client";

import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { Carousel, Divider, Image, Spin, Tag } from "antd";
import dayjs from "dayjs"; // Import dayjs for date formatting
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const GET_PROJECT = gql(`
query single_Project($projectId: ID!) {
 project(id: $projectId) { name thumbnail { url } images { url } description packages tags liveUrl
  githubUrl { frontend backend }
  user { name email } createdAt updatedAt
 }
}
`);

const ProductView: React.FC = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_PROJECT, {
    variables: { projectId: id as string },
  });

  const project = data?.project;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Project not found! </h1>{" "}
      </div>
    );
  }

  const images = [project?.thumbnail, ...(project?.images || [])];

  return (
    <div className=" py-4 ">
      <div className=" rounded-lg ">
        <div className="mb-4">
          <Image.PreviewGroup key={(id as string) || ""}>
            <Carousel>
              {Array.isArray(images) &&
                images?.length > 0 &&
                images?.map((image, index) => (
                  <div className="w-full flex" key={index}>
                    <Image
                      src={image?.url || ""}
                      alt={`Project Image ${index + 1}`}
                      className="rounded-lg object-cover m-auto"
                      width="100%"
                      height={400}
                    />
                  </div>
                ))}
            </Carousel>
          </Image.PreviewGroup>
        </div>

        <h1 className="text-3xl font-bold mb-4 capitalize">{project.name}</h1>

        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
        </div>
        <div className="flex flex-wrap">
          {project.tags.map((tag, index) => (
            <Link key={index} href={`/projects?q=${tag}`}>
              <Tag color="lime">{tag}</Tag>
            </Link>
          ))}
        </div>
        <Divider />

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Technologies Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
            {project.packages.map((p, index) => (
              <Link key={index} href={`/projects?q=${p}`}>
                <Tag>{p}</Tag>
              </Link>
            ))}
          </div>
        </div>

        <Divider />
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Project Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Created At:</strong> {dayjs(project.createdAt).format("MMMM DD, YYYY")}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Updated At:</strong> {dayjs(project.updatedAt).format("MMMM DD, YYYY")}
          </p>
          {/* Add more details as needed */}
        </div>

        {!!project?.user?.name && (
          <>
            <Divider />
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Developer</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Name:</strong> {project.user?.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {project.user?.email}
              </p>
            </div>
          </>
        )}

        {/* {Boolean(project?.liveUrl || project?.githubUrl?.frontend || project?.githubUrl?.backend) && (
         <>
                 <Divider />
          <div className="mb-4">
            <div className="flex space-x-4">
              {project?.liveUrl && (
                <Button href={project?.liveUrl} target="_blank">
                  Live Demo
                </Button>
              )}
              {project?.githubUrl?.frontend && (
                <Button href={project?.githubUrl?.frontend} target="_blank">
                  Frontend GitHub
                </Button>
              )}
              {project?.githubUrl?.backend && (
                <Button href={project?.githubUrl?.backend} target="_blank">
                  Backend GitHub
                </Button>
              )}
            </div>
          </div> </>
        )} */}
      </div>
    </div>
  );
};

export default ProductView;
