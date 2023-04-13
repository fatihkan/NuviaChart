/* eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryAxis } from "victory-axis";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryLegend } from "victory-legend";
import { VictoryZoomContainer } from "victory-zoom-container";
import { VictoryBrushContainer } from "victory-brush-container";
import dayjs from "dayjs";

const Chart = (Json) => {
  const chartData = Json.Json;
  const axisInfo = Json.axisInfo;
  const replacer = (key, value) => (value === undefined ? null : value);
  return (
    <div className="demo">
      <VictoryChart
        width={400}
        height={200}
        scale={{ x: "time" }}
        domain={{
          y: [axisInfo.minY, axisInfo.maxY],
        }}
      >
        <VictoryLine
          sortKey={(item) => item.time}
          style={{ data: { stroke: "black", strokeDasharray: "5,5" } }}
          data={chartData}
          x={(item) => {
            return item.time;
          }}
          y={(item) => {
            if (item.targetTemperature) return item.targetTemperature;
            return null;
          }}
          interpolation="step"
        />
        <VictoryLine
          sortKey={(item) => item.time}
          style={{ data: { stroke: "red" } }}
          data={chartData}
          x={(item) => {
            return item.time;
          }}
          y={(item) => {
            if (item.temperature) return item.temperature;
            return null;
          }}
          interpolation="step"
        />
        <VictoryLine
          sortKey={(item) => item.time}
          style={{ data: { stroke: "orange" } }}
          data={chartData}
          x={(item) => {
            return item.time;
          }}
          y={(item) => {
            if (item.outsideTemperature) return item.outsideTemperature;
            return null;
          }}
          interpolation="step"
        />
        <VictoryBar
          sortKey={(item) => item.time}
          style={{ data: { fill: "blue" } }}
          data={chartData}
          x={(item) => new Date(item.time)}
          y={(item) => {
            if (item.combiStateOn) return axisInfo.minY + 1;
            return null;
          }}
        />
        <VictoryLine
          sortKey={(item) => item.time}
          style={{ data: { stroke: "green", strokeWidth: 3 } }}
          data={chartData}
          x={(item) => new Date(item.time)}
          y={(item) => {
            if (item.acStateOn) return axisInfo.minY + 2;
            return null;
          }}
        />
        <VictoryBar
          style={{ data: { fill: "red" } }}
          data={chartData}
          x={(item) => new Date(item.time)}
          y={(item) => {
            if (item.offline) return axisInfo.minY + 2;
            return null;
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default Chart;
