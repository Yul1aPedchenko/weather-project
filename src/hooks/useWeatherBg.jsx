import { weatherIcons } from "../images/weather/weatherIcons";

export const useWeatherBg = (code) => {
  if (!code) return { background: "", image: null, isDay: true };

  const image = weatherIcons[code];
  const isDay = code.endsWith("d");
  const gradientDay = "linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.65) 100%)," +"linear-gradient(180deg, rgba(29, 32, 38, 0.4) 0%, rgba(29, 32, 38, 0) 100%) ";

  const gradientNight = "linear-gradient(180deg, rgba(29, 32, 38, 0.4) 0%, rgba(29, 32, 38, 0.4) 100%)";

  const background = `${isDay ? gradientDay : gradientNight}, url(${image})`;
  return {
    background,
    isDay,
    image,
  }

};
