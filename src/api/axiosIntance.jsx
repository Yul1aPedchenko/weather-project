import axios from "axios";

export const weatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/3.0",
    params: {
        appid: import.meta.env.VITE_OPENWEATHER_KEY,
        units: "metric",
        lang: "en",
    }
})
