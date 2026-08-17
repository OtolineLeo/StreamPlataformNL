import { Link } from "react-router-dom";
import styles from "../CategoryCard/CategoryCard.module.css";

function CategoryCard({ category }){
    return(
        <Link to={`/categories/${category.slug}`} className={styles.card}>
            <img 
                src={category.coverUrl} 
                alt={category.name}
                className={styles.cover}
            />
            <p className={styles.name}>{category.name}</p>
        </Link>
    );
}

export default CategoryCard;