import { NextRequest, NextResponse } from "next/server";
import Task from "../../lib/models/Task";
import authMiddleware from "../../lib/middleware/authMiddleware";
import Cors from "cors";

// CORS Middleware Configuration
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "http://localhost:3000", // Update with your frontend's URL
  credentials: true,
});

// Helper function to run middleware
function runMiddleware(req: any, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, {}, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

// Helper function to handle authentication
async function authenticate(req: NextRequest) {
    if (req.nextUrl.pathname === "/favicon.ico") {
      return NextResponse.json({}, { status: 204 }); // Respond with no content
    }
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }
  const decoded = authMiddleware(req);
  if (!decoded?.userId) {
    throw new Error("Unauthorized: Invalid token");
  }
  return decoded.userId;
}

// GET: Retrieve tasks based on filters
export async function GET(req: NextRequest) {
  try {
    await runMiddleware(req, cors); // Apply CORS middleware

    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    console.log("Token received:", token);

    return NextResponse.json({
      message: "Success",
      data: "Your tasks go here",
    });
  } catch (error: any) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new task
export async function POST(req: NextRequest) {
  try {
    await runMiddleware(req, cors); // Apply CORS middleware

    const userId = await authenticate(req); // Authenticate the user

    const taskData = await req.json();
    const { title, startTime, endTime, priority, status } = taskData;

    if (!title || !startTime || !endTime || !priority || !status) {
      return NextResponse.json(
        { message: "Missing required task fields" },
        { status: 400 }
      );
    }

    if (![1, 2, 3, 4, 5].includes(priority)) {
      return NextResponse.json(
        { message: "Priority must be between 1 and 5" },
        { status: 400 }
      );
    }

    const task = await Task.create({ ...taskData, userId });
    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE: Delete tasks
export async function DELETE(req: NextRequest) {
  try {
    await runMiddleware(req, cors); // Apply CORS middleware

    const userId = await authenticate(req); // Authenticate the user
    const { taskIds } = await req.json();

    if (!Array.isArray(taskIds) || taskIds.length === 0) {
      return NextResponse.json(
        { message: "No task IDs provided" },
        { status: 400 }
      );
    }

    const deletedTasks = await Task.deleteMany({
      _id: { $in: taskIds },
      userId,
    });

    if (deletedTasks.deletedCount === 0) {
      return NextResponse.json(
        { message: "No tasks found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tasks deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
