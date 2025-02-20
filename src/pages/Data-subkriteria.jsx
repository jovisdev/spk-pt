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
    const toggleFormUbah = (skriteria, kriteria) => {
        setSelectedItem({...skriteria, kriteria});
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
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 512 512" id="SalesClipboard">
                            <path fill="#eeeeee" fill-rule="evenodd" d="M366.669 64.069c11.878 0 21.565 9.687 21.565 21.565v396.801c0 11.877-9.688 21.565-21.565 21.565H34.565C22.688 504 13 494.312 13 482.435V85.634c0-11.878 9.687-21.565 21.565-21.565h332.104z" clip-rule="evenodd" class="coloreceff1 svgShape"></path>
                            <path fill="#e3e3e3" fill-rule="evenodd" d="M366.669 64.069c11.878 0 21.565 9.687 21.565 21.565v396.801c0 11.877-9.687 21.565-21.565 21.565H200.617V64.069h166.052z" clip-rule="evenodd" class="colore1e4e6 svgShape"></path>
                            <path fill="#757575" fill-rule="evenodd" d="M127.591 36.035h37.389C168.859 19.95 183.342 8 200.617 8s31.758 11.95 35.637 28.035h37.389c5.508 0 10 4.492 10 10v36.07c0 5.507-4.492 10-10 10H127.591c-5.508 0-10-4.492-10-10v-36.07c0-5.508 4.492-10 10-10z" clip-rule="evenodd" class="color685e68 svgShape"></path>
                            <path fill="#4e4e4e" fill-rule="evenodd" d="M200.617 8c17.275 0 31.758 11.95 35.637 28.035h37.389c5.508 0 10 4.492 10 10v36.07c0 5.508-4.492 10-10 10h-73.026V8z" clip-rule="evenodd" class="color544854 svgShape"></path>
                            <path fill="#a1a1a1" fill-rule="evenodd" d="M189.213 176.234a8 8 0 0 1 0-16h106a8 8 0 0 1 0 16h-106zm0 266.591a8 8 0 0 1 0-16h69a8 8 0 0 1 0 16h-69zm0-33.5a8 8 0 0 1 0-16h106a8 8 0 0 1 0 16h-106zm0-83.045a8 8 0 0 1 0-16h69a8 8 0 0 1 0 16h-69zm0-33.501a8 8 0 0 1 0-16h106a8 8 0 0 1 0 16h-106zm0-83.045a8 8 0 0 1 0-16h69a8 8 0 0 1 0 16h-69z" clip-rule="evenodd" class="colora79ba7 svgShape"></path>
                            <g fill-rule="evenodd" clip-rule="evenodd" fill="#000000" class="color000000 svgShape">
                            <path fill="#bababa" d="M77.06 147.483h59.473c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764H77.06c-4.27 0-7.764-3.493-7.764-7.764v-59.473c.001-4.27 3.494-7.764 7.764-7.764zm0 233.092h59.473c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764H77.06c-4.27 0-7.764-3.493-7.764-7.764v-59.473c.001-4.27 3.494-7.764 7.764-7.764zm0-116.546h59.473c4.27 0 7.764 3.493 7.764 7.763v59.473c0 4.27-3.493 7.764-7.764 7.764H77.06c-4.27 0-7.764-3.493-7.764-7.764v-59.473c.001-4.269 3.494-7.763 7.764-7.763z" class="colorf1ba84 svgShape"></path>
                            <path fill="#989898" d="M136.533 222.484c4.27 0 7.764-3.493 7.764-7.764v-59.473c0-4.27-3.493-7.764-7.764-7.764h-10.875c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764h10.875zm0 158.091h-10.875c4.27 0 7.764 3.493 7.764 7.764v59.473c0 4.27-3.493 7.764-7.764 7.764h10.875c4.27 0 7.764-3.493 7.764-7.764v-59.473c0-4.27-3.494-7.764-7.764-7.764zm-10.875-41.545h10.875c4.27 0 7.764-3.493 7.764-7.764v-59.473c0-4.27-3.493-7.763-7.764-7.763h-10.875c4.27 0 7.764 3.493 7.764 7.763v59.473c-.001 4.27-3.494 7.764-7.764 7.764zm-10.862 41.545v17.224a8 8 0 0 1-16 0v-17.224h16zm0-116.546v17.224a8 8 0 0 1-16 0v-17.224h16zm0-116.546v17.224a8 8 0 0 1-16 0v-17.224h16z" class="colorde9252 svgShape"></path>
                            </g>
                            <g fill-rule="evenodd" clip-rule="evenodd" fill="#000000" class="color000000 svgShape">
                            <circle cx="411.499" cy="342.409" r="87.5" fill="#b1b1b1" class="colorfe646f svgShape"></circle>
                            <path fill="#a2a2a2" d="M411.499 254.909c48.325 0 87.5 39.175 87.5 87.5s-39.175 87.5-87.5 87.5v-175z" class="colorfd4755 svgShape"></path>
                            <path fill="#eeeeee" d="M437.71 292.64a7.971 7.971 0 0 1 12.938 9.312l-65.302 90.897a7.971 7.971 0 0 1-12.938-9.312l65.302-90.897zm-.267 65.339c-8.563 0-15.504 6.941-15.504 15.504 0 8.563 6.941 15.504 15.504 15.504 8.563 0 15.504-6.941 15.504-15.504 0-8.563-6.941-15.504-15.504-15.504zm-51.887-62.147c-8.563 0-15.504 6.941-15.504 15.504 0 8.563 6.941 15.504 15.504 15.504 8.563 0 15.504-6.941 15.504-15.504 0-8.563-6.94-15.504-15.504-15.504z" class="coloreceff1 svgShape"></path>
                            </g>
                        </svg>
                        </div>
                        <div className="p-2">
                            <h1 className="text-3xl font-semibold text-gray-700">Data Sub Kriteria</h1>
                        </div>
                    </div>

                    {/* area tabel */}
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <RingLoader/>
                        </div>
                    ):(
                    itemsKriteria.filter((kriteria) => kriteria.tipe !== "Kuantitatif").length > 0 ? (
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
                                    <div className="space-x-2">
                                    <button
                                        className="bg-gray-800 text-white text-sm p-2 rounded hover:bg-gray-700 transition"
                                        onClick={() => toggleFormTambah(kriteria)}
                                    >
                                        Tambah Subkriteria
                                    </button>
                                    </div>
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
                                                                onClick={() => toggleFormUbah(skriteria, kriteria)}
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
                        ) : (
                            <div className="text-gray-500 text-center mt-4">
                                Tidak ada kriteria tipe kualitatif.
                            </div>
                            )
                    )}

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
                            <h2 className="text-xl font-semibold text-gray-700">Ubah Sub Kriteria {selectedItem.kriteria.kriteria}</h2>
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
