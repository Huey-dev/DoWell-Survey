import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Screen4 from "./Components/Screen4/Screen4";
import Form from "./Components/Screen4/Form";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* <Screen3 /> */}
        <Route path="/" element={<Screen4 />} />
        <Route path="/email" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
