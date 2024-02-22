import { useState } from "react";
import Layout from "../Layout/Layout";
import MySurveys from "./MySurveys";
import MainMap from "../components/Map";
import { useGlobalContext } from "../Context/PreviewContext";
import FetchNearby from "../data/fetchNearby";
import FetchPlaceDetail from "../data/fetchPlaceDetail";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const stored_locations = sessionStorage.getItem("newSurvey") || "[]";
  const [surveys, setSurveys] = useState(JSON.parse(stored_locations));






  const context = useGlobalContext();
  console.log("context Value: ", context)
  const { inputData, setInputData, setAPIKey, api_key, setCenterCoords, centerCoords, placeAPIKey } = context;
  const [loading, setLoading] = useState(false);
  const [receivedKey, setRecievedKey] = useState("EhdQUTM2K0hNLCBOYWlyb2JpLCBLZW55YSImOiQKCg2PPDr");
  const [placeDetails, setPlaceDetails] = useState([]);
  const [nearbyResults, setNearbyResults] = useState([]);

  //   const { data } = useQuery({
  //     queryFn: async () => FetchCountries(),
  //     queryKey: 'countries'
  // })
  //   console.log(data)

  // const validateKey = (api_key) =>{
  //   return (api_key === "");
  // }
  // const saveAPIkey = async () => {
  //   if (validateKey(api_key)){
  //     alert("Please provide an API key")
  //   } else if (api_key.length<36){
  //     alert("Please input a valid API_key")
  //   } 
  //   else {
  //   // alert(api_key)
  //   setRecievedKey(true);
  //   }
  // }

  const centerParams = {
    center_lat: centerCoords.lat,
    center_lon: centerCoords.lon,
  };

  // const defaultSearchOptions = {
  //   radius1: inputData.radius1,
  //   radius2: inputData.radius2,
  //   center_lat: 29.40303,
  //   center_lon: 73.60256,
  //   query_string: inputData.query_string,
  //   limit: "60",
  //   api_key: "EhdQUTM2K0hNLCBOYWlyb2JpLCBLZW55YSImOiQKCg2PPDr",
  // };


  const handleSearch = async () => {
    if (!isValidInput(inputData)) {
      alert("please fill all the fields");
      return;
    }
    if (Number(inputData.radius1) > Number(inputData.radius2)) {
      alert("'From' has to be larger than 'To'");
      return;
    }
    try {

      setLoading(true);

      //Try commenting this so that only one 'search option' is defined. 
      const searchOptions = {
        radius1: inputData.radius1,
        radius2: inputData.radius2,
        center_lat: centerCoords.lat,
        center_lon: centerCoords.lon,
        query_string: inputData.query_string,
        limit: "60",
        api_key: placeAPIKey,
      };
      const response = await FetchNearby(searchOptions)
      console.log("response_data", response.data.place_id_list)
      setNearbyResults(response.data.place_id_list)
      console.log("coordinates used for the search are", centerCoords.lat, centerCoords.lon)
      console.log("nearby", nearbyResults);
      if (response.data.place_id_list?.length > 0) {
        // setPlaceIds(nearbyResults.data.place_id_list);
        const placeDetailOptions = {
          place_id_list: response.data.place_id_list,
          center_loc: "",
          api_key: placeAPIKey,
        };
        const placeDetail = await FetchPlaceDetail(placeDetailOptions);
        setPlaceDetails(placeDetail.data.succesful_results);
      }
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    } finally {
      console.log("finally block executed")
      setLoading(false);

    }
  };

  const isValidInput = (inputData) => {
    // Implement your input validation logic here
    return (
      inputData.country !== "" &&
      inputData.city !== "" &&
      inputData.radius1 !== "" &&
      inputData.radius2 !== "" &&
      inputData.query_string !== ""
    );
  };

  const handleConfirmSelection = () => {
    sessionStorage.setItem("newSurvey", JSON.stringify(surveys));
    navigate("/finalize-Sample");
  };



  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        // Set loading to true while fetching data
        console.log('tryingggggg')
        //setLoading(true);

        const formData = {
          "session_id": "p6r13v6nfn9k5wumgeztto903bojy537"
        }

        const response = await axios.post(
          `https://100014.pythonanywhere.com/api/userinfo/`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },

          }
        );
        //const data = response?.data
        console.log("suuuuuuuuuuurrrrrrrrr")
        //console.log("successsssss", response);
      } catch (error) {
        // If there's an error, update the error state
        console.log("error is", error);
      } finally {
        // Set loading to false when data fetching is complete, regardless of success or failure
        
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    (receivedKey != "ENTER API KEY") ?
      <Layout>
        <main className="w-full h-full mb-10 mt-20 overflow-x-hidden">
          <MySurveys loading={loading} />
          {/* <MainMap/> */}
          <div className="px-8 mt-[60px] md:pl-[310px]">

            <div className="w-full flex flex-col md:flex-row md:space-x-8 md:justify-between">
              <div className="w-full md:w-8/12">
                {placeDetails.length > 0 ? <MainMap centerCords={{
                  lat: centerCoords.lat,
                  lng: centerCoords.lon
                }} pins={placeDetails} /> : <MainMap pins={null} />}

              </div>

              <div className="w-full md:w-4/12 mt-[40px] md:mt-0  ">
                <div className="w-full bg-[#7ED957] h-[270px]">
                  <p className="h-[40px] text-white px-4 flex justify-center items-center text-center font-semibold text-[20px] md:text-[16px] lg:text-[16px]">
                    Your Selection
                  </p>

                  <div className="bg-[#D2E5D1] h-[230px]">
                    <ul className="w-full h-full px-4 list-disc ml-[20px]  py-[10px]">
                      <li className="text-[16px] md:text-[14px] lg:text-[16px] font-medium mt-[7px]">
                        Country - {inputData.country}
                      </li>
                      <li className="text-[16px] md:text-[14px] lg:text-[16px] font-medium mt-[7px]">
                        Location - {inputData.city}
                      </li>
                      <li className="text-[16px] md:text-[14px] lg:text-[16px] font-medium mt-[7px]">
                        Distance from center - between {inputData.radius1}-
                        {inputData.radius2} meters
                      </li>
                      <li className="text-[16px] md:text-[14px] lg:text-[16px] font-medium mt-[7px]">
                        Category - {inputData.query_string}
                      </li>
                      <li className="text-[16px] md:text-[14px] lg:text-[16px] font-medium mt-[7px]">
                        Search Limit - 500 NOS
                      </li>
                      <li className="text-[16px] md:text-[14px] lg:text-[16px] font-medium mt-[7px]">
                        Location - delhi
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="w-full text-white flex justify-between mt-[10px]">
                  <button className="h-[50px] bg-[#7ED957] w-[100px]">
                    Download
                  </button>
                  <button className="h-[50px] bg-[#7ED957] w-[60px]">
                    Email
                  </button>
                  <button className="h-[50px] bg-[#7ED957] w-[80px]">
                    Refresh
                  </button>
                </div>

                <button className="w-full text-white font-semibold bg-[#128437] h-[50px] mt-[10px]"
                  onClick={handleSearch}
                  disabled={loading}>
                  {loading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>

            <div className="w-full h-full bg-[#D3FFE6] mt-6 pb-6 overflow-y-auto">
              <p className="text-[18px] font-bold pt-[10px]">
                {placeDetails.length} search results
              </p>
              <div className="w-full md:grid md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-2 ">
                {console.log("placedetails", placeDetails)}
                {placeDetails.map((product) => {
                  const {
                    placeId,
                    photo_reference,
                    address,
                    website,
                    place_name,
                  } = product;
                  return (
                    <>


                      <div
                        key={placeId}
                        className={
                          "mx-auto w-[270px] md:w-[180px] lg:w-[200px] xl:w-[280px] 2xl:w-[300px] mt-[30px] rounded-[10px] border-2 border-black" +
                          (surveys.findIndex((obj) => obj.placeId === placeId) === -1
                            ? " bg-white text-black"
                            : " bg-[#005734] text-white")
                        }
                      >
                        <div className="flex justify-center items-center p-2">
                          <img
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=358&photo_reference=${photo_reference}&key=AIzaSyAsH8omDk8y0lSGLTW9YtZiiQ2MkmsF-uQ`}
                            alt="image"
                            className="rounded-t-[10px] w-full h-[150px]"
                          />
                        </div>

                        <div className="px-1">
                          <p className="font-semibold text-[18px]">{place_name}</p>
                          <div className="flex font-medium">
                            <p class="overflow-wrap">{website}</p>
                          </div>
                          <p>{address}</p>
                          <div className="flex justify-center items-center p-2">
                            <button
                              type="button"
                              className={
                                "mb-8 w-[200px] h-[40px] font-serif font-bold text-center opacity-80 hover:opacity-100 text-[16px] md:text-[20px] rounded-md text-white cursor-pointer" +
                                (surveys.findIndex((obj) => obj.placeId === placeId) === -1
                                  ? " bg-[#005734]"
                                  : " bg-[#FF3131]")
                              }
                              onClick={() => {
                                const updatedList = [...surveys];
                                //const valueIndex = updatedList.indexOf(id);
                                const valueIndex = updatedList.findIndex(
                                  (obj) => obj.placeId === placeId
                                );

                                if (valueIndex === -1) {
                                  // Value not present, append it
                                  updatedList.push({
                                    placeId,
                                    place_name,
                                    address,
                                    website,
                                    numOfParticipants: 1,
                                  });
                                } else {
                                  // Value present, remove it
                                  updatedList.splice(valueIndex, 1);
                                }

                                // Update the state with the new list
                                setSurveys(updatedList);
                              }}
                            >
                              {surveys.findIndex((obj) => obj.placeId === placeId) === -1
                                ? "Add"
                                : "Remove"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>



                  );
                })}
              </div>
              <div className="flex justify-center items-center p-2">
                <button
                  type="submit"
                  onClick={handleConfirmSelection}
                  className="w-[400px] font-bold font-serif mt-[30px] h-[50px] bg-[#005734] text-[20px] text-white hover:opacity-100 opacity-80 rounded-[5px]"
                >
                  Confirm Selections
                </button>
              </div>
            </div>
          </div>
        </main>
      </Layout> :
      <div class="flex justify-center mt-60 items-center bg-white ">
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 grid-cols-12">
          <h3>Enter your API Key</h3>
        </div>
      </div>
  );
};

export default LandingPage;
