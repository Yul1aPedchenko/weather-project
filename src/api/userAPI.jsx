import axios from "axios";

const API_URL = import.meta.env.VITE_MOKAPI;

export const addCityToRecents = async (userId, weatherData) => {
  const { data: user } = await axios.get(`${API_URL}/users/${userId}`);
  const updatedRecents = [weatherData, ...user.recents];
  const {data: updatedUser} = await axios.put(`${API_URL}/users/${userId}`, {
    ...user,
    recents: updatedRecents,
  })

  return updatedRecents;
}