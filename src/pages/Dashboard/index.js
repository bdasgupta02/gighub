import WorkerDashboard from "../../components/WorkerDashboard/index"
import CompanyDashboard from "../../components/CompanyDashboard/index"
import { useAuth } from "../../contexts/AuthContext";
import FullPage from '../FullPage'

export default function Dashboard(props) {
  const { isWorker } = useAuth()

  console.log(isWorker)
  if (isWorker) {
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

  // return (
  //   <FullPage>

  //   </FullPage>
  // )
}