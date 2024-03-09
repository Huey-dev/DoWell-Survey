import QRCode from "react-qr-code";
import Layout from "../Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pages.css";

export const EmailSms = () => {
  const getQrcode = sessionStorage.getItem("Qrcode");
  const numOfParticipant = sessionStorage.getItem("numOfParticipants");
  const [email, setEmail] = useState(null);
  // const [emails, setEmails] = useState([]);

  const [sms, setSms] = useState(null);
  const surveyData = sessionStorage.getItem("surveyData") || "[]";
  const surveyData1 = JSON.parse(surveyData);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showNumbersFromMap, setShowNumbersFromMap] = useState(false);

  const handleOpenPhoneNumbersModal = () => {
    setShowNumbersFromMap(true);
  };

  const handleClosePhoneNumbersModal = () => {
    setShowNumbersFromMap(false);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [syear, smonth, sday] = startDate.split("-");
  const [eyear, emonth, eday] = endDate.split("-");
  const sformattedDate = `${sday}-${smonth}-${syear}`;
  const eformattedDate = `${eday}-${emonth}-${eyear}`;

  const renderedEmail = email && email.split("@")[0];

  const navigate = useNavigate();

  const extractPhoneNumbersFromSessionStorage = () => {
    const surveyData = JSON.parse(sessionStorage.getItem("newSurvey"));
    if (!surveyData) return [];
    const numbers = surveyData
      .filter((entry) => entry.phone && entry.phone !== "None")
      .map((entry) => entry.phone);
    return numbers;
  };

  useEffect(() => {
    // Logic to extract phone numbers from QR code information
    const numbers = extractPhoneNumbersFromSessionStorage();
    setPhoneNumbers(numbers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      toname: renderedEmail,
      toemail: email,
      subject: "Survey has been created",
      email_content: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
          <style>
          .form__body {
            background-color: #f4f4f4;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 10px;
          }

        .form__p {
          font-size: 20px;
          line-height: 1.5;
          color: #333;
        }
  </style>
      </head>
      <body>
        <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);">
        <img src="${getQrcode}" alt="QR Code" style="max-width: 100%; height: auto;">
        <p style="font-size: 16px; line-height: 1.5; color: #333;">A survey has been created for ${surveyData1.name}. The time period is between ${surveyData1.startDate}
          to ${surveyData1.endDate}, and it is for a maximum number of ${numOfParticipant} persons. Link to the Qrcode can be found at
          ${getQrcode}</p>
        </div>

      </body>
      </html>`,
    };
    try {
      const updatedSurveyData = {
        id: sessionStorage.getItem("id"),
        qrcode_id: sessionStorage.getItem("qrcode_id"),
        start_date: sformattedDate,
        end_date: eformattedDate,
      };

      const updateSurvey = await axios.put(
        `https://100025.pythonanywhere.com/update-qr-codev2?api_key=504a51bf-c483-4ac5-b2dd-4f209eabcbf8`,
        updatedSurveyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("this is survey response", updateSurvey);

      const response = await axios.post(
        `https://100085.pythonanywhere.com/api/email/?api_key=dd7010c6-17b7-4cd4-ac70-f20492efa73e`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("this is email endpoints", response);
      setLoading(false);
      toast.success("Your survey has started", {
        onClose: () => {
          navigate("/list-surveys");
        },
      });
    } catch (error) {
      setLoading(false);
      if (error.updateSurvey && error.updateSurvey.status === 400) {
        toast.error("Error updating survey: ", {
          onClose: () => {
            //  navigate("/list-surveys");
          },
        });
      } else {
        // For other errors, such as email sending failure
        setLoading(false);
        toast.error("Error sending survey: " + error.message, {
          onClose: () => {
            navigate("/list-surveys");
          },
        });
      }
    }
  };

  const handleNumberToggle = (number) => {
    setSelectedNumbers((prevNumbers) => {
      if (prevNumbers.includes(number)) {
        return prevNumbers.filter((n) => n !== number);
      } else {
        return [...prevNumbers, number];
      }
    });
  };

  return (
    <Layout>
      <div className="w-full h-full px-4 md:px-10 mt-[26px] md:pl-80 mb-20 flex flex-col justify-center items-center gap-5">
        <div className="w-full md:w-[400px] flex flex-col justify-center items-center gap-5">
          <div className="flex justify-center items-center">
            <img src={getQrcode ? getQrcode : ""} className="w-3/6" alt="" />
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
                {/* <input type="checkbox" name="map" id="" />{" "} */}
                <span>Select numbers and emails from map search</span>
              </div>
              {/* Checkbox to send to map numbers */}
              <div className="flex flex-col gap-3 py-">
                {/* Display phone numbers */}
                {phoneNumbers.map((number) => (
                  <div key={number} className="flex items-center">
                    <input
                      type="checkbox"
                      id={number}
                      name={number}
                      checked={selectedNumbers.includes(number)}
                      onChange={() => handleNumberToggle(number)}
                    />
                    <label htmlFor={number}>{number}</label>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-3">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#005734] text-center font-serif text-sm font-bold">
                    Start Date
                  </p>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="bg-[#C4C4C4] rounded-md py-2 px-2 text-center text-xs font-medium"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#005734] text-center font-serif text-sm font-bold">
                    End Date
                  </p>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="bg-[#C4C4C4] rounded-md  py-2 px-2 text-center text-xs font-medium"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
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
                  Start Survey
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
