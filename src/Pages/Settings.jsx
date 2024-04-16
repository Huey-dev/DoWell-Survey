// import React from "react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, } from "react-leaflet";
import { MapPinIcon, PencilSquareIcon, QrCodeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

import Layout from "../Layout/Layout";


// Components

const CheckRegionModal = ({ open, setOpen, regionLoading, addr }) => {
  const [map, setMap] = useState(null);

  const cancelButtonRef = useRef(null);






  return (
      <Transition.Root show={open} as={Fragment}>
          <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={() => setOpen(false)}
          >
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
                  <div
                      className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                          <Dialog.Panel
                              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-xl">
                              <div className="flex flex-col items-center justify-center w-full">
                                  <div
                                      className="flex items-center justify-between w-full text-white bg-[#005734] text-lg">
                                      <p className="font-bold mx-4 my-2 ">Please click "Allow" to grant location access</p>
                                      <button
                                          className="font-serif font-bold text-center m-4"
                                          onClick={() => setOpen(false)}
                                      >
                                          <XMarkIcon className="h-4 w-4 m-1" />
                                      </button>
                                  </div>

                                  <div className="flex flex-col space-y-2 mt-4 my-8 w-full">
                                      <div className="flex items-center justify-center w-full space-x-2">
                                          <div className="w-6/12 h-64" id="qr-code">


                                              {
                                                  regionLoading ? (
                                                      <div className="flex items-center justify-center">
                                                          <div
                                                              class="m-12 inline-block h-16 w-16 animate-spin text-green-800 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                              role="status"
                                                          >
                                                              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                                  Loading...
                                                              </span>
                                                          </div>
                                                      </div>) :
                                                      (<MapContainer
                                                          ref={setMap}
                                                          scrollWheelZoom={false}
                                                          zoomControl={false}
                                                          center={addr?.latlng} zoom={13}
                                                          style={{ height: "100%", width: "100%", zIndex: "1" }}
                                                      >
                                                          <TileLayer
                                                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                          />
                                                          <>
                                                              <CircleMarker
                                                                  //key={index}
                                                                  center={addr?.latlng}
                                                                  radius={30}
                                                              >
                                                                  <Marker position={addr?.latlng}>
                                                                      <Popup>{"You are Here!"}</Popup>
                                                                  </Marker>
                                                              </CircleMarker>
                                                          </>
                                                      </MapContainer>)


                                              }

                                          </div>
                                          <div className="w-5/12">
                                              {
                                                  regionLoading ? (
                                                      <div className="flex items-center justify-center">
                                                          <div
                                                              class="m-12 inline-block h-16 w-16 animate-spin text-green-800 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                              role="status"
                                                          >
                                                              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                                  Loading...
                                                              </span>
                                                          </div>
                                                      </div>) :
                                                      (
                                                      <>
                                                       <h1 className="text-md font-bold">
                                                           Your Location Information
                                                      </h1>
                                                      <h1 className="text-md font-semibold">
                                                           Country: <span className="text-[#7F7F7F]"> {addr?.country}</span>
                                                      </h1>
                                                      <h1 className="text-md font-semibold">
                                                           Region: <span className="text-[#7F7F7F]"> {addr?.region}</span>
                                                      </h1>
                                                      <h1 className="text-md font-semibold">
                                                           Latitude: <span className="text-[#7F7F7F]"> {addr?.latlng[0]}</span>
                                                      </h1>
                                                      <h1 className="text-md font-semibold">
                                                           Longitude: <span className="text-[#7F7F7F]"> {addr?.latlng[1]}</span>
                                                      </h1>
                                                      </>)


                                              }
                                          </div>
                                      </div>
                                  </div>

                                  <div
                                      className="flex items-center justify-between w-full bg-[#005734] text-[#005734]">
                                      d
                                  </div>
                              </div>

                          </Dialog.Panel>
                      </Transition.Child>
                  </div>
              </div>
          </Dialog>
      </Transition.Root>
  )
}


export default function Settings() {
  const [open, setOpen] = useState(false);

  const [regionLoading, setRegionLoading] = useState(false);
  const [addr, setAddr] = useState({ country: "", region: "", latlng: [] });



  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [postal, setPostal] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);

  // Retrieve user_info object from sessionStorage
  const getCurrentAddress = () => {
    setRegionLoading(true);

    if (navigator.geolocation) {
      // Get current position
      navigator.geolocation.getCurrentPosition(function (position) {
        // Get latitude and longitude
        var latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Initialize geocoder
        var geocoder = new google.maps.Geocoder();

        // Geocode coordinates to get address
        geocoder.geocode(
          { location: latlng },
          async function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                let the_region;
                let the_country;


                if (results[0]) {
                  // Parse address components to find city
                  var addressComponents = results[0].address_components;
                  console.log("the entire address component is", addressComponents);


                  for (var i = 0; i < addressComponents.length; i++) {
                    var types = addressComponents[i].types;
                    if (types.includes("locality")) {
                      the_region =
                        addressComponents[i].long_name;
                      console.log("the entire address component is", addressComponents[i]);
                      break;
                    }
                  }

                  for (var i = 0; i < addressComponents.length; i++) {
                    var types = addressComponents[i].types;
                    if (types.includes("country")) {
                      the_country =
                        addressComponents[i].long_name;
                      //console.log("the entire address component is", addressComponents[i]);
                      break;
                    }
                  }
                }

                //const the_region_hyphen = Array.from(the_region).join('-');
                setRegionLoading(false);
                console.log("the entire address component is", {
                  region: the_region,
                  country: the_country,
                  latlng: latlng
                });

                setAddr({
                  region: the_region,
                  country: the_country,
                  latlng: [latlng?.lat, latlng?.lng]
                }
                );



              } else {
                alert("No results found");
              }
            } else {
              alert("Geocoder failed due to: " + status);
            }
          }
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  useEffect(() => {

    const user_info_json = sessionStorage.getItem("user_info") || "[]";
    const user_info = JSON.parse(user_info_json);

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
    }
  }, []);

  return (
    <Layout>
      <main className="w-full h-full mb-10">
      <div className="px-4 md:px-10 mt-[40px] md:pl-[310px] md:mt-0">
      <div className="px-2 items-center flex justify-between bg-[#005734]">
            <h1 className=" text-white text-2xl font-bold pt-1 pb-3 no-underline">
              Settings / My Profile
            </h1>

          </div>
      <CheckRegionModal open={open} setOpen={setOpen} regionLoading={regionLoading} addr={addr} />
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="flex justify-between items-center px-8 my-6">
            <div className="flex justify-between items-center space-x-6">
            <div className="h-40">
                   
                      <img
                        src={profileImageUrl || null}
                        alt="user image"
                        className="w-full h-full top-0 left-0 rounded-full"
                      />
                  
                  </div>
                  <div>
                    <p className="text-lg font-bold">{`${firstName} ${lastName}`}</p>
                    <p className="text-md font-bold">{`${firstName} ${lastName}`}</p>
                  </div>
            </div>
            <div className="flex space-x-2">
            <a
                href="https://100093.pythonanywhere.com/ "
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-[#005734] border-2 border-[#005734] py-1"
              >
                Edit Profile
              </a>
            <button 
              className="mb-2 w-[150px] h-[30px] font-serif font-bold opacity-80 hover:opacity-100 text-center text-sm md:text-md text-white bg-[#005734]"
              onClick={() => {

                setOpen(true)
                getCurrentAddress();
              }}>
                Check My Region


              </button>
            

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

      </main>
      

    </Layout>
  );
}
