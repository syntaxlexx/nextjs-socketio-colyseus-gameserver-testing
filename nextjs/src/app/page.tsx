import ChatBox from "@/components/chat-box";
import MessagesList from "@/components/messages-list";

export default function Home() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        <MessagesList />
      </div>
      <div className="w-full md:w-1/2">
        <div className="pl-4">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
