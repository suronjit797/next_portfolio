import { ISkillData } from "../../interfaces/skills";
import Col from "react-bootstrap/Col";
import './skillCard.css'

interface SkillCardProps {
  data: ISkillData;
}

const SkillCard: React.FC<SkillCardProps> = ({ data }) => {
  return (
    <Col>
      <div className="skillCard">
        <img src={data.logo} alt={data.name} loading="lazy" />
        <p className="mt-2 mb-0">{data.name}</p>
      </div>
    </Col>
  );
};

export default SkillCard;
