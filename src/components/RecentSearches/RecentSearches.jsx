import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useAuth } from "../../context/AuthContext";
import { useRecents } from "../../hooks/useRecents";
import { useState, useEffect } from "react";

import { CityCard } from "./CityCard/CityCard";
import { Container } from "../Container/Container";
import { Metrics } from "../Metrics/Metrics";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast";
import { WeeklyForecast } from "../WeeklyForecast/WeeklyForecast";

import { weatherAPI } from "../../api/weatherAPI";
import { userAPI } from "../../api/userAPI";

import styles from "./RecentSearches.module.scss";

export const RecentSearches = () => {
  const { user, localRecents, updateUser, refreshAllRecents } = useAuth();
  const { refreshCity, removeCity } = useRecents();

  const items = user ? user.recents : localRecents;
  const [activeSection, setActiveSection] = useState({
    city: null,
    type: null,
    forecast: null,
  });

  const toggleFavourite = async (city) => {
    if (!user) {
      alert("Log in to save favourites");
      return;
    }

    const isFavourite = user.favourites?.some((f) => f.id === city.id) ?? false;
    const newFavourites = isFavourite ? user.favourites.filter((f) => f.id !== city.id) : [...(user.favourites || []), city];

    updateUser({ ...user, favourites: newFavourites });

    try {
      await userAPI.update(user.id, { favourites: newFavourites });
    } catch (err) {
      updateUser(user);
      alert("Failed to save favourite. Try again.");
      console.error(err);
    }
  };

  const toggleSection = async (city, type) => {
    if (activeSection.city?.id === city.id && activeSection.type === type) {
      setActiveSection({ city: null, type: null, forecast: null });
      return;
    }

    try {
      const forecast = await weatherAPI.getDetailedForecast(city);
      setActiveSection({ city, type, forecast });
    } catch (err) {
      console.error("Failed to load forecast:", err);
      alert("Failed to load forecast");
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      refreshAllRecents();
    }
  }, []);

  if (!items || items.length === 0) {
    return <p style={{ textAlign: "center", padding: "40px" }}>No recent searches</p>;
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: false,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 10,
    edgeFriction: 0.35,
  };

  return (
    <section>
      <Container>
        <Slider {...settings} className={styles.slider}>
          {items.map((city) => (
            <div key={city.id}>
              <CityCard city={city} onLike={() => toggleFavourite(city)} onDelete={removeCity} onRefresh={() => refreshCity(city)} onMore={() => toggleSection(city, "more")} onHourly={() => toggleSection(city, "hourly")} onWeekly={() => toggleSection(city, "weekly")} />
            </div>
          ))}
        </Slider>

        {activeSection.type === "more" && activeSection.forecast && <Metrics city={activeSection.city} forecast={activeSection.forecast} />}
        {activeSection.type === "hourly" && activeSection.forecast && <HourlyForecast hourly={activeSection.forecast.hourly} timezone={activeSection.city.timezone} />}
        {activeSection.type === "weekly" && activeSection.forecast && <WeeklyForecast daily={activeSection.forecast.daily} timezone={activeSection.city.timezone} />}
      </Container>
    </section>
  );
};
