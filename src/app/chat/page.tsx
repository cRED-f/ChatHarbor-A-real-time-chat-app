import React from "react";
import Wrapper from "@/components/Wrapper";
import { db } from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import ChatroomDltComp from "@/components/chatComp/ChatroomDltComp";
import { revalidateTag } from "next/cache";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign in
      </Button>
    );

  //get all the admin chats from user table
  const selectExtraChat = await db.user.findMany({
    where: {
      id: session?.user.id,
    },
    select: { extraChats: true },
  });

  const adminAllChats = await Promise.all(
    selectExtraChat[0].extraChats.map(async (chat) => {
      const selectChat = await db.chat.findFirst({
        where: {
          chat_id: chat,
        },
        select: {
          chat_id: true,
          chatCreatedBy_name: true,
          chatCreatedBy_image: true,
          createdAt: true,
          chatCreatedBy_id: true,
        },
      });
      return selectChat;
    })
  );

  revalidateTag("chat");
  return (
    <Wrapper>
      <div className="h-screen max-w-7xl overflow-y-auto overflow-scrollbar-hidden mx-auto">
        <div className="">
          {" "}
          {/* all the chats */}
          <ul className="mt-8 grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3">
            {!adminAllChats !== undefined
              ? adminAllChats?.map((chat) => (
                  <li
                    key={chat?.chat_id}
                    className="col-span-1 divide-y divide-gray-300 dark:divide-gray-700
              w-[80%] md:w-full  mx-auto
              shadow-md transition
               hover:shadow-lg 
               bg-gradient-to-r   dark:to-[#121212]
           dark:from-[#1B4A57] from-gray-300/50
           to-gray-200/50
         
     
      text-lg cursor-pointer 
      hover:shadow-teal-500 "
                  >
                    <Link
                      href={`/chat/create/${chat?.chat_id}`}
                      className="flex flex-col gap-2"
                    >
                      <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                        <Image
                          src={chat?.chatCreatedBy_image!}
                          width={30}
                          height={30}
                          className="rounded-full"
                          alt="image"
                        />
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="truncate text-lg font-medium text-black  dark:text-white">
                              {chat?.chatCreatedBy_name}({chat?.chat_id})
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-white">
                      <div className="flex items-center gap-2 text-black  dark:text-white">
                        {new Date(chat?.createdAt!).toLocaleTimeString()}
                      </div>
                      {/* if user is admin then button will show otherwise it will be hidden */}
                      <ChatroomDltComp
                        chatCreatedBy_id={chat?.chatCreatedBy_id!}
                        sessionid={session?.user?.id}
                        chatId={chat?.chat_id!}
                      />
                      <div className="flex items-center gap-2 text-black  dark:text-white">
                        {new Date(chat?.createdAt!).toDateString()}
                      </div>
                    </div>
                  </li>
                ))
              : //skeleton loader
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div
                    className="flex items-center space-x-4 bg-gray-800/50 dark:bg-blue-700/50
                   rounded-lg w-[80% h-[8rem] flex justify-center
                    items-center"
                  >
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] " />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
          </ul>
        </div>{" "}
      </div>
    </Wrapper>
  );
}
