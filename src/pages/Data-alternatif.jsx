import Infouser from "../components/info-user";
import { useState } from "react";
import { alternatif } from "../utility/data";

const items = alternatif

export default function Alternatif() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleForm = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    const [selectedItem, setSelectedItem] = useState(null);
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
                        <button className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition" onClick={toggleForm}>Tambah Pelamar</button>
                    </div>

                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Id</th>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    <th scope="col" className="px-6 py-3">Kelamin</th>
                                    <th scope="col" className="px-6 py-3">Alamat</th>
                                    <th scope="col" className="px-6 py-3">Usia</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{item.id}</td>
                                        <td className="px-6 py-4">{item.nama}</td>
                                        <td className="px-6 py-4">{item.kelamin}</td>
                                        <td className="px-6 py-4">{item.alamat}</td>
                                        <td className="px-6 py-4">{item.usia}</td>
                                        <td class="px-6 py-4 space-x-2">
                                            <button onClick={() => toggleForm(item)} class="font-medium text-blue-600 hover:underline">Ubah</button>
                                            <button href="#" class="font-medium text-red-600 hover:underline">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end m-2">
                            <button
                                className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
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
                                    Telepon
                                </label>
                                <input
                                    type="text"
                                    value={selectedItem.telepon}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="0811xxxxxxxx"
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
