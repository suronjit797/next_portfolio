"use client";

import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { Carousel, Divider, Image, Spin, Tag } from "antd";
import dayjs from "dayjs"; // Import dayjs for date formatting
import { useParams } from "next/navigation";
import React from "react";

const GET_PROJECT = gql(`
query s_Project($projectId: ID!) {
 project(id: $projectId) {  name  position  thumbnail {   url  }  images {   url  }  description
  packages
  tags
  liveUrl
  githubUrl {
   frontend
   backend
  }
  user {
   _id
   name
   email
   role
  }
  createdAt
  updatedAt
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
        {" "}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Project not found! </h1>{" "}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className=" rounded-lg p-6 ">
        <div className="mb-4">
          <Image.PreviewGroup>
            <Carousel arrows infinite={true}>
              {project.images &&
                project.images.length > 0 &&
                [project.thumbnail, ...project.images].map((image, index) => (
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

        <h1 className="text-3xl font-bold mb-4 ">{project.name}</h1>

        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
        </div>
        <div className="flex flex-wrap">
          {project.tags.map((tag, index) => (
            <Tag key={index} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
        <Divider />

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Technologies Used</h2>
          <div>
            {project.packages.map((p, index) => (
              <div key={index}>
                <Tag >{p}</Tag>
              </div>
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

        <Divider />

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Developer</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Name:</strong> {project.user.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Email:</strong> {project.user.email}
          </p>
        </div>

        {/* <Divider />

        <div className="mb-4">
          <div className="flex space-x-4">
            {project.liveUrl && (
              <Button href={project.liveUrl} target="_blank">
                Live Demo
              </Button>
            )}
            {project.githubUrl?.frontend && (
              <Button href={project.githubUrl.frontend} target="_blank">
                Frontend GitHub
              </Button>
            )}
            {project.githubUrl?.backend && (
              <Button href={project.githubUrl.backend} target="_blank">
                Backend GitHub
              </Button>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductView;
