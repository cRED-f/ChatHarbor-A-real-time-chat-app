import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function CheckOutBtn() {
  const session = await getServerSession(authOptions);

  return (
    <Link
      href={`/register/membership/${session?.user?.id}`}
      className=" bg-gradient-to-br from-[#F00707]
  to-[#e24174] rounded-md mt-4 py-2 text-center text-white  font-semibold hover:from-[#ff5d5d] hover:to-[#fd582b]"
    >
      Procced to Payment
    </Link>
  );
}
