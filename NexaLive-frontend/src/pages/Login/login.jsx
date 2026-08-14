import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./login.module.css";

function Login(){
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try{
            await login(username, password);
            navigate("/");
        } catch(err) {
            setError("Usuario ou senha invalidos.");
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text-2x1 font-bold text-white mb-2">NexaLive Login</h1>

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
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className={styles.button} type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;