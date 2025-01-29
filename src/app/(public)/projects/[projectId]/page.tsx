import { TProject } from "@/interfaces/project";
import Loading from "@/components/loading/Loading";
import { FaShareSquare } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import Image from "next/image";
import BackButton from "./BackButton";

interface Props {
  params: Promise<{ projectId: string }>;
}

const Project: React.FC<Props> = async ({ params }) => {
  const projectId = (await params).projectId;
  console.log({ projectId });

  const projectData: TProject = {
    _id: "",
    thumbnail: "",
    images: [],
    name: "",
    packages: [],
    tags: [],
    description: "",
    live_url: "",
    github_url: {
      frontend: "",
      backend: "",
    },
  };
  const isLoading = false;

  //   const { projectId } = useParams();
  //   const navigate = useNavigate();
  // const [project, setProject] = useState<TProject | undefined>({
  //   name: "",
  //   _id: "",
  //   thumbnail: "",
  //   images: [],
  //   packages: [],
  //   description: "",
  //   live_url: "",
  //   github_url: {
  //     frontend: "",
  //     backend: "",
  //   },
  //   tags: [],
  // });
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  //   const getProject = async () => {
  //     try {
  //       const { data } = await axios.get<TProject[]>("/json/projects.json");
  //       const find = data.find((d) => d._id === projectId);
  //       setProject(find);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: "top-end",
  //     showConfirmButton: false,
  //     timer: 3000,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //       toast.addEventListener("mouseenter", Swal.stopTimer);
  //       toast.addEventListener("mouseleave", Swal.resumeTimer);
  //     },
  //   });

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   // await getProject();
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const tagHandler = (tag: string) => {
    navigator.clipboard.writeText(tag);
    // Toast.fire({
    //   icon: "success",
    //   title: "Text copy",
    // });
  };

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div className="project px-lg-5 py-5 px-3 ">
          {/* <div className="project_body pt-4">
            <div className="project_image">
              <img src={project?.thumbnail} alt={project?.name} />
            </div>
          </div> */}
          <BackButton />
          {Boolean(projectData) && (
            <div>
              <Image src={projectData?.thumbnail || ""} alt="thumbnail" />
              <div>
                <div className="fw-bold text-capitalize mb-3">{projectData?.name}</div>
                <div className="text-white-50 fs-6">{projectData?.description}</div>
                <p className="text-capitalize tags pb-3">
                  Tags:
                  {projectData?.tags?.map((tag, index) => (
                    <span key={index} onClick={() => tagHandler(tag)} className="bg-secondary p-2 rounded-5 mx-1">
                      {` ${tag} `}
                    </span>
                  ))}
                </p>
                <div>
                  {projectData?.live_url && (
                    <a href={projectData?.live_url} target="_blank">
                      <button className="fw-light me-2">
                        <FaShareSquare />
                        <span className="ms-2"> Live preview </span>
                      </button>
                    </a>
                  )}
                  {projectData?.github_url?.frontend && (
                    <a href={projectData?.github_url?.frontend} target="_blank">
                      <button className="fw-light me-2">
                        <BsGithub />
                        <span className="ms-2"> Frontend </span>
                      </button>
                    </a>
                  )}
                  {projectData?.github_url?.backend && (
                    <a href={projectData?.github_url?.backend} target="_blank">
                      <button className="fw-light me-2">
                        <BsGithub />
                        <span className="ms-2"> Backend </span>
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Project;
