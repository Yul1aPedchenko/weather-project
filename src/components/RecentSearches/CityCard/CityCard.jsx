import { useEffect, useState } from "react";
import styles from "./CityCard.module.scss";
import { TfiBackRight } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { TbClockHour3 } from "react-icons/tb";
import { useWeatherBg } from "../../../hooks/useWeatherBg";
import { useAuth } from "../../../context/AuthContext";

export const CityCard = ({ city, onLike, onDelete, onRefresh, onMore, onHourly, onWeekly }) => {
  const [localTime, setLocalTime] = useState("");
  const { user } = useAuth();

  const updateLocalTime = () => {
    if (!city.timezone) {
      setLocalTime("");
      return;
    }

    const utcSeconds = city.dt || Math.floor(Date.now() / 1000);
    const totalSeconds = utcSeconds + city.timezone;
    const localDate = new Date(totalSeconds * 1000);

    const hours = localDate.getUTCHours().toString().padStart(2, "0");
    const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");

    setLocalTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    updateLocalTime();
    const interval = setInterval(updateLocalTime, 60000);

    return () => clearInterval(interval);
  }, [city.dt, city.timezone]);

  const now = new Date(city.dt ? city.dt * 1000 : Date.now());
  const dateStr = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

  const { background, isDay } = useWeatherBg(city.icon);
  return (
    <div className={`${styles.card} ${isDay ? "" : styles.night}`}>
      <div className={`${styles.top}`} style={{ backgroundImage: background }}>
        <div className={styles.top__wrap}>
          <p className={styles.top__weather}>{city.weather}</p>
          <button className={styles.top__fav} onClick={() => onLike(city)}>
            {user?.favourites?.some((f) => f.id === city.id) ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <div className={styles.top__btns}>
          <button className={`${styles.top__btn} hourly`} onClick={() => onHourly(city)}>
            <TbClockHour3 className={styles.top__icon} />
            <span className={styles.top__text}>Hourly Forecast</span>
          </button>

          <button className={`${styles.top__btn} weekly`} onClick={() => onWeekly(city)}>
            <LuCalendarDays className={styles.top__icon} />
            <span className={styles.top__text}>Weekly Forecast</span>
          </button>

          <button className={`${styles.top__btn} more`} onClick={() => onMore(city)}>
            <IoIosMore className={styles.top__icon} />
            <span className={styles.top__text}>See more</span>
          </button>
        </div>

        <div className={styles.top__info}>
          <div className={styles.top__place}>
            <p className={styles.top__city}>{city.name}</p>
            <p className={styles.top__country}>{city.country || ""}</p>
          </div>

          <div className={styles.top__add}>
            <button className={styles.top__reload} onClick={() => onRefresh(city)}>
              <TfiBackRight />
            </button>

            <button className={styles.top__del} onClick={() => onDelete(city.id)}>
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottom__wrap}>
          <span className={styles.bottom__time}>{localTime}</span>

          <div className={styles.bottom__date}>
            <p>{dateStr}</p>
            <p>{weekday}</p>
          </div>
        </div>

        <div className={styles.bottom__temp}>
          <p className={styles.temp}>{Math.round(city.temp)}</p>
          <span>°</span>
        </div>
      </div>
    </div>
  );
};
