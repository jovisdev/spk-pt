import Infouser from "../components/info-user";
import { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function Alternatif() {

    const [isOpenTambah, setIsOpenTambah] = useState(false);
    const [isOpenUbah, setIsOpenUbah] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [alternatif,setAlternatif] = useState([])
    const [loading, setLoading] = useState(false);

    //  / Toggle form/modal ubah
    const toggleFormUbah = (alternatif) => {
        setSelectedItem(alternatif);
        setIsOpenUbah(true);
    };
    const toggleFormTambah = () => {
        setIsOpenTambah(true)
    }
    const closeModal = () => {
        setIsOpenTambah(false);
        setIsOpenUbah(false)
        setSelectedItem(null);
    };

    // API
    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_ALTERNATIF);
                setAlternatif(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // tambah alternatif
    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [kelamin, setKelamin] = useState('');
    const [alamat, setAlamat] = useState('');
    const [usia, setUsia] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            kode,
            nama,
            kelamin,
            alamat,
            usia : parseInt(usia),
        };
    
        try {
            const response = await axios.post(import.meta.env.VITE_API_ADDALTERNATIF, data);
            setKode('');
            setNama('');
            setKelamin('');
            setAlamat('');
            setUsia('')
            if (response.status === 200 || response.status === 201) {
                setLoading(false);
                window.alert('Alternatif berhasil ditambahkan.');
                closeModal()
            }
            window.location.reload();
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const updatedItem = { ...selectedItem };
    
            const response = await axios.put(
                `${import.meta.env.VITE_API_UPDATEALTERNATIF}/${updatedItem.id}`,
                updatedItem
            );
    
            if (response.status === 200 || response.status === 201) {
                window.alert('Perubahan berhasil disimpan.');
                const updatedAlternatif = alternatif.map((alternatif) =>
                    alternatif.id === updatedItem.id ? updatedItem : alternatif
                );
                setLoading(false);
                setAlternatif(updatedAlternatif);
                closeModal(); // Menutup modal setelah sukses
            } else {
                window.alert('Gagal menyimpan perubahan.');
            }
        } catch (error) {
            console.error('Error saat menyimpan perubahan:', error);
            window.alert('Terjadi kesalahan saat menyimpan perubahan.');
        }
    };

    // hapus alternatif
    const handleDelete = async (alt) => {
        setLoading(true);
        try {
            // Kirim permintaan DELETE untuk item yang dipilih
            const response = await axios.delete(`${import.meta.env.VITE_API_DELETEALTERNATIF}/${alt.id}`);
    
            // Periksa status dari respons
            if (response.status === 200) {
                window.alert(response.data.message);
                // Hapus item yang dipilih dari state kriteria
                const updatedAlternatif = alternatif.filter(k => k.id !== alt.id);
                setKriteria(updatedAlternatif);
                setLoading(false);
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

                
                    <div className="flex justify-end m-2">
                        <button className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition" onClick={toggleFormTambah}>Tambah Pelamar</button>
                    </div>

                    {loading ? (
                                <div className="flex items-center justify-center">
                                    <RingLoader/>
                                </div>
                            ) : (
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Kode</th>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    <th scope="col" className="px-6 py-3">Kelamin</th>
                                    <th scope="col" className="px-6 py-3">Alamat</th>
                                    <th scope="col" className="px-6 py-3">Usia</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alternatif.length > 0 ? (
                                alternatif.map((alternatif) => (
                                    <tr key={alternatif.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{alternatif.kode}</td>
                                        <td className="px-6 py-4">{alternatif.nama}</td>
                                        <td className="px-6 py-4">{alternatif.kelamin}</td>
                                        <td className="px-6 py-4">{alternatif.alamat}</td>
                                        <td className="px-6 py-4">{alternatif.usia}</td>
                                        <td class="px-6 py-4 space-x-2">
                                            <button onClick={() => toggleFormUbah(alternatif)} type="button" class="font-medium text-blue-600 hover:underline">Ubah</button>
                                            <button type="button" onClick={()=> handleDelete(alternatif)} class="font-medium text-red-600 hover:underline">Hapus</button>
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
                        <div className="flex justify-end m-2">
                            <button
                                className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                            >
                                Oke
                            </button>
                        </div>
                    </div>
                            )}
                </div>

                {isOpenTambah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Tambah Pelamar</h2>
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
                                    name="kode"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    onChange={(e) => setKode(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Kriteria"
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kelamin
                                </label>
                                <select
                                    name="telepon"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    onChange={(e) => setKelamin(e.target.value)}
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="Laki Laki">Laki Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    name="alamat"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan alamat"
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Usia
                                </label>
                                <input
                                    type="number"
                                    onChange={(e) => setUsia(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan usia"
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
                                    type="button"
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
                            <h2 className="text-xl font-semibold text-gray-700">Ubah Data Pelamar</h2>
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
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Kriteria"
                                    value={selectedItem.nama}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, nama: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kelamin
                                </label>
                                <select
                                    name="telepon"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={selectedItem.kelamin}
                                        onChange={(e) =>
                                            setSelectedItem({ ...selectedItem, kelamin: e.target.value })
                                        }
                                >
                                    <option value="Laki Laki">Laki Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    name="alamat"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan alamat"
                                    value={selectedItem.alamat}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, alamat: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Usia
                                </label>
                                <input
                                    type="text"
                                    value={selectedItem.usia}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, usia: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="0811xxxxxxxx"
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
                                    onClick={handleUpdate}
                                    type="button"
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
