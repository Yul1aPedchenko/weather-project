import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

import { CityCard } from "./CityCard/CityCard";
import { Container } from "../Container/Container";
import styles from "./RecentSearches.module.scss";

import { Metrics } from "../Metrics/Metrics";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast";
import { WeeklyForecast } from "../WeeklyForecast/WeeklyForecast";

export const RecentSearches = () => {
  const { user, localRecents, addToFavourites, removeFromRecents, refreshSingleCity, refreshAllRecents } = useAuth();

  const items = user ? user.recents : localRecents;

  useEffect(() => {
    if (items.length > 0) {
      refreshAllRecents();
    }
  }, []);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isMore, setIsMore] = useState(false);
  const [isHourly, setIsHourly] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false);

  if (!items || items.length === 0) return <p>No recent searches</p>;

  const openMore = (city) => {
    setSelectedCity(city);
    setIsMore(true);
  };

  const openHourly = (city) => {
    setSelectedCity(city);
    setIsHourly(true);
  };

  const openWeekly = (city) => {
    setSelectedCity(city);
    setIsWeekly(true);
  };

  const closeViews = () => {
    setIsMore(false);
    setIsHourly(false);
    setIsWeekly(false);
    setSelectedCity(null);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    swipeToSlide: true,
    touchThreshold: 10,
  };
  return (
    <>
      <Container>
        {isMore && selectedCity && <Metrics city={selectedCity} onClose={closeViews} />}

        {isHourly && selectedCity && <HourlyForecast city={selectedCity} onClose={closeViews} />}

        {isWeekly && selectedCity && <WeeklyForecast city={selectedCity} onClose={closeViews} />}

        <Slider {...settings}>
          {items.map((city) => (
            <div key={city.id} className={styles.slideItem}>
              <CityCard city={city} onLike={addToFavourites} onDelete={removeFromRecents} onRefresh={refreshSingleCity} onMore={() => openMore(city)} onHourly={() => openHourly(city)} onWeekly={() => openWeekly(city)} />
            </div>
          ))}
        </Slider>
      </Container>
    </>
  );
};
