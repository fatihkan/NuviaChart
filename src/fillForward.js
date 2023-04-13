const FillForward = (Json) => {
  if (Json?.data !== undefined) {
    let data = Json.data;
    const start = Date.now();
    const lastValues = {};
    const newData = data.map((obj) => {
      const newObj = { ...obj };
      Object.keys(newObj).forEach((key) => {
        if (key !== "targetTemperature") {
          if (newObj[key] !== undefined) {
            lastValues[key] = newObj[key];
          } else {
            newObj[key] = lastValues[key];
          }
        }
      });
      return newObj;
    });

    let lastTarget,
      lastOffline = null;
    const targetUpdate = newData.map((item) => {
      if (item.targetTemperature) {
        lastTarget = item.targetTemperature;
        lastOffline = item.offline;
      } else {
        if (!item.offline && lastOffline) {
          item.targetTemperature = null;
          lastTarget = null;
        } else {
          item.targetTemperature = lastTarget;
        }
        lastOffline = item.offline;
      }
      return item;
    });
    const replacer = (key, value) => (value === undefined ? null : value);

    //console.log("data2", JSON.stringify(targetUpdate, replacer));
    return { fillForward: { data: targetUpdate }, runTime: Date.now() - start };
  }
  return null;
};

export default FillForward;
