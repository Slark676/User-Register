import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/task";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within an TasksProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]); // Cambiado a [tasks, setTasks]

  const getTasks = async () => {
    try {
      const res = await getTasksRequest(); // ✅ Llamamos a la API correctament
      console.log(res.data); // ✅ Ahora `res` está definido y contiene la respuesta del servidor
      setTasks(res.data); // Actualizamos la lista de tareas
    } catch (error) {
      console.error(error);
    }
  };
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task); // ✅ Llamamos a la API correctamente
      console.log(res.data); // ✅ Ahora `res` está definido y contiene la respuesta del servidor
      setTasks([...tasks, res.data]); // Agregamos la nueva tarea a la lista
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      console.log(res);
      if (res.status === 204) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TasksContext.Provider
      value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
