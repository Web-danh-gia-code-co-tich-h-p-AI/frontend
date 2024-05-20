import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import FallbackComponent from "../../utils/FallbackComponent";

const LoadingSkeleton = (props) => {
  return (
    <div
      className={`skeleton ${props.className}`}
      style={{
        height: props.height,
        width: props.width || "100%",
        borderRadius: props.radius,
      }}
    ></div>
  );
};

LoadingSkeleton.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  radius: PropTypes.string,
};

const EnhancedLoadingSkeleton = withErrorBoundary(LoadingSkeleton, {
  FallbackComponent,
});

export default EnhancedLoadingSkeleton;
