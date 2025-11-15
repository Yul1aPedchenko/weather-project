import { useState, useEffect } from "react";

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
    <div>
      <h2>Create your personal list of favorite cities and always be aware of the weather.</h2>
      <div></div>
      <div>
        <p>{monthYear}</p>
        <p>
          {weekday}, {day} <span>{daysSuffix}</span>
        </p>
      </div>
    </div>
  );
};
