import Button from "./Button";
import Badge from "./Badge";

const TaskList = ({ tareas, filtro, onCambiarFiltro, onToggle, onEliminar }) => {
  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <Button
          label="📋 Todas"
          onClick={() => onCambiarFiltro("todas")}
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button
          label="⏳ Pendientes"
          onClick={() => onCambiarFiltro("pendientes")}
          variant={filtro === "pendientes" ? "primary" : "secondary"}
        />
        <Button
          label="✅ Completadas"
          onClick={() => onCambiarFiltro("completadas")}
          variant={filtro === "completadas" ? "primary" : "secondary"}
        />
      </div>

      {tareas.length === 0 && (
        <p style={{ textAlign: "center", color: "#94a3b8" }}>
          No hay tareas en esta categoría 📭
        </p>
      )}

      <ul className="task-list">
        {tareas.map((tarea) => (
          <li key={tarea.id} className="task-item">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
              <Badge texto={tarea.completada ? "completada" : "pendiente"} />
              <span
                style={{
                  textDecoration: tarea.completada ? "line-through" : "none",
                  color: tarea.completada ? "#94a3b8" : "inherit",
                }}
              >
                {tarea.titulo}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              <Button
                label={tarea.completada ? "Desmarcar" : "Completar"}
                onClick={() => onToggle(tarea.id, tarea.completada)}
                variant={tarea.completada ? "success" : "primary"}
              />
              <Button
                label="Eliminar"
                onClick={() => onEliminar(tarea.id)}
                variant="danger"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;