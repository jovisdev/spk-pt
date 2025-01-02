import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivateRoute from "./utility/privateroute"
import { Provider } from "react-redux"
import {store, persistor} from "./utility/store"
import { PersistGate } from "redux-persist/integration/react"

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
import Perhitungan from "./pages/Perhitungan"
import PenilaianReview from "./pages/Penilaian-review"
import PerhitunganMetode from "./pages/Perhitungan-Metode"
import HasilPerhitungan from "./pages/Hasil-Perhitungan"
import UserManagement from "./pages/User-management"
import DataKeputusan from "./pages/Data-keputusan"
// import Perhitungan from "./pages/Perhitungan"

function App() {

  return (
    <>
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
        <Router>
          <Sidenav/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/unauthorized" element={<UnauthorizedPage/>} />
            <Route path="/signin" element={<Signin/>}/>

            <Route path="/dashboard" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer", "Manajer"]}>
                <Dashboard />
              </PrivateRoute>
            }/>

            <Route path="/kriteria" element={
              <PrivateRoute requiredRole={["Super Admin", "Manajer"]}>
                <Kriteria />
              </PrivateRoute>
            }/>

            <Route path="/subkriteria" element={
              <PrivateRoute requiredRole={["Super Admin", "Manajer"]}>
                <SubKriteria />
              </PrivateRoute>
            }/>

            <Route path="/alternatif" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer", "Manajer"]}>
                <Alternatif />
              </PrivateRoute>
            }/>

            <Route path="/penilaian" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer"]}>
                <Penilaian />
              </PrivateRoute>
            }/>

            <Route path="/penilaian/review" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer"]}>
                <PenilaianReview />
              </PrivateRoute>
            }/>

            <Route path="/penilaian/alternatif/:alternatif_id" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer"]}>
                <PenilaianAlternatif />
              </PrivateRoute>
            }/>

            <Route path="/perhitungan" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer"]}>
                <Perhitungan />
              </PrivateRoute>
            }/>

            <Route path="/perhitungan/metode" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer"]}>
                <PerhitunganMetode />
              </PrivateRoute>
            }/>

            <Route path="/perhitungan/metode/hasil" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer"]}>
                <HasilPerhitungan />
              </PrivateRoute>
            }/>

            <Route path="/datakeputusan" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer", "Manajer"]}>
                <DataKeputusan />
              </PrivateRoute>
            }/>   

            <Route path="/user" element={
              <PrivateRoute requiredRole="Super Admin">
                <UserManagement />
              </PrivateRoute>
            }/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
