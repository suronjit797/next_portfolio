import { TProject } from "../../interfaces/project";
import "./projectCard.css";
import { Col } from "react-bootstrap";
import { AiOutlineLink, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

interface IProjectProps {
  data: TProject;
}

const ProjectCard: React.FC<IProjectProps> = ({ data }) => {
  const { _id, thumbnail, name, live_url } = data;

  return (
    <Col>
      <div className="projectCard text-center rounded-3 overflow-hidden h-100 d-flex flex-column">
        <div className="projectCard_img">
          <img src={thumbnail} alt={name} />
        </div>
        <h5 className="project_title text-capitalize pt-3"> {name} </h5>
        <div className="mt-auto">
          <hr className="mx-3" />
          <div className="d-flex align-items-center justify-content-between p-3 pt-0">
            <a
              target="_blank"
              href={live_url}
              className="btn primary_button rounded-circle"
            >
              <AiOutlineLink />
            </a>
            <Link
              to={`/projects/${_id}`}
              className="btn primary_button rounded-circle"
            >
              <AiOutlineEye />
            </Link>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;
