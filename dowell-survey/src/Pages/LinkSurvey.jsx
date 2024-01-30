import { useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LinkSurvey = () => {
  const [formLink, setFormLink] = useState(null);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // You can perform additional checks here (e.g., file type, size)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeInBytes) {
      setErrorMessage(
        "File size exceeds the limit (5 MB). Please choose a smaller file."
      );
      // Clear the input field to prevent submission
      event.target.value = null;
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const savedSurveyData = JSON.parse(sessionStorage.getItem("surveyData"));

  // Access individual properties
  const name = savedSurveyData ? savedSurveyData.name : "";
  const product = savedSurveyData ? savedSurveyData.product : "";
  const description = savedSurveyData ? savedSurveyData.description : "";
  const startDate = savedSurveyData ? savedSurveyData.startDate : "";
  const endDate = savedSurveyData ? savedSurveyData.endDate : "";

  // Retrieve the array from sessionStorage
  const savedSurveyArray = JSON.parse(sessionStorage.getItem("finalizeSurvey"));

  // Retrieve properties of the first object
  const firstObject =
    savedSurveyArray && savedSurveyArray.length > 0
      ? savedSurveyArray[0]
      : null;

  // Access individual properties
  const country = firstObject ? firstObject.country : "";
  const region = firstObject ? firstObject.region : "";
  const numOfParticipants = firstObject ? firstObject.numOfParticipants : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // sessionStorage.setItem("formLink", formLink);
    // const response = await axios.post(
    //   `https://100025.pythonanywhere.com/create-surveyv2?api_key=dd7010c6-17b7-4cd4-ac70-f20492efa73e`,
    //   {
    //     qrcode_type: ["Link"],
    //     quantity: ["1"],
    //     logo: [image],
    //     link: [formLink],
    //     company_id: ["samuel"],
    //     created_by: [name],
    //     description: [description],
    //     start_date: ["01-11-2023"],
    //     end_date: ["01-11-2024"],
    //     brand_name: [name],
    //     promotional_sentence: [description],
    //     username: [name],
    //     name: [name],
    //     email: ["samuelmakinde@gmail.com"],
    //     service: [name],
    //     country: [country],
    //     region: [region],
    //     participantsLimit: [numOfParticipants],
    //     url: ["https://easereads.com/"],
    //   }
    // );
    // console.log(response);
    navigate("/email-sms");
  };

  return (
    <Layout>
      <main className="w-full h-full">
        <div className="px-4 md:px-10 mt-[40px] md:pl-[310px]">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div>
              <h1>
                Input your form link and promotional image so as to create your
                survey survey created
              </h1>
            </div>
            <div className=" flex flex-col mt-[50px]">
              <h1>Add Survey promotional image</h1>
              <input
                type="file"
                name=""
                id="file"
                onChange={handleImageChange}
              />
              <small>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </small>
              <h2 className="mt-6">Form Link</h2>
              <input
                type="text"
                id="formLink"
                placeholder="add your form link here"
                className="w-full md:w-[400px] mt-[10px] h-[50px] border-2 border-[#B3B4BB] rounded-[5px] outline-none pl-[20px]"
                value={formLink}
                onChange={(e) => setFormLink(e.target.value)}
              />
              {formLink ? (
                <button
                  type="submit"
                  className="w-full md:w-[400px] font-bold font-serif mt-[30px] h-[50px] bg-[#005734] text-[20px] text-white hover:opacity-100 opacity-80 rounded-[5px]"
                  onClick={handleSubmit}
                >
                  Create Survey
                </button>
              ) : (
                <button
                  className="w-full md:w-[400px] font-bold font-serif mt-[30px] h-[50px] bg-[#005734] text-[20px] text-white opacity-50 rounded-[5px]"
                  disabled
                >
                  Create Survey
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LinkSurvey;
