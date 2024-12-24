import { useEffect, useState } from "react"
import Infouser from "../components/info-user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PenilaianReview(){

    const navigate = useNavigate()

    const [kriteria, setKriteria] = useState([])
    const [alternatif, setAlternatif] = useState([])

    // API
    // GET DATA

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [kriteriaRes, alternatifRes, penilaianRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_KRITERIA),
                    axios.get(import.meta.env.VITE_API_ALTERNATIF),
                    axios.get(import.meta.env.VITE_API_PENILAIAN),
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
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAllData();
    }, []);
    
    

    return(
        <>
             <div className="p-4 sm:ml-64">
                            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                                <Infouser />
            
                                <div className="flex items-center mb-4 rounded bg-gray-50 p-4">
                                    <div className="p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="16" height="32" enableBackground="new 0 0 16 32" id="info">
                                            <path d="M2 16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H0v4h16v-4h-1.992c-1.102 0-2-.895-2-2L12 12H0v4h2z" fill="#4e4e50"></path>
                                            <circle cx="8" cy="4" r="4" fill="#4e4e50"></circle>
                                        </svg>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-gray-700">Sistem yang dikembangkan hanya digunakan untuk membantu manajemen dalam proses pengambilan keputusan berdasarkan kriteria yang telah ditentukan, tanpa melibatkan proses rekrutmen penuh atau pelatihan personal trainer.</p>
                                    </div>
                                </div>
            
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
                                            onClick={() => navigate("/penilaian")}
                                            className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                                        >
                                            kembali
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )
}