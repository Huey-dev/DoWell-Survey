import React from "react";
import Header from "../Header";
import { BsQuestionLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Email sent successfully!", {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div className="flex flex-col border-2 border-black min-h-screen">
      <Header />

      <div className="max-w-lg w-full ">
        <div className="flex justify-between p-5">
          <BsQuestionLg className="text-[#FE1B1B]" />
          <AiOutlineClose />
        </div>
        <form className="bg-white px-8 pt-6 pb-8 flex flex-col gap-8">
          <h2 className="text-sm mb-4 font-bold">
            The next step is confirmation of your email, click the confirmation
            link received in your email after submitting this form X
            <br />
            <br />
            We will intimate you within 24 hours after email confirmation about
            the campaign approval. Then you can start and stop the campaign.
            check your data continuously for updates
            <br />
            <br />
            We will update you with periodic reports on the progress of the
            campaign
          </h2>
          <div className="flex gap-2 items-center my-5 text-[#FE0F0E] underline font-bold">
            <input type="checkbox" className="" />
            Privacy Policy
          </div>
          <div className="flex flex-col gap-3">
            <div className="">
              <input
                className="border rounded-lg bg-[#C4C4C4] w-full py-2 px-3 text-black placeholder-center placeholder-black placeholder:text-center placeholder:font-medium"
                id="name"
                type="text"
                placeholder="Your Name"
              />
            </div>

            <div className="">
              <input
                className="border rounded-lg bg-[#C4C4C4] w-full py-2 px-3 text-black placeholder-center placeholder-black placeholder:text-center  placeholder:font-medium"
                id="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-5">
            <Link to="/">
              <button
                className="bg-gray-500 text-white font-bold py-4 px-10 rounded-lg"
                type="button"
              >
                Back
              </button>
            </Link>
            <button
              className="bg-[#7ED956] text-white font-bold py-4 px-10 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
