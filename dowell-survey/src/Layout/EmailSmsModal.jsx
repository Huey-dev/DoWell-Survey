import { FaTimes } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const EmailSmsModal = ({ closeBothModals }) => {
  return (
    <div className="">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col text-left rounded-2xl shadow-2xl p-4">
          <h3 className=" font-serif font-bold text-xl">Email </h3>
          <div className="flex gap-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-4/5 md:w-[25rem] h-[3rem] border-2 border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
            <button className="w-20 p-1 font-serif font-bold text-black text-center bg-[#4D5DED] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer">
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-col text-left rounded-2xl shadow-2xl p-4">
          <h3 className=" font-serif font-bold text-xl">SMS</h3>
          <div className="flex gap-4">
            <input
              type="number"
              id="sms"
              name="sms"
              placeholder="Enter phone number"
              className="w-4/5 md:w-[18rem] h-[3rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
            <button className="w-20 p-1 font-serif font-bold text-black text-center bg-[#4D5DED] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer">
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-col text-left gap-5 rounded-2xl items-center shadow-2xl p-4">
          <h3 className=" font-serif font-bold text-xl">Email & SMS</h3>

          <div className="flex flex-col gap-5">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-4/5 md:w-[25rem] h-[3rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
            <input
              type="number"
              id="sms"
              name="sms"
              placeholder="Enter phone number"
              className="w-4/5 md:w-[18rem] h-[3rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
              style={{ paddingLeft: "1rem" }}
            />
          </div>
          <button className="w-20 p-1 font-serif font-bold text-black text-center bg-[#4D5DED] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer">
            Send
          </button>
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
