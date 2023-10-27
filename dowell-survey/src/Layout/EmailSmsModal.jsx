import { FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";

// eslint-disable-next-line react/prop-types
const EmailSmsModal = ({ closeBothModals }) => {
  return (
    <div className="">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center items-center">
          <QRCode
            size={150}
            bgColor="white"
            fgColor="black"
            value="https://uxlivinglab.com/"
          />
        </div>
        <div className="flex flex-col text-left rounded-2xl shadow-2xl p-2">
          <h3 className=" font-serif font-bold text-xl">Email </h3>
          <div className="flex gap-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-4/5 md:w-[20rem] h-[3rem] border-2 border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
            <div className="flex justify-center w-1/3 items-center">
              <button className="w-20 h-10 font-serif font-bold text-black text-center bg-[#4D5DED] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer">
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-left rounded-2xl shadow-2xl p-2">
          <h3 className=" font-serif font-bold text-xl">SMS</h3>
          <div className="flex gap-4">
            <input
              type="number"
              id="sms"
              name="sms"
              placeholder="Enter phone number"
              className="w-4/5 md:w-[20rem] h-[3rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
            <div className="flex justify-center w-1/3 items-center">
              <button className="w-20 h-10 font-serif font-bold text-black text-center bg-[#4D5DED] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer">
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-left gap-5 rounded-2xl shadow-2xl p-2">
          <h3 className=" font-serif font-bold text-xl">Email & SMS</h3>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-4/5 md:w-[20rem] h-[3rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
            <input
              type="number"
              id="sms"
              name="sms"
              placeholder="Enter phone number"
              className="w-4/5 md:w-[20rem] h-[3rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
          </div>

          <div className="flex justify-center items-center">
            <button className="w-20 h-10 font-serif font-bold text-black text-center bg-[#4D5DED] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer">
              Send
            </button>
          </div>
        </div>
      </div>

      <button
        className="close-modal-btn"
        onClick={closeBothModals}
        type="button"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default EmailSmsModal;
