/* eslint-disable no-magic-numbers */
import React, { useState } from "react";
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
import { VictoryTooltip } from "victory-tooltip";
import { VictoryVoronoiContainer } from "victory-voronoi-container";
import { createContainer } from "victory-create-container";
import dayjs from "dayjs";
import { VictoryLabel } from "victory-core";
const Chart = (Json) => {
  const chartData = Json.Json;
  const axisInfo = Json.axisInfo;
  const replacer = (key, value) => (value === undefined ? null : value);
  const [value, setValue] = useState(null);
  const VictoryCustomContainer = createContainer("cursor", "voronoi");
  return (
    <>
      <div>
        <div className="demo">
          <VictoryChart
            width={400}
            height={200}
            scale={{ x: "time" }}
            domain={{
              y: [axisInfo.minY, axisInfo.maxY],
            }}
            containerComponent={
              <VictoryCustomContainer
                voronoiDimension="x"
                cursorDimension="x"
                labels={({ datum }) => {
                  return `${datum.childName}: ${datum._y}`;
                }}
                onActivated={(datum) => {}}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={10}
                    style={{
                      fontSize: 16,
                      fill: "white",
                      padding: 10,
                      borderRadius: 5,
                    }}
                    flyoutStyle={{
                      stroke: "black",
                      strokeWidth: 1,
                      fill: "black",
                      borderRadius: 5,
                    }}
                  />
                }
              />
            }
          >
            <VictoryLine
              name="isim"
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
              name="temperature"
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
              name="outsideTemperature"
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
            <VictoryLine
              name="combiStateOn"
              sortKey={(item) => item.time}
              style={{ data: { stroke: "blue" } }}
              data={chartData}
              x={(item) => new Date(item.time)}
              y={(item) => {
                if (item.combiStateOn) return 1;
                return null;
              }}
            />
            <VictoryLine
              name="acStateOn"
              sortKey={(item) => item.time}
              style={{ data: { stroke: "green", strokeWidth: 3 } }}
              data={chartData}
              x={(item) => new Date(item.time)}
              y={(item) => {
                if (item.acStateOn) return 2;
                return null;
              }}
            />
            <VictoryBar
              name="offline"
              style={{ data: { fill: "red" } }}
              data={chartData}
              x={(item) => new Date(item.time)}
              y={(item) => {
                if (item.offline) return 2;
                return null;
              }}
            />
          </VictoryChart>
        </div>
      </div>
    </>
  );
};

export default Chart;
