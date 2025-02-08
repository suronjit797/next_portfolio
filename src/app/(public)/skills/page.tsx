import SkillDivision from "@/components/SkillDivision";

const divisions = ["Frontend", "Backend", "State & Data Management", "Development & Design Tools"];
const Skills: React.FC = () => {

  return (
    <>
      <div className="frontend px-lg-5 py-5 px-3 ">       

        { divisions.map((d, i)=> <SkillDivision key={i} type={d} /> ) }
      </div>
    </>
  );
};

export default Skills;
