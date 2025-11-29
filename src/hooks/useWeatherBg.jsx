import { weatherIcons } from "../images/weather/weatherIcons";

export const useWeatherBg = (code, isForecast = false) => {
  if (!code) return { background: "", image: null, isDay: true };

  const image = weatherIcons[code];
  const isDay = code.endsWith("d");

  const gradientDay = ["linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.65) 100%)", "linear-gradient(180deg, rgba(29,32,38,0.4) 0%, rgba(29,32,38,0) 100%)"].join(", ");
  const gradientNight = "linear-gradient(180deg, rgba(29,32,38,0.4) 0%, rgba(29,32,38,0.4) 100%)";

  const bgDay = "linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%),";
  const bgNight = "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),";
  if (isForecast) {
    const background = `${isDay ? bgDay : bgNight} url(${image})`;
    return { background, image, isDay };
  } else {
    const background = `${isDay ? gradientDay : gradientNight}, url(${image})`;

    return { background, image, isDay };
  }
};
