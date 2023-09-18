import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Success = () => {
  return (
    <div className="bg-white my-3 rounded-xl font-medium text-2xl flex flex-col items-center gap-5">
      <p>Start and End dates of the survey has been set</p>
      <div>
        <BsFillPatchCheckFill className="text-[#75C07F] w-24 h-24" />
      </div>
    </div>
  );
};

export default Success;
