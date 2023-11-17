import { FaTimes } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const StartSurvey = ({ closeModal }) => {
  return (
    <div className="">
      <form className="New-Survey-modal-container h-[65vh] w-[90vw] md:w-[40vw] pt-[2rem]">
        <input
          type="file"
          id=""
          name=""
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
          <option value="option1">Product 1</option>
          <option value="option2">Product 2</option>
          <option value="option3">Product 3</option>
        </select>

        <textarea
          id="description"
          name="promotional sentence"
          placeholder="Enter a promotional sentence to attract participants in (15 words)"
          className="w-4/5 md:w-[25rem] h-24 resize-none border-2 border-[#B3B4BB] rounded-[5px] outline-none"
          style={{ paddingLeft: "1rem" }}
        />

        <button
          type="button"
          className="w-4/5 md:w-[25rem] mt-[10px] h-[50px] font-serif font-bold text-black text-center bg-[#005734] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-[12px] hover:text-white cursor-pointer"
        >
          Create Survey Campaign
        </button>

        <button
          className="close-modal-btn rounded-md hover:bg-[#005734] text-xl p-1"
          onClick={closeModal}
          type="button"
        >
          <FaTimes />
        </button>
      </form>
    </div>
  );
};

export default StartSurvey;
