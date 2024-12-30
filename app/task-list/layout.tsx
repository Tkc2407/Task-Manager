// app/task-list/layout.tsx
export default function TaskListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="task-list-layout">
      {/* <aside className="p-4 bg-gray-100">Task List Navigation</aside> */}
      <main>{children}</main>
    </div>
  );
}
