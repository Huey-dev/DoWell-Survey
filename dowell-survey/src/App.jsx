import Admin from "./layouts/Admin.jsx";
import Search from "./components/Sidebar/Search.jsx";
import CreateSurvey from "./views/admin/CreateSurvey.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} >
          <Route path="/admin/search" element={<Search />} />
          <Route path="/admin/create" element={<CreateSurvey />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
