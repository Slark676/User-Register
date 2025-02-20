import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(tasks);
};
export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(400).json({ message: "No existe ese task" });
  res.json(task);
};
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(400).json({ message: "No existe ese task" });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(400).json({ message: "No existe ese task" });
  return res.sendStatus(204);
};
