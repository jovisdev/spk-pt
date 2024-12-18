import logouser from '/src/assets/profile2.png'

export default function Infouser(){
    const user = localStorage.getItem('nama')
    const role = localStorage.getItem('jabatan')
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
                    <button onClick={()=>navigate('/profile')}>
                        <img src={logouser} alt="prf" />
                    </button>
                </div>
            </div>
        </>
    )
}