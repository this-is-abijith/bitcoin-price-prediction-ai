function SignalCard({signal}){

return(
<div className="card">

<h2>AI Trading Signal</h2>

<h1 style={{color: signal==="BUY"?"green":"red"}}>

{signal}

</h1>

</div>
)

}

export default SignalCard