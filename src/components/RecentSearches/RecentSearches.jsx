import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { Container } from "../Container/Container";

const API_URL = import.meta.env.VITE_MOKAPI;

export const RecentSearches = () => {
  const { user, localRecents } = useAuth();
  const [apiRecents, setApiRecents] = useState([]);
  useEffect(() => {
    const load = async () => {
      if (user) {
        const userData = await axios.get(`${API_URL}/users/${user.id}`);
        setApiRecents(userData.data.recents);
      }
    };
    load();
  }, [user]);
  const items = user ? apiRecents : localRecents;
  if (!items || items.length === 0) {
    return <p>No recent searches</p>;
  }

  return (
    <section>
      <Container>
        {items.map((cityWeather, index) => (
          <div key={index}>
            <h3>{cityWeather.name}</h3>
            <p>{cityWeather.weather}</p>
            <p>{Math.round(cityWeather.temp)}°C</p>
          </div>
        ))}
      </Container>
    </section>
  );
};
