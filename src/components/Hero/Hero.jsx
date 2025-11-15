import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { getWeatherByCity } from "../../api/weatherAPI";
import { addCityToRecents } from "../../api/userAPI";

import { Container } from "../Container/Container";
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
    console.log(cityData)
    const city = {
      name: cityData.name,
      temp: cityData.main.temp,
      weather: cityData.weather[0].main,
    };

    if (user) {
      const filteredRecents = user.recents.filter(
        (item) => item.name.toLowerCase() !== city.name.toLowerCase()
      );
      const updatedRecents = [city, ...filteredRecents];
      const updatedUser = await addCityToRecents(user.id, updatedRecents);
      updateUser(updatedUser);
    } else {
      const filteredRecents = localRecents.filter(
        (item) => item.name.toLowerCase() !== city.name.toLowerCase()
      );
      setLocalRecents([city, ...filteredRecents]);
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
        <div>
          <h1>Weather dashboard</h1>

          <form onSubmit={handleSearch}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search location..."/>
            <button type="submit">
              <IoSearchOutline />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};
