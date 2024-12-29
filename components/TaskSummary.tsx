export default function TaskSummary() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="text-lg">Total Tasks</p>
          <p className="text-2xl font-bold">25</p>
        </div>
        <div>
          <p className="text-lg">% Completed</p>
          <p className="text-2xl font-bold">40%</p>
        </div>
        <div>
          <p className="text-lg">% Pending</p>
          <p className="text-2xl font-bold">60%</p>
        </div>
        <div>
          <p className="text-lg">Avg Time</p>
          <p className="text-2xl font-bold">3.5 hrs</p>
        </div>
      </div>
    </div>
  );
}
