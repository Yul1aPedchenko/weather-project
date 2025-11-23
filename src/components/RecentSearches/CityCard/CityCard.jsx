import { useState } from "react";
import styles from "./CityCard.module.scss";
import { RxReload } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { TbClockHour3 } from "react-icons/tb";
import { useWeatherBg } from "../../../hooks/useWeatherBg";

export const CityCard = ({ city, onRefresh, onToggleFavourite, isFavourite }) => {
  const [showHourly, setShowHourly] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const now = new Date(city.dt ? city.dt * 1000 : Date.now());
  const dateStr = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

  const { background } = useWeatherBg(city.icon);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.top} style={{ backgroundImage: background }}>
          <div>
            <p>{city.weather}</p>
            <button onClick={() => onToggleFavourite(city)}>{isFavourite ? <FaHeart /> : <FaRegHeart />}</button>
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
          <div>
            <div>
              <p>{city.name}</p>
              <p>{city.country || ""}</p>
            </div>
            <div>
              <button onClick={() => onRefresh(city)}>
                <RxReload />
              </button>
              <button>
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>
            <span>14:00</span>
            <div>
              <p>{dateStr}</p>
              <p>{weekday}</p>
            </div>
          </div>
          <div>
            <p className={styles.temp}>{Math.round(city.temp)}</p>
            <span>°C</span>
          </div>
        </div>
      </div>
    </>
  );
};
