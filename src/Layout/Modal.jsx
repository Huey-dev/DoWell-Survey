import { useState } from "react";

export default function Modal() {
  const [selectedSurveys, setSelectedSurveys] = useState([]);

  const surveyList = [
    "Survey 1",
    "Survey 2",
    "Survey 3",
    "Survey 4",
    // Add more surveys as needed
  ];

  const handleCheckboxChange = (surveyName) => {
    setSelectedSurveys((prevSelectedSurveys) => {
      if (prevSelectedSurveys.includes(surveyName)) {
        return prevSelectedSurveys.filter((name) => name !== surveyName);
      } else {
        return [...prevSelectedSurveys, surveyName];
      }
    });
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <>
                  <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                      Select Surveys
                    </h2>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Checkboxes</h3>
                      {surveyList.map((surveyName) => (
                        <div key={surveyName} className="mb-2">
                          <input
                            type="checkbox"
                            id={surveyName}
                            value={surveyName}
                            checked={selectedSurveys.includes(surveyName)}
                            onChange={() => handleCheckboxChange(surveyName)}
                            className="form-checkbox h-5 w-5 text-green-600"
                          />
                          <label
                            htmlFor={surveyName}
                            className="ml-2 text-gray-700"
                          >
                            {surveyName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
