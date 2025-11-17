import { useState, useEffect } from "react";
import styles from "./CurrentDate.module.scss";

export const CurrentDate = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000 * 60 * 60 * 24);
    return () => clearInterval(timer);
  }, []);

  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const getSuffix = (n) => {
    if (n >= 11 && n <= 13) {
      return "th";
    } else if (n % 10 == 1) {
      return "st";
    } else if (n % 10 == 2) {
      return "nd";
    } else if (n % 10 == 1) {
      return "rd";
    } else {
      return "th";
    }
  };

  const daysSuffix = `${getSuffix(day)}`;
  return (
    <div className={styles.date}>
      <div className={styles.date__wrapper}>
        <div className={styles.date__line}></div>
        <div className={styles.date__wrap}>
          <h2 className={styles.date__title}>Create your personal list of favorite cities and always be aware of the weather.</h2>
          <div className={styles.date__cur}>
            <p>{monthYear}</p>
            <div className={styles.date__subwrap}>
              <p>
                {weekday}, {day}
              </p>
              <span className={styles.date__suffix}>{daysSuffix}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
