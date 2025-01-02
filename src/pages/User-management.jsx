import Infouser from "../components/info-user";
import { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function UserManagement() {

    const [isOpenTambah, setIsOpenTambah] = useState(false);
    const [users,setUsers] = useState([])
    const [loading, setLoading] = useState(false);

    //  / Toggle form tambah
    const toggleFormTambah = () => {
        setIsOpenTambah(true)
    }
    const closeModal = () => {
        setIsOpenTambah(false);
    };

    // API
    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_USERS);
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // tambah alternatif
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            nama,
            jabatan,
            username,
            password,
            confPassword
        };
    
        try {
            const response = await axios.post(import.meta.env.VITE_API_ADDUSER, data);
            setNama('');
            setJabatan('');
            setUsername('');
            setPassword('');
            setConfPassword('');
            if (response.status === 200 || response.status === 201) {
                setLoading(false);
                window.alert('User berhasil ditambahkan.');
                closeModal()
            }
            window.location.reload();
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    // hapus alternatif
    const handleDelete = async (user) => {
        setLoading(true);
        try {
            // Kirim permintaan DELETE untuk item yang dipilih
            const response = await axios.delete(`${import.meta.env.VITE_API_DELETEUSER}/${user.id}`);
    
            // Periksa status dari respons
            if (response.status === 200) {
                window.alert(response.data.message);
                // Hapus item yang dipilih dari state kriteria
                const updatedUser = users.filter(k => k.id !== user.id);
                setUsers(updatedUser);
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
                        <button className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition" onClick={toggleFormTambah}>Tambah User</button>
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
                                    <th scope="col" className="px-6 py-3 w-1">Id</th>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    <th scope="col" className="px-6 py-3">Jabatan</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{user.id}</td>
                                        <td className="px-6 py-4">{user.nama}</td>
                                        <td className="px-6 py-4">{user.jabatan}</td>
                                        <td class="px-6 py-4 space-x-2">
                                            <button type="button" onClick={()=> handleDelete(user)} class="font-medium text-red-600 hover:underline">Hapus</button>
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
                            <h2 className="text-xl font-semibold text-gray-700">Tambah User</h2>
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
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Nama Lengkap"
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Jabatan
                                </label>
                                <select
                                    name="jabatan"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    onChange={(e) => setJabatan(e.target.value)}
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Manajer">Manajer</option>
                                    <option value="Koor. Personal Trainer">Koor. Personal Trainer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="text"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Konfirmasi Ulang Password"
                                    onChange={(e) => setConfPassword(e.target.value)}
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

            </div>
        </>
    );
}
