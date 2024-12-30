import mongoose, { Document, Schema } from "mongoose";

// Define interface for Task document
interface ITask extends Document {
  userId: mongoose.Types.ObjectId; // Changed from string to ObjectId
  title: string;
  startTime: Date;
  endTime: Date;
  priority: 1 | 2 | 3 | 4 | 5; // Made more specific
  status: "pending" | "finished";
}

// Define the schema
const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId instead of mongoose.Types.ObjectId
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "finished"],
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the model
const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);
export default Task;
