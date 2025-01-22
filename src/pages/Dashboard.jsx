import Infouser from "../components/info-user";
import axios from "axios";
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

export default function Dashboard(){

    const [kriteria, setKriteria] = useState("");
    const [subkriteria, setSubKriteria] = useState("");
    const [alternatif, setAlternatif] = useState("");
    const [penilaian, setPenilaian] = useState("");

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Fungsi async untuk memanggil API
        const fetchData = async () => {
            setLoading(true);
            try {
                const [kriteriaRes, subkriteriaRes, alternatifRes, penilaianRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_KRITERIA),
                    axios.get(import.meta.env.VITE_API_SUBKRITERIA),
                    axios.get(import.meta.env.VITE_API_ALTERNATIF),
                    axios.get(import.meta.env.VITE_API_PENILAIANKONVERSI),
                ]);

                // Update state dengan jumlah data
                setKriteria(kriteriaRes.data.length);
                setSubKriteria(subkriteriaRes.data.length);
                setAlternatif(alternatifRes.data.length);
                setPenilaian(penilaianRes.data.length);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Panggil fungsi fetchData
        fetchData();
    }, []); // Hanya dijalankan sekali saat komponen dimuat

    return(
      <>
        <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
            
            <Infouser/>

            <div class="flex items-center mb-4 rounded bg-gray-50 p-4">
                <div className="p-2">
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Dashboard">
                  <path fill="none" d="M0 0h48v48H0z"></path>
                  <path d="M6 26h16V6H6v20zm0 16h16V30H6v12zm20 0h16V22H26v20zm0-36v12h16V6H26z" fill="#757575" class="color000000 svgShape"></path>
                </svg>
                </div>
                <div className="p-2">
                    <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">

                <div class="relative flex items-center justify-between rounded bg-[url('https://easygym.co.uk/wp-content/uploads/2021/11/PT-mobile.jpg')] bg-cover bg-center p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Kriteria
                        </p>
                        {loading ? (
                            <div class="flex itemsc-center justify-center">
                                <RingLoader/>
                            </div>
                        ):(
                            <h1 class="text-4xl font-bold text-white">{kriteria}</h1>
                        )}
                    </div>
                </div>


                <div class="relative flex items-center justify-between rounded bg-[url('https://ochsner-craft.s3.amazonaws.com/imager/blogarticleimages/61930/ThinkstockPhotos-598676944-picking-out-a-gym-19513a3bc6.jpg')] bg-cover p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Sub Kriteria
                        </p>
                        {loading ? (
                            <div class="flex itemsc-center justify-center">
                                <RingLoader/>
                            </div>
                        ):(
                            <h1 class="text-4xl font-bold text-white">{subkriteria}</h1>
                        )}
                    </div>
                </div>

                <div class="relative flex items-center justify-between rounded bg-[url('https://cdn.prod.website-files.com/60359921321f8d62cd691da7/6357daec39b0080e29438f7f_FitnessChallengeIdeasforYourGym_e84e1e59c519ae19ef541c822ddd08be_2000.jpeg')] bg-cover p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Alternatif
                        </p>
                        {loading ? (
                            <div class="flex itemsc-center justify-center">
                                <RingLoader/>
                            </div>
                        ):(
                            <h1 class="text-4xl font-bold text-white">{alternatif}</h1>
                        )}
                    </div>
                </div>

                <div class="relative flex items-center justify-between rounded bg-[url('https://www.sportaberdeen.co.uk/wp-content/uploads/2020/02/les-mills-class-scaled-1370x640.jpg')] bg-cover bg-center p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Penilaian
                        </p>
                        {loading ? (
                            <div class="flex itemsc-center justify-center">
                                <RingLoader/>
                            </div>
                        ):(
                            <h1 class="text-4xl font-bold text-white">{penilaian}</h1>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
      </>
    )
  }