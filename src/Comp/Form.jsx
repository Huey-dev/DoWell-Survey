// src/Form.js
import React from 'react';

const Form = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl mb-4">The next step is confirmation of your email, click the confirmation link received in your email after submitting this form
X
We will intimate you within 24 hours after email confirmation about the campaign approval. Then you can start and stop the campaign. check your data continuously for updates
We will update you with periodic reports on the progress of the campaign</h2>
          <div className="mb-4 py-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              
            </label>
            <input
              className="shadow appearance-none border rounded bg-gray-200 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              
            </label>
            <input
              className="shadow appearance-none border rounded bg-gray-200 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4 py-5">
            <label className="block text-red-700 text-sm font-bold mb-2">
              <input type="checkbox" className="mr-2 leading-tight" />
              Privacy Policy
            </label>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Back
            </button>
            <button
              className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
