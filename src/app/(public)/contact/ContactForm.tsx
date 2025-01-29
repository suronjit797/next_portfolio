"use client";

import styles from "@/styles/aboutForm.module.css";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  // states
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });

  // handler
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Swal.fire({ title: "Success", text: "Message Send", icon: "success" });
    console.log(formData);
  };

  return (
    <form onSubmit={handelSubmit} className={`mt-3 lg:mt-0 px-0 sm:px-3 lg:px-0 w-full ${styles.aboutForm}`}>
      <div>
        <input
          required
          type="text"
          autoComplete="off"
          placeholder=" your name"
          onChange={(e) => setFormData((pre) => ({ ...pre, name: e.target.value }))}
          className="focus:!border focus:!border-gray-500"
        />
      </div>
      <div>
        <input
          required
          type="email"
          autoComplete="off"
          placeholder=" your Email"
          onChange={(e) => setFormData((pre) => ({ ...pre, email: e.target.value }))}
          className="focus:!border focus:!border-gray-500"
        />
      </div>
      <div>
        <textarea
          required
          autoComplete="off"
          rows={5}
          placeholder=" your message"
          onChange={(e) => setFormData((pre) => ({ ...pre, message: e.target.value }))}
          className="focus:!border focus:!border-gray-500"
        />
      </div>

      <button type="submit" className="primary_button rounded-2 mt-3">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
