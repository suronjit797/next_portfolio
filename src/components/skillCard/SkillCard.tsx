import Image from "next/image";
import { ISkillData } from "../../interfaces/skills";
import './skillCard.css'

interface SkillCardProps {
  data: ISkillData;
}

const SkillCard: React.FC<SkillCardProps> = ({ data }) => {
  return (
    <>
      <div className="skillCard">
        <Image src={data.logo} alt={data.name} loading="lazy" />
        <p className="mt-2 mb-0">{data.name}</p>
      </div>
    </>
  );
};

export default SkillCard;
