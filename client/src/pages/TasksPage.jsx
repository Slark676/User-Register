import { useTasks } from "../context/TasksContext.jsx";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard.jsx";
function TasksPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);
  if (tasks.length === 0) {
    return <div>No hay tareas</div>;
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksPage;
