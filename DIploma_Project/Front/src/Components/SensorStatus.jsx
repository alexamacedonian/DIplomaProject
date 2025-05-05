import React, { useEffect, useState } from 'react';

const SensorStatus = () => {
  const [latest, setLatest] = useState(null);
  const [isOutdated, setIsOutdated] = useState(false);

  useEffect(() => {
    const fetchLatestReading = () => {
      const token = localStorage.getItem('token');
      fetch("http://localhost:8080/readings?limit=1", {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Cache-Control': 'no-cache',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const reading = data[0];
            setLatest(reading);

            const now = new Date();
            const timestamp = new Date(reading.timestamp);
            const diffMinutes = (now - timestamp) / 1000 / 60;

            setIsOutdated(diffMinutes > 1); // сенсор считается оффлайн если данные старше 1 минуты
          }
        })
        .catch(err => console.error("Ошибка получения данных:", err));
    };

    fetchLatestReading(); // первый вызов
    const interval = setInterval(fetchLatestReading, 60000); // каждые 60 секунд

    return () => clearInterval(interval); // очистка таймера
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full h-full">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Sensor Status</h2>
      {latest ? (
        isOutdated ? (
          <div className="text-center text-yellow-600">
            <p className="text-md font-semibold">⚠️ Sensor data is outdated</p>
            <p className="text-sm text-gray-500">
              Last update: {new Date(latest.timestamp).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-700">
            <p className="text-lg">Temperature: <strong>{latest.temperature} °C</strong></p>
            <p className="text-lg">Humidity: <strong>{latest.humidity} %</strong></p>
            <p className="text-lg">CO: <strong>{latest.coPpm} ppm</strong></p>
            <p className="text-sm text-gray-400">
              Updated: {new Date(latest.timestamp).toLocaleString()}
            </p>
          </div>
        )
      ) : (
        <p className="text-gray-500">Loading sensor data...</p>
      )}
    </div>
  );
};

export default SensorStatus;
