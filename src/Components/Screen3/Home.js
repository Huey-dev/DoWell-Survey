import React from "react";
import { TfiClose } from "react-icons/tfi";
import QRCode from "react-qr-code";

const Home = () => {
  return (
    <div className="flex flex-col items-center px-5 lg:px-32">
      <div className="flex items-center gap-5 sm:gap-14 px-5 py-3 text-lg font-bold">
        <p>Preview of the survey invitation in uxlivinglab page</p>
        <button >
          <TfiClose />
        </button>
      </div>

      <div className="border-[7px] border-[#7ED956] rounded-xl h-[35rem] flex flex-col items-center lg:w-1/2">
        <div className="m-5">
          <QRCode
            size={200}
            bgColor="white"
            fgColor="black"
            value="https://uxlivinglab.com/"
          />
        </div>

        <div className="relative bg-[#7ED956] flex gap-7 p-2 mx-2 lg:p-10">
          <div className=" absolute -bottom-14 -left-0">
            <div className="text-8xl">😊</div>
          </div>

          <div className="text-white font-medium text-lg ml-24">
            <p className="text-center">
              How do you feel about Apple Coffee in today's breakfast ?
            </p>
          </div>
        </div>

        <div className=" text-[#FE0707] font-bold flex justify-end items-center gap-2 text-lg w-full p-7 lg:justify-center">
          <input type="checkbox" className="w-4 h-4" />
          <a href="https://uxlivinglab.com/" className=" underline">
            PrivacyPolicy
          </a>
        </div>

        <div className="bg-[#7ED956] text-white font-bold p-4 lg:p-8 text-lg mx-8 rounded-xl">
          <a href="https://uxlivinglab.com/" className="underline">
            {" "}
            Click here or scan QR code to fill survey form
          </a>
        </div>
      </div>

      <div className="flex justify-center items-center gap-10 font-bold text-xl text-white mt-10 w-full">
        <button className="bg-[#838383] p-4 border-none rounded-md w-1/2 max-w-[10rem] ">
          Edit
        </button>
        <button className="bg-[#7ED956] p-[2px] sm:p-4 border-none rounded-md w-1/2 max-w-[15rem]">
          Set Survey Timeline
        </button>
      </div>
    </div>
  );
};

export default Home;
