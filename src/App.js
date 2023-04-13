import { useEffect, useState } from "react";
import Cleanjson from "./cleanJson";
import FillForward from "./fillForward";
import FormatTime from "./formatTime";

import "./styles.css";

const moment = require("moment");

import last24_1 from "./data/last24/3-last24(4.4.23-10.28).json";
import last24_2 from "./data/last24/3-last24(4.4.23-12.43).json";

import anyday_1 from "./data/anyday/1-19mart.json";
import anyday_2 from "./data/anyday/3-offline_end.json";
import anyday_3 from "./data/anyday/3-offline_start.json";
import anyday_4 from "./data/anyday/5-01april.json";
import anyday_5 from "./data/anyday/data2.json";
import anyday_6 from "./data/anyday/data4.json";
import anyday_7 from "./data/anyday/data6.json";
import RemoveWrongData from "./removeWrongData";
import AxisInfo from "./axisInfo";
import Chart from "./chart";

export default function App() {
  const [anyDayJsonList, setAnyDayJson] = useState([
    { title: "1-19mart", data: anyday_1 },
    { title: "3-offline_end", data: anyday_2 },
    { title: "3-offline_start", data: anyday_3 },
    { title: "5-01april", data: anyday_4 },
    { title: "data2", data: anyday_5 },
    { title: "data4", data: anyday_6 },
    { title: "data6", data: anyday_7 },
  ]);

  const [last24JsonList, setLast24DayJson] = useState([
    { title: "3-last24(4.4.23-10.28)", data: last24_1 },
    { title: "3-last24(4.4.23-12.43)", data: last24_2 },
  ]);

  const [appTime, setAppTime] = useState(0);
  const [cleanJsonTime, setCleanJsonTime] = useState(0);
  const [formatJsonTime, setFormatJsonTime] = useState(0);
  const [fillForwardTime, setFillForwardTime] = useState(0);

  const [minX, setMinX] = useState(0);
  const [maxX, setMaxX] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [axisInfo, setAxisInfo] = useState(null);

  const [selectedJson, setSelected] = useState("");
  const [lastData, setLastData] = useState(null);

  const buttonHandler = (item) => {
    setSelected(item.title);
    const replacer = (key, value) => (value === undefined ? null : value);
    const start = Date.now();
    const cleanJson = Cleanjson(item.data);
    setCleanJsonTime(cleanJson.runTime);
    const formatJson = FormatTime(cleanJson.cleanJson);
    setFormatJsonTime(formatJson.runTime);
    const fillForward = FillForward(formatJson.formatJson);
    const removeWrongData = RemoveWrongData(fillForward.fillForward);
    setLastData(removeWrongData.removeWrongData.data);
    let lastAxisInfo = AxisInfo(removeWrongData.removeWrongData);
    setMinX(lastAxisInfo.minX);
    setMaxX(lastAxisInfo.maxX);
    setMinY(lastAxisInfo.minY);
    setMaxY(lastAxisInfo.maxY);
    setAxisInfo(lastAxisInfo);
    setFillForwardTime(fillForward.runTime);
    setAppTime(Date.now() - start);
  };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flex: 1,
        }}
      >
        <div style={{ flex: 1 }}>
          last24
          <ul>
            {last24JsonList.map((item) => {
              return (
                <li key={item.title}>
                  <button
                    onClick={() => {
                      buttonHandler(item);
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
          anyday
          <ul>
            {anyDayJsonList.map((item) => {
              return (
                <li key={item.title}>
                  <button
                    onClick={() => {
                      buttonHandler(item);
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div>selected Json : {selectedJson} </div>
          <div>cleanJson Time : {cleanJsonTime} ms</div>
          <div>formatJson time : {formatJsonTime} ms</div>
          <div>fillForward time : {fillForwardTime} ms</div>
          <div>app time : {appTime} ms </div>
          <div>
            minX: {minX}, maxX: {maxX}
            <br />
            minY: {minY}, maxY: {maxY}
          </div>
        </div>
      </div>
      {lastData && axisInfo && <Chart Json={lastData} axisInfo={axisInfo} />}
    </div>
  );
}
