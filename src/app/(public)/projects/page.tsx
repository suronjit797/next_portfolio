"use client";

import { useEffect, useState } from "react";
import { TProject } from "@/interfaces/project";
import Loading from "@/components/loading/Loading";
import { BsSearch } from "react-icons/bs";
import ProjectCard from "@/components/ProjectCard";
import styles from "@/styles/projects.module.css"

const Projects = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [filteredData, setFilteredData] = useState<TProject[]>(projects);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  //   const getProjects = async () => {
  //     try {
  //       const { data } = await axios.get<TProject[]>("/json/projects.json");
  //       console.log(data);
  //       setProjects(data);
  //       setFilteredData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const fetchData = async () => {
    setIsLoading(true);
    // await getProjects();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handler
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (search) {
      const filtered = projects.filter(
        (project) =>
          project.name.includes(search) ||
          project.packages.includes(search) ||
          project._id.includes(search) ||
          project.description.includes(search) ||
          project.tags.includes(search)
      );

      setFilteredData(filtered);
    } else {
      setFilteredData(projects);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div className="project px-lg-5 py-5 px-3 ">

          <div className="flex">
            <form className={`${styles.project_search} ms-auto`} autoComplete="off" onSubmit={searchHandler}>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <BsSearch />
              </button>
            </form>
          </div>
          <hr />
          <div className="project_body pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 align-items-stretch">
              {filteredData.length > 0 ? (
                filteredData.map((filter) => <ProjectCard key={filter._id} data={filter} />)
              ) : (
                <p className="text-danger"> No Project Found </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
