// import React, { useEffect, useState } from "react";
// import Layout from "../Layout/Layout";
// import axios from "axios";

// const StartSurvey = () => {
//   const surveyData = [
//     {
//       name: "Survey 1",
//       link: "https://example.com/survey1",
//       send: "Yes",
//       start: "Set Date",
//     },
//     {
//       name: "Survey 2",
//       link: "https://example.com/survey2",
//       send: "No",
//       start: "Set Date",
//     },

//     // Add more sample data as needed
//   ];

//   const [surveyDatas, setSurveyDatas] = useState([]);

//   const getSurvey = async () => {
//     try {
//       const email = sessionStorage.getItem("email");
//       const response = await axios.post(
//         `https://100025.pythonanywhere.com/my-survey/`,
//         {
//           username: "Samuel Makinde",
//         }
//       );
//       setSurveyDatas(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getSurvey();
//   }, []);

//   return (
//     <Layout>
//       <main>
//         <div className=" px-4 md:px-10 md:pl-[310px]">
//           <table className="min-w-full ">
//             <thead>
//               <tr className="h-20 bg-[#005734]">
//                 <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
//                   Survey Name
//                 </th>
//                 <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
//                   Survey Link
//                 </th>
//                 <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
//                   Send Survey
//                 </th>
//                 <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
//                   Start Survey
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {surveyData.map((survey, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"}
//                 >
//                   <td className="px-6 py-4 whitespace-no-wrap">
//                     {survey.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap">
//                     {survey.link}
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap">
//                     {survey.send}
//                   </td>
//                   <td className="px-6  py-4 whitespace-no-wrap">
//                     <p className="bg-red-600 h-[40px] flex justify-center text-white rounded-md items-center cursor-pointer">
//                       {" "}
//                       {survey.start}
//                     </p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </Layout>
//   );
// };

// export default StartSurvey;

import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const StartSurvey = () => {
  const [surveyDatas, setSurveyDatas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState(null);

  const getSurvey = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const response = await axios.post(
        `https://100025.pythonanywhere.com/my-survey/`,
        {
          username: "Samuel Makinde",
        }
      );
      setSurveyDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSurvey();
  }, []);

  const openModal = (index) => {
    setSelectedSurveyIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStartSurvey = () => {
    // Handle start survey action here
    // For now, let's just close the modal
    closeModal();
  };

  return (
    <Layout>
      <main>
        <div className="px-4 md:px-10 md:pl-[310px]">
          <div className="overflow-x-auto">
            <div className="min-w-full max-h-[calc(100vh-64px)] overflow-y-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="h-20 bg-[#005734]">
                    <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
                      Survey Name
                    </th>
                    <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
                      Survey Link
                    </th>
                    <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
                      Send Survey
                    </th>
                    <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-white text-bold uppercase tracking-wider">
                      Start Survey
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {surveyDatas.map((survey, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                      }
                    >
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {survey.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {survey.link}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <p className="bg-[#282b32] h-[40px] flex justify-center text-white rounded-md items-center cursor-pointer">
                          Send SurVey
                        </p>
                      </td>
                      <td className="px-6  py-4 whitespace-no-wrap">
                        <input
                          type="date"
                          name="startdate"
                          id="startdate"
                          className="bg-red-600 h-[40px] flex justify-center text-white rounded-md items-center cursor-pointer"
                          defaultValue="Start Survey"
                        />
                        {/* <p onClick={() => openModal(index)}>Start Survey</p> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Select Start and End Date</h2>
        {/* Add your calendar component or date picker here */}
        <button onClick={handleStartSurvey}>Start Survey</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </Layout>
  );
};

export default StartSurvey;
