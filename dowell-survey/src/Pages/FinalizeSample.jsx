import { useState } from "react";
import Layout from "../Layout/Layout";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context/PreviewContext";

const FinalizeSample = () => {
  const [sampleData, setSampleData] = useState([]);

  const { surveys, setSurveys } = useGlobalContext();

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cordinates, setCordinates] = useState("");
  const [location_coord, setLocation_coord] = useState("");


  const [radius, setRadius] = useState("");
  //const [numOfParticipants, setNumOfParticipants] = useState("");
  const [editingNo, setEditingNo] = useState(null);


  const handleSet = () => {
    const updatedData = surveys.map((data) =>
      data.id === editingNo
        ? { id: editingNo, name, address, location_coord, radius }
        : data
    );
    setSurveys(updatedData);
    setEditingNo(null); // Reset editing state

    // Clear the input fields
    setName("");
    setLocation_coord("");
    setAddress("");
    setRadius("");
    console.log("successfully set the survey creation")
    //setNumOfParticipants("");
  };

  const handleDelete = (id) => {
    const updatedData = surveys.filter((data) => data.id !== id);

    setSurveys(updatedData);
  };

  const handleEdit = (data) => {
    // Set the editing state 
    setEditingNo(data.id);
    setName(data.name);
    setAddress(data.address);
    setLocation_coord(data.location_coord);
    setRadius(data.radius || " ")
    //setNumOfParticipants(data.numOfParticipants);
  };

  return (
    <Layout>
      <main className="w-full h-full">
        <div className="px-4 md:px-10 mt-[40px] md:pl-[310px]">
          <div className="w-full">
            <div className="w-full">
              <h1 className="text-[30px] font-semibold">
                Finalize Sample Size
              </h1>
              <p>Set a Radius per location and the total number of persons allowed to fill this survey</p>
            </div>
          </div>
          {surveys.length > 0 && (
            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-center text-sm font-light">
                      <thead
                        class="border-b bg-[#005734] font-medium text-white dark:border-neutral-500">
                        <tr>
                          <th scope="col" class=" px-6 py-4">#</th>
                          <th scope="col" class=" px-6 py-4">Name of Place</th>
                          <th scope="col" class=" px-6 py-4">Address</th>
                          <th scope="col" class=" px-6 py-4">Cordinates</th>
                          <th scope="col" class=" px-6 py-4">Radius(m)</th>
                          <th scope="col" class=" px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>


                        {surveys.map((data, index) => (
                          <tr key={data.index} class="border-b dark:border-neutral-500">
                            <td class="whitespace-nowrap  px-6 py-4 font-medium">{index + 1}</td>
                            <td class="whitespace-nowrap  px-6 py-4">{data.name}</td>
                            <td class="whitespace-nowrap  px-6 py-4">{data.address}</td>
                            <td class="whitespace-nowrap  px-6 py-4">{data.location_coord}</td>

                            <td class="whitespace-nowrap  px-6 py-4">{data.radius}</td>


                            <td class="whitespace-nowrap  px-6 py-4">
                              <button onClick={() => handleEdit(data)}>
                                <AiFillEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(data.id)}
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

          {name && <>
            <div className="flex items-center justify-center text-2xl font-bold">
              Your Selection

            </div>

            <div className="flex items-center justify-center">
              {`${name}, ${address}, ${location_coord}`}

            </div>
            <div className="flex items-center justify-center">
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

          </>}

          <div className="flex items-center justify-center text-2xl font-bold">
            Enter Maximum Number of Persons to fill the Survey

          </div>

          <div className="flex items-center justify-center">
            <input
              type="number"
              name="radius"
              //value={radius}
              //onChange={(e) => setRadius(e.target.value)}
              placeholder="Enter a number to fill the survey form"
              className="w-[100px] h-[40px] border-2 border-[#B3B4BB] rounded-[5px] outline-none md:w-2/12 pl-[20px] mx-2"
            />
            
            <Link to="/link-form">

            
            <button
              //onClick={handleSet}
              className="w-[100px] mx-1 h-[40px] font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md"
            >
              Done
            </button>
            </Link>
            <button
              //onClick={handleSet}
              className="w-[100px] h-[40px] font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md"
            >
              Cancel
            </button>
            

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default FinalizeSample;
