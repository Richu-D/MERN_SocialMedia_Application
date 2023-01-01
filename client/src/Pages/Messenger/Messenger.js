import React, { useEffect, useRef, useState } from 'react'
import useInstance from '../../axios/axiosInstance'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversations from '../../components/conversations/Conversations'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import "./Messenger.css"
import { useSelector } from "react-redux";

const Messenger = () => {
  const Instance = useInstance()
  let { user } = useSelector((user) => ({ ...user }));
  const [conversation,setConversation] = useState([])
  const [currentChat,setCurrentChat] = useState(null)
  const [messages,setMessages] = useState([])
  const [newMessages,setNewMessages] = useState("")
  const [micColor,setMicColor] = useState("black")
  const [isListerning,setIsListerning] = useState(false)
  // const [ewVoiceRegonition,setNewVoiceRegonition] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef()
  const socket = useRef()

  useEffect(()=>{
    socket.current = user?.socket?.current;
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(), 
      });
    });
  },[])

  useEffect(() => {
   
    arrivalMessage &&
    currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])

  }, [arrivalMessage,currentChat]); 

useEffect(() => {
  console.log(user.id);
  socket.current.emit("addUser",user.id)
  socket.current.on("getUsers",users=>{
    setOnlineUsers(users);
  })
}, [user])

  useEffect(() => {
   async function getConversation() {

     try {
       const res = await Instance.get("/conversations")
       console.log(res.data,"res");
       setConversation(res.data)
      } catch (error) {
        console.log(error,"Error");
      }
    }

    getConversation()

  }, [])

  useEffect(()=>{
    const getMessages = async ()=>{
      try {
        const res = await Instance.get(`/message/${currentChat?._id}`)
        console.log(res.data);
        setMessages(res.data)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    getMessages()
  },[currentChat])

  const receiverId = currentChat?.members?.find( member => member !== user.id );
  
  async function handleSubmit(){
    if(newMessages.trim()<1) return;
    console.log(receiverId,currentChat._id,newMessages);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessages,
    });
    console.log(currentChat._id);
    const message = {
      conversationId:currentChat._id,
      text:newMessages
    }
    try {
      const res = await Instance.post("/message",message)
      console.log(res);
      setMessages([...messages,res.data])
      setNewMessages("") 
    } catch (error) {
      
      console.log(error);
    }
  }
  
  const handleVoiceRecognition = () =>{
    
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      const recognition = new SpeechRecognition();
      recognition.interimResults = true;
   

// if(isListerning){  
//   recognition.stop()
//   setIsListerning(false)
//   setMicColor("black")
// }else{

//   setIsListerning(true)
  setMicColor("red")



recognition.addEventListener('result', (e)=>{
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
console.log(text);
setNewMessages(text)
console.log(newMessages);

// if(e.results[0].isFinal){
// // setNewVoiceRegonition(prev => prev+" "+newMessages)
// }
 
});


recognition.addEventListener('end', ()=>{
  recognition.start();
})

recognition.start();


// }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  }, [messages])
  

  return (
    <>
    <Header page={"message"} />
    <div className='Messenger'>
      <div className="chatMenu">
      <div className="chatMenuWrapper">
      <input type="text" placeholder='Search Here...' className="chatMenuInput" />
      <div className="conversationContainer">
      {conversation && conversation.map((conversation)=>{
        // console.log(conversation);
        // console.log(user.id);
       return (<div key={conversation._id} onClick={()=>{setCurrentChat(conversation)}}>
          <Conversations  conversation={conversation} currentUser={user.id}/>
        </div>   )       
      })}      
      </div>
        </div>
      </div>
      <div className="chatBox">
      <div className="chatBoxWrapper">
        {
          currentChat ? 
          <>
          <div className="chatBoxTop">
            {
              messages && messages.map((message)=>{
                // console.log(message);
               return (<div ref={scrollRef}>
                <Message message={message} own={message.sender === user.id} />
                </div>)
              })
            }
        </div>
        
        <div className="chatBoxBottom">
          <input type="text" className="chatMessageInput"  onKeyDown={(e)=>{
                if(e.key==="Enter"){
                  handleSubmit()
                }
            }} value={newMessages} onChange={(e)=>setNewMessages(e.target.value)}  placeholder='type Here...'/>
<i class="fa-solid fa-microphone" style={{color:micColor,padding:"10px"}} onClick={()=>{handleVoiceRecognition()}}></i>

          <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
        </div>
          </>
          :
          "Start chating"
        }

        </div>
      </div>
      <div className="chatOnline">
      <div className="chatOnlineWrapper">
        <ChatOnline onlineUsers={onlineUsers} currentUser={user.id} setCurrentChat={setCurrentChat} />
        </div>
      </div>
    </div>
    </>
  )
}

export default Messenger