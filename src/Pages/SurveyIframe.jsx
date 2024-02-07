import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import dowelllogo from "../assets/dowell.jpeg";
import { useLocation } from 'react-router-dom';

const SurveyIframe = () => {
    //const [location, setLocation] = useState(null);
    const [status, setStatus] = useState('loading');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Accessing individual query parameters
    const survey_id = queryParams.get('survey_id');



    useEffect(() => {
        setTimeout(() => {
            if (survey_id === '1') {
                setStatus('errorRegion');
              } else if (survey_id === '2') {
                setStatus('errorEnded');
              } else {
                setStatus('success');
              }        
        }, 1000);

    }, []);



    return (
        <>
            <div className='bg-gradient-to-r from-green-500 to-green-200 min-h-screen'>

                <div class="flex items-center justify-center space-x-2 py-4">
                    <img src={dowelllogo} alt="" className='rounded-full w-8 h-8 border-2 border-green-500' />
                    <img src={dowelllogo} alt="" className='rounded-full w-16 h-16 border-2 border-green-500' />
                    <img src={dowelllogo} alt="" className='rounded-full w-24 h-24 border-2 border-green-500' />
                </div>




                {
                    status === 'loading' ?
                        <div className='flex items-center justify-center font-bold text-2xl'>
                            Checking for Status
                            <div
                                class="m-12 inline-block h-16 w-16 animate-spin text-green-800 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>

                            </div>
                        </div> : status === 'errorRegion' ?
                            <div>
                                <p className='text-center text-5xl my-8 font-bold text-red-500 font-serif'>
                                    Oops!
                                </p>
                                <p className='text-center font-bold text-2xl my-8'>
                                    Sorry, this survey isn't available in your region
                                </p>


                            </div> : status === 'errorEnded' ?
                                <div>
                                    <p className='text-center text-5xl my-8 font-bold text-red-500 font-serif'>
                                        Oops!
                                    </p>
                                    <p className='text-center font-bold text-2xl my-8'>
                                        Sorry, this survey has ended
                                    </p>


                                </div> :
                                <div className='text-2xl text-center font-bold font-serif'>
                                    Thanks for taking out time to fill our survey form
                                    <div className="flex items-center justify-center p-4">
                                        <iframe className='border-2 border-green-500' src="https://docs.google.com/forms/d/e/1FAIpQLSdKc6oak3I4-NXknjtCw1tjHIn9NGZD3w3k9wgLVlAvv-vdDg/viewform" width="640" height="3576" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                                    </div>

                                </div>

                }


                <div className='flex items-center justify-center pb-4'>
                    <div className='bg-[#7ED957] flex items-center justify-center p-4 m-4 border-2 border-black'>
                        <div className='p-1 border-2 border-black'>
                            <QRCode
                                size={40}
                                bgColor="white"
                                fgColor="black"
                                value="https://uxlivinglab.com/"
                            />

                        </div>

                        <div className='text-center mx-1 font-semibold'>You can create your surveys too for any location </div>
                        <button

                            className="text-sm p-2 font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md"
                        >
                            Explore
                        </button>

                    </div>

                </div>





            </div>

        </>

    );
};

export default SurveyIframe;
