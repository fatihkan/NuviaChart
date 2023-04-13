import dayjs from "dayjs";

const FormatTime = (Json) => {
  // timeZone: 3  ---timeZone: "Europe/Istanbul"
  const start = Date.now();
  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone");
  dayjs.extend(utc);
  let setJson = Json.data.map((item) => {
    // TODO last 24 göre burda kontrol yapılması gerekli
    if (
      item.time.includes("00:00:00.000Z") ||
      item.time.includes("23:59:59.999Z")
    ) {
      item.time = dayjs(item.time).subtract(3, "hour");
    } else {
      item.time = dayjs(item.time);
    }
    return item;
  });

  let formatJson = setJson.sort((a, b) => new Date(a.time) - new Date(b.time));
  Json.data = formatJson;
  return { formatJson: { data: formatJson }, runTime: Date.now() - start };
};

export default FormatTime;
