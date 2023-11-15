"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { ChevronDown, Link, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatBox from "@/components/chatComp/ChatBox";
import { useSession } from "next-auth/react";
export default function page() {
  const { data: session } = useSession();
  const [color, setColor] = useState<string | null>(null);

  const colors = ["purple", "red", "orange"];

  return (
    <Wrapper>
      <div className=" max-w-7xl  mx-auto flex flex-col ">
        {/*upper menu */}
        <div className="w-full   rounded-md h-[4rem] flex justify-center md:justify-between gap-2 items-center ">
          {/* color */}
          <div className="md:w-[6rem] rounded-md h-[35px] flex justify-center items-center dark:bg-white bg-[#141919]">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {/* color name */}
                <div className="flex gap-1">
                  {" "}
                  <h1 className="font-semibold dark:text-black text-white hidden md:block">
                    Color
                  </h1>
                  <ChevronDown className="text-white dark:text-black" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {colors.map((items) => (
                  <>
                    {" "}
                    <DropdownMenuItem onClick={() => setColor(items)}>
                      {items}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* buttons */}
          <div className="md:flex mr-4 md:visible hidden gap-2 overflow-hidden">
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
                {session?.user?.name?.split(" ")[0]}
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
                {session?.user?.name?.split(" ")[0]}
              </h1>
            </div>
          </div>{" "}
        </div>

        {/* chat area for coversations */}
      </div>
      <div className="mt-2">
        <ChatBox color={color || "purple"} />
      </div>
    </Wrapper>
  );
}
