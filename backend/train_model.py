import yfinance as yf
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Download Bitcoin historical data
btc = yf.download("BTC-USD", start="2018-01-01")

btc = btc[['Close']]
btc['Prediction'] = btc['Close'].shift(-1)

X = btc[['Close']][:-1]
y = btc['Prediction'][:-1]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "model/bitcoin_model.pkl")

print("Model trained and saved!")