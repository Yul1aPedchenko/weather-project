import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_MOKAPI;
const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [localRecents, setLocalRecents] = useState(() => {
    try {
      const saved = localStorage.getItem("recents");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!user) {
      localStorage.setItem("recents", JSON.stringify(localRecents));
    }
  }, [localRecents, user]);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      const allUsers = res.data;

      const foundUser = allUsers.find((u) => u.email === email && u.password === password);

      if (!foundUser) throw new Error("Invalid password or email");

      setUser(foundUser);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signup = async ({ username, email, password }) => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      const allUsers = res.data;

      if (allUsers.some((u) => u.email === email)) throw new Error("User already exists");

      const newUser = {
        username,
        email,
        password,
        recents: [],
        favourites: [],
      };

      const createRes = await axios.post(`${API_URL}/users`, newUser);
      setUser(createRes.data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const removeFromRecents = (id) => {
    const updated = user ? user.recents.filter((c) => c.id !== id) : localRecents.filter((c) => c.id !== id);

    if (user) {
      axios.put(`${API_URL}/users/${user.id}`, {
        ...user,
        recents: updated,
      });
      setUser({ ...user, recents: updated });
    } else {
      setLocalRecents(updated);
    }
  };

  const addToFavourites = (city) => {
    if (!user) return;

    if (user.favourites.some((c) => c.id === city.id)) return;

    const updated = [...user.favourites, city];

    setUser({ ...user, favourites: updated });

    axios.put(`${API_URL}/users/${user.id}`, {
      ...user,
      favourites: updated,
    });
  };
  const refreshSingleCity = async (city) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`);
      const data = res.data;

      const updatedCity = {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        weather: data.weather[0].main,
        icon: data.weather[0].icon,
        dt: Math.floor(Date.now() / 1000),
        timezone: data.timezone,
      };

      if (user) {
        const list = user.recents.map((c) => (c.name.toLowerCase() === city.name.toLowerCase() ? updatedCity : c));
        setUser({ ...user, recents: list });
        await axios.put(`${API_URL}/users/${user.id}`, { ...user, recents: list });
      } else {
        const list = localRecents.map((c) => (c.name.toLowerCase() === city.name.toLowerCase() ? updatedCity : c));
        setLocalRecents(list);
      }
    } catch (err) {
      console.log("Error refreshing city:", err);
    }
  };
  const refreshAllRecents = async () => {
    const citiesToRefresh = user ? user.recents : localRecents;

    if (!citiesToRefresh.length) return;

    const updatedCities = await Promise.all(
      citiesToRefresh.map(async (city) => {
        try {
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`);
          const data = res.data;

          return {
            id: data.id,
            name: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            weather: data.weather[0].main,
            icon: data.weather[0].icon,
            dt: Math.floor(Date.now() / 1000),
            timezone: data.timezone,
          };
        } catch (err) {
          console.log(`Failed to refresh ${city.name}, keeping old data`);
          return city;
        }
      })
    );
  };

  const addToRecents = async (weatherData) => {
    const cityData = {
      id: weatherData.id,
      name: weatherData.name,
      country: weatherData.sys?.country,
      temp: weatherData.main.temp,
      weather: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon,
      dt: weatherData.dt,
      timezone: weatherData.timezone,
    };

    if (user) {
      const updatedRecents = [cityData, ...user.recents];
      setUser({ ...user, recents: updatedRecents });
      await axios.put(`${API_URL}/users/${user.id}`, {
        ...user,
        recents: updatedRecents,
      });
    } else {
      setLocalRecents([cityData, ...localRecents]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        updateUser: setUser,
        localRecents,
        setLocalRecents,
        addToRecents,
        removeFromRecents,
        addToFavourites,
        refreshSingleCity,
        refreshAllRecents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
