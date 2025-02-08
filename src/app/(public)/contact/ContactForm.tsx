"use client";

import { gql } from "@/__generated__";
import styles from "@/styles/aboutForm.module.css";
import { useMutation } from "@apollo/client";
import { Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const CREATE_MESSAGE = gql(`  
    mutation CreateMessage($body: CreateMessagesInput!) {
      createMessage(body: $body) {
        name
      }
    }
`);

const initForm = { name: "", email: "", message: "" };

const ContactForm = () => {
  // states
  const [formData, setFormData] = useState<FormData>(initForm);
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, { refetchQueries: ["Skills"] });

  // handler
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Swal.fire({ title: "Success", text: "Message Send", icon: "success" });
      console.log(formData);
      await createMessage({ variables: { body: formData } });
      setFormData(initForm);
      toast.success("Message has been sent, you will get response on provided mail soon");
    } catch (error) {
      console.log(error);
      toast.success("Some error occurred, please try again later");
    }
  };

  return (
    <Spin spinning={loading}>
      <form onSubmit={handelSubmit} className={`mt-3 lg:mt-0 px-0 sm:px-3 lg:px-0 w-full ${styles.aboutForm}`}>
        <div>
          <input
            required
            type="text"
            autoComplete="off"
            placeholder=" your name"
            onChange={(e) => setFormData((pre) => ({ ...pre, name: e.target.value }))}
            className="focus:!border focus:!border-gray-500"
            value={formData.name}
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
            value={formData.email}
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
            value={formData.message}
          />
        </div>

        <button type="submit" className="primary_button rounded-2 mt-3">
          Send Message
        </button>
      </form>
    </Spin>
  );
};

export default ContactForm;
