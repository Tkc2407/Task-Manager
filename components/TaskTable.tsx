"use client";

import { useState, useEffect } from "react";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
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
        {tasks.map((task: any) => (
          <tr key={task.id}>
            <td className="border border-gray-300 p-2">{task.id}</td>
            <td className="border border-gray-300 p-2">{task.title}</td>
            <td className="border border-gray-300 p-2">{task.priority}</td>
            <td className="border border-gray-300 p-2">{task.status}</td>
            <td className="border border-gray-300 p-2">{task.startTime}</td>
            <td className="border border-gray-300 p-2">{task.endTime}</td>
            <td className="border border-gray-300 p-2">
              <button className="text-blue-500">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
