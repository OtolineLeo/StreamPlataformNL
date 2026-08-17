import { useEffect, useState } from "react";
import { api } from "../../services/api";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import styles from "../../pages/Categories/Categories.module.css";

function Categories(){
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/categories").then((Response) => {
            setCategories(response.data);
            setLoading(false);
        });
    }, []);

    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Todas as Categorias</h2>

            {loading ? (
                <p className="text-white">Carregando...</p>
            ):(
                <div className={styles.grid}>
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Categories;