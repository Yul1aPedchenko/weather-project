import axios from "axios";

const API_URL = import.meta.env.VITE_MOKAPI;

export const userAPI = {
  update: async (userId, updates) => {
    try {
      await axios.put(`${API_URL}/users/${userId}`, updates);
    } catch (err) {
      console.error("Failed to update user on server:", err);
      throw err;
    }
  },
};