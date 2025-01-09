import Infouser from "../components/info-user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function Perhitungan(){

    const navigate = useNavigate()

    const [kriteria, setKriteria] = useState([])
    const [alternatif, setAlternatif] = useState([])
    const [loading, setLoading] = useState(false)

    // API
    // GET DATA

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [kriteriaRes, alternatifRes, penilaianRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_KRITERIA),
                    axios.get(import.meta.env.VITE_API_ALTERNATIF),
                    axios.get(import.meta.env.VITE_API_PENILAIANAWAL),
                ]);
    
                const kriteria = kriteriaRes.data;
                const alternatif = alternatifRes.data;
                const penilaian = penilaianRes.data;
    
                // Gabungkan penilaian ke alternatif
                const alternatifWithPenilaian = alternatif.map((item) => {
                    const nilai = kriteria.map((k) => {
                        // Cari nilai berdasarkan alternatif_id dan kriteria_id
                        const matchedPenilaian = penilaian.find(
                            (p) => p.alternatif_id === item.id && p.kriteria_id === k.id
                        );
                        return matchedPenilaian ? matchedPenilaian.nilai : '-';
                    });
                    return { ...item, nilai }; // Tambahkan nilai ke setiap alternatif
                });
    
                setKriteria(kriteria);
                setAlternatif(alternatifWithPenilaian);
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
                    <h1 className="m-2 text-gray-700 text-lg font-semibold">Data Awal</h1>
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Kode</th>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    {kriteria.length > 0 ? (
                                        kriteria.map((item) => (
                                            <th key={item.id} scope="col" className="px-6 py-3">{item.kriteria}</th>
                                        ))
                                    ) : (
                                        <th colSpan="6" className="text-center py-4">Tidak ada data</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                            {alternatif.length > 0 ? (
                                alternatif.map((item) => (
                                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{item.kode}</td>
                                        <td className="px-6 py-4">{item.nama}</td>
                                        {item.nilai.map((n, index) => (
                                            <td key={index} className="px-6 py-4">
                                                {n}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={kriteria.length + 2} className="px-6 py-4 text-center">
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}

                            </tbody>
                        </table>

                        <div className="flex justify-end m-2">
                            <button
                                onClick={() => navigate("/perhitungan/metode")}
                                className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                            >
                                Konversi
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