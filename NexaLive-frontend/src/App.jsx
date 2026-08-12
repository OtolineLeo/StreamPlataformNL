import { useEffect, useState } from "react";
import { api } from "./services/api";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3x1 font-bold text-purple-600 mb-4">
        NexaLive - Stream Plataform
      </h1>
      <ul>
        {categories.map((category) => (
          <img key={category.id} src={category.image} alt={category.name} />
        ))}
      </ul>
    </div>
  );
}

export default App;