const request = require("request");

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=d01b1d047eed4e27b5adb26d9bcf1d00";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data);
});
