import Infouser from "../components/info-user";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logocg from "/src/assets/Logo Atas.png";

export default function HasilPerhitungan(){

    const [loading, setLoading] = useState(false)

    const [prioritas, setPrioritas] = useState([])

    // API
    // GET DATA

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_DATAPREPARE)
                const dataPriority = response.data.priority
                const dataAlternatif = dataPriority.map((item) => ({alternatif: item.alternatif}))
                const dataScore = dataPriority.map((item) => ({score: item.score}))
                setPrioritas(dataPriority)
                setAlternatif(dataAlternatif)
                setScore(dataScore)

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally{
                setLoading(false)
            }
        };
        fetchAllData();
    }, []);

    const printRef = useRef();
    const handleCetak = async () => {

        if(prioritas.length > 0){
            const element = printRef.current;
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
        
            // Mengatur ukuran gambar agar pas di halaman PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("document.pdf");
        }else{
            alert('tidak ada data yang dicetak')
        }
    }

    return(
      <>
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                
                <Infouser/>

                <div class="flex items-center justify-center mb-4 rounded bg-gray-50 p-4">
                    <div className="p-2 text-center">
                        <h1 className="text-gray-700 text-xl font-semibold">PERHITUGAN METODE MABAC</h1>
                        <p className="text-gray-700 italic text-sm">(MULTI ATTRIBUTIVE BORDER APPROXIMATION AREA COMPARISON)</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center">
                        <RingLoader/>
                    </div>
                ):(
                <div>
                    <div ref={printRef}>
                        <div className="px-4 py-2">
                            <div className="flex justify-center w-full">
                                <img className="w-2/3 mt-6" src={logocg} alt="" />
                            </div>
                            <div className="flex justify-center w-full">
                                <h1 className="m-2 text-gray-700 text-3xl font-semibold">Sistem Rekrutmen Personal Trainer</h1>
                            </div>
                            <div className="flex justify-center w-full">
                                <h1 className="mb-8 text-gray-700 text-3xl font-semibold">Nilai Akhir</h1>
                            </div>
                            <div className="flex justify-center w-full">
                                <h1 className="mb-8 text-gray-700 text-3xl font-semibold">Dicetak : {new Date().toLocaleString()}</h1>
                            </div>
                            <div>
                                <div className="relative overflow-x-auto sm:rounded-lg flex justify-center">
                                    <table className="w-2/3 border-4 rounded text-4xl text-gray-700">
                                        <thead className="text-left text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3">No</th>
                                                <th className="px-6 py-3">Prioritas</th>
                                                <th className="px-6 py-3 text-center">Nilai Akhir</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {prioritas.length > 0 ? (
                                            prioritas.map((item,index) => (
                                                <tr className="odd:bg-white even:bg-gray-50 border-b">
                                                    <td className="px-6 py-4">{index + 1}</td>
                                                    <td className="px-6 py-4">{item.alternatif}</td>
                                                    <td className="px-6 py-4 text-center">{item.score}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={prioritas.length + 2} className="px-6 py-4 text-center">
                                                    Tidak ada data.
                                                </td>
                                            </tr>
                                        )}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center w-full">
                                    <h1 className="mt-8 text-gray-700 text-3xl font-semibold">Diketahui Oleh</h1>
                                </div>
                                <div className="flex justify-center w-full">
                                    <h1 className="mt-36 underline text-gray-700 text-3xl font-semibold">Jamalludin Basalamah</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="flex justify-end m-2">
                    <button
                        type="button"
                        onClick={handleCetak}
                        className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                    >
                    Cetak
                    </button>
                </div>
                </div>
                )}
            </div>
        </div>
      </>
    )
  }