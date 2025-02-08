/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "@/styles/skillCard.module.css";
import Image from "next/image";

interface SkillCardProps {
  data: Record<string, any>;
}

const SkillCard: React.FC<SkillCardProps> = ({ data }) => {
  return (
    <>
      <div className={styles.skillCard}>
        <Image className="w-full" height={80} width={80} src={data?.image?.url || ""} alt={data?.name || ""} loading="lazy" />
        <p className="mt-2 mb-0">{data?.name}</p>
      </div>
    </>
  );
};

export default SkillCard;
