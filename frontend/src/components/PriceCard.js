function PriceCard({price}){

return(

<div className="card">

<h2>Current Bitcoin Price</h2>

<h1>₹{price.toFixed(2)}</h1>

</div>

)

}

export default PriceCard