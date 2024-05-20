import StatisticsScore from "../../components/chart/StatisticsScore";
import AdminAccountDisplay from "../../components/adminaccount/AdminAccountDisplay";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const Dashboard = () => {
  return (
    <div>
      <div className="m-5 font-bold">
        <h1 className="text-3xl">Dashboard</h1>
        <p>Welcome to the dashboard!</p>
      </div>
      <AdminAccountDisplay />
      <StatisticsScore />
    </div>
  );
};

const EnhancedDashboard = withErrorBoundary(Dashboard, {
  FallbackComponent,
});

export default EnhancedDashboard;
