"use client";
import React from "react";
import Wrapper from "../../../components/Wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { createChatId } from "@/lib/actions";
import Link from "next/link";

interface createChatId {
  createChatId: {
    chat_id: string;
  };
}

export default function page() {
  const { data: session } = useSession();

  const [chatData, setChatData] = React.useState<createChatId | null>(null);

  const btnHandler = async (id: string) => {
    try {
      await createChatId(id!).then((res) => setChatData(res));
    } catch (e) {}
  };

  return (
    <Wrapper>
      <div className="h-[80vh] md:h-screen flex items-center gap-3 justify-center">
        <div className="w-[16rem] md:w-[25rem]">
          <Input
            value={chatData?.createChatId?.chat_id}
            placeholder="Generate a new chat room id ...."
            className="rounded-full dark:bg-gray-300/50 h-[3rem] bg-white shadow-lg"
            readOnly
          />
        </div>
        {!chatData?.createChatId?.chat_id ? (
          <Button
            variant={"destructive"}
            onClick={() => btnHandler(session?.user?.id!)}
            className="rounded-full  md:px-11"
          >
            Create
          </Button>
        ) : (
          <Link href={`/chat/create/${chatData?.createChatId?.chat_id}`}>
            <Button className="rounded-full md:px-11">Enter Chat</Button>
          </Link>
        )}
      </div>
    </Wrapper>
  );
}
