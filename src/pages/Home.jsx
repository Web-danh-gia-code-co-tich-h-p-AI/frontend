import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../utils/FallbackComponent";
import PropTypes from "prop-types";

const Home = (props) => {
  return <div>{props.name ? "Hi " + props.name : "You are not logged in"}</div>;
};

Home.propTypes = {
  name: PropTypes.string,
};

const EnhancedHome = withErrorBoundary(Home, {
  FallbackComponent,
});

export default EnhancedHome;
