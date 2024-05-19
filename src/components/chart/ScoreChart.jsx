// ScoreChart.jsx
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const ScoreChart = ({ dataPoints, title, typeChart }) => {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: title || "Score Chart"
      },
      axisY: {
        includeZero: true
      },
      data: [{
        type: typeChart || "area", //change type to bar, line, area, pie, spline, column, doughnut
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: dataPoints
      }]
    }
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ScoreChart;


