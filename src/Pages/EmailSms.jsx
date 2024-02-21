import QRCode from "react-qr-code";
import Layout from "../Layout/Layout";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EmailSms = () => {
  const getQrcode = sessionStorage.getItem("Qrcode");
  const [email, setEmail] = useState(null);
  const [sms, setSms] = useState(null);
  const surveyData = sessionStorage.getItem("surveyData") || "[]";
  const surveyData1 = JSON.parse(surveyData);
  const [loading, setLoading] = useState(false);

  //console.log("log this", console_data);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      toname: "jerry",
      toemail: email,
      subject: "Survey has been created",
      email_content: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h3>a survey has been created for ${surveyData1.name}. The time period is between ${surveyData1.startDate}
        to ${surveyData1.endDate}, and it is for a maximum number of 50 persons. Link to the Qrcode can be found at 
        ${getQrcode} </h3>
      </body>
      </html>`,
    };
    try {
      const response = await axios.post(
        `https://100085.pythonanywhere.com/api/email/?api_key=dd7010c6-17b7-4cd4-ac70-f20492efa73e`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      toast.success(response.data.message, {
        onClose: () => {
          navigate("/list-surveys");
        },
      });
    } catch (error) {
      setLoading(false);
      toast.success(error.response.data.message, {
        onClose: () => {
          navigate("/list-surveys");
        },
      });
    }
  };

  return (
    <Layout>
      <div className="w-full h-full px-4 md:px-10 mt-[26px] md:pl-80 mb-20 flex flex-col justify-center items-center gap-5">
        <div className="w-full md:w-[400px] flex flex-col justify-center items-center gap-5">
          <div className="flex justify-center items-center">
            <QRCode
              size={170}
              bgColor="white"
              fgColor="black"
              // value="https://uxlivinglab.com/"
              value={getQrcode ? getQrcode : ""}
            />
          </div>
          <form
            action=""
            encType="multipart/form-data"
            className=" flex flex-col"
          >
            <div className="w-full md:w-[400px] flex flex-col gap-3 py-">
              <div className="w-full md:w-[400px] flex flex-col gap-2 text-left  ">
                <h3 className="font-serif font-bold text-md">Email </h3>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  className="w-full h-[4rem] border-2 border-[#B3B4BB] rounded-[5px] outline-none"
                  style={{ paddingLeft: "1rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="w-full md:w-[400px] flex flex-col gap-2 text-left  mt-4">
                <h3 className="font-serif font-bold text-md">SMS</h3>

                <input
                  type="number"
                  id="sms"
                  name="sms"
                  placeholder="Enter phone number"
                  className="w-full  h-[4rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
                  style={{ paddingLeft: "1rem" }}
                  value={sms}
                  onChange={(e) => setSms(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[400px] flex  gap-2 text-left  mt-4">
                <input type="checkbox" name="map" id="" />{" "}
                <span>Send to all numbers and emails from map results</span>
              </div>
            </div>
            <div className="w-full md:w-[400px] h-full flex justify-center items-center mt-10">
              {loading ? (
                <button
                  className="p-2 w-full md:w-[400px] h-[4rem] font-serif font-semibold text-white opacity-60  bg-[#176847] text-md rounded-md cursor-pointer "
                  disabled
                >
                  Processing
                </button>
              ) : (
                <button
                  className="p-2 w-full md:w-[400px] h-[4rem] font-serif font-semibold text-white opacity-80 hover:opacity-100 bg-[#176847] text-md rounded-md cursor-pointer"
                  onClick={handleSubmit}
                >
                  Send Survey
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
