"use client";
import React from "react";
import { Button } from "../ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateChatButton() {
  const router = useRouter();

  const CreateChatButtonFunction = async () => {
    //all the logic goes here
    router.push("/chat/create");
  };

  return (
    <Button onClick={CreateChatButtonFunction} variant={"ghost"}>
      <MessageSquarePlusIcon className="dark:text-white text-black" />
    </Button>
  );
}
