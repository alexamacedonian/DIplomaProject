import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from statsmodels.tsa.arima.model import ARIMA

from sqlalchemy.orm import Session
from air_quality.db import SessionLocal
from air_quality.models import SensorReading


def get_prediction():
    db: Session = SessionLocal()
    try:
        # Обновляем кэш сессии
        db.expire_all()

        # Загружаем последние 100 записей
        rows = db.query(SensorReading).order_by(SensorReading.timestamp.desc()).limit(100).all()
        
        if not rows or len(rows) < 5:
            return {"error": "Not enough data for prediction"}

        # Преобразуем в DataFrame
        df = pd.DataFrame([{
            "timestamp": row.timestamp,
            "temperature": row.temperature,
            "humidity": row.humidity,
            "coPpm": row.co_ppm
        } for row in rows])

        # Сортируем по времени
        df = df.sort_values("timestamp")

        # Проверяем нет ли NaN или одинаковых данных
        if df['temperature'].nunique() <= 1 or df['humidity'].nunique() <= 1 or df['coPpm'].nunique() <= 1:
            return {"error": "Data is too uniform for prediction"}

        # === Linear Regression ===
        X = df[['temperature', 'humidity']]
        y = df['coPpm']

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        lr_model = LinearRegression()
        lr_model.fit(X_scaled, y)

        X_next = scaler.transform([X.iloc[-1].values])  # Предсказываем по последним показаниям
        co_pred_lr = lr_model.predict(X_next)[0]

        # === ARIMA ===
        try:
            arima_model = ARIMA(y, order=(2, 1, 2))  # Более стабильные параметры
            arima_fit = arima_model.fit()
            co_pred_arima = arima_fit.forecast(steps=1).iloc[0]
        except Exception as e:
            print(f"ARIMA model failed: {e}")
            co_pred_arima = None

        return {
            "prediction_lr": round(co_pred_lr, 2),
            "prediction_arima": round(co_pred_arima, 2) if co_pred_arima is not None else None
        }

    finally:
        db.close()
