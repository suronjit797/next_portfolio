import ContactForm from "./ContactForm";
import AddressShort from "./AddressShort";

const Contact = () => {
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
