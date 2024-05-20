//import StatisticsScore from "../../components/chart/StatisticsScore";
import React from "react";
import StatisticsScore from "../../components/chart/StatisticsScore";
import AdminAccountDisplay from "../../components/adminaccount/AdminAccountDisplay";
//import AdminCreateAccount from "../../components/adminaccount/AdminCreateAccount";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const AdminPage = () => {
  return (
    <div>
      <AdminAccountDisplay />
      {/* <StatisticsScore />
      <AdminCreateAccount /> */}
    </div>
  );
};

const EnhancedAdminPage = withErrorBoundary(AdminPage, {
  FallbackComponent,
});

export default EnhancedAdminPage;
