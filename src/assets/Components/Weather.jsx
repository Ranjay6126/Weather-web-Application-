import React, { useEffect, useState , useRef} from "react";

import "./Weather.css";

import search_icon from "../search.png";
import clear_icon from "../clear.png";
import cloud_icon from "../cloud.png";
import drizzle_icon from "../drizzle.png";
import rain_icon from "../rain.png";
import snow_icon from "../snow.png";
import wind_icon from "../wind.png";
import humidity_icon from "../humidity.png";

const Weather = () => {

   const inputRef = useRef()

  const [weatherData, setWeatherData] = useState({}); // initialized as an empty object

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {

    if(city === ""){
      alert("Please Enter a City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5440a43e1c86af9617ae13815cf6d645`; // corrected 'units'
      const response = await fetch(url);
      const data = await response.json();

     if(!response.ok){
      alert(data.message);
      return;
     }
 

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.floor(data.wind.speed), // fixed wind speed
        temp: Math.floor(data.main.temp), // added temp
        location: data.name,
        icon: icon,
      });
    } catch (error) {
     setWeatherData(false); // added error handling
     console.error("Error in fetching weather data")
    }
  };

  useEffect(() => {
    search("Gaur");
  }, []);

  return (
    <div className="weather">
      <p class="title"><b><u>WEATHER APPLICATION</u></b> </p>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
      </div>

      {weatherData ? <>

        <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temp}°C</p> {/* display temperature */}
      <p className="Location">{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed}km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>

      </>:<></>}

      
    </div>
  );
};

export default Weather;
