import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../navbar/Navbar.module.css";

function Navbar(){
    const { user, logout } = useAuth();

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                NexaLive
            </Link>

            <div className={styles.actions}>
                {user ? (
                    <>
                        <span className={styles.username}>{user.username}</span>
                        <button onClick={logout} className={styles.logoutButton}>
                            Sair
                        </button>
                    </>
                ): (
                    <>
                        <Link to="/login" className={styles.loginLink}>
                            Entrar
                        </Link>
                        <Link to="/register" className={styles.registerButton}>
                            Cadastro
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;