const RemoveWrongData = (Json) => {
  let start = Date.now();

  const removeWrongData = Json.data.map((item) => {
    if (item.offline) {
      item.combiStateOn = null;
      item.acStateOn = null;
      item.temperature = null;
      item.targetTemperature = null;
    }
    return item;
  });
  const replacer = (key, value) => (value === undefined ? null : value);

  //console.log("data", JSON.stringify(removeWrongData, replacer));
  return {
    removeWrongData: { data: removeWrongData },
    runTime: Date.now() - start
  };
};
export default RemoveWrongData;
