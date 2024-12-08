import logouser from '/src/assets/react.svg'

export default function Infouser(){
    return(
        <>
            <div class="flex justify-between mb-4 rounded">
                <div>
                    <h1 class="text-3xl font-semibold text-gray-700">
                        Hai, Username
                    </h1>
                    <p className="text-gray-500 italic">Manager</p>
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