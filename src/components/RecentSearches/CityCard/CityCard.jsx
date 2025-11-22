import { useState } from "react";
import styles from "./CityCard.module.scss";
import { RxReload } from "react-icons/rx";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { TbClockHour3 } from "react-icons/tb";

export const CityCard = ({ city, onRefresh, onToggleFavourite, isFavourite }) => {
  const [showHourly, setShowHourly] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const now = new Date(city.dt ? city.dt * 1000 : Date.now());
  const dateStr = now.toLocaleDateString("en-GB");
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      <div className={styles.card}>
        <div className={styles.top}>
          <div>
            <p>{city.weather}</p>
            <FaRegHeart />
          </div>
          <div className={styles.top__btns}>
            <button className={styles.hourlyButton}>
              <TbClockHour3 className={styles.icon} />
              <span className={styles.text}>Hourly Forecast</span>
            </button>
            <button className={styles.hourlyButton}>
              <LuCalendarDays className={styles.icon} />
              <span className={styles.text}>Weekly Forecast</span>
            </button>
            <button className={styles.hourlyButton}>
              <IoIosMore className={styles.icon} />
              <span className={styles.text}>See more</span>
            </button>
          </div>
        </div>
        <div className={styles.bottom}></div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h2>
            {city.name}, {city.country || ""}
          </h2>
          <div className={styles.actions}>
            <button onClick={() => onRefresh(city)}>
              <RxReload /> Reload
            </button>
            <button onClick={() => onToggleFavourite(city)}>{isFavourite ? <IoHeart /> : <FaRegHeart />} Favourite</button>
          </div>
        </div>

        <div className={styles.main}>
          <p className={styles.temp}>{Math.round(city.temp)}°C</p>
          <p className={styles.description}>
            {city.icon && <img src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`} alt={city.weather} />}
            {city.weather}
          </p>
        </div>

        <div className={styles.datetime}>
          <p>
            {dateStr}, {weekday}
          </p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.hourlyButton}>
            <RxReload className={styles.icon} />
            <span className={styles.text}>Hourly Forecast</span>
          </button>

          <button onClick={() => setShowWeekly(!showWeekly)}>Weekly Forecast</button>
          <button onClick={() => setShowMore(!showMore)}>See More</button>
        </div>
      </div>
    </>
  );
};
