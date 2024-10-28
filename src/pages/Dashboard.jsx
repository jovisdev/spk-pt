import Infouser from "../components/info-user";

export default function Dashboard(){
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

            <div class="grid grid-cols-2 gap-4 mb-4">

                <div class="relative flex items-center justify-between rounded bg-[url('https://easygym.co.uk/wp-content/uploads/2021/11/PT-mobile.jpg')] bg-cover bg-center p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Kriteria Trainer
                        </p>
                        <h1 class="text-4xl font-bold text-white">12</h1>
                    </div>
                </div>


                <div class="relative flex items-center justify-between rounded bg-[url('https://ochsner-craft.s3.amazonaws.com/imager/blogarticleimages/61930/ThinkstockPhotos-598676944-picking-out-a-gym-19513a3bc6.jpg')] bg-cover p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Trainer Yang Melamar
                        </p>
                        <h1 class="text-4xl font-bold text-white">12</h1>
                    </div>
                </div>

                <div class="relative flex items-center justify-between rounded bg-[url('https://cdn.prod.website-files.com/60359921321f8d62cd691da7/6357daec39b0080e29438f7f_FitnessChallengeIdeasforYourGym_e84e1e59c519ae19ef541c822ddd08be_2000.jpeg')] bg-cover p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Jumlah Trainer Aktif
                        </p>
                        <h1 class="text-4xl font-bold text-white">12</h1>
                    </div>
                </div>

                <div class="relative flex items-center justify-between rounded bg-[url('https://www.sportaberdeen.co.uk/wp-content/uploads/2020/02/les-mills-class-scaled-1370x640.jpg')] bg-cover bg-center p-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Data Seleksi
                        </p>
                        <h1 class="text-4xl font-bold text-white">12</h1>
                    </div>
                </div>

            </div>

            <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
                <p class="text-2xl text-gray-400">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </p>
            </div>

            <div class="grid grid-cols-2 gap-4">

                <div class="flex items-center justify-center rounded bg-gray-50 h-28">
                    <p class="text-2xl text-gray-400">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    </p>
                </div>

                <div class="flex items-center justify-center rounded bg-gray-50 h-28">
                    <p class="text-2xl text-gray-400">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    </p>
                </div>

                <div class="flex items-center justify-center rounded bg-gray-50 h-28">
                    <p class="text-2xl text-gray-400">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    </p>
                </div>

                <div class="flex items-center justify-center rounded bg-gray-50 h-28">
                    <p class="text-2xl text-gray-400">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    </p>
                </div>

            </div>
        </div>
        </div>
      </>
    )
  }