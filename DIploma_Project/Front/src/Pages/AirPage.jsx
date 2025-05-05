import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AirQualityHeader from '../Components/Header';
import AirQualityTabs from '../Components/Air';
import SensorStatus from '../Components/SensorStatus';

export default function AirPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialTab = query.get('tab') || 'Recent';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const tab = query.get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    navigate(`/?tab=${tab}`);
    setActiveTab(tab);
  };

  useEffect(() => {
    fetch("http://localhost:8080/predict")
      .then((res) => res.json())
      .then((data) => setPrediction(data))
      .catch((err) => console.error("Ошибка при получении прогноза:", err));
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#4D6F97] to-[#0091BE]">
      <AirQualityHeader />
      <AirQualityTabs activeTab={activeTab} />

      {/* Блоки предсказания и статуса */}
      <div className="flex justify-center items-start gap-6 mt-10 flex-wrap">
        {/* Блок прогноза */}
        <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">CO Level Prediction</h2>
          {prediction ? (
            <div className="text-center text-gray-700">
              <p className="text-lg">Linear Regression: <strong>{prediction.prediction_lr} ppm</strong></p>
              <p className="text-lg">ARIMA Forecast: <strong>{prediction.prediction_arima} ppm</strong></p>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading prediction...</p>
          )}
        </div>

        {/* SensorStatus */}
        <div className="w-full md:w-1/3">
          <SensorStatus />
        </div>
      </div>
    </div>
  );
}
