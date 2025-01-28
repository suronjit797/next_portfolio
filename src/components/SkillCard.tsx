import Image from "next/image";
import { ISkillData } from "../interfaces/skills";
import styles from "@/styles/skillCard.module.css";

interface SkillCardProps {
  data: ISkillData;
}

const SkillCard: React.FC<SkillCardProps> = ({ data }) => {
  return (
    <>
      <div className={styles.skillCard}>
        <Image src={data.logo} alt={data.name} loading="lazy" />
        <p className="mt-2 mb-0">{data.name}</p>
      </div>
    </>
  );
};

export default SkillCard;
