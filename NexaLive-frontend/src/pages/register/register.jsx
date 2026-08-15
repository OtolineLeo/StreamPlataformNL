import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import styles from "../register/register.module.css";

function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        setError("");

        if(password !== confirmPassword){
            setError("As senhas não coincidem.");
            return;
        }

        try{
            await api.post("/users", { username, email, password });
            navigate("/login");
        } catch(err) {
            const message = err.response?.data?.message || "Erro ao criar conta";
            setError(message);
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text-2x1 font-bold text-white mb-2">Criar conta</h1>
            
                {error && <span className={styles.error}>{error}</span>}

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className={styles.input} 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <input 
                    className={styles.input}
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className={styles.input} 
                    type="password"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className={styles.button} type="submit">
                    Criar conta
                </button>

                <Link to="/login" className={styles.loginLink}>
                    Já tem uma conta? Entrar
                </Link>
            </form>
        </div>
    );
}

export default Register;