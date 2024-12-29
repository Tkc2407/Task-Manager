import TaskTable from "@/components/TaskTable";

export default function TaskListPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <TaskTable />
    </div>
  );
}
