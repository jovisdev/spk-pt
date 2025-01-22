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
    const [error, setError] = useState(false)

    const validateForm = () => {
        // Validasi: Semua state harus terisi dan valid
        return kode.trim() && nama.trim() && kelamin && alamat.trim() && usia.trim();
    };

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

        if (!validateForm()) {
            setError(true);
            return;
        }
        setError(false);
    
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

    const validateFormUbah = () => {
        return (
            selectedItem.nama?.trim() &&
            selectedItem.kelamin?.trim() &&
            selectedItem.alamat?.trim() &&
            String(selectedItem.usia)?.trim()
        );
    };
    
    const handleUpdate = async () => {
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
                setAlternatif(updatedAlternatif);
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
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="People">
                         <path fill="#757575" d="M8.49578666,8 C9.32421378,8 9.99578666,8.67157288 9.99578666,9.5 L9.99500413,10.2483651 C10.0978758,12.0849239 8.68333886,13.0008101 6.06019361,13.0008101 C3.44551926,13.0008101 2,12.0969079 2,10.2745741 L2,9.5 C2,8.67157288 2.67157288,8 3.5,8 L8.49578666,8 Z M12.4963886,8 C13.3248157,8 13.9963886,8.67157288 13.9963886,9.5 L13.9956373,10.0265728 C14.0860521,11.6740351 12.8361745,12.5 10.5515945,12.5 C10.2414712,12.5 9.94992668,12.4848914 9.67765519,12.4546597 C10.2143644,11.9590361 10.5014697,11.2864584 10.5004904,10.4365689 L10.4942216,10.2204023 L10.4957867,9.5 C10.4957867,8.90242987 10.2337129,8.36607035 9.81823197,7.99958804 L12.4963886,8 Z M6,2 C7.38093559,2 8.50040506,3.11946948 8.50040506,4.50040506 C8.50040506,5.88134065 7.38093559,7.00081013 6,7.00081013 C4.61906441,7.00081013 3.49959494,5.88134065 3.49959494,4.50040506 C3.49959494,3.11946948 4.61906441,2 6,2 Z M11,3 C12.1045695,3 13,3.8954305 13,5 C13,6.1045695 12.1045695,7 11,7 C9.8954305,7 9,6.1045695 9,5 C9,3.8954305 9.8954305,3 11,3 Z" class="color212121 svgShape"></path>
                        </svg>

                        </div>
                        <div className="p-2">
                            <h1 className="text-3xl font-semibold text-gray-700">Data Alternatif</h1>
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
                                    placeholder="Masukkan Nama Lengkap Calon"
                                    onChange={(e) => setNama(e.target.value)}
                                    required
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
                                    required
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
                                    required
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
                                    required
                                />
                            </div>

                            <p className="text-red-500 text-sm">* Isi semua data sebelum menambah</p>

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
                                    placeholder="Masukkan Nama Lengkap Calon"
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
                                    placeholder="Masukan Usia"
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
            </div>
        </>
    );
}
