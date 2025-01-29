import { BsFillEnvelopeCheckFill, BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidMap } from "react-icons/bi";

const AddressShort = () => {
  return (
    <>
      <h4 className="font-bold mb-8 text-2xl"> Address </h4>
      <div>
        {/* mail */}
        <div>
          <a
            target="_blank"
            href="mailto:suronjit797@gmail.com"
            className="!text-white mb-3 inline-flex items-center"
          >
            <span className="me-3 fs-5">
              <BsFillEnvelopeCheckFill />
            </span>
            suronjit797@gmail.com
          </a>
        </div>
        {/* phone number */}
        <div>
          <a target="_blank" href="tel:+8801799057302" className="!text-white mb-3 inline-flex items-center">
            <span className="me-3 fs-5">
              <BsFillTelephoneFill />
            </span>
            +8801799057302
          </a>
        </div>
        {/* mail */}
        <div>
          <a target="_blank" href="tel:+8801920278048" className="!text-white mb-3 inline-flex items-center">
            <span className="me-3 fs-5">
              <BsFillTelephoneFill />
            </span>
            +8801920278048
          </a>
        </div>
        <div>
          <a
            target="_blank"
            href="https://goo.gl/maps/KLdecUuzCe9CD1R7A"
            className="!text-white mb-3 inline-flex items-center"
          >
            <span className="me-3 fs-5">
              <BiSolidMap />
            </span>
            Satkhira, Bangladesh
          </a>
        </div>
      </div>
    </>
  );
};

export default AddressShort;
