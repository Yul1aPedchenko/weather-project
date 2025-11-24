export const WeeklyForecast = ({ city}) => {
  if (!city) return null;

  return (
    <div className="weekly">
      
      <h2>7-Day Forecast — {city.name}, {city.country}</h2>
      
  
    </div>
  );
};