import  { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

function StepFour() {
  const [qrCodeData, setQRCodeData] = useState(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const response = await axios.post('https://dowell-surveys-qr-2.onrender.com/qr-code/codes/', {
          location: "abuja",
          promotional: "what do you think?",
          survey_link: "www.example.com",
          product: "restaurant",
          brandname: "dowell",
        });

        // Handle the response data here
        const qrCodeData = response.data;

        // Set the QR code data in state
        setQRCodeData(qrCodeData);
      } catch (error) {
        // Handle any errors here
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, []);

  return (
    <div>
      {qrCodeData && (
        <div>
          <QRCode value={qrCodeData.qrCodeUrl} />
          <p>Location: {qrCodeData.location}</p>
          <p>Promotional: {qrCodeData.promotional}</p>
          <p>Survey Link: {qrCodeData.survey_link}</p>
          <p>Product: {qrCodeData.product}</p>
          <p>Brand Name: {qrCodeData.brandname}</p>
        </div>
      )}
    </div>
  );
}

export default StepFour;
