// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      {/* <nav className="p-4 bg-gray-100">Dashboard Navigation</nav> */}
      <main>{children}</main>
    </div>
  );
}
