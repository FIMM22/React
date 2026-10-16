import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskList from './components/TaskList';
import ActionButton from './components/ActionButton';
import Card from './components/Card';
import Modal from './components/Modal';

const App = () => {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("Taskcampus-tareas");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  const handleEliminar = () => {
    setTareas((prev) => prev.filter((t) => t.id !== tareaAEliminar));
    setTareaAEliminar(null);
  };

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hayDatosLocales = localStorage.getItem("Taskcampus-tareas");

    if (hayDatosLocales) return;
    const cargarDesdeAPI = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        const tareasAdaptadas = data.map((item) => ({
          id: item.id,
          titulo: item.title,
          completada: item.completed,
        }));

        setTareas(tareasAdaptadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDesdeAPI();
  }, []);

  useEffect(() => {
    // Corregido "takscampus-tareas" por "Taskcampus-tareas" para mantener la consistencia
    localStorage.setItem('Taskcampus-tareas', JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    // Corregido "tarea" (singular) por "tareas" (plural)
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('TaskCampus activo');
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Corregido el paréntesis faltante en el parámetro: (titulo => por (titulo) =>
  const agregarTarea = async (titulo) => {
    const nuevaTarea = { id: Date.now(), titulo, completada: false };
    setTareas([...tareas, nuevaTarea]);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
      });
      const data = await response.json();
      console.log("Tarea creada en servidor:", data);
    } catch (err) {
      console.error("Error al crear tarea en servidor", err);
    }
  };

  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: true }
          : tarea
      )
    );
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />
      <Card titulo="Resumen de tareas">
        <TaskSummary total={tareas.length} />
      </Card>
      <TaskForm onAgregar={agregarTarea} />
      <Card titulo="Mis tareas">
        <TaskList
          tareas={tareas}
          onCompletar={completarTarea}
          onEliminar={setTareaAEliminar}
          cargando={cargando}
          error={error}
        />
      </Card>
      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea?"
        onConfirmar={handleEliminar}
        onCancelar={() => setTareaAEliminar(null)}
      />
    </div>
  );
};

export default App;