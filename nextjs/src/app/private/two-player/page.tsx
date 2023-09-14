import ChatColyseusTwoPlayer from "@/components/chat-colyseus-two-player";
import { getToken } from "@/lib/server-helpers";

interface Props {}

const Page = async ({}: Props) => {
  const token = getToken();

  return (
    <div className="max-w-lg mx-auto">
      <h2>Colyseus Private Two-Player Chat</h2>
      {token && <ChatColyseusTwoPlayer accessToken={token} />}
    </div>
  );
};

export default Page;
