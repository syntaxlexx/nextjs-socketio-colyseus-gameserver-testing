import ChatColyseus from "@/components/chat-colyseus";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div>
      Colyseus Page
      <ChatColyseus />
    </div>
  );
};

export default Page;
