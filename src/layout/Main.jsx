import { Outlet } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axiosConfig";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../utils/FallbackComponent";
import { lazy } from "react";

const Header = lazy(() => import("../layout/headerfooter/Header"));
const Footer = lazy(() => import("../layout/headerfooter/Footer"));

const Main = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/Account/Account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name } = response.data;
        const role = response.data.userRoles;
        setName(name);
        setRole(role[0]);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading Header...</div>}>
        {!loading && (
          <Header name={name} role={role} setName={setName} setRole={setRole} />
        )}
      </Suspense>

      <Outlet />

      <Suspense fallback={<div>Loading Footer...</div>}>
        {!loading && <Footer />}
      </Suspense>
    </>
  );
};

const EnhancedMain = withErrorBoundary(Main, {
  FallbackComponent,
});

export default EnhancedMain;
