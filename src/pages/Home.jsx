import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo Atas.png";
import image from "../assets/g4.png";

export default function Home(){
    const navigate = useNavigate();

    return(
        <>
            <div className="relative isolate overflow-hidden bg-white">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
                </svg>
                <div className="mx-auto max-w-7xl h-screen px-6 pb-24 pt-10 sm:pb-32 lg:flex items-center lg:px-8 lg:py-12">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
                        <img
                            className="h-11 animate-ping absolute"
                            src={logo}
                            alt="Your Company"
                        />
                        <img
                            className="h-11 relative"
                            src={logo}
                            alt="Your Company"
                        />
                        <div className="mt-24 sm:mt-32 lg:mt-16">
                            <a href="#" className="inline-flex space-x-6">
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                                <span>CastleGym Management v1.0</span>
                            </span>
                            </a>
                        </div>
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Sistem Rekrutmen Personal Trainer
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Aplikasi berbasis web yang dapat membantu manajemen dalam memilih calon personal trainer terbaik yang akan bergabung di perusahaan.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <button
                            onClick={()=>navigate('/signin')}
                            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition duration-150 ease-in-out"
                            >
                            Mulai Penilaian
                            </button>
                        </div>
                        </div>
                        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-8 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <img
                                src={image}
                                alt="App screenshot"
                                width={2432}
                                height={1442}
                                className="w-[50rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                data-aos="fade-left"
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
