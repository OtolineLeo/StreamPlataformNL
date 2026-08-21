import { useEffect, useState } from "react";
import { api } from "../../services/api";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import styles from "../../pages/Categories/Categories.module.css";

function Categories(){
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCategories();
        }, 400);

        return() => clearTimeout(timeoutId);
    }, [query]);

    function fetchCategories(){
        setLoading(true);

        const endpoint = query
            ? `/categories/search?q=${query}`
            : `/categories`;

        api.get(endpoint).then((response) => {
            setCategories(response.data);
            setLoading(false);
        });
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Todas as categorias</h2>
    
                <input
                    className={styles.searchInput} 
                    type="text"
                    placeholder="Buscar categoria..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                />
            </div>

            {loading ? (
                <p className="text-white">Carregando...</p>
            ): categories.length === 0 ? (
                <p className="text-white">Nenhuma categoria encontrada.</p>
            ) : (
                <div className={styles.grid}>
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Categories;