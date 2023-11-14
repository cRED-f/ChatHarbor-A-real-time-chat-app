import { authOptions } from "@/auth";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/prisma";
import { CreditCard } from "lucide-react";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const addForm = async (formData: FormData) => {
    "use server";
    const cardNumber = formData.get("cardNumber");
    const date = formData.get("date");
    const cvvNumber = formData.get("cvvNumber");
    // Convert the date to ISO-8601 format
    const isoDate = new Date(date as string).toISOString();

    // Calculate expiration date (current date + one month)
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const isoExpirationDate = expirationDate.toISOString();

    const userData = await db.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!userData) {
      return new Error("User not found");
    }
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        cardNumber: Number(cardNumber),
        expiryDate: isoDate,
        cvv: Number(cvvNumber),
        subscriptions: "premium",
        expiresSubscription: isoExpirationDate,
      },
    });
    revalidatePath(`memberships/${id}`);

    return redirect("/");
  };

  return (
    <Wrapper>
      <div className="mt-[5rem]  flex items-center  justify-center">
        <div className="w-[25rem] shadow-lg rounded-md h-[40rem] dark:bg-gray-300/50 bg-white">
          <div className=" dark:bg-[#111926] bg-[#CAE1EE] rounded-md w-full h-[10rem] py-10 flex items-center justify-center">
            <h1 className="text-3xl dark:text-white text-black font-bold flex gap-2 items-center">
              <CreditCard className="" />
              Payment with Card
            </h1>
          </div>
          {/* Form data */}
          <form action={addForm}>
            <div className="w-[20rem] mx-auto flex-col flex gap-3 items-center mt-[2rem] ">
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
                <Input
                  type="number"
                  placeholder="0000 0000 0000"
                  name="cardNumber"
                  required
                />
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
                    placeholder="000"
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
              Pay
            </Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}
