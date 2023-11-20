import Layout from "../Layout/Layout"
const LinkSurvey = () => {
  return (
    <Layout>
    <main className="w-full h-full">
        <div className="px-4 md:px-10 mt-[40px] md:pl-[310px]">
            <div className="w-full h-full flex flex-col justify-center items-center">

            <div>
                <h1>Input your form link here so as to connect it with the survey created</h1>
            </div>
            <div className="flex flex-col mt-[50px]">
                <h2>Form Link</h2>
                <input type="text"
                className="w-[400px] mt-[10px] h-[50px] border-2 border-[#B3B4BB] rounded-[5px] outline-none  pl-[20px]"
                />
                <button 
                type="submit"
                className="w-[400px] mt-[30px] h-[50px] bg-[#005734] text-[20px] text-white hover:opacity-100 opacity-80 rounded-[5px]"
                >
                    Link Form
                </button>
            </div>
            </div>

        </div>
    </main>
    </Layout>
  )
}

export default LinkSurvey