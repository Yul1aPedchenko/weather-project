import styles from "./WeeklyForecast.module.scss";

export const WeeklyForecast = ({ daily, timezone }) => {
  if (!daily || daily.length === 0) return null;

  return (
    <div>
      <h2 className={styles.title}>8-Day Forecast</h2>

      <div className={styles.list}>
        {daily.map((day, index) => {
          const date = new Date((day.dt + timezone) * 1000);

          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const isToday = index === 0;

          return (
            <div key={day.dt} className={styles.item}>
              <div className={styles.date}>
                <div className={styles.dayName}>{isToday ? "Today" : dayName}</div>
                <div className={styles.fullDate}>{formattedDate.split(", ")[1]}</div>
              </div>

              <img src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`} alt={day.weather.description} className={styles.icon} />

              <div className={styles.temps}>
                <span className={styles.max}>{Math.round(day.temp.max)}°</span>
                <span className={styles.min}>{Math.round(day.temp.min)}°</span>
              </div>

              <div className={styles.description}>{day.weather.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
