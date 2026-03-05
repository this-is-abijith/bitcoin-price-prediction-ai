import { useEffect, useState } from "react"
import axios from "axios"
import PriceCard from "./components/PriceCard"
import SignalCard from "./components/SignalCard"
import CandleChart from "./components/CandleChart"
import useSocket from "./hooks/useSocket"
import TradingChart from "./components/TradingChart"

function App(){

const [price,setPrice] = useState(0)
const [prediction,setPrediction] = useState(0)
const [signal,setSignal] = useState("")
const [chartData] = useState([])

useSocket(setPrice)

const loadPrediction = async () => {

try{

const res = await axios.get("http://localhost:5000/predict")

setPrediction(res.data.predicted_price)
setSignal(res.data.signal)
setPrice(res.data.current_price)

}catch(err){

console.log("API ERROR:",err)

}

}

useEffect(()=>{

loadPrediction()

},[])


return(

<div style={{
background:"#0f172a",
color:"white",
minHeight:"100vh",
padding:"20px",
fontFamily:"Arial"
}}>

<h1 style={{
textAlign:"center",
marginBottom:"20px"
}}>
AI Bitcoin Trading Dashboard
</h1>

<div style={{
display:"grid",
gridTemplateColumns:"3fr 1fr",
gap:"20px",
alignItems:"start"
}}>

{/* Chart Section */}

<div style={{
background:"#020617",
padding:"15px",
borderRadius:"10px"
}}>

<TradingChart price={price} prediction={prediction}/>

</div>


{/* Right Panel */}

<div style={{
display:"flex",
flexDirection:"column",
gap:"20px"
}}>

<div style={{
background:"#020617",
padding:"15px",
borderRadius:"10px"
}}>
<PriceCard price={price}/>
</div>

<div style={{
background:"#020617",
padding:"15px",
borderRadius:"10px",
textAlign:"center"
}}>
<h2>Predicted Price</h2>
<h1>₹{prediction.toFixed(2)}</h1>
</div>

<div style={{
background:"#020617",
padding:"15px",
borderRadius:"10px"
}}>
<SignalCard signal={signal}/>
</div>

</div>

</div>

</div>

)

}

export default App