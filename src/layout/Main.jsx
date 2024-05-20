import Header from "../layout/headerfooter/Header";
import Footer from "../layout/headerfooter/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axiosConfig";

const Main = () => {
  const [name, setName] = useState("");

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

        const content = response.data;
        setName(content.name);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header name={name} setName={setName} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
