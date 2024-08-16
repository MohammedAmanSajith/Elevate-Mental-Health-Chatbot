"use client";

import { Input } from "@/components/ui/input";
import { BotIcon } from "lucide-react";
import { useState } from "react";

import toast,{Toaster} from "react-hot-toast"
import ChatComponent from "@/components/ChatComponent"


export default function Home() {
  const [input, setInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.loading(<b>Elevate is thinking...</b>, {
      id: "chat-loader"
    })
    fetch("http://localhost:3000/api/getResponse", {
cache: "no-cache",
      method: "POST",
      body: JSON.stringify({
        input,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (response) => {
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
      setInput("");
    }).catch((error) => {

      toast.error(<b>Error Genrating Response from GPT... </b>)

      console.error(error);
    });
  };


  return (
    <main className=" ">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="flex flex-col h-screen  p-4 md:p-16">
        <header className="bg-gradient-to-r shadow-lg rounded-md from-blue-600 to-blue-900 text-white py-3 px-4 flex items-center">
          <div className="flex items-center gap-2">
            <BotIcon className="w-6 h-6" />
            <h2 className="text-lg font-bold">Mental Health Chatbot</h2>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
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
          className="bg-gradient-to-r rounded-lg from-blue-600 to-blue-900 border-t px-4 py-3 flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-white/20 px-4 py-2 text-sm text-white placeholder:text-white/50"
          />
          <button type="submit" className="btn">
            Chat
          </button>
        </form>
      </div>
    </main>
  );
}

