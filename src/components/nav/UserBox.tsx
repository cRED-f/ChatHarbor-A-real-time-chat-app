"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import star from "../../assets/images/star.gif";
import free from "../../assets/images/free.png";
import Link from "next/link";
interface UserData {
  subscriptions: string;
}

const userData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/user/${id!}`);
  const data = await res.json();
  return data;
};

export default function UserBox({ session }: { session: Session | null }) {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    if (session) {
      userData(session.user.id).then((res) => setData(res.userData));
    }
  }, [session]);

  if (!session)
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign in
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <UserAvatar name={session?.user?.name} img={session?.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="ml-3">
          {session?.user?.name}
        </DropdownMenuLabel>
        {data?.subscriptions === "premium" ? (
          <>
            {" "}
            <DropdownMenuLabel className="flex gap-1 ">
              <Image
                src={star}
                width={20}
                height={20}
                alt="premium"
                unoptimized
              />
              <h1>Pro member</h1>
            </DropdownMenuLabel>
            <DropdownMenuLabel className="w-full">
              {" "}
              <Link href="/billing">
                {" "}
                <h1 className="ml-1 hover:text-indigo-500">Manage Billing</h1>
              </Link>
            </DropdownMenuLabel>
          </>
        ) : (
          <>
            {" "}
            <DropdownMenuLabel className="flex gap-1">
              {" "}
              <Image src={free} width={20} height={20} alt="free" />{" "}
              <h1>Free member</h1>
            </DropdownMenuLabel>{" "}
            <DropdownMenuLabel>
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
                <h1>Wanna Pro?</h1>
              </Link>
            </DropdownMenuLabel>
          </>
        )}
        <DropdownMenuSeparator />

        <DropdownMenuItem className="w-full  " onClick={() => signOut()}>
          <h1 className="mx-auto"> Sign out</h1>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
