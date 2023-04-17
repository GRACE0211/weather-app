import React, { useState } from "react";
// 載入SVG import { ReactComponent as Cloudy } from ''
// import Cloudy from "../../images/cloudy_day_sun_icon.svg";
import Cloudy from "../../images/cloudy.png";
import Rain from "../../images/rain.svg";
import Wind from "../../images/wind.svg";
import Refresh from "../../images/arrows-clockwise-bold.svg";

export default function Current() {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: "2023-04-11 06:29:00",
    locationName: "桃園市",
    description: "多雲時晴",
    temperature: 20,
    windSpeed: 0.3,
    humid: 0.88,
  });
  const handleClick = () => {
    fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-B95877EB-F876-4B84-BF6F-0DA84B9BEF72&limit=5&locationName=國一S072K"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const locationData = data.records.location[0];
        console.log("locationData", locationData);

        // STEP 2：將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          },
          {}
        );

        // STEP 3：要使用到 React 組件中的資料
        setWeatherElement({
          observationTime: locationData.time.obsTime,
          locationName: "桃園市",
          description: "多雲時晴",
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
          humid: weatherElements.HUMD,
        });
      });
  };

  fetch(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B95877EB-F876-4B84-BF6F-0DA84B9BEF72&locationName=%E6%A1%83%E5%9C%92%E5%B8%82"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
    
  const time = new Intl.DateTimeFormat("zh-TW", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date())
  console.log(time);
  return (
    <div className=" box-content bg-slate-200 flex justify-center items-center h-screen ">
      <div className="WeatherCard mx-auto w-80 p-4 bg-white drop-shadow-lg rounded-xl">
        <div className="Location text-xl mt-4">
          {weatherElement.locationName}
        </div>
        <div className="Description text-sm text-slate-500 my-2">
          {time} {weatherElement.description}
        </div>
        <div className="weatherElement my-6 flex flex-col items-center">
          <img src={Cloudy} alt="cloudy icon" className="mx-auto h-28 w-28" />
          <div className="Temperature font-semibold text-slate-500 text-4xl mt-4">
            {Math.round(weatherElement.temperature)}&#8451;
          </div>
        </div>
        <div className=" mt-4 flex items-center gap-7  text-2xl font-semibold">
          <div className="AirFlow flex items-center text-slate-500 my-2">
            <img src={Wind} alt="wind icon" className="mr-2 h-10 w-10" />
            {weatherElement.windSpeed} m/h
          </div>
          <div className="Rain flex items-center text-slate-500 my-2">
            <img src={Rain} alt="rain icon" className="mr-2 h-10 w-10" />
            {weatherElement.humid * 100}%
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <div className="Description text-sm text-slate-500">
            最後觀測時間：
            {new Intl.DateTimeFormat("zh-TW", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(weatherElement.observationTime))}
          </div>
          <img
            src={Refresh}
            alt="refresh icon"
            className=""
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

// <a href="https://www.flaticon.com/free-icons/weather" title="weather icons">Weather icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/sunny" title="sunny icons">Sunny icons created by Freepik - Flaticon</a>