// import React from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";

// Components
export default function Settings() {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [postal, setPostal] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [totalSurvey, setTotalSurvey] = useState(null);
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [closedSurvey, setClosedSurvey] = useState(null);

  // Retrieve user_info object from sessionStorage
  useEffect(() => {
    const user_info_json = sessionStorage.getItem("user_info") || "[]";
    const user_info = JSON.parse(user_info_json);

    const surveyData = async (username) => {
      try {
        const formData = { username: username };

        const response = await axios.post(
          `https://100025.pythonanywhere.com/my-survey/`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response?.data[0];
        console.log(data);
      } catch (error) {
        console.log("Hi there");
        console.log(error);
      }
    };

    //const user_info = JSON.parse(sessionStorage.getItem("user_info"));
    if (user_info) {
      // Access the profile_img property from the user_info object
      const imageUrl = user_info.profile_img ? user_info.profile_img : null;
      const fname = user_info.first_name ? user_info.first_name : null;
      const Lname = user_info.last_name ? user_info.last_name : null;
      const Uname = user_info.username ? user_info.username : null;
      const phone = user_info.phone ? user_info.phone : null;
      const country = user_info.user_country ? user_info.user_country : null;
      const timezone = user_info.timezone ? user_info.timezone : null;
      const city = timezone.split("/")[1];
      const postal = user_info.postal ? user_info.postal : null;
      const address = user_info.address ? user_info.address : null;
      const description = user_info.description ? user_info.description : null;

      setDescription(description);
      setAddress(address);
      setPostal(postal);
      setCity(city);
      setCountry(country);
      setFirstName(fname);
      setLastName(Lname);
      setUserName(Uname);
      setPhone(phone);
      setProfileImageUrl(imageUrl);
      surveyData(Uname);
    }
  }, []);

  useEffect(() => {});

  return (
    <Layout>
      <div className="px-4 md:px-10 mt-[26px] md:pl-80 flex flex-col gap-5">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                My account
              </h6>
              <a
                href="https://100093.pythonanywhere.com/ "
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lightBlue-500  active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Edit Profile
              </a>
              {/* <button
                className="bg-lightBlue-500  active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Edit Profile
              </button> */}
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full md:flex md:items-center h-40 mb-3">
                    <label
                      htmlFor="profile"
                      className="w-40 h-40 bg-gray-200 rounded-full flex justify-center items-center relative cursor-pointer"
                    >
                      <img
                        src={profileImageUrl || null}
                        alt="user image"
                        className="w-full h-full absolute top-0 left-0"
                      />
                      {/* <input
                        type="file"
                        name="profile"
                        id="profile"
                        className="opacity-0 w-full h-full absolute top-0 left-0"
                      /> */}
                      {/* Add your preview image here if needed */}
                      {/* <span className="absolute inset-0 flex justify-center items-center">
                        Profile Picture
                      </span> */}
                    </label>
                    {/* Additional content if needed */}
                  </div>
                  {/* <div className="relative w-full md:flex md:items-center h-40 mb-3"> */}
                  {/* <input type="image" src="" alt="profile picture" /> */}
                  {/* <input
                      type="file"
                      name="profile"
                      id="profile"
                      className="w-40 h-40 bg-gray-200 rounded-full flex justify-center items-center"
                    />
                    <span className="mt-10 md:mt-0 md:ml-6">
                      Profile Picture
                    </span> */}
                  {/* <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="lucky.jesse"
                    /> */}
                  {/* </div> */}
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={userName}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={firstName}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Default Phone Number
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={phone}
                    />
                  </div>
                </div>
              </div>

              {/* Survey created section */}
              <div className="w-full h-full mt-10">
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h1 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Surveys Details
                </h1>

                <div className="w-full h-full md:flex  ">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Total Survey created
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        40
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Active Survey
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        20
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Closed survey
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        30
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={address}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      City
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={city}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={country}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={postal}
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Default Promotional Message
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={description}
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
