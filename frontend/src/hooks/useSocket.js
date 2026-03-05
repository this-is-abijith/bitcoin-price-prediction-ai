import { useEffect } from "react"
import { io } from "socket.io-client"

export default function useSocket(setPrice){

useEffect(()=>{

const socket = io("http://localhost:5000")

socket.on("price_update",(data)=>{

setPrice(data.price)

})

return ()=>socket.disconnect()

},[setPrice])

}