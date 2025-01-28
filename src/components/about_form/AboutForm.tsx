import Swal from "sweetalert2";
import "./about_form.css";
import { useState } from "react";

const AboutForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({ title: "Success", text: "Message Send", icon: "success" });
    console.log({ name, email, message });
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="about_form mt-3 mt-lg-0 px-0 px-sm-3 px-lg-0"
    >
      <div className="input-gro">
        <input
          required
          type="text"
          name="name"
          autoComplete="off"
          id="name"
          placeholder=" your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-gro">
        <input
          required
          type="email"
          name="email"
          autoComplete="off"
          id="email"
          placeholder=" your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-gro">
        <textarea
          required
          name="message"
          autoComplete="off"
          id="message"
          rows={5}
          placeholder=" your message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button type="submit" className="btn primary_button rounded-2 mt-3">
        Send Message
      </button>
    </form>
  );
};

export default AboutForm;
