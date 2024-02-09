import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { TrashIcon, PencilSquareIcon, QrCodeIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
//import { FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import "./EditSurveyModal.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import surveys from "../data/surveys";


export default function Edit() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(null);
    const [startDate, setStartDate] = useState(getCurrentDate());

    //sample size parameters and states
    const [sampleData, setSampleData] = useState([]);
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [numOfParticipants, setNumOfParticipants] = useState("");
    const [editingNo, setEditingNo] = useState(null);

    const position = [51.505, -0.09];
    const center = [9.055625, 7.480715];

    //for the maps rendering 
    const [mapBounds, setMapBounds] = useState([[10.74343, 21.4], [36.74343, 52.4]]);
    //setMapBounds([[32.6455, 56.55], [11.23, 53.442]])
    const [locations, setLocations] = useState(surveys[0].places);
    const [locationsSurveyName, setLocationsSurveyName] = useState(surveys[0].brand_name)
    const [map, setMap] = useState(null)

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const handleAdd = () => {
        if (country && region && numOfParticipants) {
            if (editingNo !== null) {
                // If editing, update the existing row
                const updatedData = sampleData.map((data) =>
                    data.no === editingNo
                        ? { no: editingNo, country, region, numOfParticipants }
                        : data
                );
                setSampleData(updatedData);
                setEditingNo(null); // Reset editing state
            } else {
                // If adding, create a new row
                const newData = {
                    no: sampleData.length + 1,
                    country,
                    region,
                    numOfParticipants,
                };
                setSampleData([...sampleData, newData]);
            }

            // Clear the input fields
            setCountry("");
            setRegion("");
            setNumOfParticipants("");
        }
    };

    const handleDelete = (no) => {
        const updatedData = sampleData.filter((data) => data.no !== no);

        // Renumber the remaining rows after deletion
        const renumberedData = updatedData.map((data, index) => ({
            ...data,
            no: index + 1,
        }));

        setSampleData(renumberedData);
    };

    const handleEdit = (data) => {
        // Set the editing state and populate input fields with the data
        setEditingNo(data.no);
        setCountry(data.country);
        setRegion(data.region);
        setNumOfParticipants(data.numOfParticipants);
    };

    const cancelButtonRef = useRef(null)

    const onLinkClick = () => {
        setOpen(true);
        setMode("link");
    }

    const onDeleteClick = () => {
        setOpen(true);
        setMode("delete");
    }

    const onPreviewClick = () => {
        setOpen(true);
        setMode("preview");
    }

    const onLocateClick = (survey) => {
        const { brand_name, places } = survey
        if (places.length > 0) {
            //console.log(places[0].coordinates)
            const bounds = places.reduce(
                (acc, place) => [
                    [Math.min(acc[0][0], place.coordinates[0]), Math.min(acc[0][1], place.coordinates[1])],
                    [Math.max(acc[1][0], place.coordinates[0]), Math.max(acc[1][1], place.coordinates[1])],
                ],
                [places[0].coordinates, places[0].coordinates]
            );
            console.log(bounds)


            setLocationsSurveyName(brand_name);
            setMapBounds(bounds);
            setLocations(places);
            map.fitBounds(bounds);
            //window.scroll(0, 0);


        }

    }

    return (
        <Layout>
            <main className="w-full h-full">
                <div className="px-4 md:px-10 mt-[40px] md:pl-[310px]">
                    <Transition.Root show={open} as={Fragment}>
                        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>

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
                                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-xl">
                                            {mode == "link" ?
                                            <form action="">
                                                                                                <div className="flex flex-col items-center justify-center w-full">
                                                    <div className="flex items-center justify-between w-full text-black text-xl">
                                                    <p className="font-bold m-4">EDIT SURVEY</p>
                                                        <button className="font-serif font-bold text-center m-4" onClick={() => setOpen(false)}><XMarkIcon className="h-6 w-6 m-1" /></button>
                                                        </div>



                                                    <div className="flex flex-col space-y-2 my-8 w-full">
                                                    <div className="flex items-center justify-center w-full">
                                                        <div className="w-3/12">
                                                            <h2 className="font-medium text-left">Logo Image:</h2>
                                                        </div>
                                                        <div className="w-7/12">
                                                            <input
                                                                type="file"
                                                                placeholder="add your form link here"
                                                                className="border w-full p-1 border-[#B3B4BB] outline-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-center w-full">
                                                        <div className="w-3/12">
                                                            <h2 className="font-medium text-left">Brand Name:</h2>
                                                        </div>
                                                        <div className="w-7/12">
                                                            <input
                                                                type="text"
                                                                required 
                                                                placeholder=""
                                                                className="border w-full p-1 border-[#B3B4BB] outline-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-center w-full">
                                                        <div className="w-3/12">
                                                            <h2 className="font-medium text-left">Promotional Message:</h2>
                                                        </div>
                                                        <div className="w-7/12">
                                                            <textarea
                                                                id="description"
                                                                name="promotional sentence"
                                                                placeholder="Enter a promotional sentence to attract participants in (15 words)"
                                                                className="h-24 resize-none border w-full p-1 border-[#B3B4BB] outline-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-center w-full">
                                                        <div className="w-3/12">
                                                            <h2 className="font-medium text-left">Set Duration:</h2>
                                                        </div>
                                                        <div className="w-7/12 flex items-center justify-between">
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
                                                                value={startDate}
                                                                onChange={(e) => setStartDate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>


                                                    </div>
                                                    <div className="flex items-center justify-center w-full my-4">
                                                        <div className="w-3/12">

                                                        </div>
                                                        <div className="w-7/12 flex justify-center space-x-2">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-[#005734] shadow-sm hover:bg-gray-50 border-2 border-[#005734]"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-[#005734] px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-green-500"
                                                            //onClick={() => setOpen(false)}
                                                        >
                                                            Save
                                                        </button>
                                                      

                                                        </div>

                                                    </div>



                                                </div>

                                            </form>


                                                : mode == "delete" ?
                                                    <div>
                                                        <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                                </div>
                                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                        DELETE SURVEY
                                                                    </Dialog.Title>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            Are you sure you delete this survey?
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                Delete
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                onClick={() => setOpen(false)}
                                                                ref={cancelButtonRef}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div> :
                                                    <div>
                                                        <div class="mx-auto my-8">
                                                            <div className="flex justify-center items-center">
                                                                <QRCode
                                                                    size={170}
                                                                    bgColor="white"
                                                                    fgColor="black"
                                                                    value="https://uxlivinglab.com/"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button
                                                                type="button"
                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                onClick={() => setOpen(false)}
                                                                ref={cancelButtonRef}
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>}


                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>
                    <div className="relative pb-2 pt-2 ">
                        <div className="px-2 items-center flex justify-between bg-[#005734] mb-2">
                            <h1 className=" text-white text-2xl font-semibold pt-1 pb-3 no-underline">
                                My Surveys
                            </h1>
                            <h6 className=" text-white text-sm font-bold pb-0 no-underline">
                                Preview Qrcodes, View Survey Locations, edit Surveys
                            </h6>

                        </div>




                        <div className="flex flex-wrap items-center space-x-2">
                            <div className="flex-1 h-96 bg-[#282B32]  p-4 text-white overflow-y-auto">
                                <h6 className="font-bold mb-2">Selection: {locationsSurveyName}</h6>
                                {
                                    locations.map((location, index) => (
                                        <div key={index}>
                                            <h6 className="font-bold text-sm text-[#F0C40D]">{location.name}</h6>
                                            <p className="text-sm">{location.category}</p>
                                            <p className="text-sm">{`[${location.coordinates[0]}, ${location.coordinates[1]}]`}</p>
                                            <p className="text-sm">{`${location.radius}(m) radius`}</p>

                                        </div>
                                    ))
                                }


                            </div>
                            <div className="flex items-center justify-center w-7/12 h-96">
                                <MapContainer ref={setMap} scrollWheelZoom={false} bounds={mapBounds} style={{ height: '100%', width: '100%', zIndex: '1' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {
                                        locations.map((location, index) => (
                                            <>
                                                <CircleMarker key={index} center={location.coordinates} radius={location.radius}>
                                                    <Marker position={location.coordinates}>
                                                        <Popup>
                                                            {location.name}
                                                        </Popup>
                                                    </Marker>

                                                </CircleMarker>

                                            </>


                                        ))
                                    }

                                </MapContainer>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="overflow-x-auto">
                            <div class="inline-block py-2">
                                <div class="overflow-hidden">
                                    <table class="max-w-full text-center text-sm font-light">
                                        <thead
                                            class="border-b bg-[#005734] font-medium text-white dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" class=" px-6 py-4">BRAND NAME</th>
                                                <th scope="col" class=" px-6 py-4">SURVEY LINK</th>
                                                <th scope="col" class=" px-6 py-4">DURATION</th>

                                                <th scope="col" class=" px-6 py-4">REGION</th>
                                                <th scope="col" class=" px-6 py-4">STATUS</th>
                                                <th scope="col" class=" px-6 py-4">ACTIONS</th>




                                            </tr>
                                        </thead>
                                        <tbody>
                                            {surveys.map((survey, index) => (
                                                <tr key={index} class="border-b dark:border-neutral-500">
                                                    <td class="whitespace-nowrap  px-6 py-4 font-medium bg-[#F3F6FF]">{survey.brand_name}</td>
                                                    <td class="whitespace-nowrap  px-6 py-4">{survey.link}</td>
                                                    <td class="px-6 py-4 bg-[#F3F6FF]">{`${survey.start_date} to ${survey.end_date} (1 day duration)`}</td>


                                                    <td class="px-6 py-4">3 places(Click marker to view)</td>
                                                    <td class="whitespace-nowrap bg-[#F3F6FF] font-medium">
                                                        <div className="mx-4 my-2 bg-[#EF4444] text-white">
                                                            ENDED
                                                        </div></td>
                                                    <td class="whitespace-nowrap  px-6 py-4">
                                                        <div class="flex items-center justify-center space-x-0.5">
                                                            <button className="flex items-center justify-center rounded-lg bg-[#005734]"
                                                                onClick={onLinkClick}>
                                                                <PencilSquareIcon className="h-6 w-6 text-white m-1" />
                                                            </button>
                                                            <button className="flex items-center justify-center rounded-lg bg-[#EF4444]"
                                                                onClick={onDeleteClick}>
                                                                <TrashIcon className="h-6 w-6 text-white m-1" />
                                                            </button>
                                                            <button className="flex items-center justify-center rounded-lg bg-blue-500"
                                                                onClick={onPreviewClick}>
                                                                <QrCodeIcon className="h-6 w-6 text-white m-1" />
                                                            </button>
                                                            <button className="flex items-center justify-center rounded-lg bg-orange-500"
                                                                onClick={() => { onLocateClick(survey) }}>
                                                                <MapPinIcon className="h-6 w-6 text-white m-1" />
                                                            </button>
                                                        </div>


                                                    </td>





                                                </tr>

                                            ))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </main>



        </Layout>

    );
}
