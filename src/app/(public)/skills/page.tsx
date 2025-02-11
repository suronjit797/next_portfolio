import SkillDivision from "@/components/SkillDivision";
import { Metadata } from "next";

const divisions = ["Frontend", "Backend", "State & Data Management", "Development & Design Tools"];


export const metadata: Metadata = {
  title: `My Skills | ${process.env.NEXT_PUBLIC_TITLE ?? ""} - Web Developer"`,
  description:
    "Discover my technical skills, including React, Next.js, MongoDB, Express.js, Node.js, and more.",
  keywords: [
    "Web Development Skills",
    "React",
    "Next.js",
    "MongoDB",
    "MERN Stack",
    "Node.js",
  ],
  openGraph: {
    title: "My Skills | Suronjit Pal - Web Developer",
    description:
      "Explore my skills in web development, including JavaScript, React, Next.js, MongoDB, and Node.js.",
    url: "https://yourwebsite.com/skills",
    images: [
      {
        url: "https://yourwebsite.com/og-image-skills.jpg",
        width: 1200,
        height: 630,
        alt: "Skills - Web Development",
      },
    ],
    type: "website",
  },
};



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
