"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteChatRoom } from "@/lib/actions";
import { revalidatePath } from "next/cache";
//interface for props
interface props {
  chatCreatedBy_id: string;
  sessionid: string;
  chatId: string;
}

export default function ChatroomDltComp({
  chatCreatedBy_id,
  sessionid,
  chatId,
}: props) {
  const { toast } = useToast();
  const [loadingForDeleteOperation, setLoadingForDeleteOperation] = useState<
    string | null
  >(null);

  //function for deleting chat room
  const chatDlt = (id: string) => {
    setLoadingForDeleteOperation(id);
    const data = deleteChatRoom(id).then((res) => {
      setLoadingForDeleteOperation(null);
    });
  };

  return (
    <>
      {chatCreatedBy_id === sessionid && (
        <Button
          size="sm"
          className="w-full bg-[#ff0a0a] rounded hover:bg-indigo-400"
          onClick={() => chatDlt(chatId)}
        >
          {loadingForDeleteOperation ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
          ) : (
            <Trash className="h-4 w-4 text-black  dark:text-white" />
          )}
        </Button>
      )}
    </>
  );
}
