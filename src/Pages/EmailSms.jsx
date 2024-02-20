import QRCode from "react-qr-code";
import Layout from "../Layout/Layout";
export const EmailSms = () => {
  const getQrcode = sessionStorage.getItem("Qrcode");

  return (
    <Layout>
      <div className="w-full h-full px-4 md:px-10 mt-[26px] md:pl-80 mb-20 flex flex-col justify-center items-center gap-5">
        <div className="w-full md:w-[400px] flex flex-col justify-center items-center gap-5">
          <div className="flex justify-center items-center">
            <QRCode
              size={170}
              bgColor="white"
              fgColor="black"
              // value="https://uxlivinglab.com/"
              value={getQrcode ? getQrcode : ""}
            />
          </div>

          <div className="w-full md:w-[400px] flex flex-col gap-3 py-">
            <div className="w-full md:w-[400px] flex flex-col gap-2 text-left  ">
              <h3 className="font-serif font-bold text-md">Email </h3>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                className="w-full h-[4rem] border-2 border-[#B3B4BB] rounded-[5px] outline-none"
                style={{ paddingLeft: "1rem" }}
              />
            </div>

            <div className="w-full md:w-[400px] flex flex-col gap-2 text-left  mt-4">
              <h3 className="font-serif font-bold text-md">SMS</h3>

              <input
                type="number"
                id="sms"
                name="sms"
                placeholder="Enter phone number"
                className="w-full  h-[4rem] border-2  border-[#B3B4BB] rounded-[5px] outline-none"
                style={{ paddingLeft: "1rem" }}
              />
            </div>
            <div className="w-full md:w-[400px] flex  gap-2 text-left  mt-4">
              <input type="checkbox" name="map" id="" />{" "}
              <span>Send to all numbers and emails from map results</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[400px] h-full flex justify-center items-center mt-10">
          <button className="p-2 w-full md:w-[400px] h-[4rem] font-serif font-semibold text-white opacity-80 hover:opacity-100 bg-[#176847] text-md rounded-md cursor-pointer">
            Send Survey
          </button>
        </div>
      </div>
    </Layout>
  );
};
