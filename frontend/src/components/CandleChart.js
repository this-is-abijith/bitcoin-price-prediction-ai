import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

function CandleChart(){

const canvasRef = useRef(null)
const chartRef = useRef(null)

useEffect(()=>{

const ctx = canvasRef.current.getContext("2d")

// destroy old chart
if(chartRef.current){
chartRef.current.destroy()
}

chartRef.current = new Chart(ctx,{
type:"line",
data:{
labels:[1,2,3,4,5],
datasets:[
{
label:"Bitcoin Price",
data:[50000,52000,51000,53000,54000],
borderColor:"orange",
backgroundColor:"orange"
}
]
},
options:{
responsive:true
}
})

},[])

return <canvas ref={canvasRef}></canvas>

}

export default CandleChart