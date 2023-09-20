import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleProceed = () => {
    toast.success("Survey started successfully!", {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      navigate("/email");
    }, 2600);
  };

  return (
    <div className="">
      <div className="bg-[#7ED956] text-white p-6 my-3 rounded-xl font-medium text-2xl">
        <p>Select start & stop dates of Survey</p>
      </div>

      <div className="flex flex-col sm:items-center gap-5 p-5 border-y-2 border-[#FFA0A0] mb-10">
        <div className="text-center font-medium mx-12">
          Select the duration of the survey that has to be shown
        </div>

        <div className="flex justify-center">
          <div className="">
            <p className="text-[#6B53CB] font-medium">Start Date</p>
            <input
              type="date"
              className="bg-[#C4C4C4] rounded-xl py-4 px-2 text-center w-[90%] text-xl font-medium"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
      </div>

      <button
        className="bg-[#7ED956] text-white font-medium text-xl text-center px-20 py-4 rounded-xl mt-10"
        onClick={handleProceed}
      >
        Proceed
      </button>
    </div>
  );
};

export default Home;
