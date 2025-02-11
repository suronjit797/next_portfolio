import ContactForm from "./ContactForm";
import AddressShort from "./AddressShort";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contract | ${process.env.NEXT_PUBLIC_TITLE ?? ""} - Web Developer"`,
  description:
    "Get in touch with me for web development projects, collaborations, or hiring opportunities.",
  keywords: [
    "Contact Suronjit Pal",
    "Hire Web Developer",
    "MERN Stack Developer Contact",
    "Freelance Web Developer",
  ],
  openGraph: {
    title: "Contact | Suronjit Pal - Web Developer",
    description:
      "Reach out for web development services, consulting, or freelance projects.",
    url: "https://yourwebsite.com/contact",
    images: [
      {
        url: "https://yourwebsite.com/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Suronjit Pal",
      },
    ],
    type: "website",
  },
};


const Contact = async() => {
  return (
    <>
      <div className="">
        <div className="h-full py-5 px-lg-4">
          <h4 className="mb-4 heading text-capitalize">
            <span> late&#39;s </span> Discuss
          </h4>
          <hr className="mb-5" />
          <div className="md:flex gap-10">
            <div className="md:w-96 lg:text-start text-center">
              <AddressShort />
            </div>

            <div className="w-full ">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
