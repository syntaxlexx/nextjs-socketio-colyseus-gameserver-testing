"use client";

import { FC, useEffect, useState } from "react";
import { Message } from "@shared/types";
import chance from "chance";
import { Card } from "flowbite-react";

interface Props {}

const MessagesList: FC<Props> = ({}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const generateMessages = () => {
      const list: Message[] = [];
      for (let i = 0; i < 10; i++) {
        list.push({
          id: chance().guid(),
          userId: chance().guid(),
          content: chance().sentence(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      setMessages(list);
    };

    generateMessages();
  }, []);

  return (
    <Card>
      <ul className="max-w-lg space-y-4 divide-y divide-gray-200">
        {messages.map((item) => (
          <li key={item.id}>
            <div className="text-sm">{item.content}</div>
            <div className="text-xs text-gray-500">By {item.userId}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default MessagesList;
