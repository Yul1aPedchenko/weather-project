import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const HourlyForecast = ({ hourly, timezone }) => {
  if (!hourly) return null;

  const data = hourly.map((h) => ({
    time: new Date((h.dt + timezone) * 1000).getHours() + ":00",
    temp: Math.round(h.main.temp),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip formatter={(v) => `${v}°C`} />
        <Line type="monotone" dataKey="temp" stroke="#4c8ecd" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};
