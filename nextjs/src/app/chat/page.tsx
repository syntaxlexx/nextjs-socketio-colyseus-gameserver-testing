import ChatBox from "@/components/chat-box";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        another chat
        <ChatBox />
      </div>
      <div className="w-full md:w-1/2"></div>
    </div>
  );
};

export default Page;
