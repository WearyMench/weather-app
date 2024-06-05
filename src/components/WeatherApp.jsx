import { useState, useEffect } from "react";
import Loading from "./loading";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";

import styles from "./weatherApp.module.css";

export default function WeatherApp() {
  const [weather, setWeather] = useState();

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = "Weather | " + weather?.name ?? "";
  }, [weather]);

  const url = import.meta.env.VITE_BACKEND_URL;
  const key = import.meta.env.VITE_BACKEND_KEY;

  async function loadInfo(city = "london") {
    try {
      const request = await fetch(`${url}${city}&limit=5&appid=${key}`);
      const json = await request.json();
      console.log(json);
      setTimeout(() => {
        setWeather(json[0]);
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
}
