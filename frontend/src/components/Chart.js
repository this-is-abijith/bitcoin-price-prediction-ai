import { Line } from "react-chartjs-2";

function Chart({prices}){

return(
<Line
data={{
labels: prices.map((_,i)=>i),
datasets:[
{
label:"Bitcoin Price",
data:prices
}
]
}}
/>
)

}

export default Chart;