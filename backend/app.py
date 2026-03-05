from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import yfinance as yf
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from forex_python.converter import CurrencyRates

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

model = load_model("model/lstm_model.keras", compile=False)
scaler = joblib.load("model/scaler.pkl")

c = CurrencyRates()


@app.route("/")
def home():
    return "AI Bitcoin Prediction API Running 🚀"


@app.route("/predict")
def predict():

    btc = yf.download("BTC-USD", period="90d")

    prices = btc['Close'].values.reshape(-1,1)

    scaled = scaler.transform(prices)

    last_60 = scaled[-60:]

    X = np.array([last_60])

    pred = model.predict(X)

    predicted_price_usd = scaler.inverse_transform(pred)[0][0]
    current_price_usd = prices[-1][0]

    usd_to_inr = c.get_rate('USD','INR')

    current_price = current_price_usd * usd_to_inr
    predicted_price = predicted_price_usd * usd_to_inr

    signal = "BUY"

    if predicted_price < current_price:
        signal = "SELL"

    return jsonify({
        "current_price": float(current_price),
        "predicted_price": float(predicted_price),
        "signal": signal
    })

@app.route("/candles")
def candles():

    btc = yf.download("BTC-USD", period="1d", interval="5m")

    candles = []

    for index, row in btc.iterrows():
        candles.append({
            "time": int(index.timestamp()),
            "open": float(row["Open"]),
            "high": float(row["High"]),
            "low": float(row["Low"]),
            "close": float(row["Close"])
        })

    return jsonify(candles)

# REAL-TIME PRICE STREAM
# REAL-TIME PRICE STREAM
def stream_prices():

    btc = yf.Ticker("BTC-USD")

    while True:
        try:
            price_usd = btc.history(period="1d")['Close'].iloc[-1]

            usd_to_inr = c.get_rate('USD','INR')

            price_inr = price_usd * usd_to_inr

            print("Streaming price:", price_inr)

            socketio.emit("price_update", {"price": price_inr})

        except Exception as e:
            print("Stream error:", e)

        socketio.sleep(5)


@socketio.on("connect")
def connect():
    print("Client connected")
    socketio.start_background_task(stream_prices)


if __name__ == "__main__":
    socketio.run(app, debug=True)