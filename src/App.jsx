import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskList from './components/TaskList';
import ActionButton from './components/ActionButton';

const App = () => {
  const [tareas, setTareas] = useState([
    {id:1, titulo: "Aprender que es React", completada: false},
    {id: 2, titulo: "Crear proyecto con Vite", completada: true},
    {id: 3, titulo: "Practicar JSX", completada: false},
  ]);
  //Recibe el id de la tarea a completar
  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? {...tarea, completada: true }
          : tarea
      )
    );
  };
  return (
    <div className='app-containter'>
      <Header title = "TaskCampus" description="Gestiona tus tareas academicas"/>
      <TaskSummary total={tareas.length}/>
      <TaskList tareas= {tareas} onCompletar={completarTarea}/>
    </div>
  );
};
export default App
