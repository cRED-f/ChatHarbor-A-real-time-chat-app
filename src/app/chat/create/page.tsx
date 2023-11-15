"use client";
import React, { useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { createChatId, userData } from "@/lib/actions";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";
import { Coffee, MessagesSquare } from "lucide-react";
import Image from "next/image";
import free from "../../../assets/images/free.png";
import star from "../../../assets/images/star.gif";
import { Skeleton } from "@/components/ui/skeleton";

//interface for creating chat id
interface createChatId {
  createChatId: {
    chat_id: string;
  };
}
//interface for user data
interface UserData {
  subscriptions: string;
}
export default function page() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [chatData, setChatData] = React.useState<createChatId | null>(null);
  const [uData, setUData] = React.useState<UserData | null>(null);

  useEffect(() => {
    if (session) {
      userData(session.user.id).then((res) => setUData(res.userData));
    }
  }, [session]);

  //function for creating chat id
  const btnHandler = async (id: string) => {
    toast({
      title: "Please wait...",
      description: "Creating Your chatroom id",
    });
    try {
      await createChatId(id!).then((res) => setChatData(res));
      toast({
        title: "Your chatroom id is ready",
        description: "You can enter the chatroom",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Wrapper>
      {" "}
      {uData?.subscriptions === "premium" ? (
        // warning message for premium user
        <div
          className=" max-w-7xl mx-auto rounded-lg  bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700 
   dark:bg-gradient-to-br dark:from-purple-700 dark:via-pink-600 dark:to-indigo-700 h-[20rem]
    mt-10 flex-col flex justify-center items-center"
        >
          <div>
            <Image src={star} width={50} height={50} alt="free" unoptimized />
          </div>
          <div className="flex-col mt-3 flex items-center">
            <h1 className="text-white font-semibold">
              Your are Premium member
            </h1>
            <Button className="mt-6">
              {" "}
              <Link
                href="/billing"
                className="flex gap-1 cursor-pointer hover:text-indigo-600"
              >
                <h1 className="flex gap-1 items-center">
                  <Coffee /> Want to Donate us?
                </h1>
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        (
          // warning for free user
          <div className=" max-w-7xl mx-auto rounded-lg  bg-gradient-to-br from-[#db0700] to-rose-500  dark:bg-gradient-to-br dark:from-[#db0700] dark:to-rose-500 h-[20rem] mt-10 flex-col flex justify-center items-center">
            <div>
              <Image src={free} width={50} height={50} alt="free" unoptimized />
            </div>
            <div className="flex-col mt-3 flex items-center">
              <h1 className="text-white font-semibold">Your are a free user</h1>
              <span className="dark:text-gray-300 text-gray-100">
                There is limitation of 2 chatrooms for free user
              </span>
              <span className="dark:text-gray-300 text-gray-100 break-words text-center">
                If you want to create more chatroom please upgrade to premium
              </span>
              <Button className="mt-6">
                {" "}
                <Link
                  href="/register"
                  className="flex gap-1 cursor-pointer hover:text-indigo-600"
                >
                  {" "}
                  <Image
                    src={star}
                    width={20}
                    height={20}
                    alt="premium"
                    unoptimized
                  />
                  <h1>Wanna Pro? click here</h1>
                </Link>
              </Button>
            </div>
          </div>
        ) && (
          //skeleton for loading user data
          <div className="flex items-center mt-2  justify-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-[10rem] w-[75rem] bg-gray-800/50 dark:bg-blue-600/50" />
              <Skeleton className="h-[10rem] w-[75rem] bg-gray-800/50 dark:bg-blue-600/50" />
            </div>
          </div>
        )
      )}
      {/* chat area for creating new chat room */}
      {uData?.subscriptions === undefined ? (
        //skeleton for loading user data
        <div className=" mt-20 flex items-center gap-3 justify-center">
          <div className="w-[16rem] md:w-[25rem]">
            <Skeleton className="rounded-full h-[3rem] bg-white shadow-lg bg-gray-800/50 dark:bg-blue-600/50" />
          </div>
          {!chatData?.createChatId?.chat_id ? (
            <Skeleton className="rounded-full  md:px-11 bg-gray-800/50 dark:bg-blue-600/50 h-[3rem] w-[8rem]" />
          ) : (
            <Link href={`/chat/create/${chatData?.createChatId?.chat_id}`}>
              <Button className="rounded-full md:px-11">Enter Chat</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className=" mt-20 flex items-center gap-3 justify-center">
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
      )}
    </Wrapper>
  );
}
