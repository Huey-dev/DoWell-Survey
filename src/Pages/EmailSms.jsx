import QRCode from "react-qr-code";
import Layout from "../Layout/Layout";
import { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pages.css";
import { MapPinIcon, PencilSquareIcon, QrCodeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import CSVReader from 'react-csv-reader';



const EmailCsvModal = ({ open, setOpen }) => {
  const [csvEmails, setCsvEmails] = useState([]);

  const handleCSVRead = (data, fileInfo) => {
    // Assuming the first column in the CSV file contains the list of numbers
    const numbersColumnIndex = 0;
    const extractedNumbers = data.map((row, index) => ({ email: row[numbersColumnIndex], name: row[numbersColumnIndex] }));
    console.log("thus us the extraction", data);

    setCsvEmails(extractedNumbers);
  };

  const handleSubmit = async () => {
    //const emails = csvEmails.map((email) => `dsdsdsds`)

    const formData = {
      fromname: "testers",
      fromemail: "makinde@mak.com",
      to_email_list: [{ email: "jerrychinedu@gmail.com", name: "jerry" }, { email: "jerryihediwa1@gmail.com", name: "jerrhjy" }],
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
        
        <p style="font-size: 16px; line-height: 1.5; color: #333;">A survey has been creat
          toand it is for a maximum number ofons. Link to the Qrcode can be found at
          </p>
        </div>

      </body>
      </html>`,
    };

    const response = await axios.post(
      `https://100085.pythonanywhere.com/api/dowell_bulk_email/?api_key=4f0bd662-8456-4b2e-afa6-293d4135facf`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("this is email endpoints for trying", response);



  }


  const cancelButtonRef = useRef(null);






  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-xl">
                <div className="flex flex-col items-center justify-center w-full">
                  <div
                    className="flex items-center justify-between w-full text-white bg-[#005734] text-lg">
                    <p className="font-bold mx-4 my-2 ">Send Email Via CSV upload</p>
                    <button
                      className="font-serif font-bold text-center m-4"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-4 w-4 m-1" />
                    </button>
                  </div>


                  <div className="w-full h-full flex justify-between">
                    <div className="w-6/12 justify-center items-center p-20 border-dashed border-2 border-black m-2 h-64 relative">
                    <CSVReader
                      onFileLoaded={handleCSVRead}
                      inputStyle={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '100%',
                        cursor: 'pointer',
                        opacity: 0,
                      }}
                      parserOptions={{ header: false, skipEmptyLines: true }}
                    />
                    </div>

                    <div className="w-6/12 h-full w-full m-2 bg-black">
                      <div className="flex items-center">

                      </div>

                    </div>
                    


                  </div>


                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export const EmailSms = () => {
  const [open, setOpen] = useState(false);

  const getQrcode = sessionStorage.getItem("Qrcode");
  const numOfParticipant = sessionStorage.getItem("numOfParticipants");
  const user_info_json = sessionStorage.getItem("user_info") || "[]";
  const user_info = JSON.parse(user_info_json);
  let Uname;
  if (user_info) {
    Uname = user_info.username ? user_info.username : null;
  }
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
        <p style="font-size: 16px; line-height: 1.5; color: #333;">A survey has been created by ${Uname}. The time period is between ${sformattedDate}
          to ${eformattedDate}, and it is for a maximum number of ${numOfParticipant} persons. Link to the Qrcode can be found at
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
        `https://100025.pythonanywhere.com/update-qr-codev2?api_key=a0955eef-146b-4efd-a14a-85727d5b6014`,
        updatedSurveyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("this is survey response", updateSurvey);

      const response = await axios.post(
        `https://100085.pythonanywhere.com/api/email/?api_key=4f0bd662-8456-4b2e-afa6-293d4135facf`,
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
      <main className="w-full h-screen mb-10">
        <div className="px-4 md:px-10 mt-[40px] md:pl-[310px] md:mt-0">
          <EmailCsvModal open={open} setOpen={setOpen} />
          <div className="px-2 items-center flex justify-between bg-[#005734]">
            <h1 className=" text-white text-2xl font-semibold pt-1 pb-3 no-underline">
              Finalize Sample Size
            </h1>
            <h6 className=" text-white text-sm font-bold pb-0 no-underline">
              Set the total number of persons allowed to fill this survey
            </h6>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-5 bg-[#EFF3F6]">
            <div className="flex justify-center items-center">
              <img src="https://100025.pythonanywhere.com/media/company_qrcode/app-store.png" className="w-4/6 mt-2 border-2 border-[#005734]" alt="" />
            </div>

            <div class="flex items-center w-4/6">
              <hr class="flex-grow border-t border-[#005734]"/>
                <span class="px-3 font-serif text-xl font-semibold text-gray-500">
                  Send Survey Notification
                </span>
                <hr class="flex-grow border-t border-[#005734]"/>
                </div>

                <div className="flex justify-center items-center w-4/6 space-x-2">
                <button
                  className="w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#005734]"
                  // onClick={() => {
                  //   setOpen(true)
                  // }}
                  >
                  Via Email
                </button>
                <button
                  className="w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#005734]"
                  onClick={() => {
                    setOpen(true)
                  }}>
                  Via Email (csv)
                </button>
                <button
                  className="w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#005734]"
                  // onClick={() => {
                  //   setOpen(true)
                  // }}
                  >
                  Via SMS
                </button>

                </div>

                <div className="flex justify-center items-center w-4/6">
                <button
                  className="mb-2 w-[466px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#005734]"
                  // onClick={() => {
                  //   setOpen(true)
                  // }}
                  >
                  Start the Survey
                </button>

                </div>
                


            </div>
          </div>
      </main>
    </Layout>


  );
};
