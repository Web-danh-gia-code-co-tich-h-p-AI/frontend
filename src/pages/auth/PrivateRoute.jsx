import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const token = Cookies.get("token");

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  element: PropTypes.node,
};
