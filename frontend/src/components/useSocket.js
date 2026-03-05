import { useEffect } from "react"
import { io } from "socket.io-client"

export default function useSocket(setPrice){

useEffect(()=>{

const socket = io("http://localhost:5000",{
transports:["websocket"]
})

socket.on("connect",()=>{
console.log("Connected to server")
})

socket.on("price_update",(data)=>{
console.log("Live price received:", data.price)
setPrice(data.price)
})

socket.on("disconnect",()=>{
console.log("Disconnected from server")
})

return ()=>{
socket.disconnect()
}

},[setPrice])

}