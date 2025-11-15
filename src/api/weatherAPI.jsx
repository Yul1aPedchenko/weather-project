import { weatherApi } from "./axiosIntance";

export const getWeatherByCity = async (city) => {
    const {data} = await weatherApi.get("weather", {
        params: {q: city}
    });
    return data;
}