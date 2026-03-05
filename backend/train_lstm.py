import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import joblib

btc = yf.download("BTC-USD", start="2019-01-01")

data = btc[['Close']].values

scaler = MinMaxScaler()
data_scaled = scaler.fit_transform(data)

X = []
y = []

sequence = 60

for i in range(sequence, len(data_scaled)):
    X.append(data_scaled[i-sequence:i])
    y.append(data_scaled[i])

X = np.array(X)
y = np.array(y)

model = Sequential()

model.add(LSTM(50, return_sequences=True, input_shape=(X.shape[1],1)))
model.add(LSTM(50))
model.add(Dense(1))

model.compile(optimizer="adam", loss="mse")

model.fit(X, y, epochs=5, batch_size=32)

model.save("model/lstm_model.keras")

joblib.dump(scaler, "model/scaler.pkl")

print("LSTM model trained")