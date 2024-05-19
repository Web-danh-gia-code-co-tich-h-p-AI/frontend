import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axiosInstance
        .get("/Account/Account")
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
