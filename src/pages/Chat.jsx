import React, { useState, useEffect } from "react";
import API from "../services/api";


function Chat() {


  const [message, setMessage] = useState("");

  const [chats, setChats] = useState([]);



  // Welcome message after opening page

  useEffect(()=>{


    const timer = setTimeout(()=>{


      setChats([

        {
          role:"welcome",
          text:"Hello 👋\nHow can I help you today?"
        }

      ]);


    },1500);



    return ()=>clearTimeout(timer);


  },[]);




  const sendMessage = async () => {


    if(!message) return;



    const userMessage = {

      role:"user",

      text:message

    };



    setChats((prev)=>[

      ...prev,

      userMessage

    ]);




    try{


      const response = await API.post("/api/chat", {


        message,

        history:chats


      });





      const aiMessage = {


        role:"ai",

        text:response.data.reply


      };




      setChats((prev)=>[

        ...prev,

        aiMessage

      ]);




    }

    catch(error){



      setChats((prev)=>[

        ...prev,

        {

          role:"ai",

          text:"AI response error"

        }

      ]);



    }




    setMessage("");



  };






  return (


    <div className="chat-container">





      {/* HEADER */}


      <div className="ai-header">


        <div className="ai-icon">

        </div>


        <h2>

          Chat AI

        </h2>


      </div>









      {/* CHAT AREA */}


      <div className="chat-box">



        {

        chats.map((chat,index)=>(



          <div

          key={index}


          className={

            chat.role==="user"

            ?

            "user-chat"


            :


            chat.role==="welcome"

            ?

            "welcome-chat"


            :


            "ai-chat"

          }



          >


            {chat.text}



          </div>



        ))

        }




      </div>







      {/* INPUT */}


      <div className="chat-input">





        <input


        type="text"


        placeholder="Ask anything..."


        value={message}


        onChange={(e)=>setMessage(e.target.value)}



        />






        <button onClick={sendMessage}>


          Send


        </button>





      </div>






    </div>


  );


}



export default Chat;