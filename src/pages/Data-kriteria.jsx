import Infouser from "../components/info-user";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function Kriteria() {

    // State untuk data kriteria
    const [kriteria, setKriteria] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState("");
    const [isOpenUbah, setIsOpenUbah] = useState(false);
    const [isOpenTambah, setIsOpenTambah] = useState(false);
    const [loading, setLoading] = useState(false);


    // API
    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_KRITERIA);
                setKriteria(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // tambah kriteria
    const [kode, setKode] = useState('');
    const [kriteriain, setKriteriain] = useState('');
    const [jenis, setJenis] = useState('');
    const [bobot, setBobot] = useState('');
    const [tipe, setTipe] = useState('');

    const validateForm = () => {
        return kode && kriteriain && jenis && bobot && tipe;
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            kode,
            kriteriain,
            jenis,
            bobot: parseFloat(bobot),
            tipe,
        };
    
        try {
            const response = await axios.post(import.meta.env.VITE_API_ADDKRITERIA, data);
            setKriteriain('');
            setJenis('');
            setBobot('');
            setTipe('');
            if (response.status === 200 || response.status === 201) {
                window.alert('Kriteria berhasil ditambahkan.');
                closeModal()
            }
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    // Toggle form/modal ubah
    const toggleFormUbah = (item) => {
        setSelectedItem(item);
        setValue(item.bobot || ""); // Isi nilai input dengan bobot yang ada
        setIsOpenUbah(true);
    };
    const toggleFormTambah = () => {
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

    const ubah = async () => {
        setLoading(true);
        try {
            const updatedItem = { ...selectedItem, bobot: parseFloat(value) };
    
            const response = await axios.put(
                `${import.meta.env.VITE_API_UPDATEKRITERIA}/${updatedItem.id}`,
                updatedItem
            );
    
            if (response.status === 200 || response.status === 201) {
                window.alert('Perubahan berhasil disimpan.');
                const updatedKriteria = kriteria.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                );
                setLoading(false);
                setKriteria(updatedKriteria);
                closeModal(); // Menutup modal setelah sukses
            } else {
                window.alert('Gagal menyimpan perubahan.');
            }
        } catch (error) {
            console.error('Error saat menyimpan perubahan:', error);
            window.alert('Terjadi kesalahan saat menyimpan perubahan.');
        }
    };

    const validateFormUbah = () => {
        return (
            selectedItem.kriteria?.trim() &&
            selectedItem.jenis?.trim() &&
            String(selectedItem.bobot)?.trim() &&
            selectedItem.tipe?.trim()
        );
    };

    // hapus kriteria
    const handleDelete = async (item) => {
        setLoading(true);
        try {
            // Kirim permintaan DELETE untuk item yang dipilih
            const response = await axios.delete(`${import.meta.env.VITE_API_DELETEKRITERIA}/${item.id}`);
    
            // Periksa status dari respons
            if (response.status === 200) {
                window.alert(response.data.message);
    
                // Hapus item yang dipilih dari state kriteria
                const updatedKriteria = kriteria.filter(k => k.id !== item.id);
                setLoading(false);
                setKriteria(updatedKriteria);
            }

        } catch (error) {
            alert('Kriteria memiliki subkritera, silahkan hapus subkriteria terlebih dahulu')
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <Infouser />

                    <div className="flex items-center mb-4 rounded bg-gray-50 p-4">
                        <div className="p-2">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Checklist">
                                <rect width="34" height="40" x="7" y="5" fill="#7e7e7e" rx="5" class="color13e4ea svgShape"></rect>
                                <rect width="26" height="32" x="11" y="9" fill="#f7f7f7" rx="2" class="colorf9f5f5 svgShape"></rect>
                                <path fill="#7e7e7e" d="M32 34H25a1 1 0 010-2h7a1 1 0 010 2zM30 30H25a1 1 0 010-2h5a1 1 0 010 2zM32 23H25a1 1 0 010-2h7a1 1 0 010 2zM30 19H25a1 1 0 010-2h5a1 1 0 010 2z" class="color13e4ea svgShape"></path>
                                <path fill="#d4d4d4" d="M30.349,3h-12.7a3,3,0,0,0-2.884,3.824l.857,3A3.014,3.014,0,0,0,18.509,12H29.491a3.014,3.014,0,0,0,2.885-2.176l.857-3A3,3,0,0,0,30.349,3Z" class="coloraff9f7 svgShape"></path>
                                <rect width="6" height="6" x="16" y="17" fill="#7e7e7e" rx="1.714" class="color13e4ea svgShape"></rect>
                                <rect width="6" height="6" x="16" y="28" fill="#7e7e7e" rx="1.714" class="color13e4ea svgShape"></rect>
                                <path fill="#757575" d="M36,45H12a5.006,5.006,0,0,1-5-5V10a5.006,5.006,0,0,1,5-5h3.65a1,1,0,0,1,0,2H12a3,3,0,0,0-3,3V40a3,3,0,0,0,3,3H36a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3H32.35a1,1,0,0,1,0-2H36a5.006,5.006,0,0,1,5,5V40A5.006,5.006,0,0,1,36,45Z" class="color007da1 svgShape"></path>
                                <path fill="#757575" d="M35,41H13a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2h3.79a1,1,0,0,1,0,2H13V39H35V11H31.22a1,1,0,0,1,0-2H35a2,2,0,0,1,2,2V39A2,2,0,0,1,35,41Z" class="color007da1 svgShape"></path>
                                <path fill="#757575" d="M29.491,12H18.509a3.014,3.014,0,0,1-2.885-2.175l-.857-3A3,3,0,0,1,17.651,3h12.7a3,3,0,0,1,2.884,3.824l-.857,3A3.014,3.014,0,0,1,29.491,12ZM17.651,5a1,1,0,0,0-.961,1.275l.857,3a1,1,0,0,0,.962.725H29.491a1,1,0,0,0,.961-.725l.858-3A1,1,0,0,0,30.349,5Z" class="color007da1 svgShape"></path>
                            </svg>
                        </div>
                        <div className="p-2">
                            <h1 className="text-3xl font-semibold text-gray-700">Data Kriteria</h1>
                        </div>
                    </div>

                    <div className="flex justify-end m-2">
                        <button className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition" onClick={toggleFormTambah}>Tambah Kirteria</button>
                    </div>

                    {loading ? (
                                <div className="flex items-center justify-center">
                                    <RingLoader/>
                                </div>
                            ):(
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-1">Kode</th>
                                    <th scope="col" className="px-6 py-3">Kriteria</th>
                                    <th scope="col" className="px-6 py-3">Jenis</th>
                                    <th scope="col" className="px-6 py-3">Bobot</th>
                                    <th scope="col" className="px-6 py-3">Tipe</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                kriteria.length > 0 ? (
                                    kriteria.map((item) => (
                                        <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="px-6 py-4 w-1">{item.kode}</td>
                                            <td className="px-6 py-4">{item.kriteria}</td>
                                            <td className="px-6 py-4">{item.jenis}</td>
                                            <td className="px-6 py-4">{item.bobot}</td>
                                            <td className="px-6 py-4">{item.tipe}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleFormUbah(item)}
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    Ubah
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item)}
                                                    className="font-medium text-red-600 hover:underline"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">Tidak ada data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>

                {isOpenUbah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Ubah Kriteria</h2>
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
                                    value={selectedItem.kode}
                                    disabled
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
                                    Jenis
                                </label>
                                <select
                                    name="kategori"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={selectedItem.jenis}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, jenis: e.target.value })
                                    }
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="Benefit">Benefit</option>
                                    <option value="Cost">Cost</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Bobot
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={selectedItem.bobot}
                                    onChange={handleInputWeight}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Tipe
                                </label>
                                <select
                                    name="jenis"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={selectedItem.tipe}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, tipe: e.target.value })
                                    }
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="Kualitatif">Kualitatif</option>
                                    <option value="Kuantitatif">Kuantitatif</option>
                                </select>
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
                                  onClick={ubah}
                                    type="button"
                                    disabled={!validateFormUbah()}
                                    className={`px-4 py-2 rounded-md text-white ${
                                        validateFormUbah()
                                            ? "bg-blue-600 hover:bg-blue-700"
                                            : "bg-gray-300 cursor-not-allowed"
                                    }`}
                                >
                                    Ubah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}

                {isOpenTambah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Tambah Kriteria</h2>
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
                                    value={kode}
                                    type="text"
                                    name="kode"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    onChange={(e) => setKode(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kriteria
                                </label>
                                <input
                                    value={kriteriain}
                                    type="text"
                                    name="kriteria"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Kriteria"
                                    onChange={(e) => setKriteriain(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Jenis
                                </label>
                                <select
                                id="jenis"
                                    onChange={(e) => setJenis(e.target.value)}
                                    name="jenis"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="Benefit">Benefit</option>
                                    <option value="Cost">Cost</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Bobot
                                </label>
                                <input
                                    value={bobot}
                                    onChange={(e) => setBobot(e.target.value)}
                                    type="number"
                                    step="0.1"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Tipe
                                </label>
                                <select
                                id="tipe"
                                    onChange={(e) => setTipe(e.target.value)}
                                    name="tipe"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="Kualitatif">Kualitatif</option>
                                    <option value="Kuantitatif">Kuantitatif</option>
                                </select>
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
                                   type="button"
                                   disabled={!validateForm()}
                                   className={`px-4 py-2 rounded-md text-white ${
                                       validateForm()
                                           ? "bg-blue-600 hover:bg-blue-700"
                                           : "bg-gray-300 cursor-not-allowed"
                                   }`}
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
