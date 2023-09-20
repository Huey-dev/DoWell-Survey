import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <main className="w-full h-full">
        <div className="w-full h-[110px] bg-[#7ED956] text-white font-[12px] text-center rounded-[10px] mt-[90px] flex justify-center items-center">
            <h1>Get feedback from your desired location</h1>
        </div>
        <div className="w-full  border-b-[1px] border-[#FE0000] mt-[10px] "></div>
        <div className="w-full text-center my-[40px]">
            <h2 className="text-[#FE0000] text-[24px]">Questionaira</h2>
            <p className="text-[18px]">Link your own using Google forms, <br /> HTML or any other link</p>
        </div>
        <div className="w-full  border-b-[1px] border-[#FE0000] mt-[10px]"></div>
        {/* report */}
        <h3 className="mt-[30px] text-[24px] text-center">Access Report</h3>
        <div  className="w-full flex justify-around mt-[50px]">
          <Link to="/preview-page" smooth="true" duration={500}>
        <button  className="w-[170px] md:w-[200px] h-[70px] text-white text-[16px] md:text-[24px] bg-[#838383] rounded-[10px] outline-none">Preview</button>

          </Link>
        <button  className="w-[170px] md:w-[200px] h-[70px] text-white text-[16px] md:text-[24px] bg-[#7ED956] rounded-[10px] outline-none ">Create My own Survey</button>
        </div>

    </main>
  )
}

export default LandingPage
