import { useEffect, useRef } from "react"
import { createChart, CandlestickSeries, LineSeries } from "lightweight-charts"

function TradingChart({ price, prediction }) {

const chartContainerRef = useRef(null)
const candleSeriesRef = useRef(null)
const predictionSeriesRef = useRef(null)

useEffect(() => {

const chart = createChart(chartContainerRef.current, {
width: chartContainerRef.current.clientWidth,
height: 400,
layout: {
background: { color: "#0f172a" },
textColor: "#DDD"
},
grid: {
vertLines: { color: "#1e293b" },
horzLines: { color: "#1e293b" }
}
})

const candleSeries = chart.addSeries(CandlestickSeries)
const predictionSeries = chart.addSeries(LineSeries, {
color: "orange",
lineWidth: 2
})

candleSeriesRef.current = candleSeries
predictionSeriesRef.current = predictionSeries

// Initial candles
candleSeries.setData([
{
time: Math.floor(Date.now() / 1000) - 120,
open: price || 6000000,
high: price || 6000000,
low: price || 6000000,
close: price || 6000000
},
{
time: Math.floor(Date.now() / 1000) - 60,
open: price || 6000000,
high: price || 6000000,
low: price || 6000000,
close: price || 6000000
}
])

}, [])



// Update candle when price changes
useEffect(() => {

if (!price || !candleSeriesRef.current) return

const time = Math.floor(Date.now() / 1000)

candleSeriesRef.current.update({
time,
open: price,
high: price,
low: price,
close: price
})

}, [price])



// Update prediction line
useEffect(() => {

if (!prediction || !predictionSeriesRef.current) return

predictionSeriesRef.current.setData([
{
time: Math.floor(Date.now() / 1000) + 60,
value: prediction
}
])

}, [prediction])


return <div ref={chartContainerRef}></div>

}

export default TradingChart