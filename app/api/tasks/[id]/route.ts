import { NextRequest, NextResponse } from "next/server";
import Task from "../../../lib/models/Task";
import authMiddleware from "../../..//lib/middleware/authMiddleware";

interface Params {
    params: {
        id: string;
    };
}

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const decoded = authMiddleware(req);
        const userId = decoded?.userId;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const taskId = params.id;
        const updatedData = await req.json();

        const task = await Task.findByIdAndUpdate(
            taskId,
            { ...updatedData, userId },
            { new: true }
        );

        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        const decoded = authMiddleware(req);
        const userId = decoded?.userId;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const taskId = params.id;
        const task = await Task.findOneAndDelete({ _id: taskId, userId });

        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}