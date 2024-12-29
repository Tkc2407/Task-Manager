import Link from "next/link";
import TaskSummary from "../../components/TaskSummary";

const DashboardPage=() =>{
  return (
    <div className="p-8">
      <TaskSummary />
    </div>
  );
};
export default DashboardPage;
