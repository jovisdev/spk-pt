import Infouser from "../components/info-user";
import { useState, useEffect } from "react";
import { alternatif, kriteria } from "../utility/data";
import { useNavigate } from "react-router-dom";

const itemsP = alternatif
const itemsK = kriteria

export default function Penilaian(){

    const navigate = useNavigate()

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

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Id</th>
                            <th scope="col" className="px-6 py-3">Nama</th>
                            <th scope="col" className="px-6 py-3">Penilaian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsP.map((p) => (
                            <tr key={p.id} className="odd:bg-white even:bg-gray-50">
                                <td className="px-6 py-4 w-1">{p.id}</td>
                                <td className="px-6 py-4">{p.nama}</td>
                                <td className="px-6 py-4 space-x-2 w-1/4">
                                    <button
                                        onClick={() => navigate(`/penilaian/alternatif/${p.id}`, {state: {nama: p.nama}})}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Nilai Pelamar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </>
    )
  }