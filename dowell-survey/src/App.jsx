import LandingPage from "./Pages/LandingPage";
import { PreviewProvider } from "./Context/PreviewContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreviewPage from "./PreviewPage";
import StartNewSurvey from "./Layout/StartNewSurvey";
import FinalizeSample from "./Pages/FinalizeSample";

function App() {
  return (
    <>
      <PreviewProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/preview-page" element={<PreviewPage />} />
            <Route path="/newsurvey" element={<StartNewSurvey />} />
            <Route path="/finalize-Sample" element={<FinalizeSample />} />

          </Routes>
        </Router>
      </PreviewProvider>
    </>
  );
}

export default App;
