import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required."],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long."],
      maxlength: [100, "Title cannot exceed 100 characters."],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters."],
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: ["Pending", "In Progress", "Completed"],
        message: "Invalid task status.",
      },
      default: "Pending",
    },

    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "Invalid priority.",
      },
      default: "Medium",
    },

    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
