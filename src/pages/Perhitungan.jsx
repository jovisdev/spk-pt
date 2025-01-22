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

                <div class="flex items-center mb-4 rounded bg-gray-50 p-4">
                <div className="p-2">
                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="calculation" x="0" y="0" enable-background="new 0 0 70 70" version="1.1" viewBox="0 0 70 70">
                    <path fill="#c5c5c5" d="M35,3v32H3V9.6C3,5.95,5.95,3,9.6,3H35z" class="color8f90fb svgShape"></path>
                    <path fill="#757575" d="M67,9.6V35H35V3h25.39C64.04,3,67,5.95,67,9.6z" class="color54e28e svgShape"></path>
                    <path fill="#afafaf" d="M35,35v32H9.6C5.95,67,3,64.04,3,60.39V35H35z" class="colorfbe063 svgShape"></path>
                    <path fill="#c5c5c5" d="M67,35v25.39c0,3.65-2.96,6.61-6.61,6.61H35V35H67z" class="color8f90fb svgShape"></path>
                    <path fill="#ffffff" d="M28.5 19c0 1.47-1.2 2.67-2.67 2.67h-4.16v4.16c0 1.47-1.2 2.67-2.67 2.67-1.47 0-2.67-1.2-2.67-2.67v-4.16h-4.16c-1.47 0-2.67-1.2-2.67-2.67 0-.73.3-1.4.78-1.89.49-.48 1.16-.78 1.89-.78h4.16v-4.16c0-1.47 1.2-2.67 2.67-2.67.74 0 1.4.3 1.89.78.48.49.78 1.15.78 1.89v4.16h4.16C27.3 16.33 28.5 17.53 28.5 19zM60.5 24.37c0 1.48-1.2 2.67-2.67 2.67H44.17c-1.47 0-2.66-1.19-2.66-2.66 0-.74.3-1.41.78-1.89.48-.48 1.15-.78 1.88-.78h13.66C59.3 21.71 60.5 22.9 60.5 24.37zM41.51 13.63c0-.74.3-1.41.78-1.89.48-.48 1.15-.78 1.88-.78h13.66c1.47 0 2.67 1.19 2.67 2.66 0 1.48-1.2 2.67-2.67 2.67H44.17C42.7 16.29 41.51 15.1 41.51 13.63zM57.72 44.28c1.04 1.04 1.04 2.74 0 3.78L54.78 51l2.94 2.94c1.04 1.04 1.04 2.74 0 3.78-1.04 1.04-2.74 1.04-3.78 0L51 54.78l-2.94 2.94c-1.04 1.04-2.74 1.04-3.78 0-.52-.52-.78-1.2-.79-1.89.01-.69.27-1.37.79-1.89L47.22 51l-2.94-2.94c-1.04-1.04-1.04-2.74 0-3.78.52-.52 1.2-.78 1.89-.78.69.01 1.36.26 1.89.78L51 47.22l2.94-2.94C54.98 43.24 56.68 43.24 57.72 44.28zM28.5 51c-.01 1.47-1.2 2.67-2.67 2.67H12.17c-1.47 0-2.67-1.2-2.67-2.67 0-.73.3-1.4.78-1.89.49-.48 1.16-.78 1.89-.78h13.66C27.3 48.33 28.5 49.53 28.5 51z" class="colorffffff svgShape"></path>
                    </svg>
                </div>
                <div className="p-2">
                    <h1 className="text-3xl font-semibold text-gray-700">Perhitungan</h1>
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