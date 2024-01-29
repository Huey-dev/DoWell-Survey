import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import dowelllogo from "../assets/dowell.jpeg";
// import { FaTimes } from "react-icons/fa";
// import { useState } from "react";
//import "./Sidebar.css";
// import NewSurvey from "./NewSurvey";

export default function Sidebar() {
  // const [modalOpen, setIsModalOpen] = useState(false);
  // const [NewSurveyModalOpen, setIsNewSurveyModalOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsModalOpen((prevState) => !prevState);
  // };

  // const NewSurveyModal = () => {
  //   setIsNewSurveyModalOpen((prevState) => !prevState);
  // };

  // const closeNewSurveyModal = () => {
  //   setIsNewSurveyModalOpen(false);
  // };

  const [navbar, setNavbar] = useState(false);
  const location = useLocation();


  return (
    <main className="w-full h-full">
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-black flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 hidden md:visible">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <img
              className="w-full h-auto rounded"
              style={{ maxHeight: "150px" }}
              src={dowelllogo}
              alt="Default avatar"
            ></img>
          </Link>
          <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1">
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {/* <li className="items-center py-1.5">
                <Link
                  onClick={NewSurveyModal}
                  className="bg-red-500 text-center text-md font-serif py-1 font-bold block text-white hover:text-black"
                >
                  New Survey
                </Link>
              </li> */}

              <li className="items-center py-1.5">
                <Link
                  to="/newsurvey"
                  className="bg-red-500 text-center text-md font-serif py-1 font-bold block text-white hover:text-black"
                >
                  New Survey
                </Link>
              </li>

              <li className="items-center py-1.5">
                <Link className="bg-green-500 text-center text-md font-serif py-1 font-bold block text-white hover:text-black"
                  to="/finalize-Sample"

                >
                  1. Finalize Sample Size
                </Link>
              </li>

              <li className="items-center py-1.5">
                <Link
                  // onClick={toggleModal}
                  to="/link-form"

                  className="bg-gray-400 text-center text-md font-serif py-1 font-bold block text-white hover:text-black"
                >
                  2. Link Survey Form
                </Link>
              </li>

              <li className="flex items-center py-1.5">
                <Link
                  to="/email-sms"
                  className="bg-green-800 text-center font-serif font-bold block text-white hover:text-black flex-1">
                  <ul className="md:min-w-full flex flex-col items-start px-1 list-none">
                    <li className="text-[10px] font-bold text-white hover:text-black">
                      A. Sms
                    </li>
                    <li className="text-[10px] font-bold text-white hover:text-black">
                      B. Email
                    </li>
                    <li className="text-[10px] font-bold text-white hover:text-black">
                      C. Sms and email
                    </li>
                  </ul>
                </Link>

                <Link
                  className="bg-gray-400 text-center text-xs py-1 font-serif font-bold block text-white hover:text-black ml-2 flex-1" // Add ml-2 for spacing between links
                >
                  3. Start Survey
                </Link>
              </li>

              <li className="items-center py-1.5">
                <Link className="bg-gray-400 text-center text-md font-serif py-1 font-bold block text-white hover:text-black">
                  4. Stop Survey
                </Link>
              </li>
              <li className="items-center py-1.5">
                <Link className="bg-gray-400 text-center text-md font-serif py-1 font-bold block text-white hover:text-black">
                  5. Repeat
                </Link>
              </li>
            </ul>

            <ul className="md:flex-col md:min-w-full mt-8 flex flex-col list-none">
              <li className="items-center">
                <Link to="/list-surveys" className="bg-red-500 text-center text-md font-serif py-1 font-bold block text-white hover:text-black">
                  My Surveys
                </Link>
              </li>

              <li className="items-center py-1.5">
                <Link to="/settings" className="bg-gray-400 text-center text-md font-serif py-1 font-bold block text-white hover:text-black">
                  Settings/Privacy
                </Link>
              </li>

              <li className="items-center py-1.5">
                <Link className="bg-gray-400 text-center text-md font-serif py-1 font-bold block text-white hover:text-red-500">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="w-full bg-white shadow md:hidden bg-[#399544]">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="javascript:void(0)">
                <h2 className="text-2xl font-bold">LOGO</h2>
              </a>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-gray-600 hover:text-blue-600">
                  <Link
                    to="/newsurvey"
                    className="font-bold text-lg text-white"

                  >
                    New Survey
                  </Link>
                </li>
                <li className="text-gray-600 hover:text-blue-600">
                  <Link
                    to="/finalize-Sample"
                    className={`font-bold text-lg ${location.pathname === '/finalize-Sample' ? 'text-white' : 'text-gray-700'}`}

                  >
                    1. Finalize Sample Size
                  </Link>
                </li>
                <li className="text-gray-600 hover:text-blue-600">
                  <Link
                    to="/link-form"
                    className="font-bold text-lg text-white"

                  >
                    2. Link Survey Form
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>

    </main>
  );
}
