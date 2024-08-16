import Markdown from "react-markdown";

interface ChatComponentProps extends ChatHistory {
    key: number;
  }
  
const ChatComponent = ({
    userInput,
    botResponse,
    key
  }: ChatComponentProps) => {
    return (
      <div key={key}>
        <div className="flex items-start gap-3 justify-end">
          <div className="grid gap-1 items-end text-sm">
            <div className="font-bold text-[#9d4edd]">You</div>
            <div>
              <p>{userInput}</p>
            </div>
          </div>
          <div className="rounded-lg w-10 h-10 bg-gradient-to-r from-[#ffeaa7] to-[#fdcb6e] text-3xl flex items-center justify-center">
            😎
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="rounded-lg w-10 h-10 bg-gradient-to-r from-[#55efc4] to-[#00b894] text-3xl flex items-center justify-center">
            😁
          </div>
          <div className="grid gap-1 items-start text-sm">
            <div className="font-bold text-[#7b2cbf]">Mental Health Chatbot</div>
            <div>
              <Markdown>{botResponse.toString()}</Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default ChatComponent;