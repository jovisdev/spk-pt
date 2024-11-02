import Infouser from "../components/info-user";
import { useState, useEffect } from "react";

const itemsP = [
    { id: 1, nama: 'Rizky', telepon: '08977777765', kelamin: 'laki laki' },
    { id: 2, nama: 'Dedek', telepon: '08977777765', kelamin: 'laki laki' },
    { id: 3, nama: 'Fikri', telepon: '08977777765', kelamin: 'laki laki' },
    { id: 4, nama: 'Rizal', telepon: '08977777765', kelamin: 'laki laki' },
];

const itemsK = [
    { id: 1, kriteria: 'Penguasaan', kategori: 'Benefit', bobot: '0.20' },
    { id: 2, kriteria: 'Kecakapan Tubuh', kategori: 'Benefit', bobot: '0.20' },
    { id: 3, kriteria: 'Komunikasi', kategori: 'Benefit', bobot: '0.20' },
    { id: 4, kriteria: 'Pengalaman', kategori: 'Benefit', bobot: '0.20' },
];

export default function Penilaian(){

    // checkbox function
    const [checkedItems, setCheckedItems] = useState({});
    const [isCheckAll, setIsCheckAll] = useState(false);

    useEffect(() => {
        const allChecked = itemsP.every((item) => checkedItems[item.id]);
        setIsCheckAll(allChecked);
    }, [checkedItems, itemsP]);

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) => {
        const newCheckedItems = { ...prev, [id]: !prev[id] };
        const allChecked = itemsP.every((item) => newCheckedItems[item.id]);
        setIsCheckAll(allChecked);
        return newCheckedItems;
        });
    };

    const handleCheckAll = () => {
        const newCheckAll = !isCheckAll;
        setIsCheckAll(newCheckAll);
        const allChecked = itemsP.reduce((acc, item) => {
        acc[item.id] = newCheckAll;
        return acc;
        }, {});
        setCheckedItems(allChecked);
    };

    // form modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleForm = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    return(
      <>
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                
                <Infouser/>

                <div class="flex items-center mb-4 rounded bg-gray-50 p-4">
                    <div className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="16" height="32" enable-background="new 0 0 16 32" id="info">
                        <path d="M2 16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H0v4h16v-4h-1.992c-1.102 0-2-.895-2-2L12 12H0v4h2z" fill="#4e4e50"></path>
                        <circle cx="8" cy="4" r="4" fill="#4e4e50"></circle>
                        </svg>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700">Sistem yang dikembangkan hanya digunakan untuk membantu manajemen dalam proses pengambilan keputusan berdasarkan kriteria yang telah ditentukan, tanpa melibatkan proses rekrutmen penuh atau pelatihan personal trainer.</p>
                    </div>
                </div>

                <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
                    <div className="text-center w-3/4">
                        <h1 class="text-2xl text-gray-700 mb-2">Nama Penilaian</h1>
                        <div className="border-b-2 border-gray-200">
                        <input
                            type="text"
                            name="nama"
                            className="text-center w-full px-3 py-2 border-none bg-gray-50"
                        />
                        </div>
                    </div>
                </div>

                <h1 class="text-2xl text-gray-700 mb-2">Pilih Pelamar Sebagai Alternatif</h1>

                <div className="flex items-center space-x-2 m-2">
                    <p className="text-gray-500">Pilih semua</p>
                    <input type="checkbox"
                        checked={isCheckAll}
                        onChange={handleCheckAll} />
                </div>

                <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nama</th>
                                <th scope="col" className="px-6 py-3">Telepon</th>
                                <th scope="col" className="px-6 py-3">Kelamin</th>
                                <th scope="col" className="px-6 py-3 text-center">Pilih Calon PT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsP.map((item) => (
                                <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                    <td className="px-6 py-4">{item.nama}</td>
                                    <td className="px-6 py-4">{item.telepon}</td>
                                    <td className="px-6 py-4">{item.kelamin}</td>
                                    <td class="px-6 py-4 space-x-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[item.id] || false}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end m-2">
                    <button onClick={toggleForm} className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition" >Selanjutnya</button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Apakah Data Sudah Sesuai?</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
                            {/* tabel pelamar */}
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    <th scope="col" className="px-6 py-3">Kode</th>
                                </tr>
                            </thead>
                            <tbody>
                            {itemsP.filter(itemP => checkedItems[itemP.id]).length > 0 ? (
                                itemsP
                                .filter(itemP => checkedItems[itemP.id])
                                .map((itemP, index) => (
                                    <tr key={itemP.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{itemP.nama}</td>
                                        <td className="px-6 py-4">A{index + 1}</td>
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                        Tidak ada data yang dipilih
                                    </td>
                                </tr>
                            )}
                            </tbody>
                            </table>

                            {/* tabel kriteria */}
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Kriteria</th>
                                        <th scope="col" className="px-6 py-3">Kode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemsK.map((itemK, index) => (
                                        <tr key={itemK.id} className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="px-6 py-4">{itemK.kriteria}</td>
                                            <td className="px-6 py-4">C{index + 1}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition" >Oke</button>
                    </div>
                </div>
            )}
        </div>
      </>
    )
  }