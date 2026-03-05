# AI Bitcoin Trading Dashboard

A full-stack AI application that predicts Bitcoin prices using an LSTM deep learning model and displays results in a real-time trading dashboard.

## Features

- LSTM deep learning price prediction
- Real-time Bitcoin price streaming (WebSocket)
- AI trading signals (BUY / SELL)
- Candlestick trading chart
- Binance-style dark dashboard UI
- React + Flask full stack architecture

## Tech Stack

Frontend:
- React
- Lightweight Charts

Backend:
- Flask
- TensorFlow / Keras
- WebSockets
- Yahoo Finance API

## Project Structure

frontend/
backend/

## Run Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Run Frontend

```bash
cd frontend
npm install
npm start
```


## Future Improvements

- RSI indicator
- MACD indicator
- Volume candles
- Backtesting AI strategy
- Deploy online