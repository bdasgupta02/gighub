import WorkerDashboard from "../components/WorkerDashboard/index"
import CompanyDashboard from "../components/CompanyDashboard/index"

export default function Dashboard(props) {
  let type = 'user'

  if (type == 'user') {
    return (
      <div>
        <WorkerDashboard />
      </div>
    );
  } else {
    return (
      <div>
        <CompanyDashboard />
      </div>
    );
  }
}