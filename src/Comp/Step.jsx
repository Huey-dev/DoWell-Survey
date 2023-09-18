import  { useState } from 'react';
import QRCode from 'qrcode.react'; // Import the QRCode component from the library
import { useMutation } from 'react-query';


const Step = () => {
  const [formData, setFormData] = useState({
    location: 'abuja',
    promotional: 'what do you think?',
    survey_link: 'www.example.com',
    product: 'resturant',
    brandname: 'dowell',
  });

  const [qrCodeDetails, setQRCodeDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://dowell-surveys-qr-2.onrender.com/qr-code/codes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setQRCodeDetails(responseData);
      } else {
        console.error('Error creating QR code:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        {/* ... Rest of your form code ... */}
         {/* Picture Upload */}
       <div className="mb-4 relative py-10  flex justify-center items-center   ">
          {/* <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="picture"
          >
            Upload Picture
          </label> */}
          <label
            className="w-16 h-16 bg-gray-500 hover:bg-blue-700 text-white rounded-full cursor-pointer absolute top-0 left-0 flex items-center justify-center"
            htmlFor="picture"
          >
            <span className="text-sm ">Upload Photo</span>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden "
            />
          </label>
        </div>
          

          

        {/* Input Field 1 */}
        <div className="mb-4">
          {/* <label className="block text-red-700 text-sm font-bold mb-2">
          </label> */}
          <input
            type="text"
            name="inputField1"
            value={formData.inputField1}
            placeholder='Enter Your Brand Name'
            onChange={handleInputChange}
            className=" border rounded w-full py-2 px-3 bg-gray-300  border-r-10 "

          />
        </div>

        {/* Dropdown 1 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          </label>
          <select
            name="dropdown1"
            value={formData.dropdown1}
            onChange={handleInputChange}
            className="appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Your Product/Service</option>
            <option value="option1">resturant</option>
            <option value="option2">Option 2</option>
          </select>
        </div>

        {/* Input Field 2 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          </label>
          <input
            type="text"
            name="inputField2"
            placeholder='Enter Link To Survey Form'
            value={formData.inputField2}
            onChange={handleInputChange}
            className="appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Dropdown 2 */}
        <div className="mb-4">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2">
            Dropdown 2
          </label> */}
          <select
            name="dropdown2"
            value={formData.dropdown2}
            onChange={handleInputChange}
            className="appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Survey Location</option>
            <option value="option1">London</option>
            <option value="option2">India</option>
            <option value="option3">abuja</option>
          </select>
        </div>

        {/* Text Area */}
        <div className="mb-6 ">
          
          <textarea
            name="textArea"
            value={formData.textArea}
            onChange={handleInputChange}
            placeholder='Enter a promotional Sentence To Attract participants(15 words)  '

            className="appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-black leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>

         {/* Disclaimer Checkbox */}
         <div className="mb-4">
          <label className="flex items-end gap-60">
          <span className="ml-2 text-gray-700 text-sm">
               Disclaimer
            </span>
            <input
              type="checkbox"
              name="disclaimerChecked"
              checked={formData.disclaimerChecked}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-blue-500"
            />
         
          </label>
        </div>
        
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create QR Code
          </button>
        </div>
      </form>

      {qrCodeDetails && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">QR Code Details</h2>
          <p>Location: {qrCodeDetails.location}</p>
          <p>Promotional: {qrCodeDetails.promotional}</p>
          <p>Survey Link: {qrCodeDetails.survey_link}</p>
          <p>Product: {qrCodeDetails.product}</p>
          <p>Brand Name: {qrCodeDetails.brandname}</p>

          {/* Render the QR code using qrcode.react */}
          <div className="mt-4">
            <QRCode value={qrCodeDetails.qr_code_url} size={128} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Step;
