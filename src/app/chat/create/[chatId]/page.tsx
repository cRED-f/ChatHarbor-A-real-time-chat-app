import React from "react";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Delete, Link, MessagesSquare, PlusCircle, Trash2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Image from "next/image";
import ChatBox from "@/components/chatComp/ChatBox";
export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <Wrapper>
      <div className=" max-w-7xl h-screen mx-auto flex flex-col ">
        {/*upper menu */}
        <div className="w-full   rounded-md h-[4rem] flex justify-center md:justify-end items-center ">
          <div className="md:flex mr-4 md:visible hidden gap-2 overflow-auto">
            <Button className="flex gap-2 rounded-lg">
              <PlusCircle />
              Add Your Friends
            </Button>
            <Button className="flex gap-2 bg-[#41ccf6] hover:bg-[#C9ECF7] rounded-lg">
              <Link />
              Share Link
            </Button>
            <Button variant={"destructive"} className="flex gap-2 rounded-lg ">
              <Trash2 />
              Delete Chat
            </Button>
          </div>
          <div className="flex mr-4 gap-2 md:hidden overflow-auto">
            <Button className="flex gap-2 rounded-lg">
              <PlusCircle />
            </Button>
            <Button className="flex gap-2 bg-[#41ccf6] hover:bg-[#C9ECF7]  rounded-lg">
              <Link />
            </Button>
            <Button variant={"destructive"} className="flex gap-2 rounded-lg ">
              <Trash2 />
            </Button>
          </div>
        </div>
        {/* users chat inside room */}
        <div className="w-full shadow-xl  gap-2 rounded-md h-[3rem] flex justify-start items-center overflow-x-auto">
          {/* admin chat */}
          <div className="rounded-xl w-fit ml-1  h-[2rem] bg-gray-300/50">
            <div className="flex gap-1 justify-center items-center">
              <Image
                src={session?.user?.image!}
                width={30}
                height={20}
                alt="user image"
                className="rounded-full"
              />
              <h1 className="font-bold mr-1 text-indigo-400 dark:text-indigo-600 animate-pulse">
                {session?.user?.name!.split(" ")[0]}
              </h1>
            </div>
          </div>{" "}
          {/* users chat*/}
          <div className="rounded-xl w-fit ml-1  h-[2rem] bg-gray-300/50">
            <div className="flex gap-1 justify-center items-center">
              <Image
                src={session?.user?.image!}
                width={30}
                height={20}
                alt="user image"
                className="rounded-full"
              />
              <h1 className="font-bold mr-1  ">
                {session?.user?.name!.split(" ")[0]}
              </h1>
            </div>
          </div>{" "}
        </div>
        {/* chat area for new chat room */}
        <div className="w-full rounded-lg bg-indigo-400/50 dark:bg-indigo-700/40 h-[20rem] mt-10 flex-col flex justify-center items-center">
          <div>
            <MessagesSquare className="text-white" size={50} />
          </div>
          <div className="flex-col mt-3 flex items-center">
            <h1 className="text-white font-semibold">
              Invite Yours Friends and Start coversations <span>👋</span>
            </h1>
            <span className="dark:text-gray-300 text-gray-100">
              No need to worry about privacy , we got you covered
            </span>
          </div>
        </div>
        {/* chat area for coversations */}
        <div>
          <ChatBox />
        </div>
      </div>
    </Wrapper>
  );
}
