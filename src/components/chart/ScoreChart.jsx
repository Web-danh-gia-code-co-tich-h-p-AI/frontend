import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ScoreChart = ({ dataPoints, title, typeChart }) => {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: title || "Score Chart",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: typeChart || "area", //change type to bar, line, area, pie, spline, column, doughnut
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: dataPoints,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

ScoreChart.propTypes = {
  dataPoints: PropTypes.array.isRequired,
  title: PropTypes.string,
  typeChart: PropTypes.string,
};

const EnhancedScoreChart = withErrorBoundary(ScoreChart, {
  FallbackComponent,
});

export default EnhancedScoreChart;
