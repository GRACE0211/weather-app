import React, { useState } from 'react';
// 載入SVG import { ReactComponent as Cloudy } from ''
// import Cloudy from '../../images/cloudy_day_sun_icon.svg';
import Rainy from '../../images/cloud-rainy.png';
import Umbrella from '../../images/umbrella_icon.svg';
import Refresh from '../../images/arrows-clockwise-bold.svg';

function Forecast() {
  
  const [weatherElement, setWeatherElement] = useState({
    observationTime: '2023/04/11',
    locationName: '桃園市',
    description: '多雲時晴',
    weatherCode: '0',
    maxTemperature: 20,
    minTemperature: 16,
    rainPossibility: '20',
  });
  const handleClick = () => {
    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B95877EB-F876-4B84-BF6F-0DA84B9BEF72&locationName=%E6%A1%83%E5%9C%92%E5%B8%82')
      .then((response)=>{
        return response.json();
      })
    .then((data) => {
      const locationData = data.records.location[0];
      console.log('locationData', locationData);
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['Wx', 'PoP', 'CI', 'MaxT', 'MinT'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[2].parameter;
          }
          console.log('neededElements', neededElements);
          return neededElements;
        },
      );
      console.log('time', weatherElements.time[2].startTime);
      // STEP 3：要使用到 React 組件中的資料
      // 回傳的資料裡面包含「天氣現象（Wx）」、「降雨機率（PoP）」、「舒適度（CI）」、「最高溫度（MaxT）」和「最低溫度（MinT）」
      setWeatherElement({
        observationTime: weatherElements.time[2].startTime,
          locationName: '桃園市',
          description: weatherElements.time[2].parameter.parameterName,
          weatherCode: weatherElements.time[2].parameter.parameterValue,
          maxTemperature: weatherElements.MaxT.parameterName,
          minTemperature: weatherElements.MinT.parameterName,
          rainPossibility: weatherElements.PoP.parameterName,
      });
    });
  };
  const dateString = weatherElement.observationTime;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  return (
    <div className="box-content bg-slate-200 flex justify-center items-center h-screen animate__animated ">
      <div className="WeatherCard mx-auto w-80 p-4 bg-white drop-shadow-lg rounded-xl">
        <div className="Location text-xl mt-4">{weatherElement.locationName}</div>
        <div className="Description text-sm text-slate-500  my-2">
          {formattedDate}
          {' '}
          {weatherElement.description}
        </div>
        <div className="weatherElement my-6 flex flex-col items-center text-4xl">
          <img src={Rainy} alt='cloudy icon' className="mx-auto h-28 w-28"/>
          <div className=" mt-6 flex justify-between gap-10">
            <div className=' font-semibold text-slate-500'>
              L {Math.round(weatherElement.minTemperature)}&#8451;
            </div>
            <div className=' font-semibold text-slate-500'>
              H {Math.round(weatherElement.maxTemperature)}&#8451;
            </div>
          </div>
        </div>
        <div className="Rain my-2 flex items-center justify-center gap-3 text-2xl font-semibold text-slate-500">
          <img src={Umbrella} alt='umbrella icon' className=" h-10 w-10"/>
          {weatherElement.rainPossibility}%
        </div>
        <div className="flex justify-end mt-4">
          <img src={Refresh} alt='refresh icon' className="" onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
