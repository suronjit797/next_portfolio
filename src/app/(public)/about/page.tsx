import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import styles from "@/styles/about.module.css"

dayjs.extend(relativeTime)

const About = () => {
  const birthday = dayjs('1999-01-01').fromNow() .slice(0, 8)
  return (
    <>
      <div className={`${styles.about} px-lg-5 py-5 px-3`}>

          <h3 className="mb-4 heading text-capitalize">
            <span> About </span> Me
          </h3>
          <hr className="mb-5"/>
          <p> Hello, <span className="text_primary"> Suronjit Pal </span> here! </p>
          <p>
            A passionate MERN (MongoDB, Express.js, React.js, Node.js) stack
            developer with expertise in building scalable and user-friendly web
            applications. I have a solid understanding of HTML, CSS, JavaScript,
            and the entire MERN stack. I specialize in creating responsive and
            intuitive user interfaces using React.js and have experience with
            state management using Redux. On the back-end, I work with Node.js
            and Express.js to design and develop RESTful APIs, interact with
            databases like MongoDB, and implement authentication using
            technologies like JWT. I enjoy collaborating in agile teams, solving
            complex problems, and keeping up with the latest industry trends.
            Clean code, maintainable architectures, and performance optimization
            are important to me. Let&#39;s connect and discuss how I can contribute
            to your next project!
          </p>

          <div className={styles.about_short}>
            <p>
              <b> Age:</b> <span> {birthday} </span>
            </p>
            <p>
              <b> Address:</b> <span> Satkhira, Bangladesh </span>
            </p>
            <p>
              <b> Nationality:</b> <span> Bangladeshi </span>
            </p>
            <p>
              <b> language: </b>
              <span>
                Bangla (Native), English (Comfortable), Hindi (Comfortable)
              </span>
            </p>
        </div>
      </div>
    </>
  );
};

export default About;
