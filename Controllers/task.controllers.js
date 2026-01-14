// controllers/task.controller.js
// import Task from "../models/Task.js";
import Task from "../Models/task.js";


// export const getTasks = async (req, res) => {
//   const tasks = await Task.find({ userId: req.userId });
//   res.json(tasks);
// };

// export const createTask = async (req, res) => {
//   const task = await Task.create({
//     title: req.body.title,
//     completed: false,
//     userId: req.userId
//   });
//   res.json(task);
// };



// import Task from "../models/Task.js";



// Create Task
export const createTask = async (req, res) => {
  try {
    // ensure new task is associated with the authenticated user
    const task = await Task.create({ ...req.body, userId: req.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Tasks
export const getTasks = async (req, res) => {
  // return only tasks belonging to the authenticated user
  const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
};

// Update Task
export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

// Delete Task
// export const deleteTask = async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: "Task deleted" });
// };


export const deleteTask = async(req,res) =>{
  try{
    // ensure we only delete tasks owned by the authenticated user
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if(!task){
      return res.status(404).json({
        message:"task not found",
        success: false
      })
    }
    await task.deleteOne();
    res.json({message:"task Deleted"})
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      message: error 
    })
    
  }
}
export const markCompleted = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { completed: true },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

