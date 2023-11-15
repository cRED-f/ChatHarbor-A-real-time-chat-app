"use client";
import { MessagesSquare, Twitter } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function ChatBox({ color }: { color: string }) {
  const { data: session } = useSession();
  return (
    <div className="flex-1 max-w-7xl mx-auto ">
      <div className="h-[65vh] md:h-[72vh]  overflow-y-auto overflow-x-hidden overflow-scrollbar-hidden">
        {/* chat area for new chat room */}
        {/* <div className="w-full rounded-lg bg-indigo-400/50 dark:bg-indigo-700/40 h-[20rem] mt-10 flex-col flex justify-center items-center">
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
      </div> */}

        {/* messages in chat room */}
        <div className="flex flex-col gap-2">
          {/* admin message  */}
          <div className="flex flex-col items-end">
            <div className="flex items-end gap-2">
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
                    {session?.user?.name?.split(" ")[0]}
                  </span>
                </div>
                {/* sender message */}
                <div className="px-2 pb-2 max-w-[10rem] md:max-w-[30rem]">
                  <h1 className="break-words">
                    hi my name is Lorem, Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Rem aliquam repudiandae nostrum quas
                    veniam excepturi cumque, deleniti enim pariatur odit
                    aspernatur error earum repellendus vitae totam ipsam! Enim
                    doloremque ipsa consequatur soluta!
                  </h1>
                </div>
              </div>
              {/* sender image */}
              <div>
                <Image
                  src={session?.user?.image!}
                  width={40}
                  height={40}
                  alt="sender image"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          {/* users message */}
          <div className="flex flex-col items-start">
            <div className="flex items-end gap-2">
              {/* sender image */}
              <div>
                <Image
                  src={session?.user?.image!}
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
                    {session?.user?.name?.split(" ")[0]}
                  </span>
                </div>

                {/* sender message */}
                <div className="px-2 pb-2 max-w-[10rem] md:max-w-[30rem]">
                  <h1 className="break-words">
                    hi my name is Lorem Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Doloremque voluptates repellendus,
                    asperiores quae eaque molestias iste unde nobis, amet, totam
                    dolorum qui quas tempore ipsum commodi nisi nihil laudantium
                    exercitationem fugiat tenetur?,
                  </h1>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Input message box  */}
        </div>
      </div>

      <div className="relative ">
        <Input
          className="bg-gray-300/50 w-full rounded-full"
          placeholder="Enter your message"
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
        >
          <Twitter />
        </Button>
      </div>
    </div>
  );
}
