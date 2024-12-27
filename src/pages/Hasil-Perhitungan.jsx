import Infouser from "../components/info-user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function HasilPerhitungan(){

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [prioritas, setPrioritas] = useState([])

    // API
    // GET DATA

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const response = await axios(import.meta.env.VITE_API_DATAPREPARE)
                const dataPriority = response.data.priority
                setPrioritas(dataPriority)

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAllData();
    }, []);

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
                <div className="border-2 border-gray-200">
                    <h1 className="m-2 text-gray-700 text-lg font-semibold">Konversi Data Awal</h1>
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Prioritas</th>
                                    <th scope="col" className="px-6 py-3">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                            {prioritas.length > 0 ? (
                                prioritas.map((item) => (
                                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{item.alternatif}</td>
                                        <td className="px-6 py-4">{item.score}</td>
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

                        <div className="flex justify-end m-2">
                            <button
                                className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                            >
                                Simpan Hasil
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
      </>
    )
  }