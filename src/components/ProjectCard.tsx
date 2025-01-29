import Image from "next/image";
import { TProject } from "../interfaces/project";
import styles from "@/styles/projectCard.module.css";
import { AiOutlineLink, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";

interface IProjectProps {
  data: TProject;
}

const ProjectCard: React.FC<IProjectProps> = ({ data }) => {
  const { _id, thumbnail, name, live_url } = data;

  return (
    <>
      <div className={`${styles.projectCard} text-center rounded-2xl overflow-hidden h-full flex flex-col`}>
        <div className={`${styles.projectCard_img}`}>
          <Image src={thumbnail} alt={name} />
        </div>
        <h5 className="text-capitalize pt-3"> {name} </h5>
        <div className="mt-auto">
          <hr className="mx-3" />
          <div className="flex items-center justify-between p-3 pt-0">
            <a target="_blank" href={live_url} className="btn primary_button rounded-circle">
              <AiOutlineLink />
            </a>
            <Link href={`/projects/${_id}`} className="btn primary_button rounded-circle">
              <AiOutlineEye />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
