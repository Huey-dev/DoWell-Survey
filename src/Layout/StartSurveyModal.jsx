import { useState } from "react";

const StartSurveyModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSurveys, setSelectedSurveys] = useState([]);
  const surveyList = ["Survey 1", "Survey 2", "Survey 3", "Survey 4"];

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSurveys(selectedOptions);
  };

  const handleFormSubmit = () => {
    // Handle the selected surveys, e.g., send them to the server
    console.log("Selected Surveys:", selectedSurveys);
    // Close the modal after submitting
    setShowModal(false);
  };

  return (
    <div className="">
      <button
        className="bg-gray-400 text-center text-xs py-1 font-serif font-bold block text-white hover:text-black ml-2 flex-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Start Survey
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center  ">
          <div className="relative mx-auto  my-28 max-w-sm bg-white rounded-md shadow-lg text-center   p-5">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              X
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="surveySelect"
                  className="text-lg font-semibold mb-2"
                >
                  Select Surveys
                </label>
                <select
                  id="surveySelect"
                  multiple
                  value={selectedSurveys}
                  onChange={handleSelectChange}
                  className="form-select w-full  p-10 border rounded text-lg"
                >
                  {surveyList.map((surveyName) => (
                    <option key={surveyName} value={surveyName}>
                      {surveyName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
              >
                Start survey
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartSurveyModal;
