import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

const PrivateRoute = ({ element, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      axiosInstance
        .get("/Account/Account")
        .then((response) => {
          const userRoles = response.data.userRoles;
          if (userRoles) {
            setUserRole(userRoles[0]);
          } else {
            setUserRole(null);
          }
          console.log(userRoles[0]);
        })
        .catch((error) => {
          console.error("Error fetching user role", error);
          setUserRole(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>; // Hoặc một spinner khác để báo hiệu trạng thái loading
  }

  if (!userRole) {
    return <Navigate to="/unauthorized" />;
  }

  if (Array.isArray(allowedRoles)) {
    // Kiểm tra nếu vai trò người dùng nằm trong danh sách các vai trò được phép
    if (allowedRoles.includes(userRole)) {
      return element;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } else {
    // Kiểm tra nếu vai trò người dùng khớp với vai trò được phép
    if (userRole === allowedRoles) {
      return element;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRoles: PropTypes.oneOfType([
    PropTypes.oneOf(["User", "Admin", "Teacher", "Student"]),
    PropTypes.arrayOf(PropTypes.oneOf(["User", "Admin", "Teacher", "Student"])),
  ]).isRequired,
};

export default PrivateRoute;
