import StatisticsScore from "../../components/chart/StatisticsScore";
import AdminAccountDisplay from "../../components/adminaccount/AdminAccountDisplay";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const AdminPage = () => {
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

const EnhancedAdminPage = withErrorBoundary(AdminPage, {
  FallbackComponent,
});

export default EnhancedAdminPage;
