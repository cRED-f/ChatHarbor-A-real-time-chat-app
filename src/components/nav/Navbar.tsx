import Link from "next/link";

import { DarkModeToggle } from "./DarkmodeToggle";
import UserBox from "./UserBox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Gem, MessageSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className=" sticky top-0 z-30 bg-[#F1FAFC] dark:bg-[#111926]">
      {" "}
      <nav className="flex flex-col sm:flex-row items-center p-5  max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Chat Harbor
          </h1>
        </Link>
        {/* Menu */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* if session exists, show this */}
          {session ? (
            <>
              <Link href={`/chat`} prefetch={false}>
                <MessageSquareIcon className="dark:text-white text-black" />
              </Link>{" "}
              <CreateChatButton />
            </>
          ) : (
            <>
              <Link href={`/price`} prefetch={false}>
                <div className="dark:text-white border w-10 border-[#E2D3FF] dark:border-gray-800 h-10 rounded-md">
                  {" "}
                  <Gem className="m-2" />
                </div>
              </Link>
            </>
          )}

          {/* Darkmode toggle */}
          <DarkModeToggle />
          {/* Userbox */}
          <UserBox session={session} />
        </div>
      </nav>
      {/* upgrade banner */}
    </header>
  );
}
