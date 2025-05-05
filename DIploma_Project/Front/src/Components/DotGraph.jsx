import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';

export default function DotGraph({ activeTab }) {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let groupBy = '';
    if (activeTab === 'Daily' || activeTab === 'Weekly') groupBy = 'day';
    else if (activeTab === 'Monthly') groupBy = 'month';
    else if (activeTab === 'Yearly') groupBy = 'year';

    const url = `http://185.4.180.242:8080/readings?limit=100&offset=0&group_by=${groupBy}`;

    fetch(url, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    })
      .then((res) => res.json())
      .then((data) => {
        const key = groupBy === 'day' ? 'days' : groupBy === 'month' ? 'months' : 'years';
        const groups = data[key] || [];

        const aggregated = Object.keys(groups).map((k) => {
          const g = groups[k];
          const avg = (arr, field) => arr.reduce((s, r) => s + r[field], 0) / arr.length;
          return {
            timestamp: k,
            temperature: parseFloat(avg(g, 'temperature').toFixed(2)),
            humidity: parseFloat(avg(g, 'humidity').toFixed(2)),
            coPpm: parseFloat(avg(g, 'coPpm').toFixed(2)),
          };
        });

        setReadings(aggregated);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при получении данных:', err);
        setLoading(false);
      });
  }, [activeTab]);

  const formatTimestamp = (ts) => {
    const date = new Date(ts);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = readings.map((r) => ({
    x: r.temperature,
    y: r.humidity,
    z: r.coPpm,
    label: formatTimestamp(r.timestamp),
  }));

  if (loading) return <div>Loading...</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis
          type="number"
          dataKey="x"
          name="Temperature"
          unit="°C"
          tick={{ fill: 'white' }}
          axisLine={{ stroke: 'white' }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Humidity"
          unit="%"
          tick={{ fill: 'white' }}
          axisLine={{ stroke: 'white' }}
        />
        <ZAxis dataKey="z" range={[100, 300]} name="CO PPM" unit="ppm" />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 5 }}
          labelStyle={{ color: '#fff' }}
          itemStyle={{ color: '#fff' }}
          formatter={(value, name) => [`${value.toFixed(2)}`, name]}
        />
        <Legend wrapperStyle={{ color: 'white', fontSize: 12 }} />
        <Scatter
          name="Readings"
          data={chartData}
          fill="#FBBF24"
          shape="circle"
          isAnimationActive={true}
          animationDuration={1200}
          animationEasing="ease-in-out"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
