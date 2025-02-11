import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Home | " + process.env.TITLE,
  description: "Web Developer Portfolio",
};


const Home = () => {
  return (
    <>
      <div className="h-screen px-4  py-10 md:px-8 flex lg:items-center items-baseline">
        <div>
          <p className="font-semibold text-xl md:text-2xl mb-2"> Hi There! </p>
          <h1 className="font-bold  text-2xl md:text-4xl">
            I&apos;m <span className="text_primary"> Suronjit Pal </span>
          </h1>
          <p className="my-3">
            A passionate MERN (MongoDB, ExpressJs, ReactJs, NodeJs) stack developer specializing in building efficient
            and innovative web applications. With expertise in full-stack development, I create dynamic and scalable
            solutions that deliver exceptional user experiences. My skills include Node.js, Express.js, React.js, Redux,
            MongoDB, and more. I enjoy collaborating in agile teams, solving complex challenges, and staying up-to-date
            with the latest trends. Let&apos;s connect and discuss how I can contribute to your next project!
          </p>
          <div className="my-8">
            <Link href="/contact" className="btn me-2 my-2 primary_button">
              Contact Me
            </Link>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/112OjH-ARDp4XiwQSC8ppaPw5XAB-_gi3/view?usp=sharing"
              className="me-2 my-2 primary_button-border"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
