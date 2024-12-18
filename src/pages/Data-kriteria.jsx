import Infouser from "../components/info-user";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Kriteria() {
    // State untuk data kriteria
    const [kriteria, setKriteria] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Ambil data dari API
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

    // Hitung total bobot
    const totalBobot = kriteria.reduce((sum, item) => sum + parseFloat(item.bobot || 0), 0).toFixed(2);

    // Validasi jika total bobot lebih dari 1
    useEffect(() => {
        if (totalBobot > 1) {
            setError("Total bobot tidak boleh lebih dari 1.");
        } else {
            setError("");
        }
    }, [totalBobot]);

    // Toggle form/modal
    const toggleForm = (item) => {
        setSelectedItem(item);
        setValue(item.bobot || ""); // Isi nilai input dengan bobot yang ada
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
        setValue("");
    };

    // Input handler untuk bobot
    const handleInputWeight = (e) => {
        const inputValue = e.target.value;

        // Validasi agar nilai input <= 1
        if (parseFloat(inputValue) + totalBobot - parseFloat(selectedItem?.bobot || 0) > 1) {
            setError("Total bobot tidak boleh lebih dari 1.");
            return;
        } else {
            setError("");
        }

        setValue(inputValue);
        setSelectedItem({ ...selectedItem, bobot: inputValue });
    };

    // Simpan perubahan bobot
    const saveChanges = () => {
        const updatedKriteria = kriteria.map((item) =>
            item.id === selectedItem.id ? { ...selectedItem, bobot: parseFloat(value) } : item
        );
        setKriteria(updatedKriteria);
        closeModal();
    };

    // Generate kode baru
    const generateNewCode = () => {
        const lastCode = kriteria[kriteria.length - 1]?.kode || "C0";
        const newNumber = parseInt(lastCode.replace("C", ""), 10) + 1;
        return `C${newNumber}`;
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

                    <div className="flex justify-end m-2">
                        <button className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition" onClick={toggleForm}>Tambah Kirteria</button>
                    </div>

                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-1">Kode</th>
                                    <th scope="col" className="px-6 py-3">Kriteria</th>
                                    <th scope="col" className="px-6 py-3">Jenis</th>
                                    <th scope="col" className="px-6 py-3">Tipe</th>
                                    <th scope="col" className="px-6 py-3">Bobot</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kriteria.map((item) => (
                                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4 w-1">{item.kode}</td>
                                        <td className="px-6 py-4">{item.kriteria}</td>
                                        <td className="px-6 py-4">{item.jenis}</td>
                                        <td className="px-6 py-4">{item.tipe}</td>
                                        <td className="px-6 py-4">{item.bobot}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            <button
                                                onClick={() => toggleForm(item)}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Ubah
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(item)}
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100 border-t">
                                    <td colSpan="4" className="px-6 py-4 font-semibold text-gray-700">
                                        Total Bobot
                                    </td>
                                    <td colSpan="2" className="px-6 py-4 font-semibold text-gray-900">
                                        {totalBobot}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                        <div className="flex justify-end m-2">
                            <button
                                className={`bg-gray-800 text-white text-sm p-2 rounded transition ${
                                    totalBobot > 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-gray-700"
                                }`}
                                disabled={totalBobot > 1}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Buat Kriteria</h2>
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
                                    Kode
                                </label>
                                <input
                                    type="text"
                                    name="newKode"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={generateNewCode()} // Menggunakan kode baru
                                    disabled // Membuat input tidak dapat diedit
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kriteria
                                </label>
                                <input
                                    type="text"
                                    name="kriteria"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Kriteria"
                                    value={selectedItem.kriteria}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, kriteria: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kategori
                                </label>
                                <select
                                    name="kategori"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={selectedItem.kategori}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, kategori: e.target.value })
                                    }
                                >
                                    <option value="Benefit">Benefit</option>
                                    <option value="Cost">Cost</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Jenis
                                </label>
                                <select
                                    name="jenis"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={selectedItem.tipe}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, tipe: e.target.value })
                                    }
                                >
                                    <option value="Kualitatif">Kualitatif</option>
                                    <option value="Kuantitatif">Kuantitatif</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Bobot
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="1"
                                    value={selectedItem.bobot}
                                    onChange={handleInputWeight}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan bobot (0.0 - 1.0)"
                                />
                                {error && (
                                    <p className="text-red-600 text-sm">Bobot maksimal 1.</p>
                                )}
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
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Tambah
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
