import LandingPage from "./Pages/LandingPage";
// import { PreviewProvider } from "./Context/PreviewContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreviewPage from "./Pages/PreviewPage";
import StartNewSurvey from "./Pages/StartNewSurvey";
import FinalizeSample from "./Pages/FinalizeSample2";
import LinkSurvey from "./Pages/LinkSurvey";
import { EmailSms } from "./Pages/EmailSms";
import Edit from "./Pages/EditSurvey";
import Settings from "./Pages/Settings";
// import Search from "./Pages/Npm";

function App() {
  return (
    <>
      {/* <PreviewProvider> */}
      <Router>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/preview-page" element={<PreviewPage />} />
          <Route path="/newsurvey" element={<StartNewSurvey />} />
          <Route path="/finalize-Sample" element={<FinalizeSample />} />
          <Route path="/link-form" element={<LinkSurvey />} />
          <Route path="/email-sms" element={<EmailSms />} />
          <Route path="/list-surveys" element={<Edit />} />
          <Route path="/settings" element={<Settings />} />
          {/* <PreviewProvider> */}
          {/* <Route path="/search" element={<Search />} /> */}
          {/* </PreviewProvider> */}
        </Routes>
      </Router>
      {/* </PreviewProvider> */}
    </>
  );
}

export default App;
