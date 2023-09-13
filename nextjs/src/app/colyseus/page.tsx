import ChatColyseus from "@/components/chat-colyseus";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div className="grid md:grid-cols-2 md:gap-4">
      <div>
        Colyseus Chat 1
        <ChatColyseus />
      </div>
      <div>
        Colyseus Chat 2
        <ChatColyseus />
      </div>
    </div>
  );
};

export default Page;
