import { authOptions } from "@/auth";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/prisma";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);

  const user = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    select: {
      cardNumber: true,
      cvv: true,
      expiresSubscription: true,
      subscriptions: true,
    },
  });

  //form data funtion
  const addForm = async (formData: FormData) => {
    "use server";
    const cardNumber = formData.get("cardNumber");
    const date = formData.get("date");
    const cvvNumber = formData.get("cvvNumber");
    // Convert the date to ISO-8601 format
    const isoDate = new Date(date as string).toISOString();

    // Calculate expiration date (current date + one month)
    const expirationDate = new Date(user?.expiresSubscription!);
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const isoExpirationDate = expirationDate.toISOString();

    const userData = await db.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });
    if (!userData) {
      return new Error("User not found");
    }
    await db.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        cardNumber: Number(cardNumber),
        expiryDate: isoDate,
        cvv: Number(cvvNumber),
        subscriptions: "premium",
        expiresSubscription: isoExpirationDate,
      },
    });
    return revalidatePath(`/billing`);
  };

  return (
    <Wrapper>
      <div className="mt-[5rem]  flex items-center  justify-center">
        <div className="w-[25rem] shadow-lg rounded-md h-[44rem] dark:bg-gray-300/50 bg-white">
          <div className="flex-col dark:bg-[#111926] bg-[#CAE1EE] rounded-md w-full h-[10rem] py-10 flex items-center justify-center">
            <Image
              src={session?.user?.image!}
              alt="picture of author"
              width={100}
              height={100}
              className="rounded-full"
            />

            <h1 className="text-3xl dark:text-white text-black font-bold ">
              {session?.user?.name!}
            </h1>
          </div>
          {/* Form data */}
          <form action={addForm}>
            <div className="w-[20rem] mx-auto flex-col flex gap-3 items-center mt-[2rem] ">
              <div className="w-full">
                <h1 className="py-1">Your Membership Expire Date</h1>
                <Input
                  type="text"
                  value={new Date(user?.expiresSubscription!).toDateString()}
                  readOnly
                />
              </div>
              <div className="w-full">
                <h1 className="py-1">Your Email</h1>
                <Input
                  type="email"
                  value={session?.user?.email || "name@gmail.com"}
                  readOnly
                />
              </div>
              <div className="w-full">
                <h1 className="py-1">Card Details</h1>
                <Input type="number" name="cardNumber" required />
              </div>
              <div className="flex justify-between w-full">
                <div className="w-[8rem]">
                  {" "}
                  <h1 className="py-1">Expires</h1>
                  <Input type="date" name="date" required />
                </div>
                <div className="w-[8rem]">
                  {" "}
                  <h1 className="py-1">CVV</h1>
                  <Input
                    type="number"
                    placeholder={user?.cvv!}
                    name="cvvNumber"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <h1 className="py-1">Holder Name</h1>
                <Input
                  type="name"
                  value={session?.user?.name || "John"}
                  readOnly
                />
              </div>
            </div>
            <Button variant={"destructive"} className="w-[20rem] mx-10 mt-6">
              {" "}
              Renew
            </Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}
