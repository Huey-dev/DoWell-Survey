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
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { FaSquarePhone } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { IoAddOutline, IoPerson } from "react-icons/io5";

const extractPhoneNumbersFromSessionStorage = () => {
  const surveyData = JSON.parse(sessionStorage.getItem("newSurvey"));
  console.log('survey data),', surveyData);
  if (!surveyData) return [];
  const numbers = surveyData
    .filter((entry) => entry.phone && entry.phone !== "None")
    .map((entry) => ({ phone: entry.phone, address: entry.place_name }));
  console.log("hers the", numbers);
  return numbers;
};

const extractWebsitesFromSessionStorage = () => {
  const surveyData = JSON.parse(sessionStorage.getItem("newSurvey"));
  console.log('survey data),', surveyData);
  if (!surveyData) return [];
  const websites = surveyData
    .filter((entry) => entry.website && entry.website !== "None")
    .map((entry) => ({ website: entry.website, address: entry.place_name }));
  console.log("heres the websites", websites);
  return websites;
};


function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const EmailModal = ({ emailOpen, setEmailOpen, websites, getQrcode, Uname, sformattedDate, eformattedDate, numOfParticipant }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [fetchedEmails, setFetchedEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [emailSendLoading, setEmailSendLoading] = useState(false);

  const NameRef = useRef(null);
  const emailRef = useRef(null);

  const cancelButtonRef = useRef(null);

  const handleGetEmail = async (website) => {
    //const emails = csvEmails.map((email) => `dsdsdsds`)
    setEmailLoading(true);
    console.log("the websites are", websites);

    const formDatas = websites.map((website) => (
      {
        "web_url": `${website.website}`,
        "info_request": {
          "addresses": true,
          "emails": true,
          "links": true,
          "logos": true,
          "name": true,
          "phone_numbers": true,
          "social_media_links": {
            "all": true,
            "choices": [
              "facebook",
              "twitter",
              "instagram",
              "linkedin",
              "youtube",
              "pinterest",
              "tumblr",
              "snapchat"
            ]
          },
          "website_socials": {
            "all": true,
            "choices": [
              "facebook",
              "twitter",
              "instagram",
              "linkedin",
              "youtube",
              "pinterest",
              "tumblr",
              "snapchat"
            ]
          }
        }
      }
    ));


    const formData = {
      "web_url": website,
      "info_request": {
        "addresses": true,
        "emails": true,
        "links": true,
        "logos": true,
        "name": true,
        "phone_numbers": true,
        "social_media_links": {
          "all": true,
          "choices": [
            "facebook",
            "twitter",
            "instagram",
            "linkedin",
            "youtube",
            "pinterest",
            "tumblr",
            "snapchat"
          ]
        },
        "website_socials": {
          "all": true,
          "choices": [
            "facebook",
            "twitter",
            "instagram",
            "linkedin",
            "youtube",
            "pinterest",
            "tumblr",
            "snapchat"
          ]
        }
      }
    }

    try {



      const response = await axios.post(
        `https://www.uxlive.me/api/website-info-extractor/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //setCsvSendLoading(false);
      //console.log("we got a response of", response);
      setEmailLoading(false);
      setFetchedEmails(response?.data?.emails_found);


    }
    catch (error) {
      setEmailLoading(false);
      toast.error("Error fetching emails", {
        onClose: () => { },
      });
      setFetchedEmails([]);


    }


  }

  const handleSubmit = async () => {
    //const emails = csvEmails.map((email) => `dsdsdsds`)
    setEmailSendLoading(true);

    const formData = {
      fromname: "Dowell Surveys",
      fromemail: "user@username.com",
      to_email_list: selectedEmails,
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
      const response = await axios.post(
        `https://100085.pythonanywhere.com/api/dowell_bulk_email/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEmailSendLoading(false);
      toast.success("Email(s) sent successfully", {
        onClose: () => { },
      });
    }
    catch (error) {
      setEmailSendLoading(false);
      toast.error("Error in sending mail(s)", {
        onClose: () => { },
      });

    }


  }

  const handleEmailModalClose = () => {
    setEmailLoading(false);
    setEmailSendLoading(false);
    setFetchedEmails([]);
    setSelectedEmails([]);
    console.log("closing");
    setEmailOpen(false);
  }



  return (
    <Transition.Root show={emailOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleEmailModalClose}
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
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-4xl max-h-4xl">
                <div className="flex flex-col items-center justify-center w-full">
                  <div
                    className="flex items-center justify-between w-full text-white bg-[#5DA868] text-lg">
                    <p className="font-bold mx-4 my-2 ">Send Notifications via Emails</p>
                    <button
                      className="font-serif font-bold text-center m-4"
                      onClick={handleEmailModalClose}
                    >
                      <XMarkIcon className="h-4 w-4 m-1" />
                    </button>
                  </div>

                  <div className="flex w-full flex-col h-96 bg-[#EFF3F6] px-4 m-2">
                  <div className="flex justify-between">
                            <div className="w-5/12 flex flex-col justify-between py-4">
                              <div className="h-72 overflow-y-auto">
                              <div class="flex items-center justify-center w-full my-2">
                                  <hr class="flex-grow border-t border-[#005734]" />
                                  <span class="px-3 font-serif text-sm font-semibold text-gray-500">
                                    Get Mails from Location Sites
                                  </span>
                                  <hr class="flex-grow border-t border-[#005734]" />
                                </div>
                                {
                                  websites.map((website, index) => (
                                    <div key={index} className='flex w-full text-sm bg-white mt-3 rounded-lg'>
                                      <div className="w-2/12 flex justify-center items-center">
                                        <FaGlobe className="h-4 w-4 m-1" />
                                      </div>
                                      <div className="w-7/12 text-black">

                                        <p className="font-semibold">{website.website}</p>

                                      </div>
                                      <div className="w-3/12 text-black">

                                        <button
                                          className="w-[70px] h-[20px] font-serif opacity-80 hover:opacity-100 text-center text-xs rounded-full text-white bg-[#399544]"
                                          onClick={() => handleGetEmail(website.website)}
                                          disabled={emailLoading}
                                        > Get Email</button>

                                      </div>
                                    </div>
                                  ))
                                }

                              </div>

                              <div>
                                <div class="flex items-center justify-center w-full my-2">
                                  <hr class="flex-grow border-t border-[#005734]" />
                                  <span class="px-3 font-serif text-sm font-semibold text-gray-500">
                                    Add Emails
                                  </span>
                                  <hr class="flex-grow border-t border-[#005734]" />
                                </div>
                                <form onSubmit={(e) => {
                                  e.preventDefault();
                                  const details = {
                                    name: NameRef.current.value,
                                    email: emailRef.current.value
                                  }
                                  setSelectedEmails((emails) => [...emails, details]);
                                  NameRef.current.value = '';
                                  emailRef.current.value = '';




                                }}
                                  className="flex items-center justify-center w-full space-x-2">
                                  <div class="relative w-4/12">
                                    <input type="text"
                                      className="py-1 border w-full rounded-md pl-8"
                                      ref={NameRef}
                                      required
                                      placeholder="Name"
                                    />
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <IoPerson className="text-gray-400" />
                                    </div>
                                  </div>



                                  <div class="relative w-6/12">
                                    <input type="text"
                                      className="py-1 border w-full rounded-md pl-8"
                                      ref={emailRef}
                                      required
                                      placeholder="Email"
                                    />
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <MdEmail className="text-gray-400" />
                                    </div>
                                  </div>

                                  <button className="w-[70px] py-2 font-serif opacity-80 hover:opacity-100 text-center text-xs rounded-md text-white bg-[#399544]">Add</button>


                                </form>


                              </div>
                            </div>

                            <div className="w-6/12">
                              {

                                emailLoading ? (
                                  <div className="flex items-center justify-center h-24">
                                    <div
                                      className="m-12 inline-block h-8 w-8 animate-spin text-green-800 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                      role="status"
                                    >
                                      <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>

                                ) :
                                  (<div className='text-sm mt-3 h-24 overflow-y-auto bg-white px-1'>
                                    {fetchedEmails?.map((email) => (
                                      <div className="flex w-full">
                                        <div className="w-10/12 text-black">

                                          <p className="font-semibold">{email}</p>

                                        </div>
                                        <div className="w-3/12 text-black">

                                          <button
                                            className="w-[70px] h-[20px] font-serif opacity-80 hover:opacity-100 text-center text-xs rounded-full text-white bg-[#399544]"
                                            onClick={() => setSelectedEmails((emails) => ([...emails, { name: email, email: email }]))}
                                          > Add</button>



                                        </div>

                                      </div>

                                    ))

                                    }

                                  </div>)
                              }
                              <div className="my-3 bg-[#EFF3F6] ">
                                <div className="flex items-center justify-center w-full text-white font-semibold bg-[#4F6D75] text-md">
                                  Email Listings
                                </div>
                                <div className="overflow-y-auto h-48 my-2 border border-gray-200">
                                  {selectedEmails.map((email, index) => (
                                    <div key={index} className='flex text-sm bg-white my-1'>
                                      <div className="w-2/12 flex justify-center items-center">
                                        <MdOutlineEmail className="h-4 w-4 m-1" />
                                      </div>
                                      <div className="w-9/12">

                                        <p className="font-semibold">{email.email}</p>

                                      </div>
                                      <button
                                        className="text-red-500"
                                        onClick={() => {
                                          const updatedList = [...selectedEmails];
                                          //const valueIndex = updatedList.indexOf(id);
                                          const valueIndex = updatedList.findIndex(
                                            (obj) => obj.email === email.email
                                          );

                                          if (valueIndex !== -1) {
                                            // Value is present, remove it
                                            updatedList.splice(valueIndex, 1);
                                            setSelectedEmails(updatedList);
                                          }
                                        }}>
                                        <XMarkIcon className="h-4 w-4" /></button>
                                    </div>

                                  ))}

                                </div>
                                <div className="flex justify-center">
                                  {

                                    emailSendLoading ? (

                                      <button
                                        className="w-full h-[30px] font-serif font-bold text-center text-sm md:text-md text-white bg-[#5DA868] cursor-not-allowed"
                                        disabled
                                      >
                                        sending
                                      </button>

                                    ) : (
                                      <button
                                        className={`${selectedEmails.length < 1 ? "opacity-60 cursor-not-allowed" : "hover:opacity-100 opacity-80"} w-full h-[30px] font-serif font-bold text-center text-sm md:text-md text-white bg-[#5DA868]`}
                                        onClick={handleSubmit}
                                        disabled={selectedEmails.length < 1}
                                      >
                                        Send Emails
                                      </button>
                                    )
                                  }

                                </div>


                              </div>


                            </div>

                            <div>

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



const EmailCsvModal = ({ open, setOpen, getQrcode, Uname, sformattedDate, eformattedDate, numOfParticipant }) => {
  const [csvEmails, setCsvEmails] = useState([]);
  const [csvSendLoading, setCsvSendLoading] = useState(false);

  const handleCSVRead = (data, fileInfo) => {
    // Assuming the first column in the CSV file contains the list of numbers
    const numbersColumnIndex = 0;
    const extractedMails = data.map((row, index) => ({ email: row[1], name: row[0] }));
    console.log("thus us the extraction", data);

    setCsvEmails(extractedMails);
  };

  const handleSubmit = async () => {
    //const emails = csvEmails.map((email) => `dsdsdsds`)
    setCsvSendLoading(true);

    const formData = {
      fromname: "Dowell Surveys",
      fromemail: "user@username.com",
      to_email_list: csvEmails,
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
      const response = await axios.post(
        `https://100085.pythonanywhere.com/api/dowell_bulk_email/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCsvSendLoading(false);
      toast.success("Email(s) sent successfully", {
        onClose: () => { },
      });
    }
    catch (error) {
      setCsvSendLoading(false);
      toast.error("Error in sending mail(s)", {
        onClose: () => { },
      });

    }


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
                    className="flex items-center justify-between w-full text-white bg-[#3B82F6] text-lg">
                    <p className="font-bold mx-4 my-2 ">Send Email Via CSV upload</p>
                    <button
                      className="font-serif font-bold text-center m-4"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-4 w-4 m-1" />
                    </button>
                  </div>


                  <div className="w-full h-full flex justify-between">
                    <div className="w-6/12 flex flex-col justify-center items-center border-dashed border-2 border-[#B1B0B0] m-2 h-64 relative">

                      <FiUpload className="h-12 w-12 m-1 text-black" />
                      <p className="font-semibold"> click to upload csv file</p>

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

                    <div className="w-6/12 h-full m-2">
                      <div className="flex items-center justify-center w-full text-white font-semibold bg-[#4F6D75] text-md">
                        Email Listings
                      </div>
                      <div className="my-2 h-44 bg-[#EFF3F6] border border-gray-200 overflow-y-auto">
                        {csvEmails.map((email, index) => (
                          <div key={index} className='flex text-sm bg-white my-1'>
                            <div className="w-2/12 flex justify-center items-center">
                              <MdOutlineEmail className="h-4 w-4 m-1" />
                            </div>
                            <div className="w-9/12">
                              <p>{email.name}</p>
                              <p className="font-semibold">{email.email}</p>

                            </div>
                          </div>

                        ))}

                      </div>
                      <div className="flex justify-center">
                        {

                          csvSendLoading ? (

                            <button
                              className="w-full h-[30px] font-serif font-bold text-center text-sm md:text-md text-white bg-[#3B82F6] cursor-not-allowed"
                              disabled
                            >
                              Processing
                            </button>

                          ) : (
                            <button
                              className={`${csvEmails.length < 1 ? "opacity-60 cursor-not-allowed" : "hover:opacity-100 opacity-80"} w-full h-[30px] font-serif font-bold text-center text-sm md:text-md text-white bg-[#3B82F6]`}
                              onClick={handleSubmit}
                              disabled={csvEmails.length < 1}
                            >
                              Send Emails
                            </button>
                          )
                        }

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

const SmsModal = ({ smsOpen, setSmsOpen, phoneNumbers }) => {





  const cancelButtonRef = useRef(null);






  return (
    <Transition.Root show={smsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setSmsOpen(false)}
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
                    className="flex items-center justify-between w-full text-white bg-orange-500 text-lg">
                    <p className="font-bold mx-4 my-2 ">Send Notifications via SMS</p>
                    <button
                      className="font-serif font-bold text-center m-4"
                      onClick={() => setSmsOpen(false)}
                    >
                      <XMarkIcon className="h-4 w-4 m-1" />
                    </button>
                  </div>

                  <div className="flex w-full flex-col h-64 overflow-y-auto bg-[#EFF3F6] px-4 m-2">
                    {
                      phoneNumbers.length < 1 ?
                        (
                          <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500 text-center text-lg font-semibold">You did not Select any Location with Mobile Nos.</p>

                          </div>

                        ) :
                        (
                          phoneNumbers.map((phoneNumber, index) => (
                            <div key={index} className='flex w-full text-sm bg-white mt-3 rounded-lg'>
                              <div className="w-2/12 flex justify-center items-center">
                                <MdOutlineEmail className="h-4 w-4 m-1" />
                              </div>
                              <div className="w-10/12 text-black">
                                <p>{phoneNumber.address}</p>
                                <p className="font-semibold">{phoneNumber.phone}</p>

                              </div>
                            </div>
                          ))

                        )
                    }


                  </div>
                  <button className="w-[150px] m-2 h-[30px] font-serif font-bold text-center text-sm md:text-md text-white bg-orange-500 opacity-60 cursor-not-allowed">
                    Send SMS

                  </button>





                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const SmsCsvModal = ({ smsCsvOpen, setSmsCsvOpen }) => {
  const [csvNumbers, setCsvNumbers] = useState([]);

  const handleCSVNumbersRead = (data, fileInfo) => {
    // Assuming the first column in the CSV file contains the list of numbers
    const numbersColumnIndex = 0;
    const extractedNumbers = data.map((row, index) => ({ number: row[1], name: row[0] }));
    console.log("thus us the extraction", data);

    setCsvNumbers(extractedNumbers);
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={smsCsvOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setSmsCsvOpen(false)}
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
                    className="flex items-center justify-between w-full text-white bg-orange-600 text-lg">
                    <p className="font-bold mx-4 my-2 ">Send Notifications via SMS(CSV upload)</p>
                    <button
                      className="font-serif font-bold text-center m-4"
                      onClick={() => setSmsCsvOpen(false)}
                    >
                      <XMarkIcon className="h-4 w-4 m-1" />
                    </button>
                  </div>

                  <div className="w-full h-full flex justify-between">
                    <div className="w-6/12 flex flex-col justify-center items-center border-dashed border-2 border-[#B1B0B0] m-2 h-64 relative">

                      <FiUpload className="h-12 w-12 m-1 text-black" />
                      <p className="font-semibold"> click to upload csv file</p>

                      <CSVReader
                        onFileLoaded={handleCSVNumbersRead}
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

                    <div className="w-6/12 h-full m-2">
                      <div className="flex items-center justify-center w-full text-white font-semibold bg-[#4F6D75] text-md">
                        SMS Listings
                      </div>
                      <div className="my-2 h-44 bg-[#EFF3F6] border border-gray-200 overflow-y-auto">
                        {csvNumbers.map((number, index) => (
                          <div key={index} className='flex text-sm bg-white my-1'>
                            <div className="w-2/12 flex justify-center items-center">
                              <FaSquarePhone className="h-4 w-4 m-1" />
                            </div>
                            <div className="w-9/12">
                              <p>{number.name}</p>
                              <p className="font-semibold">{number.number}</p>

                            </div>
                          </div>

                        ))}

                      </div>
                      <div className="flex justify-center">
                        <button className="w-full m-2 h-[30px] font-serif font-bold text-center text-sm md:text-md text-white bg-orange-600 opacity-60 cursor-not-allowed">
                          Send SMS

                        </button>

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

const StartSurveyModal = ({ startOpen, setStartOpen }) => {
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [startLoading, setStartLoading] = useState(false);

  const [syear, smonth, sday] = startDate.split("-");
  const [eyear, emonth, eday] = endDate.split("-");
  const sformattedDate = `${sday}-${smonth}-${syear}`;
  const eformattedDate = `${eday}-${emonth}-${eyear}`;


  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartLoading(true);


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
      console.log("this is survey updatedSurveyData", updatedSurveyData);


      setStartLoading(false);
      toast.success("Your survey has started", {
        onClose: () => {
          // navigate("/list-surveys");
        },
      });
    } catch (error) {

      setStartLoading(false);
      toast.error("Error updating survey: ", {
        onClose: () => {
          //  navigate("/list-surveys");
        },
      });
    }
  }

  return (
    <Transition.Root show={startOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setStartOpen(false)}
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
                    <p className="font-bold mx-4 my-2 ">Start this Survey</p>
                    <button
                      className="font-serif font-bold text-center m-4"
                      onClick={() => setStartOpen(false)}
                    >
                      <XMarkIcon className="h-4 w-4 m-1" />
                    </button>
                  </div>

                  <div className="flex flex-col space-y-2 my-8 w-full">




                    <div className="flex items-center justify-center w-full">
                      <div className="w-3/12">
                        <h2 className="font-medium text-left">
                          Set Duration:
                        </h2>
                      </div>
                      <div
                        className="w-7/12 flex items-center justify-between">
                        <input
                          type="date"

                          className="border p-1 border-[#B3B4BB] outline-none"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <p className="mx-1 font-medium">to</p>
                        <input
                          type="date"

                          className="border p-1 border-[#B3B4BB] outline-none"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        className={`${startLoading ? "opacity-60 cursor-not-allowed" : "hover:opacity-100 opacity-80"} w-[150px] h-[30px] font-serif font-bold text-center text-sm md:text-md text-white bg-[#005734]`}
                        onClick={handleSubmit}
                        disabled={startLoading}>
                        {
                          startLoading ? "Starting" : "Start Survey"
                        }


                      </button>

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
  const [smsOpen, setSmsOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [smsCsvOpen, setSmsCsvOpen] = useState(false);

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



  const [phoneNumbers, setPhoneNumbers] = useState(extractPhoneNumbersFromSessionStorage());

  const [sms, setSms] = useState(null);
  const [websites, setWebsites] = useState(extractWebsitesFromSessionStorage);
  const surveyData = sessionStorage.getItem("surveyData") || "[]";
  const surveyData1 = JSON.parse(surveyData);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
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
          <SmsModal smsOpen={smsOpen} setSmsOpen={setSmsOpen} phoneNumbers={phoneNumbers} />
          <SmsCsvModal smsCsvOpen={smsCsvOpen} setSmsCsvOpen={setSmsCsvOpen} />
          <StartSurveyModal startOpen={startOpen} setStartOpen={setStartOpen} />
          <EmailModal emailOpen={emailOpen} setEmailOpen={setEmailOpen} websites={websites} getQrcode={getQrcode} Uname={Uname}
            sformattedDate={sformattedDate} eformattedDate={eformattedDate} numOfParticipant={numOfParticipant} />
          <EmailCsvModal open={open} setOpen={setOpen} getQrcode={getQrcode} Uname={Uname} sformattedDate={sformattedDate}
            eformattedDate={eformattedDate} numOfParticipant={numOfParticipant} />
          <div className="px-2 items-center flex justify-between bg-[#005734]">
            <h1 className=" text-white text-2xl font-semibold pt-1 pb-3 no-underline">
              Start Survey
            </h1>
            <h6 className=" text-white text-sm font-bold pb-0 no-underline">
              Send Survey via Mails and SMS
            </h6>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-5 bg-[#EFF3F6]">
            <div className="flex justify-center items-center">
              <img src={getQrcode} className="w-4/6 mt-2 border-2 border-[#005734]" alt="" />
            </div>

            <div class="flex items-center w-4/6">
              <hr class="flex-grow border-t border-[#005734]" />
              <span class="px-3 font-serif text-xl font-semibold text-gray-500">
                Send Survey Notification
              </span>
              <hr class="flex-grow border-t border-[#005734]" />
            </div>

            <div className="flex justify-center items-center w-4/6 space-x-2">
              <button
                className="w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#399544]"
                onClick={() => {
                  setEmailOpen(true)
                }}
              >
                Via Email
              </button>
              <button
                className="w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#3B82F6]"
                onClick={() => {
                  setOpen(true)
                }}>
                Via Email (csv)
              </button>
              <button
                className="w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-orange-500"
                onClick={() => {
                  setSmsOpen(true)
                }}
              >
                Via SMS
              </button>

              <button
                className="w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-orange-600"
                onClick={() => {
                  setSmsCsvOpen(true)
                }}
              >
                Via SMS(csv)
              </button>

            </div>

            <div className="flex justify-center items-center w-4/6">
              <button
                className="mb-2 w-[466px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#005734]"
                onClick={() => {
                  setStartOpen(true)
                }}
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
