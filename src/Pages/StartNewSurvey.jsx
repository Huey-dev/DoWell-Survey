import { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const StartNewSurvey = () => {
  const [formLink, setFormLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const country = sessionStorage.getItem("country");
  const region = sessionStorage.getItem("region");
  const the_region = region;
  console.log("aaaaaaaaa", the_region);
  let form_link;

  // if (the_region.includes("all")) {
  //   console.log("eeeeeeeeeeeeeeeeeeeeeeee");
  //   form_link = "https://dowelllabs.github.io/DoWell-Survey/survey-iframe-all";
  // } else {
  //   form_link = "https://dowelllabs.github.io/DoWell-Survey/survey-iframe";
  // }
  form_link = "https://dowelllabs.github.io/DoWell-Survey/survey-iframe";

  const numOfParticipants = sessionStorage.getItem("numOfParticipants");
  const coords = sessionStorage.getItem("coords") || "0.00,0.00";
  const user_info_json = sessionStorage.getItem("user_info") || "[]";
  const user_info = JSON.parse(user_info_json);
  let Uname, email;
  if (user_info) {
    // Access the profile_img property from the user_info object
    Uname = user_info.username ? user_info.username : null;
    email = user_info.email ? user_info.email : null;
  }

  // const [startDate, setStartDate] = useState(getCurrentDate());
  // const [endDate, setEndDate] = useState(getCurrentDate());
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const saveToLocalStorage = () => {
    const surveyData = {
      name,
      product,
      description,
      // startDate,
      // endDate,
    };

    sessionStorage.setItem("surveyData", JSON.stringify(surveyData));
  };

  // function getCurrentDate() {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, "0");
  //   const day = String(today.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    // Validate form fields
    if (!name || !product || !description || !formLink || !image) {
      toast.error("Please fill all fields", {
        onClose: () => {},
      });
      return;
    }
    setLoading(true);
    // const [syear, smonth, sday] = startDate.split("-");
    // const [eyear, emonth, eday] = endDate.split("-");
    // const sformattedDate = `${sday}-${smonth}-${syear}`;
    // const eformattedDate = `${eday}-${emonth}-${eyear}`;
    //e.preventDefault();

    const formData = {
      qrcode_type: "Link",
      quantity: "1",
      logo: image,
      link: form_link,
      company_id: Uname,
      created_by: name,
      description: description,
      // start_date: sformattedDate,
      // end_date: eformattedDate,
      brand_name: coords,
      promotional_sentence: description,
      username: Uname,
      name: name,
      email: email,
      service: product,
      country: "nigeria",
      region: "['all']",
      search_result_id: 32,
      participantsLimit: numOfParticipants,
      url: formLink,
      category: "school",
      longitude: 43.44,
      latitude: 43.33,
    };

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
      console.log("success and response data is", response.data);
      sessionStorage.setItem("id", response.data.qrcodes[0].id);
      sessionStorage.setItem("qrcode_id", response.data.qrcodes[0].qrcode_id);
      sessionStorage.setItem(
        "Qrcode",
        response.data.qrcodes[0].qrcode_image_url
      );

      toast.success(response.data.response, {
        onClose: () => {
          navigate("/email-sms");
        },
      });
    } catch (error) {
      setLoading(false);
      console.log("error is this", error);
      toast.error("Qr code Creation Failed", {
        autoClose: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <Layout>
      <div className="h-full w-full md:flex md:justify-end  pt-20  ">
        <div className="w-full flex flex-col  justify-center items-center gap-6 px-4  sm:px-0 md:w-[80%]">
          <h1 className="text-xl font-bold">Link Survey Form</h1>
          {/* <input
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full sm:w-[40%]"
          /> */}
          <input
            type="file"
            name=""
            id="file"
            // value={image}
            onChange={handleImageChange}
          />

          {errorMessage && (
            <small>
              <p style={{ color: "red" }}>{errorMessage}</p>
            </small>
          )}

          <input
            type="text"
            id="formLink"
            placeholder="Add your Form link here"
            className="border-2 w-full sm:w-[40%] p-1 border-[#B3B4BB] rounded-[5px] outline-none"
            value={formLink}
            onChange={(e) => setFormLink(e.target.value)}
          />

          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Survey Name"
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

          {/* <div className="flex justify-center gap-3">
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
          </div> */}

          <p className="">
            <span className="text-red-900">*</span> Please fill all field
          </p>

          {loading ? (
            <button
              className="w-full md:w-[400px] h-[50px] sm:w-[40%] font-serif p-2 font-bold text-center bg-[#005734] opacity-50 text-[16px] md:text-[20px] rounded-md text-white cursor-not-allowed"
              disabled
            >
              Processing...
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full md:w-[400px] h-[50px] sm:w-[40%] font-serif p-2 font-bold text-center bg-[#005734] opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-md text-white cursor-pointer"
            >
              Create Survey
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StartNewSurvey;
