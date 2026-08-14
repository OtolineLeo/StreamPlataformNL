import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        restoreSession();
    }, []);

    async function restoreSession(){
        const refreshToken = localStorage.getItem("refreshToken");
        const savedUser = localStorage.getItem("user");

        if(!refreshToken || !savedUser){
            setLoading(false);
            return;
        }

        try{
            const response = await api.post("/auth/refresh", {refreshToken});
            setAccessToken(response.data.accessToken);
            setUser(JSON.parse(savedUser));
        } catch(err) {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            //finally para sempre rodar independente do 0 e 1

        } finally {
            setLoading(false);
        }
    }

    async function login(username, password){
        const response = await api.post("/auth/login", { username, password });

        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    function logout(){
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    }

    return(
        <AuthContext.Provider value={{user, accessToken, login, logout, loading}}>{children}</AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}