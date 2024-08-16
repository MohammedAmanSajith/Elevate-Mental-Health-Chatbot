"use client";

import { Input } from "@/components/ui/input";
import { BotIcon,Trash2 } from "lucide-react";
import { useState, useRef } from "react";

import toast,{Toaster} from "react-hot-toast"
import ChatComponent from "@/components/ChatComponent"


export default function Home() {
  const [input, setInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = (e: any) => {
    if (!buttonRef.current) return 
    e.preventDefault();
    buttonRef.current.disabled = true;
    toast.loading(<b>Elevate is thinking...</b>, {
      id: "chat-loader"
    })
    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/getResponse`, {
cache: "no-cache",
      method: "POST",
      body: JSON.stringify({
        input,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (response) => {
      if (!buttonRef.current) return 
      const botResponse = await response.json();
      setChatHistory((chatHistory) => [
        ...chatHistory,
        {
          botResponse: botResponse.result,
          userInput: botResponse.userInput,
        },
      ]);

      toast.success(<b>Response Genrated... </b>, {
        id: "chat-loader"
      })
      buttonRef.current.disabled = false;
      setInput("");
    }).catch((error) => {

      toast.error(<b>Error Genrating Response from GPT... </b>)

      console.error(error);
    });
  };


  return (
    <main className=" h-screen flex items-center justify-center p-4 md:p-16">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="flex flex-col w-full max-w-7xl rounded-lg">
        <header className="bg-gradient-to-r shadow-lg rounded-t-md from-blue-600 to-blue-900 text-white py-3 px-4 flex items-center">
          <div className="flex items-center gap-2 justify-between w-full">
            <BotIcon className="w-6 h-6" />
            <h2 className="text-lg font-bold">Mental Health Chatbot</h2>
            <Trash2 onClick={() => {
              setChatHistory([])
              toast.custom(<b>Your Chat is cleared</b>)
            }} className="cursor-pointer active:scale-95 hover:scale-105 duration-300 ease-out hover:text-white/80" />
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-neutral-100 p-4 flex flex-col gap-4 min-h-[38rem] md:min-h-[32rem] h-full">
          {chatHistory.map((chat, index) => {
            return (
              <ChatComponent
                key={index}
                botResponse={chat.botResponse}
                userInput={chat.userInput}
              />
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r rounded-b-lg from-blue-600 to-blue-900 border-t px-4 py-3 flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-white/20 px-4 py-2 text-sm text-white placeholder:text-white/50"
          />
          <button ref={buttonRef} disabled={!input} type="submit" className="btn">
            Chat
          </button>
        </form>
      </div>
    </main>
  );
}

