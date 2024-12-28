import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logocg from "/src/assets/Logo Atas.png";
import { useDispatch } from "react-redux";
import { logout } from "../utility/reducers";

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mendapatkan path saat ini

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fungsi untuk menutup sidebar dari dalam
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Menyembunyikan sidenav di halaman tertentu
  if (location.pathname === '/' || location.pathname === '/signin') {
    return null;
  }

  // Fungsi untuk mengecek apakah path saat ini sesuai dengan menu
  const isActive = (path) => location.pathname === path;

  // logout
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      {/* Button toggle untuk mobile (hidden di desktop) */}
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
        {isSidebarOpen ? (
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed z-50 top-0 left-0 w-64 h-full bg-gray-800 transition-transform sm:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <button
            onClick={closeSidebar}
            className="text-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <a onClick={() => navigate('/')} className="flex items-center ps-2.5 mb-5">
            <img src={logocg} className="h-12" alt="Logo" />
          </a>

          <ul className="space-y-2 font-medium">
            {/* Dashboard menu */}
            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/dashboard') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/dashboard')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Dashboard">
                  <path fill="none" d="M0 0h48v48H0z"></path>
                  <path d="M6 26h16V6H6v20zm0 16h16V30H6v12zm20 0h16V22H26v20zm0-36v12h16V6H26z" fill="#757575" class="color000000 svgShape"></path>
                </svg>


                <span className="ms-3">Dashboard</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/kriteria') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/kriteria')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Checklist">
                  <rect width="34" height="40" x="7" y="5" fill="#7e7e7e" rx="5" class="color13e4ea svgShape"></rect>
                  <rect width="26" height="32" x="11" y="9" fill="#f7f7f7" rx="2" class="colorf9f5f5 svgShape"></rect>
                  <path fill="#7e7e7e" d="M32 34H25a1 1 0 010-2h7a1 1 0 010 2zM30 30H25a1 1 0 010-2h5a1 1 0 010 2zM32 23H25a1 1 0 010-2h7a1 1 0 010 2zM30 19H25a1 1 0 010-2h5a1 1 0 010 2z" class="color13e4ea svgShape"></path>
                  <path fill="#d4d4d4" d="M30.349,3h-12.7a3,3,0,0,0-2.884,3.824l.857,3A3.014,3.014,0,0,0,18.509,12H29.491a3.014,3.014,0,0,0,2.885-2.176l.857-3A3,3,0,0,0,30.349,3Z" class="coloraff9f7 svgShape"></path>
                  <rect width="6" height="6" x="16" y="17" fill="#7e7e7e" rx="1.714" class="color13e4ea svgShape"></rect>
                  <rect width="6" height="6" x="16" y="28" fill="#7e7e7e" rx="1.714" class="color13e4ea svgShape"></rect>
                  <path fill="#757575" d="M36,45H12a5.006,5.006,0,0,1-5-5V10a5.006,5.006,0,0,1,5-5h3.65a1,1,0,0,1,0,2H12a3,3,0,0,0-3,3V40a3,3,0,0,0,3,3H36a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3H32.35a1,1,0,0,1,0-2H36a5.006,5.006,0,0,1,5,5V40A5.006,5.006,0,0,1,36,45Z" class="color007da1 svgShape"></path>
                  <path fill="#757575" d="M35,41H13a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2h3.79a1,1,0,0,1,0,2H13V39H35V11H31.22a1,1,0,0,1,0-2H35a2,2,0,0,1,2,2V39A2,2,0,0,1,35,41Z" class="color007da1 svgShape"></path>
                  <path fill="#757575" d="M29.491,12H18.509a3.014,3.014,0,0,1-2.885-2.175l-.857-3A3,3,0,0,1,17.651,3h12.7a3,3,0,0,1,2.884,3.824l-.857,3A3.014,3.014,0,0,1,29.491,12ZM17.651,5a1,1,0,0,0-.961,1.275l.857,3a1,1,0,0,0,.962.725H29.491a1,1,0,0,0,.961-.725l.858-3A1,1,0,0,0,30.349,5Z" class="color007da1 svgShape"></path>
                </svg>

                <span className="ms-3">Data Kriteria</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/subkriteria') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/subkriteria')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 512 512" id="SalesClipboard">
                <path fill="#eeeeee" fill-rule="evenodd" d="M366.669 64.069c11.878 0 21.565 9.687 21.565 21.565v396.801c0 11.877-9.688 21.565-21.565 21.565H34.565C22.688 504 13 494.312 13 482.435V85.634c0-11.878 9.687-21.565 21.565-21.565h332.104z" clip-rule="evenodd" class="coloreceff1 svgShape"></path>
                <path fill="#e3e3e3" fill-rule="evenodd" d="M366.669 64.069c11.878 0 21.565 9.687 21.565 21.565v396.801c0 11.877-9.687 21.565-21.565 21.565H200.617V64.069h166.052z" clip-rule="evenodd" class="colore1e4e6 svgShape"></path>
                <path fill="#757575" fill-rule="evenodd" d="M127.591 36.035h37.389C168.859 19.95 183.342 8 200.617 8s31.758 11.95 35.637 28.035h37.389c5.508 0 10 4.492 10 10v36.07c0 5.507-4.492 10-10 10H127.591c-5.508 0-10-4.492-10-10v-36.07c0-5.508 4.492-10 10-10z" clip-rule="evenodd" class="color685e68 svgShape"></path>
                <path fill="#4e4e4e" fill-rule="evenodd" d="M200.617 8c17.275 0 31.758 11.95 35.637 28.035h37.389c5.508 0 10 4.492 10 10v36.07c0 5.508-4.492 10-10 10h-73.026V8z" clip-rule="evenodd" class="color544854 svgShape"></path>
                <path fill="#a1a1a1" fill-rule="evenodd" d="M189.213 176.234a8 8 0 0 1 0-16h106a8 8 0 0 1 0 16h-106zm0 266.591a8 8 0 0 1 0-16h69a8 8 0 0 1 0 16h-69zm0-33.5a8 8 0 0 1 0-16h106a8 8 0 0 1 0 16h-106zm0-83.045a8 8 0 0 1 0-16h69a8 8 0 0 1 0 16h-69zm0-33.501a8 8 0 0 1 0-16h106a8 8 0 0 1 0 16h-106zm0-83.045a8 8 0 0 1 0-16h69a8 8 0 0 1 0 16h-69z" clip-rule="evenodd" class="colora79ba7 svgShape"></path>
                <g fill-rule="evenodd" clip-rule="evenodd" fill="#000000" class="color000000 svgShape">
                  <path fill="#bababa" d="M77.06 147.483h59.473c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764H77.06c-4.27 0-7.764-3.493-7.764-7.764v-59.473c.001-4.27 3.494-7.764 7.764-7.764zm0 233.092h59.473c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764H77.06c-4.27 0-7.764-3.493-7.764-7.764v-59.473c.001-4.27 3.494-7.764 7.764-7.764zm0-116.546h59.473c4.27 0 7.764 3.493 7.764 7.763v59.473c0 4.27-3.493 7.764-7.764 7.764H77.06c-4.27 0-7.764-3.493-7.764-7.764v-59.473c.001-4.269 3.494-7.763 7.764-7.763z" class="colorf1ba84 svgShape"></path>
                  <path fill="#989898" d="M136.533 222.484c4.27 0 7.764-3.493 7.764-7.764v-59.473c0-4.27-3.493-7.764-7.764-7.764h-10.875c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764h10.875zm0 158.091h-10.875c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764h10.875c4.27 0 7.764-3.493 7.764-7.764v-59.473c0-4.27-3.494-7.764-7.764-7.764zm-10.875-41.545h10.875c4.27 0 7.764-3.493 7.764-7.764v-59.473c0-4.27-3.493-7.763-7.764-7.763h-10.875c4.27 0 7.764 3.493 7.764 7.763v59.473c-.001 4.27-3.494 7.764-7.764 7.764zm-10.862 41.545v17.224a8 8 0 0 1-16 0v-17.224h16zm0-116.546v17.224a8 8 0 0 1-16 0v-17.224h16zm0-116.546v17.224a8 8 0 0 1-16 0v-17.224h16z" class="colorde9252 svgShape"></path>
                </g>
                <g fill-rule="evenodd" clip-rule="evenodd" fill="#000000" class="color000000 svgShape">
                  <circle cx="411.499" cy="342.409" r="87.5" fill="#b1b1b1" class="colorfe646f svgShape"></circle>
                  <path fill="#a2a2a2" d="M411.499 254.909c48.325 0 87.5 39.175 87.5 87.5s-39.175 87.5-87.5 87.5v-175z" class="colorfd4755 svgShape"></path>
                  <path fill="#eeeeee" d="M437.71 292.64a7.971 7.971 0 0 1 12.938 9.312l-65.302 90.897a7.971 7.971 0 0 1-12.938-9.312l65.302-90.897zm-.267 65.339c-8.563 0-15.504 6.941-15.504 15.504 0 8.563 6.941 15.504 15.504 15.504 8.563 0 15.504-6.941 15.504-15.504 0-8.563-6.941-15.504-15.504-15.504zm-51.887-62.147c-8.563 0-15.504 6.941-15.504 15.504 0 8.563 6.941 15.504 15.504 15.504 8.563 0 15.504-6.941 15.504-15.504 0-8.563-6.94-15.504-15.504-15.504z" class="coloreceff1 svgShape"></path>
                </g>
              </svg>

                <span className="ms-3">Data Sub Kriteria</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/alternatif') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/alternatif')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="People">
                <path fill="#757575" d="M8.49578666,8 C9.32421378,8 9.99578666,8.67157288 9.99578666,9.5 L9.99500413,10.2483651 C10.0978758,12.0849239 8.68333886,13.0008101 6.06019361,13.0008101 C3.44551926,13.0008101 2,12.0969079 2,10.2745741 L2,9.5 C2,8.67157288 2.67157288,8 3.5,8 L8.49578666,8 Z M12.4963886,8 C13.3248157,8 13.9963886,8.67157288 13.9963886,9.5 L13.9956373,10.0265728 C14.0860521,11.6740351 12.8361745,12.5 10.5515945,12.5 C10.2414712,12.5 9.94992668,12.4848914 9.67765519,12.4546597 C10.2143644,11.9590361 10.5014697,11.2864584 10.5004904,10.4365689 L10.4942216,10.2204023 L10.4957867,9.5 C10.4957867,8.90242987 10.2337129,8.36607035 9.81823197,7.99958804 L12.4963886,8 Z M6,2 C7.38093559,2 8.50040506,3.11946948 8.50040506,4.50040506 C8.50040506,5.88134065 7.38093559,7.00081013 6,7.00081013 C4.61906441,7.00081013 3.49959494,5.88134065 3.49959494,4.50040506 C3.49959494,3.11946948 4.61906441,2 6,2 Z M11,3 C12.1045695,3 13,3.8954305 13,5 C13,6.1045695 12.1045695,7 11,7 C9.8954305,7 9,6.1045695 9,5 C9,3.8954305 9.8954305,3 11,3 Z" class="color212121 svgShape"></path>
                </svg>

                <span className="ms-3">Alternatif</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/penilaian') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/penilaian')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 100 100" viewBox="0 0 100 100" id="Websitelike">
                  <path d="M92.6 60H74.4l1.6-2c6-8 4-16 4.4-19.2 0-3-2.4-5.4-5.2-5.4-2.2 0-4 1.4-4.8 3.2-1.8 3.4-3.4 13.6-14 18.8L55 56c.2 1 0-1.2 0 37.4 0 .2 0 .2 0 .2 6.4 1.6 10 2.8 16 2.8h14.6c2.4 0 4.4-2 4.4-4.6s-2-4.6-4.4-4.6H88c2.4 0 4.4-2 4.4-4.6S90.4 78 88 78h2.4c2.4 0 4.4-2 4.4-4.6s-2-4.6-4.4-4.6h2c2.4 0 4.4-2 4.4-4.6C97 62 95 60 92.6 60zM47.2 97.4c2.2 0 4-1.8 4-4V57c0-2.2-1.8-4-4-4h-9.4c-3.2 0-6 2.6-6 6v32.4c0 3.4 2.8 6 6 6H47.2z" fill="#757575" class="color000000 svgShape"></path>
                  <path d="M12.8 70.2h14.8V58.8c0-5.6 4.4-10 10-10H47c2.6 0 5 1.4 6.4 3.4l1-.4c9-4.4 10.2-13.2 12-16.6 1.2-2.6 3.2-4.6 5.8-5.4H3v30.6C3 65.8 7.4 70.2 12.8 70.2zM91.6 56V29.8H77.8c3.8 1.2 6.4 4.8 6.4 9-.2 3.8 1 9.6-2.6 17.2H91.6zM91.6 12.4c0-5.4-4.4-9.8-9.8-9.8h-69C7.4 2.6 3 7 3 12.4v13.4h88.6V12.4zM47 17.8H14.8c-1.2 0-2-1-2-2s.8-2 2-2h32.4c1.2 0 2 1 2 2S48.2 17.8 47 17.8zM60.4 17.8h-3.8c-1 0-2-1-2-2s1-2 2-2h3.8c1 0 2 1 2 2S61.4 17.8 60.4 17.8zM70.2 17.8h-3.8c-1.2 0-2-1-2-2s.8-2 2-2h3.8c1.2 0 2 1 2 2S71.2 17.8 70.2 17.8zM80 17.8h-3.8c-1.2 0-2-1-2-2s.8-2 2-2H80c1 0 2 1 2 2S81 17.8 80 17.8z" fill="#757575" class="color000000 svgShape"></path>
                </svg>

                <span className="ms-3">Penilaian</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/perhitungan') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/perhitungan')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="calculation" x="0" y="0" enable-background="new 0 0 70 70" version="1.1" viewBox="0 0 70 70">
                  <path fill="#c5c5c5" d="M35,3v32H3V9.6C3,5.95,5.95,3,9.6,3H35z" class="color8f90fb svgShape"></path>
                  <path fill="#757575" d="M67,9.6V35H35V3h25.39C64.04,3,67,5.95,67,9.6z" class="color54e28e svgShape"></path>
                  <path fill="#afafaf" d="M35,35v32H9.6C5.95,67,3,64.04,3,60.39V35H35z" class="colorfbe063 svgShape"></path>
                  <path fill="#c5c5c5" d="M67,35v25.39c0,3.65-2.96,6.61-6.61,6.61H35V35H67z" class="color8f90fb svgShape"></path>
                  <path fill="#ffffff" d="M28.5 19c0 1.47-1.2 2.67-2.67 2.67h-4.16v4.16c0 1.47-1.2 2.67-2.67 2.67-1.47 0-2.67-1.2-2.67-2.67v-4.16h-4.16c-1.47 0-2.67-1.2-2.67-2.67 0-.73.3-1.4.78-1.89.49-.48 1.16-.78 1.89-.78h4.16v-4.16c0-1.47 1.2-2.67 2.67-2.67.74 0 1.4.3 1.89.78.48.49.78 1.15.78 1.89v4.16h4.16C27.3 16.33 28.5 17.53 28.5 19zM60.5 24.37c0 1.48-1.2 2.67-2.67 2.67H44.17c-1.47 0-2.66-1.19-2.66-2.66 0-.74.3-1.41.78-1.89.48-.48 1.15-.78 1.88-.78h13.66C59.3 21.71 60.5 22.9 60.5 24.37zM41.51 13.63c0-.74.3-1.41.78-1.89.48-.48 1.15-.78 1.88-.78h13.66c1.47 0 2.67 1.19 2.67 2.66 0 1.48-1.2 2.67-2.67 2.67H44.17C42.7 16.29 41.51 15.1 41.51 13.63zM57.72 44.28c1.04 1.04 1.04 2.74 0 3.78L54.78 51l2.94 2.94c1.04 1.04 1.04 2.74 0 3.78-1.04 1.04-2.74 1.04-3.78 0L51 54.78l-2.94 2.94c-1.04 1.04-2.74 1.04-3.78 0-.52-.52-.78-1.2-.79-1.89.01-.69.27-1.37.79-1.89L47.22 51l-2.94-2.94c-1.04-1.04-1.04-2.74 0-3.78.52-.52 1.2-.78 1.89-.78.69.01 1.36.26 1.89.78L51 47.22l2.94-2.94C54.98 43.24 56.68 43.24 57.72 44.28zM28.5 51c-.01 1.47-1.2 2.67-2.67 2.67H12.17c-1.47 0-2.67-1.2-2.67-2.67 0-.73.3-1.4.78-1.89.49-.48 1.16-.78 1.89-.78h13.66C27.3 48.33 28.5 49.53 28.5 51z" class="colorffffff svgShape"></path>
                </svg>
                <span className="ms-3">Perhitungan</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/datakeputusan') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/datakeputusan')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" id="Data">
                  <path fill="#757575" d="M3 3C1.89543 3 1 3.89543 1 5V11C1 11.4134 1.12542 11.7975 1.34029 12.1163L2.80997 7.07982C2.99669 6.43991 3.58332 6 4.24991 6H13.003V5.99612C13.003 4.89155 12.1076 3.99612 11.003 3.99612H6.17452L5.06508 3.10942C4.97645 3.03859 4.86637 3 4.75291 3H3Z" class="color212121 svgShape"></path>
                  <path fill="#757575" d="M14.9413 7.64027C15.0349 7.32021 14.7948 7 14.4614 7H4.24991C4.02771 7 3.83217 7.14664 3.76993 7.35994L2.3109 12.3599C2.21752 12.68 2.45753 13 2.79089 13H12.2505C12.9168 13 13.5033 12.5604 13.6902 11.9208L14.9413 7.64027Z" class="color212121 svgShape"></path>
                </svg>
                <span className="ms-3">Data Keputusan</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/user') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/user')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" id="Data">
                  <path fill="#757575" d="M3 3C1.89543 3 1 3.89543 1 5V11C1 11.4134 1.12542 11.7975 1.34029 12.1163L2.80997 7.07982C2.99669 6.43991 3.58332 6 4.24991 6H13.003V5.99612C13.003 4.89155 12.1076 3.99612 11.003 3.99612H6.17452L5.06508 3.10942C4.97645 3.03859 4.86637 3 4.75291 3H3Z" class="color212121 svgShape"></path>
                  <path fill="#757575" d="M14.9413 7.64027C15.0349 7.32021 14.7948 7 14.4614 7H4.24991C4.02771 7 3.83217 7.14664 3.76993 7.35994L2.3109 12.3599C2.21752 12.68 2.45753 13 2.79089 13H12.2505C12.9168 13 13.5033 12.5604 13.6902 11.9208L14.9413 7.64027Z" class="color212121 svgShape"></path>
                </svg>
                <span className="ms-3">Manajemen User</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/logout') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={handleLogout}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="Logout">
                  <path d="M53.22 43.92c-1.73 0-3.13 1.41-3.13 3.13l-.07 10.68-36.79-.07.07-51.39 36.79.07v10.6c0 1.73 1.4 3.14 3.13 3.14s3.14-1.41 3.14-3.14V5.85c0-3.23-2.63-5.85-5.85-5.85h-37.7C9.57 0 6.95 2.62 6.95 5.85v52.3c0 3.23 2.62 5.85 5.85 5.85h37.7c3.22 0 5.85-2.62 5.85-5.85V47.06c0-1.73-1.41-3.14-3.13-3.14z" fill="#757575" class="color000000 svgShape"></path>
                  <path d="M56.49 30.98 40.44 20.36c-.38-.25-.86-.27-1.26-.05-.4.21-.64.62-.64 1.08v4.24H16.4a.49.49 0 0 0-.49.49v11.76c0 .27.22.49.49.49h22.14v4.25c0 .45.24.86.64 1.08.19.1.39.14.59.14.23 0 .47-.06.67-.2L56.5 33.02c.34-.22.55-.61.55-1.02s-.22-.8-.56-1.02z" fill="#757575" class="color000000 svgShape"></path>
                </svg>

                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
