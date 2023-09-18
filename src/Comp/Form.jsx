import  { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import QRCode from 'qrcode.react';

const Form = () => {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('');
  const [promotional, setPromotional] = useState('');
  const [surveyLink, setSurveyLink] = useState('');
  const [product, setProduct] = useState('');
  const [brandname, setBrandname] = useState('');

  const createQRCode = useMutation(async () => {
    const response = await axios.post('https://dowell-surveys-qr-2.onrender.com/qr-code/codes/', {
      location,
      promotional,
      survey_link: surveyLink,
      product,
      brandname,
    });
    return response.data; // Assuming the response contains QR code data
  });

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    createQRCode.mutateAsync();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload Picture and Generate QR Code</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input type="file" onChange={handleFileUpload} />
        </div>
        <div>
          <select
            className="w-full p-2 border rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {/* Add dropdown options */}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Promotional Text"
            className="w-full p-2 border rounded-md"
            value={promotional}
            onChange={(e) => setPromotional(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Survey Link"
            className="w-full p-2 border rounded-md"
            value={surveyLink}
            onChange={(e) => setSurveyLink(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full p-2 border rounded-md"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            {/* Add dropdown options */}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Brandname"
            className="w-full p-2 border rounded-md"
            value={brandname}
            onChange={(e) => setBrandname(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Generate QR Code
          </button>
        </div>
      </div>
      <div className="mt-4">
        {createQRCode.isLoading ? (
          <p>Loading...</p>
        ) : createQRCode.isError ? (
          <p>Error: {createQRCode.error.message}</p>
        ) : createQRCode.isSuccess ? (
          <div>
            <p>QR Code Generated:</p>
            <QRCode value={createQRCode.data.qrCodeData} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
