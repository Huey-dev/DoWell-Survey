// import { useState } from "react";
import Layout from "./Layout";

const StartNewSurvey = () => {
  return (
    <Layout>
      <div className="min-h-screen flex justify-end">
        <div className="flex flex-col items-center justify-center gap-8 w-full px-4 sm:px-0 md:w-[80%] ">
          <input
            type="file"
            id="firstName"
            name="firstName"
            placeholder=""
            className=""
          />

          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="enter your name"
            className="border-2 w-full sm:w-[40%] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
          />

          <select className="border-2 w-full sm:w-[40%] p-1 border-[#B3B4BB] rounded-[5px] outline-none">
            <option value="">Select products/services</option>
            <option value="option1">Product 1</option>
            <option value="option2">Product 2</option>
            <option value="option3">Product 3</option>
          </select>

          <textarea
            id="description"
            name="promotional sentence"
            placeholder="Enter a promotional sentence to attract participants in (15 words)"
            className="h-24 resize-none border-2 w-full sm:w-[40%] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
          />

          <button
            type="button"
            className="w-full sm:w-[40%] font-serif p-2 font-bold text-center bg-[#005734] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-md text-white cursor-pointer"
          >
            Create Survey Campaign
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StartNewSurvey;
