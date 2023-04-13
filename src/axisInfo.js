const AxisInfo = (Json) => {
  let maxX = Json.data[Json.data.length - 1].time.format("YYYY-MM-DD HH:mm:ss");
  let minX = Json.data[0].time.format("YYYY-MM-DD HH:mm:ss");

  let newY = [];
  Json.data.map((item) => {
    newY.push(item.temperature);
    newY.push(item.targetTemperature);
    newY.push(item.outsideTemperature);
  });
  let yData = newY.sort((a, b) => a - b).filter((i) => i);
  let minY = Math.round((yData[0] - 3) / 5) * 5;
  let maxY = Math.round((yData[yData.length - 1] + 3) / 5) * 5;
  return { maxX, minX, minY, maxY };
};

export default AxisInfo;
