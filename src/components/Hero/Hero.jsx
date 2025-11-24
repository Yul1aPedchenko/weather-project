import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getWeatherByCity } from "../../api/weatherAPI";
import { addCityToRecents } from "../../api/userAPI";

import { Container } from "../Container/Container";
import { CurrentDate } from "./CurrentDate/CurrentDate";
import styles from "./Hero.module.scss";
import { IoSearchOutline } from "react-icons/io5";

export const Hero = () => {
  const [query, setQuery] = useState("");
  const { user, updateUser, localRecents, setLocalRecents } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const cityData = await getWeatherByCity(query);
      console.log(cityData);
      const city = {
        id: cityData.id,
        name: cityData.name,
        country: cityData.sys.country,
        temp: cityData.main.temp,
        weather: cityData.weather[0].main,
        icon: cityData.weather[0].icon,
        dt: cityData.dt,
        timezone: cityData.timezone,
      };

      console.log(user);
      if (user) {
        const filtered = user.recents.filter((c) => c.name.toLowerCase() !== city.name.toLowerCase());
        const newRecents = [city, ...filtered];
        await addCityToRecents(user.id, city);
        updateUser({ ...user, recents: newRecents });
      } else {
        const filtered = localRecents.filter((c) => c.name.toLowerCase() !== city.name.toLowerCase());
        setLocalRecents([city, ...filtered]);
      }

      setQuery("");
    } catch (error) {
      console.log("City not found", error);
      alert("City not found");
    }
  };

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.hero__wrapper}>
          <h1 className={styles.hero__title}>Weather dashboard</h1>
          <CurrentDate />
          <form onSubmit={handleSearch} className={styles.hero__form}>
            <input className={styles.hero__input} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search location..." />
            <button type="submit" className={styles.hero__btn}>
              <IoSearchOutline />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};
