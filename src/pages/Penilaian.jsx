import { useParams, useLocation } from "react-router-dom";
import Infouser from "../components/info-user";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PenilaianAlternatif() {

    const [kriteria, setKriteria] = useState([]);
    const [subKriteria, setSubKriteria] = useState([]);

    // API
    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_KRITERIA);
                setKriteria(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_SUBKRITERIA);
                setSubKriteria(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const { id } = useParams();
    const location = useLocation();
    const { nama } = location.state || {}; // Ambil nama dari state navigasi

    return (
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
                    <div>
                        <h1 className="text-xl font-semibold text-gray-700">
                            Penilaian Kandidat: {nama || "Tidak Diketahui"}
                        </h1>
                        <p className="text-gray-500">ID Pelamar: {id}</p>
                    </div>
                    <form className="space-y-2">
                        {kriteria.map((k) => (
                            <div key={k.id}>
                                <label className="block text-gray-700 font-medium mb-1">
                                    {k.kriteria} (ID Kriteria: {k.id})
                                </label>
                                {k.tipe === "Kuantitatif" ? (
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                />
                                ) : (
                                    <select
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    >
                                <option value="" disabled>
                                    Pilih nilai untuk {k.kriteria}
                                </option>
                                {subKriteria
                                .filter((sk) => sk.kriteria_id === k.id)
                                .map((sk) => (
                                    <option>
                                        {sk.subkriteria}
                                    </option>
                                ))}
                                    </select>
                                )}
                            </div>

                        ))}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    );
};