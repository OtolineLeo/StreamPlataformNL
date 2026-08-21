import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import styles from "../CategoryDetail/CategoryDetail.module.css";

function CategoryDetail(){
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [slug]);

    async function loadData(){
        setLoading(true);

        const categoryResponse = await api.get(`/categories/slug/${slug}`);
        setCategory(categoryResponse.data);

        const streamsResponse = await api.get(`/streams/category/${category}`);
        setStreams(streamsResponse.data);

        setLoading(false);
    }

    if(loading){
        return <p className="text-white p-8">Carregando...</p>
    }

    if(!category){
        return <p className="text-white p-8">Categoria não encontrada.</p>
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={styles.coverUrl} alt={category.name} className={styles.cover} />
                    <div>
                        <h1 className={styles.title}>{category.name}</h1>
                        <p className={styles.description}>{category.description}</p>
                    </div>
            </div>

            <h2 className={styles.subtitle}>Transmissões ao vivo</h2>

            {streams.length === 0 ? (
                <p className="text-gray-400">Não há streams dessa categoria no momento.</p>
            ) : (
                <div className={styles.streamsGrid}>
                    {streams.map((stream) => (
                        <div key={stream.id} className={styles.streamCard}>
                            <p className={styles.streamTitle}>{stream.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryDetail;