// import { Project } from "@/global/interface";
import { Project } from "@/__generated__/graphql";
import styles from "@/styles/projectCard.module.css";
import { Tag, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

interface IProjectProps {
  data?: Partial<Project>;
}

const colors = ["lime", "green", "cyan", "magenta", "volcano", "orange", "gold"];

const ProjectCard: React.FC<IProjectProps> = ({ data }) => {
  return (
    <>
      <div className={`${styles.projectCard} rounded overflow-hidden h-full flex flex-col`}>
        <div className={`${styles.projectCard_img} bg-gray-500/50 p-5 `}>
          <Image height={300} width={300} src={data?.thumbnail?.url || ""} alt={data?.name || "thumbnail"} />
        </div>
        <h5 className="capitalize pt-3 px-5">
          <Typography.Paragraph
            className="!text-md font-bold"
            ellipsis={{
              rows: 1,
            }}
          >
            {data?.name}
          </Typography.Paragraph>
        </h5>
        <div className="px-5 pb-3">
          {Array.isArray(data?.tags)
            ? data.tags?.slice(0, 5)?.map((tag, ind) => (
                <Link key={ind} href={`/projects?q=${tag}`}>
                  <Tag color={colors[ind % 5]}>{tag}</Tag>
                </Link>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;

// <div className="mt-auto p-5 pt-0">
// {/* <hr className="mx-3" /> */}
// <div className="flex items-center justify-between">
//   {/* <a target="_blank" href={data?.liveUrl}>
//     <Button type="text"> <AiOutlineLink /> </Button>
//   </a> */}
//   {/* <Link href={`/projects/${data?._id}`} className="btn primary_button rounded-circle">
//     <AiOutlineEye />
//   </Link> */}
// </div>
// </div>
