import Infouser from "../components/info-user";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logocg from "/src/assets/Logo Atas.png";

export default function DataKeputusan(){

    const [loading, setLoading] = useState(false)
    const [results,setResults] = useState([])

    // API
    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_DATASCORE);
                setResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const printRef = useRef();
    const handleCetak = async () => {

        const element = printRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
    
        // Mengatur ukuran gambar agar pas di halaman PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("document.pdf");
    }

    return(
      <>
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                
                <Infouser/>

                <div class="flex items-center mb-4 rounded bg-gray-50 p-4">
                    <div className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="16" height="32" enable-background="new 0 0 16 32" id="info">
                        <path d="M2 16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H0v4h16v-4h-1.992c-1.102 0-2-.895-2-2L12 12H0v4h2z" fill="#4e4e50"></path>
                        <circle cx="8" cy="4" r="4" fill="#4e4e50"></circle>
                        </svg>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700">Sistem yang dikembangkan hanya digunakan untuk membantu manajemen dalam proses pengambilan keputusan berdasarkan kriteria yang telah ditentukan, tanpa melibatkan proses rekrutmen penuh atau pelatihan personal trainer.</p>
                    </div>
                </div>

                { loading ? (
                            <div className="flex items-center justify-center p-40">
                                <RingLoader/>
                            </div>
                        ):(
                        <div ref={printRef} className="flex text-center items-center justify-center mx-4 my-10">
                            <div className="text-center">
                                <div className="flex justify-center w-full">
                                    <img className="w-72 mt-10" src={logocg} alt="" />
                                </div>
                                <h1 className="text-lg font-semibold text-gray-700 p-2">Data Keputusan</h1>
                                <table className="w-full h-full text-lg text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Prioritas</th>
                                            <th scope="col" className="px-6 py-3">Alternatif</th>
                                            <th scope="col" className="px-6 py-3">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((item, index) => (
                                            <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                                                <td className="px-6 py-4 w-1">{index + 1}</td>
                                                <td className="px-6 py-4">{item.alternatif}</td>
                                                <td className="px-6 py-4 space-x-2 w-1/4">{item.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                )}
                <button
                    type="button"
                    onClick={()=> handleCetak()}
                    className="p-4 font-medium text-blue-600 hover:underline"
                >
                    Cetak
                </button>
            </div>
        </div>
      </>
    )
  }