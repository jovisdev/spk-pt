import { useSelector } from 'react-redux'
import logouser from '/src/assets/profile2.png'

export default function Infouser(){
    const user = useSelector((state) => state.nama)
    const role = useSelector((state) => state.jabatan)
    return(
        <>
            <div class="flex justify-between mb-4 rounded">
                <div>
                    <h1 class="text-3xl font-semibold text-gray-700">
                        Hai, {user}
                    </h1>
                    <p className="text-gray-500 italic">{role}</p>
                </div>
                <div>
                    <img src={logouser} alt="prf" />
                </div>
            </div>
        </>
    )
}