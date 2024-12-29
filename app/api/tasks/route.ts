import { NextRequest, NextResponse } from "next/server";
import Task from "../../lib/models/Task";
import authMiddleware from "../../lib/middleware/authMiddleware"; // Same middleware logic

// Create Task
export async function POST(req: NextRequest) {
  try {
    const decoded = authMiddleware(req); // Check user authentication
    const userId = decoded?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const taskData = await req.json();
    const task = await Task.create({ ...taskData, userId });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Get Tasks with Filters
export async function GET(req: NextRequest) {
  try {
    const decoded = authMiddleware(req); // Check user authentication
    const userId = decoded?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const priority = req.nextUrl.searchParams.get("priority");
    const status = req.nextUrl.searchParams.get("status");
    const filters: any = { userId };
    if (priority) filters.priority = priority;
    if (status) filters.status = status;

    const tasks = await Task.find(filters).sort({ startTime: 1, endTime: 1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Update Task
export async function PUT(req: NextRequest) {
  try {
    const decoded = authMiddleware(req); // Check user authentication
    const userId = decoded?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const taskId = req.nextUrl.pathname.split("/").pop(); // Extract task ID from URL
    const updatedData = await req.json();

    const task = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });
    if (!task)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Delete Task
export async function DELETE(req: NextRequest) {
  try {
    const decoded = authMiddleware(req); // Check user authentication
    const userId = decoded?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const taskId = req.nextUrl.pathname.split("/").pop(); // Extract task ID from URL

    const task = await Task.findByIdAndDelete(taskId);
    if (!task)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
