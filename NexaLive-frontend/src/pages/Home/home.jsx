import { useAuth } from "../../context/AuthContext";

function Home(){
    const { user, loading, logout } = useAuth();

    if(loading){
        return <h1 className="text-2x1 font-bold p-8">Carregando...</h1>
    }

    return (
        <div className="p-8">
            <h1 className="text-2x1 font-bold mb-4">Tela Home</h1>

            {user ? (
                <div>
                    <p>Olá, {user.username}!</p>
                    <button onClick={logout} className="mt-2 py-2 bg-red-600 text-white rounded">Sair</button>
                </div>
            ): (
                <p>Você não está logado.</p>
            )}
        </div>
    );
}

export default Home;