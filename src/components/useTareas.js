import { useState, useEffect } from "react";

const useTareas = () => {
    const [tareas, setTareas] =useState([]);

    const [cargando, setCargando] = useState(true);

    const [error,setError] = useState(null);

    useEffect(() => {
        const cargarTareas = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos?_limit=10"
                );
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`)
                }
                const data = await response.json();

                const tareasAdaptadas = data.map((item) => ({
                    id: item.id,
                    titulo: item.title,
                    completadas: item.completed,
                }));
            }   catch (err){
                setError(err.message);
            }   finally {
                setCargando(false);
            }
        };
        cargarTareas();
    }, []);
    return{tareas, setTareas, cargando, error};
};
export default useTareas;