const TaskList = ({ tareas, onCompletar }) => {
  return (
    <div className="card">
      <h2 className="section-title">Lista de Tareas</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="task-item"
            >
            {/* Título tachado si está completada */}
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
                color: tarea.completada ? "#94a3b8" : "inherit",
              }}
            >
              {tarea.titulo}
            </span>
            {/* Botón solo aparece si NO está completada */}
            {tarea.completada ? (
              <span>✅</span>
            ) : (
              <button className="task-button" onClick={() => onCompletar(tarea.id)}>
                Completar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;