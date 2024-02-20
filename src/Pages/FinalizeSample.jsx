import { useState } from "react";
import Layout from "../Layout/Layout";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const FinalizeSample = () => {
  const [sampleData, setSampleData] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [numOfParticipants, setNumOfParticipants] = useState("");
  const [editingNo, setEditingNo] = useState(null);

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("finalizeSurvey", JSON.stringify(sampleData));
    navigate("/newsurvey");
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
              <p>Input Number of people allowed to fill this survey below</p>
            </div>
            <div className="w-full md:flex md:justify-between mt-[30px]">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full md:w-3/12 h-[50px] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
                style={{ paddingLeft: "1rem" }}
              >
                <option value="">Select country/countries</option>
                <option value="Country 1">Country 1</option>
                <option value="Country 2">Country 2</option>
                <option value="Country 3">Country 3</option>
              </select>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full mt-7 md:mt-0 md:w-3/12 h-[50px] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
                style={{ paddingLeft: "1rem" }}
              >
                <option value="">Select region/regions</option>
                <option value="Region 1">Region 1</option>
                <option value="Region 2">Region 2</option>
                <option value="Region 3">Region 3</option>
              </select>
              <input
                type="number"
                name="number"
                value={numOfParticipants}
                onChange={(e) => setNumOfParticipants(e.target.value)}
                placeholder="Num.of People"
                className="w-full h-[50px] mt-7 md:mt-0 border-2 border-[#B3B4BB] rounded-[5px] outline-none md:w-2/12 pl-[20px]"
              />
              <button
                onClick={handleAdd}
                className="w-full mt-7 md:mt-0 h-[50px] font-serif font-semibold bg-[#005734] opacity-80 hover:opacity-100 text-[white] rounded-md md:w-2/12"
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-full h-full  mt-[70px]  ">
            {sampleData.length > 0 && (
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-[1px] border-gray-950">
                    <th>No</th>
                    <th>Country</th>
                    <th>Region</th>
                    <th>Num</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((data) => (
                    <tr key={data.no} className="w-full">
                      <td className="w-1/12 h-full">{data.no}</td>
                      <td className="w-3/12 h-full">{data.country}</td>
                      <td className="w-3/12 h-full">{data.region}</td>
                      <td className="w-2/12 h-full">
                        {data.numOfParticipants}
                      </td>
                      <td className=" w-3/12 h-full">
                        <button onClick={() => handleEdit(data)}>
                          <AiFillEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(data.no)}
                          className="ml-[20px]"
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

          <div className="w-[250px] mt-[100px]  flex justify-between">
            <button
              // onClick={handleAdd}
              className="w-[100px] h-[50px] font-serif font-bold opacity-80 hover:opacity-100 bg-[#005734] text-[white] rounded-[5px] "
            >
              Cancel
            </button>
            {/* <Link to="/link-form"> */}
            <button
              onClick={handleSubmit}
              className="w-[100px] h-[50px] font-serif font-bold opacity-80 hover:opacity-100 bg-[#005734] text-[white] rounded-[5px] "
            >
              Done
            </button>
            {/* </Link> */}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default FinalizeSample;
