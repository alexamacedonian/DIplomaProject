FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY air_quality air_quality

CMD ["uvicorn", "air_quality.main:app", "--workers", "1", "--host", "0.0.0.0", "--port", "80"]
