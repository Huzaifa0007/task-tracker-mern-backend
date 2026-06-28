import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    priority,
    status,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully.",
    data: task,
  });
});

// Get All Tasks
export const getTasks = asyncHandler(async (req, res) => {
  const {
    status,
    priority,
    search,
    sort = "-createdAt",
    page = 1,
    limit = 10,
  } = req.query;

  const query = { user: req.user._id };

  if (status) query.status = status;
  if (priority) query.priority = priority;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const tasks = await Task.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Task.countDocuments(query);

  res.status(200).json({
    success: true,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: tasks,
  });
});

// Get Single Task
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) throw new ApiError(404, "Task not found.");

  res.status(200).json({
    success: true,
    data: task,
  });
});

// Update Task
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) throw new ApiError(404, "Task not found.");

  res.status(200).json({
    success: true,
    message: "Task updated successfully.",
    data: task,
  });
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) throw new ApiError(404, "Task not found.");

  res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
  });
});
