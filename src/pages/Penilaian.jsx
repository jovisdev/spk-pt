import { useParams, useLocation, useNavigate } from "react-router-dom";
import Infouser from "../components/info-user";
import { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function PenilaianAlternatif() {
    const { alternatif_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { nama, kode } = location.state || {};

    const [kriteria, setKriteria] = useState([]);
    const [subKriteria, setSubKriteria] = useState([]);
    const [penilaian, setPenilaian] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [kriteriaRes, subKriteriaRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_KRITERIA),
                    axios.get(import.meta.env.VITE_API_SUBKRITERIA),
                ]);
                setKriteria(kriteriaRes.data);
                setSubKriteria(subKriteriaRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAllData();
    }, []);

    const handleInputChange = (kriteriaId, value) => {
        setPenilaian((prev) => ({ ...prev, [kriteriaId]: value}));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = Object.entries(penilaian).map(([kriteriaId, nilai]) => ({
            alternatif_id : parseInt(alternatif_id),
            kriteria_id: parseInt(kriteriaId),
            nilai
        }));
        try {
            await axios.post(import.meta.env.VITE_API_ADDPENILAIAN, data);
            alert("Penilaian berhasil diperbarui.");
            setLoading(false);
            navigate("/penilaian");
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    };
    
    return (
        <>
        {loading ? (
            <div className="flex items-center justify-center p-40">
                <RingLoader/>
            </div>
        ) : (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                <Infouser />
                <div className="mb-4 p-4 bg-gray-50 rounded">
                    <p className="text-gray-700">
                    Mohon beri penilaian alternatif secara objektif dan jujur.
                    </p>
                </div>
                <h1 className="text-xl font-semibold text-gray-700">
                    Penilaian Kandidat: {nama || "Tidak Diketahui"}
                </h1>
                <p className="text-gray-500">Kode Alternatif: {kode}</p>
                {kriteria.length > 0 ? (  
                    <form onSubmit={handleAdd} className="space-y-4">
                    {kriteria.map((k) => (
                        <div key={k.id}>
                            <label className="block text-gray-700 font-medium mb-1">
                                {k.kriteria}
                            </label>
                            {k.tipe === "Kuantitatif" ? (
                                <input
                                    type="number"
                                    value={penilaian[k.id] || ""}
                                    onChange={(e) => handleInputChange(k.id, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            ) : (
                                <select
                                    value={penilaian[k.id] || ""}
                                    onChange={(e) => handleInputChange(k.id, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih nilai untuk {k.kriteria}
                                    </option>
                                    {subKriteria
                                        .filter((sk) => sk.kriteria_id === k.id)
                                        .map((sk) => (
                                            <option key={sk.id} value={sk.bobot}>
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
                            onClick={() => navigate("/penilaian")}
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
                    </form>):(
                        <p className="text-gray-500">Tidak ada kriteria yang tersedia.</p>
                    )}
            </div>
        </div>)}
    </>
    );
}
