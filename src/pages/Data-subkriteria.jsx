import Infouser from "../components/info-user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function SubKriteria() {

    const navigate = useNavigate();

    const [isOpenTambah, setIsOpenTambah] = useState(false);
    const [isOpenUbah, setIsOpenUbah] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState("");
    const [itemsSubKriteria, setSubKriteria] = useState([]);
    const [itemsKriteria, setKriteria] = useState([]);

    const [subKriteriain, setSubKriteriain] = useState('');
    const [bobot, setBobot] = useState('');

    const [loading, setLoading] = useState(false);

    //  / Toggle form/modal ubah
    const toggleFormUbah = (skriteria) => {
        setSelectedItem(skriteria);
        setValue(skriteria.bobot || ""); // Isi nilai input dengan bobot yang ada
        setIsOpenUbah(true);
    };
    const toggleFormTambah = (kriteria) => {
        setSelectedItem(kriteria)
        setIsOpenTambah(true)
    }
    const closeModal = () => {
        setIsOpenTambah(false);
        setIsOpenUbah(false)
        setSelectedItem(null);
        setValue("");
    };

    // Input handler untuk bobot
    const handleInputWeight = (e) => {
        const inputValue = e.target.value;

        setValue(inputValue);
        setSelectedItem({ ...selectedItem, bobot: inputValue });
    };

    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [subkriteriaRes, kriteriaRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_SUBKRITERIA),
                    axios.get(import.meta.env.VITE_API_KRITERIA),
                ]);
                const subKriteriadData = subkriteriaRes.data;
                const kriteriaData = kriteriaRes.data;
                setSubKriteria(subKriteriadData);
                setKriteria(kriteriaData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            kriteria_id : selectedItem.id,
            subkriteria : subKriteriain,
            bobot: parseFloat(bobot),
        };
    
        try {
            const response = await axios.post(import.meta.env.VITE_API_ADDSUBKRITERIA, data);
            setSubKriteriain('');
            setBobot('');
            if (response.status === 200 || response.status === 201) {
                setLoading(false);
                window.alert('Sub Kriteria berhasil ditambahkan.');
                closeModal();
            }
            window.location.reload();
        } catch (error) {
            // Tangani error
            console.error('Terjadi kesalahan:', error);
            window.alert('Terjadi kesalahan saat menambahkan subkriteria.');
        }
    }
    
    // ubah subkriteria
    const ubah = async () => {
        setLoading(true);
        try {
            const updatedItem = { ...selectedItem, bobot: parseFloat(value) };
    
            const response = await axios.put(
                `${import.meta.env.VITE_API_UPDATESUBKRITERIA}/${updatedItem.id}`,
                updatedItem
            );
    
            if (response.status === 200 || response.status === 201) {
                window.alert('Perubahan berhasil disimpan.');
                const updatedKriteria = itemsSubKriteria.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                );
                setLoading(false);
                setSubKriteria(updatedKriteria);
                closeModal(); // Menutup modal setelah sukses
            } else {
                window.alert('Gagal menyimpan perubahan.');
            }
        } catch (error) {
            console.error('Error saat menyimpan perubahan:', error);
            window.alert('Terjadi kesalahan saat menyimpan perubahan.');
        }
    };

    // hapus subkriteria
    const handleDelete = async (skriteria) => {
        setLoading(true);
        try {
            // Kirim permintaan DELETE untuk item yang dipilih
            const response = await axios.delete(`${import.meta.env.VITE_API_DELETESUBKRITERIA}/${skriteria.id}`);
    
            // Periksa status dari respons
            if (response.status === 200) {
                window.alert(response.data.message);
    
                // Hapus item yang dipilih dari state kriteria
                const updatedSubKriteria = itemsSubKriteria.filter(s => s.id !== skriteria.id);
                setLoading(false);
                setSubKriteria(updatedSubKriteria);
                closeModal();
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat menghapus data.', error);
        }
    };

    return (
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

                    {/* area tabel */}
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <RingLoader/>
                        </div>
                    ):(
                    itemsKriteria
                    .filter((kriteria) => kriteria.tipe !== "Kuantitatif")
                    .map((kriteria) => {
                        const subkriteria = itemsSubKriteria.filter(
                            (skriteria) => skriteria.kriteria_id === kriteria.id
                        );

                        return (
                            <div key={kriteria.id} className="border border-gray-300 shadow rounded-md mb-4">
                                <div className="flex justify-between m-2">
                                    <h1 className="text-gray-700 font-semibold">
                                        {kriteria.kriteria} - {kriteria.kode}
                                    </h1>
                                    <button
                                        className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition"
                                        onClick={() => toggleFormTambah(kriteria)}
                                    >
                                        Tambah Subkriteria
                                    </button>
                                </div>

                                <div className="relative overflow-x-auto sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">No</th>
                                                <th scope="col" className="px-6 py-3">Sub Kriteria</th>
                                                <th scope="col" className="px-6 py-3">Bobot</th>
                                                <th scope="col" className="px-6 py-3">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subkriteria.length > 0 ? (
                                                subkriteria.map((skriteria, index) => (
                                                    <tr key={skriteria.id} className="odd:bg-white even:bg-gray-50 border-b">
                                                        <td className="px-6 py-4">{index + 1}</td>
                                                        <td className="px-6 py-4">{skriteria.subkriteria}</td>
                                                        <td className="px-6 py-4">{skriteria.bobot}</td>
                                                        <td className="px-6 py-4 space-x-2">
                                                            <button
                                                                onClick={() => toggleFormUbah(skriteria)}
                                                                className="font-medium text-blue-600 hover:underline"
                                                            >
                                                                Ubah
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(skriteria)}
                                                                className="font-medium text-red-600 hover:underline"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-600">
                                                        Tidak ada subkriteria untuk kriteria ini.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                    )}

                    <div className="flex justify-end m-2">
                        <button
                            onClick={()=>navigate('/alternatif')}
                            className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                        >
                            Oke
                        </button>
                    </div>
                    {/* area tabel */}

                </div>
                {isOpenTambah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Buat Sub Kriteria {selectedItem.kriteria}</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Sub Kriteria
                                </label>
                                <input
                                    type="text"
                                    name="subkriteria"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Sub Kriteria"
                                    onChange={(e) =>setSubKriteriain(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Bobot
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan bobot"
                                    onChange={(e) =>setBobot(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Tambah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}

                {isOpenUbah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Ubah Sub Kriteria</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Sub Kriteria
                                </label>
                                <input
                                    type="text"
                                    name="subkriteria"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan sub Kriteria"
                                    value={selectedItem.subkriteria}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, subkriteria: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Bobot
                                </label>
                                <input
                                    type="number"
                                    value={selectedItem.bobot}
                                    onChange={handleInputWeight}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan bobot"
                                />
                            </div>
                            
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>
                                <button
                                type="button"
                                    onClick={ubah}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Ubah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}
