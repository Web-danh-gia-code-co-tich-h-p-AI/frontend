import Header from "../layout/headerfooter/Header";
import Footer from "../layout/headerfooter/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axiosConfig";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../utils/FallbackComponent";

const Main = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
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
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header name={name} role={role} setName={setName} setRole={setRole} />
      <Outlet />
      <Footer />
    </>
  );
};

const EnhancedMain = withErrorBoundary(Main, {
  FallbackComponent,
});

export default EnhancedMain;
