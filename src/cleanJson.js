const Cleanjson = (defaultJson) => {
  const start = Date.now();
  const report = defaultJson.report;
  const newData = report?.data.map((item, i) => {
    return {
      time: item?.time,
      offline: item?.offline,
      combiStateOn: item?.combiStateOn,
      acStateOn: item?.acStateOn,
      outsideTemperature: item?.outsideTemperature,
      temperature: item?.temperature,
      targetTemperature: item?.targetTemperature
    };
  });

  const newStats = {
    averageOutdoorTemperature: report?.stats?.placeAverageTemperature
  };

  const newSummary = {
    heaterRuntimes: report?.summary?.runtimes?.total,
    averageRoomTemperature: report?.summary?.averageTemperatures?.total,
    gasSavings: report?.summary?.gasSavings
  };

  const cleanJson = {
    data: newData,
    stats: newStats,
    summary: newSummary
  };
  //console.log("cleanjson Finish", Date.now() - start);
  return { cleanJson, runtime: Date.now() - start };
};

export default Cleanjson;
