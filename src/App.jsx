import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Signin from "./pages/SignIn"
import Sidenav from "./components/Sidenav"
import Kriteria from "./pages/Data-kriteria"
import Alternatif from "./pages/Data-alternatif"
import Penilaian from "./pages/Data-penilaian"
import SubKriteria from "./pages/Data-subkriteria"

function App() {

  return (
    <>
    <Router>
      <Sidenav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/kriteria" element={<Kriteria/>}/>
        <Route path="/subkriteria" element={<SubKriteria/>}/>
        <Route path="/alternatif" element={<Alternatif/>}/>
        <Route path="/penilaian" element={<Penilaian/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
