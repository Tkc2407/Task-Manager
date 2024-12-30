"use client";

import { useState, useEffect } from "react";

// Define the Task interface
interface Task {
  id: string | number;
  title: string;
  priority: string;
  status: string;
  startTime: string;
  endTime: string;
}

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Data received is not an array");
        }

        setTasks(data);
        setError(null); // Clear any existing errors
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Retry fetching tasks
  const retryFetch = async () => {
    setIsLoading(true);
    setError(null);
    setTasks([]);
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (taskId: string | number) => {
    console.log(`Edit task with ID: ${taskId}`);
    // Implement edit logic here (e.g., open a modal or navigate to an edit page)
  };

  if (isLoading) {
    return <div className="p-4">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={retryFetch}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Task ID</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Priority</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Start Time</th>
            <th className="border border-gray-300 p-2">End Time</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border border-gray-300 p-2">{task.id}</td>
              <td className="border border-gray-300 p-2">{task.title}</td>
              <td className="border border-gray-300 p-2">{task.priority}</td>
              <td className="border border-gray-300 p-2">{task.status}</td>
              <td className="border border-gray-300 p-2">{task.startTime}</td>
              <td className="border border-gray-300 p-2">{task.endTime}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(task.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
