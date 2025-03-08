import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      console.log(params);
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const datavalid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateTask(params.id, datavalid);
    } else {
      createTask(datavalid);
    }
    navigate("/tasks");
  });
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          placeholder="Nombre"
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
          autoFocus
        />
        <label htmlFor="description">Descripción</label>
        <textarea
          rows="5"
          placeholder="Descripción"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("description")}
        />
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          placeholder="date"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("date")}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-700">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
