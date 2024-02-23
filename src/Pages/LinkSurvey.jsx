import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LinkSurvey = () => {
  const [formLink, setFormLink] = useState(null);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // const reader = new FileReader();

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeInBytes) {
      setErrorMessage(
        "File size exceeds the limit (5 MB). Please choose a smaller file."
      );
      // Clear the input field to prevent submission
      event.target.value = null;
    }
    console.log("File type:", file.type);
    setImage(file);
  };

  const savedSurv = sessionStorage.getItem("surveyData") || "[]";
  const savedSurveyData = JSON.parse(savedSurv);

  // Access individual properties
  const name = savedSurveyData ? savedSurveyData.name : "";
  const product = savedSurveyData ? savedSurveyData.product : "";
  const description = savedSurveyData ? savedSurveyData.description : "";
  const startDate = savedSurveyData ? savedSurveyData.startDate : "";
  const endDate = savedSurveyData ? savedSurveyData.endDate : "";
  const [syear, smonth, sday] = startDate.split("-");
  const [eyear, emonth, eday] = endDate.split("-");

  // Create a new Date object using the extracted year, month, and day
  const dateObject = new Date(syear, smonth - 1, sday); // Note: Month in JavaScript Date object is 0-indexed (0 for January, 1 for February, etc.), so we subtract 1 from the month
  const edateObject = new Date(eyear, emonth - 1, eday);

  // Format the date as DD-MM-YYYY
  const sformattedDate = `${sday}-${smonth}-${syear}`;
  const eformattedDate = `${eday}-${emonth}-${eyear}`;
  console.log("start", sformattedDate);
  console.log("end", eformattedDate);

  // // Retrieve the array from sessionStorage
  // const savedSurveyArray = JSON.parse(sessionStorage.getItem("finalizeSurvey"));

  // // Retrieve properties of the first object
  // const firstObject =
  //   savedSurveyArray && savedSurveyArray.length > 0
  //     ? savedSurveyArray[0]
  //     : null;

  // Access individual properties
  const country = sessionStorage.getItem("country");
  const region = sessionStorage.getItem("region");
  const numOfParticipants = sessionStorage.getItem("numOfParticipants");

  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);

  // const [country, setCountry] = useState(null);
  // const [description, setDescription] = useState(null);

  // Retrieve user_info object from sessionStorage
  useEffect(() => {
    console.log("before");

    const user_info_json = sessionStorage.getItem("user_info") || "[]";
    console.log("dddddddddd", user_info_json);
    const user_info = JSON.parse(user_info_json);

    //const user_info = JSON.parse(sessionStorage.getItem("user_info"));
    console.log("after");
    if (user_info) {
      // Access the profile_img property from the user_info object
      const Uname = user_info.username ? user_info.username : null;
      const email = user_info.email ? user_info.email : null;

      setEmail(email);
      setUserName(Uname);
    }
  }, []);

  sessionStorage.setItem("formLink", formLink);
  const formData = {
    qrcode_type: "Link",
    quantity: "1",
    logo: image,
    link: "https://dowelllabs.github.io/DoWell-Survey/survey-iframe",
    company_id: userName,
    created_by: name,
    description: description,
    start_date: sformattedDate,
    end_date: eformattedDate,
    brand_name: userName,
    promotional_sentence: description,
    username: userName,
    name: name,
    email: email,
    service: product,
    country: country,
    region: region,
    participantsLimit: numOfParticipants,
    url: formLink,
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://100025.pythonanywhere.com/create-surveyv2?api_key=a0955eef-146b-4efd-a14a-85727d5b6014`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setLoading(false);
      console.log(
        "this is response",
        response.data.qrcodes[0].qrcode_image_url
      );
      sessionStorage.setItem(
        "Qrcode",
        response.data.qrcodes[0].qrcode_image_url
      );

      toast.success(response.data.response, {
        onClose: () => {
          console.log("Toast closed, navigating...");
          navigate("/email-sms");
        },
      });
    } catch (error) {
      setLoading(false);
      toast.success("Qr code Creation Failed", {
        autoClose: false,
        closeOnClick: true,
      });
    }
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

              <form
                action=""
                encType="multipart/form-data"
                className=" flex flex-col"
              >
                <input
                  type="file"
                  name=""
                  id="file"
                  // value={image}
                  onChange={handleImageChange}
                />
                <small>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
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
                {/* {formLink ? (
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
                )} */}

                {loading ? (
                  <button
                    className="w-full md:w-[400px] font-bold font-serif mt-[30px] h-[50px] bg-[#005734] text-[20px] text-white rounded-[5px] opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Processing...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full md:w-[400px] font-bold font-serif mt-[30px] h-[50px] bg-[#005734] text-[20px] text-white hover:opacity-100 opacity-80 rounded-[5px]"
                    onClick={handleSubmit}
                    disabled={!formLink || !image}
                  >
                    Create Survey
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LinkSurvey;
