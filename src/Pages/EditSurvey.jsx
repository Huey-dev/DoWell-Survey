import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { TrashIcon, PencilSquareIcon, QrCodeIcon, MapPinIcon } from '@heroicons/react/24/outline';
//import { FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
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
    const [mapBounds, setMapBounds] = useState([[-90, -180], [90, 180]]);
    //setMapBounds([[32.6455, 56.55], [11.23, 53.442]])
    const [locations, setLocations] = useState(surveys[0].places)
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

    const onLocateClick = (places) => {
        if (places.length > 0) {
            //console.log(places[0].coordinates)
            const bounds = places.reduce(
                (acc, place) => [
                    [Math.min(acc[0][0], place.coordinates[0]), Math.min(acc[0][1], place.coordinates[1])],
                    [Math.max(acc[1][0], place.coordinates[0]), Math.max(acc[1][1], place.coordinates[1])],
                ],
                [places[0].coordinates, places[0].coordinates]
            );


            
            setMapBounds(bounds);
            setLocations(places)
            map.fitBounds(bounds)
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
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-xl">
                                            {mode == "link" ?

                                                <div className="flex flex-col items-center justify-center w-full">
                                                    <div className="grid justify-items-end w-full px-8 mt-8"><button className="text-3xl" onClick={() => setOpen(false)}>x</button></div>

                                                    <h2 className="font-serif p-2 font-bold">Edit Survey</h2>

                                                    <div className="flex flex-col">
                                                        <h2 className="font-medium">Logo Image</h2>
                                                        <input
                                                            type="file"
                                                            placeholder="add your form link here"
                                                            className="border-2 w-[350px] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h2 className="font-medium">Promotion Message</h2>
                                                        <textarea
                                                            id="description"
                                                            name="promotional sentence"
                                                            placeholder="Enter a promotional sentence to attract participants in (15 words)"
                                                            className="h-24 resize-none border-2 w-[350px] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h2 className="font-medium">Products/Services</h2>
                                                        <select className="border-2 w-[350px] p-1 border-[#B3B4BB] rounded-[5px] outline-none">
                                                            <option value="">Select products/services</option>
                                                            <option value="option1">Product 1</option>
                                                            <option value="option2">Product 2</option>
                                                            <option value="option3">Product 3</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h2 className="font-medium">Form Link</h2>
                                                        <input
                                                            type="text"
                                                            placeholder="add your form link here"
                                                            className="border-2 w-[350px] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
                                                        />
                                                    </div>

                                                    <div className="flex justify-between w-[350px]">
                                                        <div className="flex flex-col">
                                                            <h2 className="font-medium">Start Date</h2>
                                                            <input
                                                                type="date"
                                                                className="border-2 w-[150px] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
                                                                value={startDate}
                                                                onChange={(e) => setStartDate(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <h2 className="font-medium">End Date</h2>
                                                            <input
                                                                type="date"
                                                                className="border-2 w-[150px] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <h2 className="font-medium">Set Country and Region</h2>
                                                        <div className="w-[350px] flex justify-between">
                                                            <select
                                                                value={country}
                                                                onChange={(e) => setCountry(e.target.value)}
                                                                className="w-full md:w-4/12 border-2  border-[#B3B4BB] rounded-[5px] outline-none"
                                                            >
                                                                <option value="">Country</option>
                                                                <option value="Azerbijan">Azerbijan</option>
                                                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                                <option value="Nigeria">Nigeria</option>
                                                            </select>
                                                            <select
                                                                value={region}
                                                                onChange={(e) => setRegion(e.target.value)}
                                                                className="w-full md:w-4/12 border-2  border-[#B3B4BB] rounded-[5px] outline-none"

                                                            >
                                                                <option value="">Region</option>
                                                                <option value="Lagos">Lagos</option>
                                                                <option value="Philadelphia">Philadelphia</option>
                                                                <option value="New Delhi">New Delhi</option>
                                                            </select>
                                                            <input
                                                                type="number"
                                                                name="number"
                                                                value={numOfParticipants}
                                                                onChange={(e) => setNumOfParticipants(e.target.value)}
                                                                placeholder="No."
                                                                className="w-[100px] border-2 border-[#B3B4BB] rounded-[5px] outline-none md:w-2/12 pl-[20px]"
                                                            />
                                                            <button
                                                                onClick={handleAdd}
                                                                className="w-[100px] font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md md:w-2/12"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>

                                                    </div>



                                                    <div className="flex justify-center w-full mt-[20px]">
                                                        {sampleData.length > 0 && (
                                                            <table className="text-center">
                                                                <thead>
                                                                    <tr className="border-b-[1px] border-gray-950">
                                                                        <th className="text-left px-3">No</th>
                                                                        <th className="text-left px-3">Country</th>
                                                                        <th className="text-left px-3">Region</th>
                                                                        <th className="text-left px-3">No.  </th>
                                                                        <th className="text-left px-3">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {sampleData.map((data) => (
                                                                        <tr key={data.no}>
                                                                            <td className="text-left px-3">{data.no}</td>
                                                                            <td className="text-left px-3">{data.country}</td>
                                                                            <td className="text-left px-3">{data.region}</td>
                                                                            <td className="text-left px-3">{data.numOfParticipants}</td>
                                                                            <td className="text-left px-3">
                                                                                <button onClick={() => handleEdit(data)}>
                                                                                    <AiFillEdit />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDelete(data.no)}

                                                                                >
                                                                                    <MdDelete />{" "}
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        )}
                                                    </div>

                                                    <Link to="/finalize-Sample">
                                                        <button
                                                            type="button"
                                                            className="mb-8 w-[300px] h-[46px] font-serif p-2 font-bold text-center bg-[#005734] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-md text-white cursor-pointer"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </Link>
                                                </div>
                                                : mode == "delete" ?
                                                    <div>
                                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
                            <div className="flex-1 h-96 bg-[#F3F6FF] border-black border">

                            </div>
                            <div className="flex items-center justify-center w-7/12 h-96">
                                <MapContainer ref={setMap} bounds={mapBounds} style={{ height: '100%', width: '100%', zIndex: '1' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {
                                        locations.map((location, index) => (
                                            <Marker key={index} position={location.coordinates}>
                                                <Popup>
                                                    {location.name}
                                                </Popup>
                                            </Marker>

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
                                    <table class="min-w-full text-center text-sm font-light">
                                        <thead
                                            class="border-b bg-[#005734] font-medium text-white dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" class=" px-6 py-4">BRAND NAME</th>
                                                <th scope="col" class=" px-6 py-4">SURVEY LINK</th>
                                                <th scope="col" class=" px-6 py-4">DURATION</th>
                                                <th scope="col" class=" px-6 py-4">ACTIONS</th>
                                                <th scope="col" class=" px-6 py-4">STATUS</th>
                                                <th scope="col" class=" px-6 py-4">REGION</th>
                                                
                                                
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {surveys.map((survey, index) => (
                                                <tr key={index} class="border-b dark:border-neutral-500">
                                                    <td class="whitespace-nowrap  px-6 py-4 font-medium bg-[#F3F6FF]">{survey.brand_name}</td>
                                                    <td class="whitespace-nowrap  px-6 py-4">{survey.link}</td>
                                                    <td class="whitespace-nowrap  px-6 py-4 bg-[#F3F6FF]">{`${survey.start_date} to ${survey.end_date} (1 day duration)`}</td>
                                                    
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
                                                                onClick={() => { onLocateClick(survey.places) }}>
                                                                <MapPinIcon className="h-6 w-6 text-white m-1" />
                                                            </button>
                                                        </div>


                                                    </td>
                                                    <td class="whitespace-nowrap bg-[#F3F6FF] font-medium">
                                                        <div className="mx-4 my-2 bg-[#EF4444] text-white">
                                                            ENDED
                                                        </div></td>
                                                    <td class="whitespace-nowrap  px-6 py-4">3 places(Click marker to view)</td>

                                                    


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
