import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Signin from "./pages/SignIn"
import Sidenav from "./components/Sidenav"
import Kriteria from "./pages/Data-kriteria"

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

      </Routes>
    </Router>
    </>
  )
}

export default App
