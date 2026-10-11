import { useState } from "react";

const Header = ({ title, description}) => {
  const [mostrarUser, setMostrarUser] = useState(false);

  const nombreVisible = mostrarUser ? "Username" : "Anonimo";

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <p className="header-description">{description}</p>
      <p className="header-user">Usuario: {nombreVisible}</p>
      <button
        className="task-button"
        onClick={() => setMostrarUser(!mostrarUser)}
      >
        {mostrarUser ? "Anonimizar" : "Mostrar Usuario"}
      </button>
    </header>
  );
};

export default Header