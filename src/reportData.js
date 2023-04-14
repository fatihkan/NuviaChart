import dayjs from "dayjs";

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const ReportData = (defaultJson) => {
  const start = Date.now();
  const report = defaultJson.report;
  const cleanData = report?.data.map((item) => {
    return {
      time: item?.time,
      offline: item?.offline,
      combiStateOn: item?.combiStateOn,
      acStateOn: item?.acStateOn,
      outsideTemperature: item?.outsideTemperature,
      temperature: item?.temperature,
      targetTemperature: item?.targetTemperature,
    };
  });

  const newStats = {
    averageOutdoorTemperature: report?.stats?.placeAverageTemperature,
  };

  const newSummary = {
    heaterRuntimes: report?.summary?.runtimes?.total,
    averageRoomTemperature: report?.summary?.averageTemperatures?.total,
    gasSavings: report?.summary?.gasSavings,
  };

  //format time
  let formatTime = cleanData
    .map((item) => {
      // last 24 saat durumunda burda kontrol edilmesi gerekli
      if (
        item.time.includes("00:00:00.000Z") ||
        item.time.includes("23:59:59.999Z")
      ) {
        item.time = dayjs(item.time).subtract(3, "hour");
      } else {
        item.time = dayjs(item.time);
      }
      return item;
    })
    .sort((a, b) => new Date(a.time) - new Date(b.time));

  // fill forward
  const fillForwardLastValues = {};
  const fillForward = formatTime.map((obj) => {
    const newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
      if (key !== "targetTemperature") {
        if (newObj[key] !== undefined) {
          fillForwardLastValues[key] = newObj[key];
        } else {
          newObj[key] = fillForwardLastValues[key];
        }
      }
    });
    return newObj;
  });

  // target update
  let targetUpdateLastTarget,
    targetUpdateLastOffline = null;
  const targetUpdate = fillForward.map((item) => {
    if (item.targetTemperature) {
      targetUpdateLastTarget = item.targetTemperature;
      targetUpdateLastOffline = item.offline;
    } else {
      if (!item.offline && targetUpdateLastOffline) {
        item.targetTemperature = null;
        targetUpdateLastTarget = null;
      } else {
        item.targetTemperature = targetUpdateLastTarget;
      }
      targetUpdateLastOffline = item.offline;
    }
    return item;
  });

  // remove wrong data
  const removeWrongData = targetUpdate.map((item) => {
    if (item.offline) {
      item.combiStateOn = null;
      item.acStateOn = null;
      item.temperature = null;
      item.targetTemperature = null;
    }
    return item;
  });

  // axis info
  let maxX = removeWrongData[removeWrongData.length - 1].time.format(
    "YYYY-MM-DD HH:mm:ss"
  );
  let minX = removeWrongData[0].time.format("YYYY-MM-DD HH:mm:ss");

  let newY = [];
  removeWrongData.map((item) => {
    newY.push(item.temperature);
    newY.push(item.targetTemperature);
    newY.push(item.outsideTemperature);
  });
  let yData = newY.sort((a, b) => a - b).filter((i) => i);
  let minY = Math.round((yData[0] - 3) / 5) * 5;
  let maxY = Math.round((yData[yData.length - 1] + 3) / 5) * 5;

  const cleanJson = {
    data: removeWrongData,
    stats: newStats,
    summary: newSummary,
    axisInfo: { maxX, minX, minY, maxY },
  };

  return { cleanJson, runtime: Date.now() - start };
};
export default ReportData;
