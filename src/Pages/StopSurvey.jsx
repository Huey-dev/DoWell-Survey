import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "../Layout/Layout";
import { MapPinIcon, PencilSquareIcon, QrCodeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaWhatsapp, FaTelegram, FaDownload } from "react-icons/fa";
//import { FaTimes } from "react-icons/fa";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, } from "react-leaflet";
import "./EditSurveyModal.css";
import surveys from "../data/surveys";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export default function StopSurvey() {
    const [loading, setLoading] = useState(true);
    const [stopLoading, setStopLoading] = useState(false);

    const [survey_results, setSurvey_results] = useState([]);
    const [survey, setSurvey] = useState({});


    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(null);


    const currentDate = new Date().setHours(0, 0, 0, 0);
    let the_today = new Date();

    let previousDay = new Date(the_today);
    previousDay.setDate(the_today.getDate() - 1);

    let the_year = previousDay.getFullYear();
    let the_month = String(previousDay.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let the_day = String(previousDay.getDate()).padStart(2, '0');

    // Create a formatted string
    let formattedPreviousDay = `${the_year}-${the_month}-${the_day}`;





    const cancelButtonRef = useRef(null);

    const onStopClick = () => {
        setOpen(true);

    };

    const handleStopClick = async (e) => {
        e.preventDefault();
        setStopLoading(true);

        try {
            const updatedSurveyData = {
                id: survey?.id,
                qrcode_id: survey?.qrcode_id,
    
                end_date: formattedPreviousDay,
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

              setStopLoading(false);
              toast.success("Your survey has started");
        }

        catch(error) {
            console.log(error);
            setStopLoading(false);
            toast.error("Error stopping survey");
        }
        
    }



    useEffect(() => {
        // Define the function to fetch data
        const fetchData = async (username) => {
            try {
                // Set loading to true while fetching data
                console.log("tryingggggg");
                setLoading(true);

                // const response = await axios({
                //     method: 'get',
                //     url: 'https://100025.pythonanywhere.com/my-survey/',
                //     data: data,
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                // });
                const formData = { username: username };

                const response = await axios.post(
                    `https://100025.pythonanywhere.com/my-survey/`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = response?.data;
                setSurvey_results(data);
                console.log(response?.data);
                //console.log("successsssss", response);
            } catch (error) {
                // If there's an error, update the error state
                console.log("error is", error);
            } finally {
                // Set loading to false when data fetching is complete, regardless of success or failure
                setLoading(false);
            }
        };

        // Call the fetchData function when the component mounts
        const user_info_session = sessionStorage.getItem("user_info") || "[]";
        console.log(user_info_session);
        const user_info = JSON.parse(user_info_session);
        const userName = user_info?.username;
        fetchData(userName);
    }, []);

    return (
        <Layout>
            <main className="w-full h-full">
                <div className="px-4 md:px-10 md:pl-[310px]">
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
                                                    className="flex items-center justify-between w-full text-white bg-[#EF4444] text-xl">
                                                    <p className="font-bold m-4">STOP SURVEY</p>
                                                    <button
                                                        className="font-serif font-bold text-center m-4"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <XMarkIcon className="h-6 w-6 m-1" />
                                                    </button>
                                                </div>

                                                <div className="flex flex-col space-y-2 my-4 w-full">
                                                    <div className="w-full">
                                                        <p className="text-md font-semibold text-center">
                                                            Are you sure you want to stop this survey?.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center w-full my-4">
                                                    <div className="w-3/12"></div>
                                                    <div className="w-7/12 flex justify-center space-x-2">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-[#EF4444] shadow-sm hover:bg-gray-50 border-2 border-[#EF4444]"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-[#EF4444]"
                                                        onClick={handleStopClick}
                                                        >
                                                           {stopLoading ? "loading" : " Yes, Stop"}
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
                    <div className="relative pb-2">
                        <div className="px-2 items-center flex justify-between bg-[#005734] mb-2">
                            <h1 className=" text-white text-2xl font-semibold pt-1 pb-3 no-underline">
                                Stop Surveys
                            </h1>

                        </div>

                    </div>

                    <div className="flex flex-col min-w-full">
                        <div className="overflow-x-auto min-w-full">
                            <div className="inline-block py-2 min-w-full">
                                <div className="overflow-hidden">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div
                                                className="m-12 inline-block h-16 w-16 animate-spin text-green-800 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                role="status"
                                            >
                                                <span
                                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                    Loading...
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <table className="min-w-full text-center text-sm font-light">
                                            <thead
                                                className="border-b bg-[#005734] font-medium text-white dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="whitespace-nowrap px-6 py-4">
                                                        SURVEY NAME
                                                    </th>
                                                    <th scope="col" className="break-words px-6 py-4">
                                                        SURVEY LINK
                                                    </th>
                                                    <th scope="col" className=" px-6 py-4">
                                                        DURATION
                                                    </th>

                                                    <th scope="col" className=" px-6 py-4">
                                                        PARTICIPANTS
                                                    </th>
                                                    <th scope="col" className=" px-6 py-4">
                                                        STATUS
                                                    </th>
                                                    <th scope="col" className=" px-6 py-4">
                                                        ACTION
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(() => {
                                                    const components = [];
                                                    for (let i = 1; i < survey_results.length; i++) {
                                                        if (new Date(survey_results[i].start_date).setHours(0, 0, 0, 0) <= currentDate & new Date(survey_results[i].end_date).setHours(0, 0, 0, 0) >= currentDate) {
                                                            components.push(
                                                                <tr
                                                                    key={i}
                                                                    className="border-b dark:border-neutral-500"
                                                                >
                                                                    <td className="px-6 py-4 font-medium bg-[#F3F6FF]">
                                                                        {survey_results[i].name}
                                                                    </td>
                                                                    <td className="break-all px-6 py-4">{survey_results[i].url}</td>
                                                                    <td className="px-6 py-4 bg-[#F3F6FF]">{`${survey_results[i].start_date} to ${survey_results[i].end_date}.`}</td>

                                                                    <td className="px-6 py-4">
                                                                        {`Limit ${survey_results[i].participantsLimit} person(s)`}
                                                                    </td>
                                                                    <td className="whitespace-nowrap bg-[#F3F6FF] font-medium">
                                                                        <div className="mx-4 my-2 bg-[#3B82F6] text-white">
                                                                            {" "}
                                                                            ONGOING{" "}
                                                                        </div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        <div className="flex items-center justify-center space-x-0.5">
                                                                            {/* <button
                                                                                className="flex items-center justify-center rounded-lg bg-[#005734]"
                                                                                onClick={() => {
                                                                                    setSurvey(survey_results[i]);
                                                                                    setOpen(true);
                                                                                    setMode("link");
                                                                                }}
                                                                            >
                                                                                <PencilSquareIcon className="h-6 w-6 text-white m-1" />
                                                                            </button> */}

                                                                            <button
                                                                                className="rounded-md mb-2 w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#EF4444]"
                                                                                onClick={() => {
                                                                                    setSurvey(survey_results[i]);
                                                                                    setOpen(true);
                                                                                }}
                                                                            >
                                                                                STOP SURVEY
                                                                            </button>

                                                                        </div>
                                                                    </td>
                                                                </tr>);

                                                        }

                                                    }
                                                    return components;
                                                })()}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}