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
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 92 92" id="User">
                            <path d="M35.4 54.3c11.7 0 21.2-9.5 21.2-21.1 0-11.7-9.5-21.1-21.2-21.1s-21.2 9.5-21.2 21.1c.1 11.6 9.6 21.1 21.2 21.1zm0-34.3c7.3 0 13.2 5.9 13.2 13.1 0 7.2-5.9 13.1-13.2 13.1s-13.2-5.9-13.2-13.1c.1-7.2 6-13.1 13.2-13.1zM45 56.2c-1.1-.3-2.3-.2-3.3.4l-6.3 3.8-6.3-3.8c-1-.6-2.2-.7-3.3-.4C19.7 58.2 0 65.3 0 76c0 2.2 1.8 4 4 4h62.8c2.2 0 4-1.8 4-4 0-10.7-19.7-17.8-25.8-19.8zM11.2 72c3.4-2.6 9.1-5.4 15.3-7.6l6.8 4.1c1.3.8 2.9.8 4.1 0l6.8-4.1c6.2 2.1 11.9 5 15.3 7.6H11.2zM91 69c0 1.7-1.3 3-3 3H74.6c-1.7 0-3-1.3-3-3s1.3-3 3-3h8.9c-1.5-2-3.9-3.6-6.9-5.2-1.5-.8-2-2.6-1.2-4 .8-1.5 2.6-2 4.1-1.2C83.8 57.9 91 62.8 91 69zM74.2 42.6c0-4.4-3.6-7.9-7.9-7.9-1.1 0-2.1.2-3.1.6-1.5.6-3.3-.1-3.9-1.6-.6-1.5.1-3.3 1.6-3.9 1.7-.7 3.5-1.1 5.4-1.1 7.7 0 13.9 6.2 13.9 13.9s-6.3 13.9-13.9 13.9c-4 0-7.8-1.7-10.4-4.7-1.1-1.2-1-3.1.3-4.2 1.2-1.1 3.1-1 4.2.3 1.5 1.7 3.7 2.7 6 2.7 4.2-.1 7.8-3.7 7.8-8z" fill="#757575" class="color000000 svgShape"></path>
                            </svg>
                        </div>
                        <div className="p-2">
                            <h1 className="text-3xl font-semibold text-gray-700">Manajemen User</h1>
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
