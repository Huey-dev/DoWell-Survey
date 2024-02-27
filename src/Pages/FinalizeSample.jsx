import { useState } from "react";
import Layout from "../Layout/Layout";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const FinalizeSample = () => {
  const navigate = useNavigate();

  const [sampleData, setSampleData] = useState([]);

  const stored_locations = sessionStorage.getItem("newSurvey") || "[]";
  const [surveys, setSurveys] = useState(JSON.parse(stored_locations));

  // const participants_no = sessionStorage.getItem("numOfParticipants") || 0;
  const [numOfParticipants, setNumOfParticipants] = useState("");

  //const { surveys, setSurveys, surveyParams, setSurveyParams } = useGlobalContext();

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState(null);

  const [place_name, setPlace_name] = useState("");
  const [address, setAddress] = useState("");
  const [cordinates, setCordinates] = useState("");
  const [location_coord, setLocation_coord] = useState("");

  const [radius, setRadius] = useState("");

  const [editingNo, setEditingNo] = useState(null);

  const handleSet = () => {
    const updatedData = surveys.map((data) =>
      data.placeId === editingNo
        ? { id: editingNo, place_name, address, location_coord, radius }
        : data
    );
    setSurveys(updatedData);
    setEditingNo(null); // Reset editing state

    // Clear the input fields
    setPlace_name("");
    setLocation_coord("");
    setAddress("");
    setRadius("");
    console.log("successfully set the survey creation");
    //setNumOfParticipants("");
  };

  const handleDelete = (placeId) => {
    const updatedData = surveys.filter((data) => data.placeId !== placeId);

    setSurveys(updatedData);
  };

  const handleEdit = (data) => {
    // Set the editing state
    setEditingNo(data.placeId);
    setPlace_name(data.place_name);
    setAddress(data.address);
    setLocation_coord(data.location_coord);
    setRadius(data.radius || " ");
    //setNumOfParticipants(data.numOfParticipants);
  };

  const handleDone = () => {
    sessionStorage.setItem("newSurvey", JSON.stringify(surveys));
    sessionStorage.setItem("numOfParticipants", numOfParticipants);
    // sessionStorage.setItem("userRegion", region);

    navigate("/newsurvey");
  };

  return (
    <Layout>
      <main className="w-full h-full mb-10">
        <div className="px-4 md:px-10 mt-[40px] md:pl-[310px] md:mt-0">
          <div className="px-2 items-center flex justify-between bg-[#005734]">
            <h1 className=" text-white text-2xl font-semibold pt-1 pb-3 no-underline">
              Finalize Sample Size
            </h1>
            <h6 className=" text-white text-sm font-bold pb-0 no-underline">
              Set a Radius per location and the total number of persons allowed
              to fill this survey
            </h6>
          </div>
          <div className="w-full">
            <div className="text-lg md:text-xl font-bold mt-10">
              Your Current Selection
            </div>

            <div className="flex mb-10 mt-4">
              <div className="bg-green-200 px-4 flex items-center">
                {`${place_name}, ${address}, ${location_coord}`}
              </div>

              <input
                type="number"
                name="radius"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Enter a Radius(m)"
                className="w-[100px] h-[40px] border-2 border-[#B3B4BB] rounded-[5px] outline-none md:w-2/12 pl-[20px] mx-2"
              />
              <button
                onClick={handleSet}
                className="w-[100px] h-[40px] font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md"
              >
                Set
              </button>
            </div>
          </div>
          {surveys.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="overflow-x-auto w-full">
                <div className="inline-block py-2 w-full">
                  <div className="overflow-hidden w-full">
                    <table className="max-w-full text-center text-sm font-light w-full border border-black">
                      <thead className="border-b bg-[#BBF7D0] font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className=" px-6 py-4">
                            #
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Place Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Address
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Cordinates
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Radius(m)
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {surveys.map((data, index) => (
                          <tr key={data.index} className="border-black border">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {data.place_name}
                            </td>
                            <td className="px-6 py-4">{data.address}</td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              23.4343, 32.223
                            </td>

                            <td className="whitespace-nowrap  px-6 py-4">
                              {data.radius}
                            </td>

                            <td className="whitespace-nowrap  px-6 py-4">
                              <button onClick={() => handleEdit(data)}>
                                <AiFillEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(data.placeId)}
                                className="ml-[20px]"
                              >
                                <MdDelete />{" "}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center text-base mt-10 md:text-2xl font-bold">
            Enter Maximum Number of Persons to fill the Survey
          </div>

          <div className="flex items-center justify-center">
            <input
              type="number"
              name="numofParticipants"
              value={numOfParticipants}
              onChange={(e) => setNumOfParticipants(e.target.value)}
              placeholder="Enter a number to fill the survey form"
              className="w-[100px] h-[40px] border-2 border-[#B3B4BB] rounded-[5px] outline-none md:w-2/12 pl-[20px] mx-2"
            />
            {/* <input
              type="text"
              name="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Enter your region here"
              className="w-[100px] h-[40px] border-2 border-[#B3B4BB] rounded-[5px] outline-none md:w-2/12 pl-[20px] mx-2"
            /> */}

            <button
              onClick={handleDone}
              className="w-[100px] mx-1 h-[40px] font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md"
              disabled={!numOfParticipants.trim()}
            >
              Done
            </button>

            <button className="w-[100px] h-[40px] font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default FinalizeSample;
