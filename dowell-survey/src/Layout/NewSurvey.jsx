import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import EmailSmsModal from "./EmailSmsModal";

// eslint-disable-next-line react/prop-types
const NewSurvey = ({ closeModal }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleCreateSurvey = () => {
    setModalOpen(true);
  };
  const closeBothModals = () => {
    closeModal();
    setModalOpen(false);
  };
  return (
    <div className="">
      {isModalOpen ? (
        <div className="New-Survey-modal-container pt-[2rem]">
          <EmailSmsModal closeBothModals={closeBothModals} />
        </div>
      ) : (
        <form className="New-Survey-modal-container pt-[2rem]">
          <input
            type="file"
            id="firstName"
            name="firstName"
            placeholder=""
            className="w-[15rem] h-[2rem]"
          />

          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="enter your name"
            className="w-4/5 md:w-[25rem] h-[2rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
            style={{ paddingLeft: "1rem" }}
          />

          <select
            className="w-4/5 md:w-[25rem] h-[2rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
            style={{ paddingLeft: "1rem" }}
          >
            <option value="">Select products/services</option>
            <option value="option1">Country 1</option>
            <option value="option2">Country 2</option>
            <option value="option3">Country 3</option>
          </select>

          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="https//:yourlink.com"
            className="w-4/5 md:w-[25rem] h-[2rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
            style={{ paddingLeft: "1rem" }}
          />

          <select
            className="w-4/5 md:w-[25rem] h-[2rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
            style={{ paddingLeft: "1rem" }}
          >
            <option value="">Select country/countries</option>
            <option value="option1">Country 1</option>
            <option value="option2">Country 2</option>
            <option value="option3">Country 3</option>
          </select>

          <select
            className="w-4/5 md:w-[25rem] h-[2rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
            style={{ paddingLeft: "1rem" }}
          >
            <option value="">Select region/regions</option>
            <option value="option1">Country 1</option>
            <option value="option2">Country 2</option>
            <option value="option3">Country 3</option>
          </select>

          <textarea
            id="description"
            name="promotional sentence"
            placeholder="Enter a promotional sentence to attract participants in (15 words)"
            className="w-4/5 md:w-[25rem] h-24 resize-none border-2  border-[#B3B4BB] rounded-[5px] outline-none"
            style={{ paddingLeft: "1rem" }}
          />

          <div className="flex justify-center">
            <div className="">
              <p className="text-[#6B53CB] font-medium">Start Date</p>
              <input
                type="date"
                className="bg-[#C4C4C4] rounded-xl py-2 px-2 text-center w-[90%] text-lg font-medium"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="">
              <p className="text-[#6B53CB] font-medium">End Date</p>
              <input
                type="date"
                className="bg-[#C4C4C4] rounded-xl py-2 px-2 text-center w-[90%] text-lg font-medium"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreateSurvey}
            className="w-4/5 md:w-[25rem] mt-[10px] h-[50px] font-serif font-bold text-black text-center bg-[#4D5DED] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer"
          >
            Create Survey Campaign
          </button>

          <button
            className="close-modal-btn"
            onClick={closeModal}
            type="button"
          >
            <FaTimes />
          </button>
        </form>
      )}
    </div>
  );
};

export default NewSurvey;
