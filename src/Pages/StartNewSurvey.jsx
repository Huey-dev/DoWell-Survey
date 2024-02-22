import { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";

const StartNewSurvey = () => {
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());

  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const saveToLocalStorage = () => {
    const surveyData = {
      name,
      product,
      description,
      startDate,
      endDate,
    };

    sessionStorage.setItem("surveyData", JSON.stringify(surveyData));
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Validate form fields
    if (!name || !product || !description || !endDate || !startDate) {
      alert("Please fill in all fields");
      return;
    }
    saveToLocalStorage();
    navigate("/link-form");
  };

  return (
    <Layout>
      <div className="h-full w-full md:flex md:justify-end  pt-20  ">
        <div className="w-full flex flex-col  justify-center items-center gap-6 px-4  sm:px-0 md:w-[80%]">
          <h1 className="text-xl font-bold">Create New Survey</h1>
          {/* <input
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full sm:w-[40%]"
          /> */}

          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border-2 w-full sm:w-[40%] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
          />

          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border-2 w-full sm:w-[40%] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
          >
            <option value="">Select products/services</option>
            <option value="Product 1">Workflow Ai</option>
            <option value="Product 2">LegalZard</option>
            <option value="Product 3">Team Management</option>
            <option value="Product 3">Search in Living Labs</option>
            <option value="Product 3">UX Live Stream</option>
            <option value="Product 3">Dowell Surveys</option>
            <option value="Product 3">Dowell Maps</option>
          </select>

          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a promotional sentence to attract participants in (15 words)"
            className="h-24 resize-none border-2 w-full sm:w-[40%] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
          />

          <div className="flex justify-center gap-3">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#005734] text-center font-serif text-sm font-bold">
                Start Date
              </p>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="bg-[#C4C4C4] rounded-md py-2 px-2 text-center text-xs font-medium"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[#005734] text-center font-serif text-sm font-bold">
                End Date
              </p>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="bg-[#C4C4C4] rounded-md  py-2 px-2 text-center text-xs font-medium"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <p className="">
            <span className="text-red-900">*</span> Please fill all field
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full md:w-[400px] h-[50px] sm:w-[40%] font-serif p-2 font-bold text-center bg-[#005734] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-md text-white cursor-pointer"
          >
            Next Step
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StartNewSurvey;
