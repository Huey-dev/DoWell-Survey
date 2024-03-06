import React, { Fragment, useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import dowelllogo from "../assets/dowell.jpeg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import allow from "../assets/allow.png";

import {
    TrashIcon,
    PencilSquareIcon,
    QrCodeIcon,
    MapPinIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

const SurveyIframeAll = () => {
    //const [location, setLocation] = useState(null);

    const [open, setOpen] = useState(true);

    const headingRef = useRef(null);

    const [status, setStatus] = useState("loading");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [place_region, setPlace_region] = useState(null);

    // Accessing individual query parameters
    const survey_id = queryParams.get("survey_id");
    const [iframe, setIframe] = useState(null);
    const iframe_param = queryParams.get("iframe");

    const [errMsg, setErrMsg] = useState(null);

    const handleDone = async () => {
        try {
            const count_response = await axios.post(
                `https://100025.pythonanywhere.com/survey-count/`,
                {
                    link: window.location.href,
                    region: place_region,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            window.location.href = "https://dowelllabs.github.io/DoWell-Survey/";
        } catch (error) {
            window.location.href = "https://dowelllabs.github.io/DoWell-Survey/";
        }
    };

    useEffect(() => {
        const getCurrentAddress = async () => {
            console.log("starting get current address function");
            // Check if geolocation is supported
            const queryParams = new URLSearchParams(
                window.location.search
            );
            const survey_id = queryParams.get("survey_id");

            try {
                const id_response = await axios.post(
                    `https://100025.pythonanywhere.com/my-survey/?api_key=4f0bd662-8456-4b2e-afa6-293d4135facf`,
                    {
                        survey_id: survey_id,
                    },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setStatus("success");
                console.log(
                    "completed get survey and response is,",
                    id_response?.data[1]
                );

                setIframe(id_response?.data[1].url);

            } catch (error) {
                console.log("error in request to fetch survey form");
                setStatus("error");
                setErrMsg("Error in fetching Survey Form");
            }
        };



        getCurrentAddress();
        // Call the function to get current address
    }, []);

    return (
        <>
            <div className="bg-gradient-to-r from-green-500 to-green-200 min-h-screen">
                <div class="flex items-center justify-center space-x-2 py-4">
                    <img
                        src={dowelllogo}
                        alt=""
                        className="rounded-full w-8 h-8 border-2 border-green-500"
                    />
                    <img
                        src={dowelllogo}
                        alt=""
                        className="rounded-full w-16 h-16 border-2 border-green-500"
                    />
                    <img
                        src={dowelllogo}
                        alt=""
                        className="rounded-full w-24 h-24 border-2 border-green-500"
                    />
                </div>

                {status === "loading" ? (
                    <div className="flex items-center justify-center font-bold text-2xl">
                        Checking for Status
                        <div
                            class="m-12 inline-block h-16 w-16 animate-spin text-green-800 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                        >
                            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                    </div>
                ) : status === "error" ? (
                    <div>
                        <p className="text-center text-5xl my-8 font-bold text-red-500 font-serif">
                            Oops!
                        </p>
                        <p className="text-center font-bold text-2xl my-8">
                            Sorry, {errMsg}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="text-2xl text-center font-bold font-serif">
                            Thanks for taking out time to fill our survey form
                            <div className="flex items-center justify-center p-4">
                                <iframe
                                    className="border-2 border-green-500 h-screen"
                                    src={iframe}
                                    width="640"
                                    frameborder="0"
                                    marginheight="0"
                                    marginwidth="0"
                                >
                                    Loading…
                                </iframe>
                            </div>
                        </div>
                        <div className="flex items-center justify-center pb-4">
                            <div className="bg-[#7ED957] flex items-center justify-center p-4 m-4 border-2 border-black">
                                <div className="p-1 border-2 border-black">
                                    <QRCode
                                        size={40}
                                        bgColor="white"
                                        fgColor="black"
                                        value="https://uxlivinglab.com/"
                                    />
                                </div>

                                <div className="text-center mx-1 font-semibold">
                                    Please Click Here after submitting this form{" "}
                                </div>
                                <button
                                    onClick={handleDone}
                                    className="text-sm p-2 font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SurveyIframeAll;