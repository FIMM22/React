const TaskSummary = ({ total, completadas, pendientes, mostrando, filtroActual }) => {
  const numero = { fontSize: "2rem", fontWeight: 700, margin: 0 };
  const etiqueta = { color: "#64748b", margin: 0 };

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ ...numero, color: "#1d4ed8" }}>{total}</p>
        <p style={etiqueta}>Total</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ ...numero, color: "#16a34a" }}>{completadas}</p>
        <p style={etiqueta}>Completadas</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ ...numero, color: "#f59e0b" }}>{pendientes}</p>
        <p style={etiqueta}>Pendientes</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ ...numero, color: "#0f172a" }}>{mostrando}</p>
        <p style={etiqueta}>Mostrando ({filtroActual})</p>
      </div>
    </div>
  );
};

export default TaskSummary;