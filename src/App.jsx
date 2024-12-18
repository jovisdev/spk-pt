import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivateRoute from "./utility/privateroute"
import { Provider } from "react-redux"

import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Signin from "./pages/SignIn"
import Sidenav from "./components/Sidenav"
import Kriteria from "./pages/Data-kriteria"
import Alternatif from "./pages/Data-alternatif"
import Penilaian from "./pages/Data-penilaian"
import SubKriteria from "./pages/Data-subkriteria"
import PenilaianAlternatif from "./pages/Penilaian"
import UnauthorizedPage from "./pages/Unauthorized"
import store from "./utility/store"
// import Perhitungan from "./pages/Perhitungan"

function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Sidenav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/unauthorized" element={<UnauthorizedPage/>} />
          <Route path="/signin" element={<Signin/>}/>

          <Route path="/dashboard" element={
            <PrivateRoute allowedRoles={["Super Admin"]}>
              <Dashboard />
            </PrivateRoute>
          }/>

          <Route path="/kriteria" element={
            <PrivateRoute allowedRoles={["Super Admin"]}>
              <Kriteria />
            </PrivateRoute>
          }/>

          <Route path="/subkriteria" element={
            <PrivateRoute allowedRoles={["Super Admin"]}>
              <SubKriteria />
            </PrivateRoute>
          }/>

          <Route path="/alternatif" element={
            <PrivateRoute allowedRoles={["Super Admin"]}>
              <Alternatif />
            </PrivateRoute>
          }/>

          <Route path="/penilaian" element={
            <PrivateRoute allowedRoles={["Super Admin"]}>
              <Penilaian />
            </PrivateRoute>
          }/>

          {/* <Route path="/perhitungan" element={<Perhitungan/>}/> */}
          <Route path="/penilaian/alternatif/:id" element={<PenilaianAlternatif/>}/>
        </Routes>
      </Router>
    </Provider>
    </>
  )
}

export default App
