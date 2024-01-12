import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { TrashIcon, PencilSquareIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
//import { FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";
import "./EditSurveyModal.css";


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

    return (
        <Layout>
            <div className="px-4 md:px-10 mt-[26px] md:pl-80 flex flex-col gap-5">
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
                <div className="relative pb-32 pt-2 ">
                    <div className="mx-4 items-center flex justify-between">
                        <h1 className=" text-[#737373] text-3xl font-bold pt-1 pb-3 no-underline">
                            My Surveys
                        </h1>
                        <h6 className=" text-[#288437] text-sm font-bold pb-0 no-underline">
                            preview, edit and delete surveys
                        </h6>

                    </div>

                    <div className="h-1 bg-[#A6A6A6]"></div>

                    <div
                        className={
                            "relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-white my-4"
                        }
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <section class="bg-white">
                                    <div class="container">
                                        <div class="flex flex-wrap -mx-4">
                                            <div class="w-full">
                                                <div class="max-w-full overflow-x-auto">
                                                    <table class="table-auto w-full ">
                                                        <thead>
                                                            <tr class="bg-[#005734] text-center">
                                                                <th
                                                                    class=" w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent "
                                                                >
                                                                    BRAND NAME
                                                                </th>
                                                                <th
                                                                    class=" w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 "
                                                                >
                                                                    SURVEY LINK
                                                                </th>
                                                                <th
                                                                    class=" w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 "
                                                                >
                                                                    DURATION
                                                                </th>
                                                                <th
                                                                    class=" w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 "
                                                                >
                                                                    REGION
                                                                </th>
                                                                <th
                                                                    class=" w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 "
                                                                >
                                                                    STATUS
                                                                </th>
                                                                <th
                                                                    class=" w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-r border-transparent "
                                                                >
                                                                    ACTIONS
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
                                                                >
                                                                    WORKFLOW AI
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]"
                                                                >
                                                                    https://docs.go....
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    30/05/23-12/12/23(144 days)
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8] "
                                                                >
                                                                    Canada, London
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    <div className="mx-4 my-2 bg-[#22C55E] text-white">
                                                                        ONGOING
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8] mx-auto "
                                                                >
                                                                    <div class="flex items-center justify-center">
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#005734] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onLinkClick}
                                                                        >
                                                                            <PencilSquareIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#EF4444] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onDeleteClick}
                                                                        >
                                                                            <TrashIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-blue-500 p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onPreviewClick}
                                                                        >
                                                                            <QrCodeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
                                                                >
                                                                    SMANANTHA
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]"
                                                                >
                                                                    https://docs.go....
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    22/11/23-12/12/23(32 days)
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8] "
                                                                >
                                                                    Singapore, Nigeria
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    <div className="mx-4 my-2 bg-orange-500 text-white">
                                                                        PENDING
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8] mx-auto "
                                                                >
                                                                    <div class="flex items-center justify-center">
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#005734] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onLinkClick}
                                                                        >
                                                                            <PencilSquareIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#EF4444] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onDeleteClick}
                                                                        >
                                                                            <TrashIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-blue-500 p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onPreviewClick}
                                                                        >
                                                                            <QrCodeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
                                                                >
                                                                    BAKERY AND FOODS
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]"
                                                                >
                                                                    https://docs.go....
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    05/02/22-02/12/23(311 days)
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8] "
                                                                >
                                                                    Pakistan, Sweeden
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    <div className="mx-4 my-2 bg-[#EF4444] text-white">
                                                                        ENDED
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8] mx-auto "
                                                                >
                                                                    <div class="flex items-center justify-center">
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#005734] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onLinkClick}
                                                                        >
                                                                            <PencilSquareIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#EF4444] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onDeleteClick}
                                                                        >
                                                                            <TrashIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-blue-500 p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onPreviewClick}
                                                                        >
                                                                            <QrCodeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
                                                                >
                                                                    WORKFLOW AI
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]"
                                                                >
                                                                    https://docs.go....
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    30/05/23-12/12/23(144 days)
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8] "
                                                                >
                                                                    Canada, London
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    <div className="mx-4 my-2 bg-[#22C55E] text-white">
                                                                        ONGOING
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8] mx-auto "
                                                                >
                                                                    <div class="flex items-center justify-center">
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#005734] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onLinkClick}
                                                                        >
                                                                            <PencilSquareIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#EF4444] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onDeleteClick}
                                                                        >
                                                                            <TrashIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-blue-500 p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onPreviewClick}
                                                                        >
                                                                            <QrCodeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
                                                                >
                                                                    WORKFLOW AI
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]"
                                                                >
                                                                    https://docs.go....
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    30/05/23-12/12/23(144 days)
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8] "
                                                                >
                                                                    Canada, London
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8] "
                                                                >
                                                                    <div className="mx-4 my-2 bg-[#22C55E] text-white">
                                                                        ONGOING
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class=" text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8] mx-auto "
                                                                >
                                                                    <div class="flex items-center justify-center">
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#005734] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onLinkClick}
                                                                        >
                                                                            <PencilSquareIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-[#EF4444] p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onDeleteClick}
                                                                        >
                                                                            <TrashIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                        <button
                                                                            class="mr-2 flex items-center justify-center rounded-lg bg-blue-500 p-3"
                                                                            data-ripple-light="true"
                                                                            onClick={onPreviewClick}
                                                                        >
                                                                            <QrCodeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>




                    </div>

                </div>

            </div>


        </Layout>

    );
}
