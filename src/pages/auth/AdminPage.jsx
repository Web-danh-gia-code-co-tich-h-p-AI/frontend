import React from "react";
import StatisticsScore from "../../components/chart/StatisticsScore";
import AdminAccountDisplay from "../../components/adminaccount/AdminAccountDisplay";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const AdminPage = () => {
  return (
    <div>
      <AdminAccountDisplay />
      <StatisticsScore />
    </div>
  );
};

const EnhancedAdminPage = withErrorBoundary(AdminPage, {
  FallbackComponent,
});

export default EnhancedAdminPage;
