import { useEffect, useState } from "react"
import Infouser from "../components/info-user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function PenilaianReview(){

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
                const [kriteriaRes, alternatifRes, subKriteriares, penilaianRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_KRITERIA),
                    axios.get(import.meta.env.VITE_API_ALTERNATIF),
                    axios.get(import.meta.env.VITE_API_SUBKRITERIA),
                    axios.get(import.meta.env.VITE_API_PENILAIANAWAL),
                ]);
    
                const kriteria = kriteriaRes.data;
                const alternatif = alternatifRes.data;
                const subKriteria = subKriteriares.data;
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

    // reset penilaian
    const handleDelete = async () => {
        setLoading(true);
        try {
            // Kirim permintaan DELETE untuk item yang dipilih
            const response = await axios.delete(import.meta.env.VITE_API_RESETPENILAIAN);
    
            // Periksa status dari respons
            if (response.status === 200) {
                window.alert(response.data.message);
                setLoading(false);
                navigate('/penilaian')
            }

        } catch (error) {
            alert('Kriteria memiliki subkritera, silahkan hapus subkriteria terlebih dahulu')
        } finally {
            setLoading(false);
        }
    };
    
    return(
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <Infouser />

                    <div className="flex items-center mb-4 rounded bg-gray-50 p-4">
                    <div className="p-2">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 100 100" viewBox="0 0 100 100" id="Websitelike">
                            <path d="M92.6 60H74.4l1.6-2c6-8 4-16 4.4-19.2 0-3-2.4-5.4-5.2-5.4-2.2 0-4 1.4-4.8 3.2-1.8 3.4-3.4 13.6-14 18.8L55 56c.2 1 0-1.2 0 37.4 0 .2 0 .2 0 .2 6.4 1.6 10 2.8 16 2.8h14.6c2.4 0 4.4-2 4.4-4.6s-2-4.6-4.4-4.6H88c2.4 0 4.4-2 4.4-4.6S90.4 78 88 78h2.4c2.4 0 4.4-2 4.4-4.6s-2-4.6-4.4-4.6h2c2.4 0 4.4-2 4.4-4.6C97 62 95 60 92.6 60zM47.2 97.4c2.2 0 4-1.8 4-4V57c0-2.2-1.8-4-4-4h-9.4c-3.2 0-6 2.6-6 6v32.4c0 3.4 2.8 6 6 6H47.2z" fill="#757575" class="color000000 svgShape"></path>
                            <path d="M12.8 70.2h14.8V58.8c0-5.6 4.4-10 10-10H47c2.6 0 5 1.4 6.4 3.4l1-.4c9-4.4 10.2-13.2 12-16.6 1.2-2.6 3.2-4.6 5.8-5.4H3v30.6C3 65.8 7.4 70.2 12.8 70.2zM91.6 56V29.8H77.8c3.8 1.2 6.4 4.8 6.4 9-.2 3.8 1 9.6-2.6 17.2H91.6zM91.6 12.4c0-5.4-4.4-9.8-9.8-9.8h-69C7.4 2.6 3 7 3 12.4v13.4h88.6V12.4zM47 17.8H14.8c-1.2 0-2-1-2-2s.8-2 2-2h32.4c1.2 0 2 1 2 2S48.2 17.8 47 17.8zM60.4 17.8h-3.8c-1 0-2-1-2-2s1-2 2-2h3.8c1 0 2 1 2 2S61.4 17.8 60.4 17.8zM70.2 17.8h-3.8c-1.2 0-2-1-2-2s.8-2 2-2h3.8c1.2 0 2 1 2 2S71.2 17.8 70.2 17.8zM80 17.8h-3.8c-1.2 0-2-1-2-2s.8-2 2-2H80c1 0 2 1 2 2S81 17.8 80 17.8z" fill="#757575" class="color000000 svgShape"></path>
                        </svg>
                    </div>
                    <div className="p-2">
                        <h1 className="text-3xl font-semibold text-gray-700">Data Penilaian</h1>
                    </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-screen">
                            <RingLoader/>
                        </div>
                    ):(
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

                        <div className="flex space-x-2 justify-end m-2">
                            <button
                                onClick={() => navigate("/penilaian")}
                                className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                            >
                                kembali
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white text-sm p-2 rounded transition hover:bg-red-400"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}