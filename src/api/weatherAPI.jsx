import { weatherApi } from "./axiosInstance";

const formatCity = (data, useCurrentTime = false) => ({
  id: data.id,
  name: data.name,
  country: data.sys.country,
  temp: data.main.temp,
  weather: data.weather[0].main,
  icon: data.weather[0].icon,
  dt: useCurrentTime ? Math.floor(Date.now() / 1000) : data.dt,
  timezone: data.timezone,
  coord: { lat: data.coord.lat, lon: data.coord.lon },
});

const formatForecast = (data, timezone) => {
  const formatted = {
    current: data.list[0].main,
    wind: data.list[0].wind,
    visibility: data.list[0].visibility,
    weather: data.list[0].weather[0],
    hourly: data.list.slice(0, 24),
    timezone,
    daily: [],
  };

  const dailyMap = {};
  data.list.forEach((item) => {
    const key = new Date(item.dt * 1000).toDateString();
    if (!dailyMap[key]) {
      dailyMap[key] = {
        temp: { min: Infinity, max: -Infinity },
        weather: item.weather[0],
        dt: item.dt,
      };
    }
    dailyMap[key].temp.min = Math.min(dailyMap[key].temp.min, item.main.temp_min || item.main.temp);
    dailyMap[key].temp.max = Math.max(dailyMap[key].temp.max, item.main.temp_max || item.main.temp);
  });

  formatted.daily = Object.values(dailyMap).slice(0, 8);
  return formatted;
};

export const weatherAPI = {
  getCurrent: async (cityName) => {
    try {
      const { data } = await weatherApi.get("/weather", { params: { q: cityName } });
      return formatCity(data);
    } catch (err) {
      if (err.response?.status === 404) {
        throw new Error(`City "${cityName}" not found`);
      }
      throw new Error("Weather service error. Try again later.");
    }
  },

  getCurrentWithFreshTime: async (cityName) => {
    try {
      const { data } = await weatherApi.get("/weather", { params: { q: cityName } });
      return formatCity(data, true);
    } catch (err) {
      console.error("Refresh failed:", err);
      return null;
    }
  },

  getDetailedForecast: async (city) => {
    try {
      if (!city.coord) throw new Error("No coordinates");
      const { data } = await weatherApi.get("/forecast", {
        params: { lat: city.coord.lat, lon: city.coord.lon },
      });
      return formatForecast(data, city.timezone);
    } catch (err) {
      console.error("Failed to load forecast:", err);
      throw err;
    }
  },
};
