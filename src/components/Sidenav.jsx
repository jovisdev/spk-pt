import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

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
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 transition-transform sm:translate-x-0 ${
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
            <img src="src/assets/Logo Atas.png" className="h-12" alt="Logo" />
          </a>

          <ul className="space-y-2 font-medium">
            {/* Dashboard menu */}
            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/dashboard') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/dashboard')}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/kriteria') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/kriteria')}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6z" />
                </svg>
                <span className="ms-3">Data Kriteria</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/penilaian') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/penilaian')}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6z" />
                </svg>
                <span className="ms-3">Penilaian</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/alternatif') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/alternatif')}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6z" />
                </svg>
                <span className="ms-3">alternatif</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/datakeputusan') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/datakeputusan')}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6z" />
                </svg>
                <span className="ms-3">Data Keputusan</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/logout') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/logout')}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6z" />
                </svg>
                <span className="ms-3">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
