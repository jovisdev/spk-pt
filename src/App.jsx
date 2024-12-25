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
              <PrivateRoute requiredRole="Super Admin">
                <Dashboard />
              </PrivateRoute>
            }/>

            <Route path="/kriteria" element={
              <PrivateRoute requiredRole="Super Admin">
                <Kriteria />
              </PrivateRoute>
            }/>

            <Route path="/subkriteria" element={
              <PrivateRoute requiredRole="Super Admin">
                <SubKriteria />
              </PrivateRoute>
            }/>

            <Route path="/alternatif" element={
              <PrivateRoute requiredRole="Super Admin">
                <Alternatif />
              </PrivateRoute>
            }/>

            <Route path="/penilaian" element={
              <PrivateRoute requiredRole="Super Admin">
                <Penilaian />
              </PrivateRoute>
            }/>

            <Route path="/penilaian/review" element={
              <PrivateRoute requiredRole="Super Admin">
                <PenilaianReview />
              </PrivateRoute>
            }/>

            <Route path="/penilaian/alternatif/:alternatif_id" element={
              <PrivateRoute requiredRole="Super Admin">
                <PenilaianAlternatif />
              </PrivateRoute>
            }/>

            <Route path="/perhitungan" element={
              <PrivateRoute requiredRole="Super Admin">
                <Perhitungan />
              </PrivateRoute>
            }/>

            <Route path="/perhitungan/metode" element={
              <PrivateRoute requiredRole="Super Admin">
                <PerhitunganMetode />
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
