import React, { useState } from "react";
import Success from "./Success";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="bg-[#7ED956] text-white p-6 my-3 rounded-xl font-medium text-2xl">
        <p>Select start & stop dates of Survey</p>
      </div>

      <div className="flex flex-col sm:items-center gap-5 p-5 border-y-2 border-[#FFA0A0] mb-10">
        <div className="text-center font-medium mx-12">
          Select the duration of survey that has to be shown
        </div>

        <div className="flex justify-center">
          <div className="">
            <p className="text-[#6B53CB] font-medium">Start Date</p>
            <input
              type="date"
              className="bg-[#C4C4C4] rounded-xl py-4 px-2 text-center w-[90%] text-xl font-medium"
            />
          </div>

          <div className="">
            <p className="text-[#6B53CB] font-medium">End Date</p>
            <input
              type="date"
              className="bg-[#C4C4C4] rounded-xl py-4 px-2 text-center w-[90%] text-xl font-medium"
            />
          </div>
        </div>

        <button className="bg-[#6B53CB] py-3 px-6 text-white font-medium rounded-xl my-10 items-start w-[10rem] border-none">
          Start Now
        </button>
      </div>

      <button
        className="bg-[#7ED956] text-white font-medium text-xl text-center px-20 py-4 rounded-xl mt-10 border-none"
        onClick={openModal}
      >
        Proceed
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white z-10 p-2 mx-4 rounded-lg flex flex-col items-end">
            <button
              className="text-2xl font-medium rounded-xl"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
            <Success />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
