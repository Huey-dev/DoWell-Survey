import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { PreviewProvider } from "./Context/PreviewContext.jsx";
// import { PreviewProvider } from "@dowelllabs/dowell-living-lab-maps/Context/PreviewContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <PreviewProvider> */}
    <App />
    {/* </PreviewProvider> */}
  </React.StrictMode>
);
