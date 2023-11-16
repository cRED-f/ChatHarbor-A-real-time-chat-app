"use client";
import { MessagesSquare, Twitter } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { use, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getMsg, sendMsg } from "@/lib/actions";
import { pusherClient } from "@/lib/pusher";
import SkeletonChats from "./SkeletonChats";

//interface
interface props {
  color: string;
  chatId: string;
  sessionId: string;
}
//incoming message interface
type IncomingMessage = {
  messageId: string;
  chatId: string;
  createAt: Date;
  senderId: string;
  message: string;
  senderName: string;
  senderImage: string;
};

export default function ChatBox({ color, chatId, sessionId }: props) {
  const { data: session } = useSession();
  //loading state
  const [loading, setLoading] = React.useState(true);

  //get previous messages
  const [initialMessages, setInitialMessages] = React.useState<
    IncomingMessage[]
  >([]);
  useEffect(() => {
    try {
      getMsg(chatId!).then((res) => {
        setInitialMessages(res);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //send messages operation
  const [messages, setMessages] = React.useState<string>("");
  const sendMsgFunction = (chatId: string) => {
    sendMsg(chatId!, messages!, sessionId!);
  };

  //incoming message from server
  const [incomingMessage, setIncomingMessage] = React.useState<
    IncomingMessage[]
  >([]);
  useEffect(() => {
    pusherClient
      .subscribe(chatId!)
      .bind("incoming-message", (text: IncomingMessage) => {
        setIncomingMessage((prev) => {
          // Filter out duplicates
          if (!prev.some((msg) => msg.messageId === text.messageId)) {
            return [...prev, text];
          }
          return prev;
        });
      });
    return () => {
      pusherClient.unsubscribe(chatId!);
    };
  }, [pusherClient, chatId]);

  // Ref to the messages container
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);
  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  // Scroll to the bottom whenever incoming messages change
  useEffect(() => {
    scrollToBottom();
  }, [incomingMessage]);
  return (
    <div className="flex-1 max-w-7xl mx-auto ">
      <div
        ref={messagesContainerRef}
        className="h-[65vh] md:h-[72vh]  overflow-y-auto overflow-x-hidden overflow-scrollbar-hidden"
      >
        {loading ? (
          <SkeletonChats />
        ) : (
          <>
            {" "}
            {incomingMessage.length > 0 || initialMessages.length > 0 ? ( // messages in chat room
              <div className="flex flex-col gap-2">
                {(loading
                  ? initialMessages
                  : [...initialMessages, ...incomingMessage]
                ).map((items) =>
                  items.senderId === session?.user?.id ? (
                    //admin message box
                    <div
                      className="flex flex-col items-end gap-1"
                      key={items.messageId}
                    >
                      <div className="flex  items-end gap-2">
                        {/* admin message box */}
                        <div
                          className={`${
                            color === "purple"
                              ? "bg-gradient-to-t  from-indigo-700 to-purple-600 "
                              : color === "red"
                              ? "bg-gradient-to-t  from-red-700 to-pink-600 "
                              : color === "orange" &&
                                "bg-gradient-to-t  from-orange-700 to-yellow-600 "
                          } w-fit h-fit text-white rounded-xl`}
                        >
                          {/* sender name */}
                          <div className="py-2 px-3">
                            <span className="text-[13px]  font-serif  italic font-thin">
                              {items.senderName}
                            </span>
                          </div>
                          {/* sender message */}
                          <div className="px-2 pb-2 max-w-[10rem] md:max-w-[30rem]">
                            <h1 className="break-words">{items.message}</h1>
                          </div>
                        </div>
                        {/* sender image */}
                        <div>
                          <Image
                            src={items.senderImage}
                            width={40}
                            height={40}
                            alt="sender image"
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <h1 className="text-[12px]">
                        {new Date(items.createAt).toLocaleTimeString()}
                      </h1>
                    </div>
                  ) : (
                    // users message
                    <div
                      className="flex flex-col items-start"
                      key={items.messageId}
                    >
                      <div className="flex items-end gap-2">
                        {/* sender image */}
                        <div>
                          <Image
                            src={items.senderImage}
                            width={40}
                            height={40}
                            alt="sender image"
                            className="rounded-full"
                          />
                        </div>{" "}
                        {/* users message box */}
                        <div className=" dark:bg-gray-300/50 bg-[#D1D5DC]  w-fit h-fit text-black dark:text-white rounded-xl">
                          {/* sender name */}
                          <div className="py-2 px-3">
                            <span className="text-[13px]  font-serif  italic font-thin">
                              {items.senderName}
                            </span>
                          </div>

                          {/* sender message */}
                          <div className="px-2 pb-2 max-w-[10rem] md:max-w-[30rem]">
                            <h1 className="break-words">{items.message}</h1>
                          </div>
                        </div>
                      </div>
                      <h1 className="text-[12px]">
                        {new Date(items.createAt).toLocaleTimeString()}
                      </h1>{" "}
                    </div>
                  )
                )}
              </div> // chat area for new chat room
            ) : (
              <div className="w-full rounded-lg bg-indigo-400/50 dark:bg-indigo-700/40 h-[20rem] mt-10 flex-col flex justify-center items-center">
                <div>
                  <MessagesSquare className="text-white" size={50} />
                </div>
                <div className="flex-col mt-3 flex items-center">
                  <h1 className="text-white font-semibold">
                    Invite Yours Friends and Start coversations <span>👋</span>
                  </h1>
                  <span className="dark:text-gray-300 text-gray-100 break-words text-center">
                    No need to worry about privacy , we got you covered
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Input message box  */}
      <div className="relative ">
        <Input
          className="bg-gray-300/50 w-full rounded-full"
          placeholder="Enter your message"
          onChange={(e) => setMessages(e.target.value)}
        />

        <Button
          className={`absolute ${
            color === "purple"
              ? "bg-gradient-to-t  from-indigo-700 to-purple-600 "
              : color === "red"
              ? "bg-gradient-to-t  from-red-700 to-pink-600 "
              : color === "orange" &&
                "bg-gradient-to-t  from-orange-700 to-yellow-600 "
          }  rounded-full   w-[4rem] md:w-[7rem] text-white  top-0 right-0`}
          onClick={() => sendMsgFunction(chatId)}
        >
          <Twitter />
        </Button>
      </div>
    </div>
  );
}
