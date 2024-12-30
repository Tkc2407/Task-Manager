"use client";

import { useState, useEffect } from "react";

// Define the Task interface
interface Task {
  id: number | string;
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
  const [selectedTasks, setSelectedTasks] = useState<Set<number | string>>(
    new Set()
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Task>({
    id: Date.now(),
    title: "",
    priority: "",
    status: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Data received is not an array");
        }
        setTasks(data);
        setError(null); // Clear previous errors
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);


  const toggleSelectTask = (taskId: number | string) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (newSelectedTasks.has(taskId)) {
      newSelectedTasks.delete(taskId);
    } else {
      newSelectedTasks.add(taskId);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

const handleSaveTask = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token missing");
    }

    // Validate newTask fields
    if (!newTask.title || !newTask.priority || !newTask.status) {
      setError("Please fill in all required fields");
      return;
    }

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save task");
    }

    const savedTask = await response.json();
    setTasks([...tasks, savedTask]);
    setIsModalOpen(false);
    setNewTask({
      id: Date.now(),
      title: "",
      priority: "",
      status: "",
      startTime: "",
      endTime: "",
    });
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to save task");
  }
};

const handleDeleteTasks = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token missing");
    }

    if (selectedTasks.size === 0) {
      setError("No tasks selected for deletion");
      return;
    }

    const taskIds = Array.from(selectedTasks);

    const response = await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskIds }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete tasks");
    }

    setTasks(tasks.filter((task) => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set());
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to delete tasks");
  }
};



  if (isLoading) {
    return <div className="p-4">Loading tasks...</div>;
  }
  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4">
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Task
        </button>
        <button
          onClick={handleDeleteTasks}
          disabled={selectedTasks.size === 0}
          className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Selected
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">
              <input
                type="checkbox"
                onChange={() => {
                  if (selectedTasks.size === tasks.length) {
                    setSelectedTasks(new Set());
                  } else {
                    setSelectedTasks(new Set(tasks.map((task) => task.id)));
                  }
                }}
                checked={selectedTasks.size === tasks.length}
              />
            </th>
            <th className="border border-gray-300 p-2">Task ID</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Priority</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Start Time</th>
            <th className="border border-gray-300 p-2">End Time</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => toggleSelectTask(task.id)}
                />
              </td>
              <td className="border border-gray-300 p-2">{task.id}</td>
              <td className="border border-gray-300 p-2">{task.title}</td>
              <td className="border border-gray-300 p-2">{task.priority}</td>
              <td className="border border-gray-300 p-2">{task.status}</td>
              <td className="border border-gray-300 p-2">{task.startTime}</td>
              <td className="border border-gray-300 p-2">{task.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Add Task</h2>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div>
              <label>Priority:</label>
              <input
                type="text"
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div>
              <label>Status:</label>
              <div className="flex flex-row space-x-4">
                <div>
                  <input
                    type="radio"
                    id="pending"
                    name="status"
                    value="Pending"
                    checked={newTask.status === "Pending"}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <label htmlFor="pending" className="ml-2">
                    Pending
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="finished"
                    name="status"
                    value="Finished"
                    checked={newTask.status === "Finished"}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <label htmlFor="finished" className="ml-2">
                    Finished
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label>Start Time:</label>
              <input
                type="datetime-local"
                name="startTime"
                value={newTask.startTime}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            </div>

            <div>
              <label>End Time:</label>
              <input
                type="datetime-local"
                name="endTime"
                value={newTask.endTime}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleSaveTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Task
              </button>
              <button
                onClick={handleCloseModal}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
