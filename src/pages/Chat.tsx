import React, { useEffect, useState } from 'react'
import { Message } from '../types/message'
import MessageComponent from '../components/MessageComponent'
import { httpInstance } from '../network/baseUrl'

export default function Chat() {
  const [messages,setMessages] = useState<Message[]>([])
  useEffect(()=>{
    httpInstance.get("/messages").then(((res)=>console.log(res))).catch((err)=>console.log(err));
  },[])
  return (
    <div>
      {
        messages.map((message: Message) =><MessageComponent title={message.title} body={message.body} id={message.id}/>)
      }
    </div>
  )
}
