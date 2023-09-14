import ChatColyseusPrivate from "@/components/chat-colyseus-private";
import { getToken } from "@/lib/server-helpers";

interface Props {}

const Page = async ({}: Props) => {
  const token = getToken();

  return (
    <div className="">
      <h2>Colyseus Private Chat Room</h2>
      {token && (
        <div className="grid md:grid-cols-2 gap-2 md:gap-4">
          <div>
            <ChatColyseusPrivate accessToken={token} />
          </div>
          <div>
            <ChatColyseusPrivate accessToken={token} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
