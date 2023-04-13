import dayjs from "dayjs";

const FormatTime = (Json) => {
  // timeZone: 3  ---timeZone: "Europe/Istanbul"
  const start = Date.now();
  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone");
  dayjs.extend(utc);
  let setJson = Json.data.map((item) => {
    if (item.time.includes("00:00:00.000Z")) {
      item.time = dayjs(item.time).subtract(6, "hour");
    } else {
      item.time = dayjs(item.time).subtract(3, "hour");
    }
    return item;
  });

  let formatJson = setJson.sort((a, b) => new Date(a.time) - new Date(b.time));
  Json.data = formatJson;
  return { formatJson: { data: formatJson }, runTime: Date.now() - start };
};

export default FormatTime;
