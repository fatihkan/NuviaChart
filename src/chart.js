/* eslint-disable no-magic-numbers */
import React, { useState, useEffect } from "react";
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
import { VictoryLabel, VictoryTheme } from "victory-core";
const Chart = (Json) => {
  const chartData = Json.Json;
  const axisInfo = Json.axisInfo;
  const replacer = (key, value) => (value === undefined ? null : value);
  const [value, setValue] = useState(null);
  const VictoryCustomContainer = createContainer("cursor", "voronoi");

  const degreeLoop = (minY, maxY) => {
    let count = (maxY - minY) / 5 - 1;
    let centerData = [];
    centerData[0] = minY;
    for (let i = 1; i <= count; ++i) {
      centerData[i] = maxY - 5 * i;
    }
    centerData[count + 1] = maxY;
    return centerData;
  };
  return (
    <>
      <div>
        <div className="demo">
          <VictoryChart
            width={500}
            height={250}
            responsive={false}
            scale={{ x: "time" }}
            events={[{ childName: "all" }]}
            domain={{ y: [axisInfo.minY, axisInfo.maxY] }}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryCustomContainer
                voronoiDimension="x"
                cursorDimension="x"
                labels={({ datum }) => {
                  console.log(datum);
                  let displayData = "";
                  if (datum.childName === "temperature") {
                    displayData = " -- " + datum.time.format("HH:mm");
                  }
                  displayData = datum._y + displayData;
                  if (datum._y) {
                    if (datum.childName === "combiStateOn") {
                      return `${datum.childName}: on`;
                    }
                    return `${datum.childName}: ${displayData}`;
                  }
                }}
                onActivated={(datum) => {}}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={10}
                    style={{
                      fontSize: 11,
                      fill: "white",
                      padding: 2,
                    }}
                    flyoutStyle={{
                      stroke: "black",
                      strokeWidth: 0,
                      fill: "#00000090",
                      borderRadius: 5,
                    }}
                  />
                }
              />
            }
          >
            <VictoryAxis
              tickFormat={(t) => `${t} °C`}
              dependentAxis
              tickValues={degreeLoop(axisInfo.minY, axisInfo.maxY)}
            />
            <VictoryAxis
              tickCount={3}
              tickValues={[
                dayjs(axisInfo.minX),
                dayjs(axisInfo.minX).add(6, "hour"),
                dayjs(axisInfo.minX).add(12, "hour"),
                dayjs(axisInfo.minX).add(18, "hour"),
                dayjs(axisInfo.maxX),
              ]}
              tickFormat={(t) => `${dayjs(t).format("HH:mm")}`}
            />
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
                if (item.combiStateOn) return axisInfo.minY + 1;
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
                if (item.acStateOn) return axisInfo.minY + 2;
                return null;
              }}
            />
            <VictoryLine
              name="offline"
              style={{ data: { stroke: "red" } }}
              data={chartData}
              x={(item) => new Date(item.time)}
              y={(item) => {
                if (item.offline) return axisInfo.minY + 2;
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
