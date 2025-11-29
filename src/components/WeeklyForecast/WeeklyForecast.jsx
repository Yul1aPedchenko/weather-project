import { useWeatherBg } from "../../hooks/useWeatherBg";
import styles from "./WeeklyForecast.module.scss";

export const WeeklyForecast = ({ daily, timezone }) => {
  if (!daily || daily.length === 0) return null;

  return (
    <section className={styles.weekly}>
      <div className={styles.weekly__wrapper}>
        <h2 className={styles.weekly__title}>8-Day Forecast</h2>
        <div className={styles.weekly__list}>
          {daily.map((day, index) => {
            const date = new Date((day.dt + timezone) * 1000);

            const formattedDate = date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            const isToday = index === 0;
            const { background, isDay } = useWeatherBg(day.weather.icon, true);
            return (
              <div key={day.dt} className={`${styles.weekly__item} ${isDay ? "" : styles.night}`} style={{ backgroundImage: background }}>
                <div className={styles.weekly__date}>
                  <div className={styles.weekly__dayName}>{isToday ? "Today" : dayName},</div>
                  <div className={styles.weekly__fullDate}>{formattedDate.split(", ")[1]}</div>
                </div>

                <div className={styles.weekly__temps}>
                  <div className={styles.weekly__subwrap}>
                    <span className={styles.weekly__max}>{Math.round(day.temp.max)}° / </span>
                    <span className={styles.weekly__min}>{Math.round(day.temp.min)}°</span>
                  </div>
                </div>

                <div className={styles.weekly__description}>{day.weather.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
