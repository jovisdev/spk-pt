import Infouser from "../components/info-user";
import { alternatif, kriteria } from "../utility/data";

const itemsP = alternatif
const itemsK = kriteria

export default function Perhitungan(){

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

                <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-1">Kode</th>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    {itemsK.map}
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4 w-1">{item.id}</td>
                                        <td className="px-6 py-4">{item.kriteria}</td>
                                        <td className="px-6 py-4">{item.kategori}</td>
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
        </div>
      </>
    )
  }