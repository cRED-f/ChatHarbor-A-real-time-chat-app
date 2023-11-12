"use client";
import React from "react";

import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function CheckOutBtn() {
  const { data: session } = useSession();

  //if session is null then return
  if (!session?.user.id) return;

  const createSessionForCheckout = async () => {
    //push a docoment to firestore database
    //
    //
    //
    //... stripe extension on firebase will create a checkout session
    //
    //
    //
    //
    //redirect to checkout page
  };

  return (
    <Button
      onClick={() => createSessionForCheckout()}
      className=" bg-gradient-to-br from-[#F00707]
  to-[#e24174] rounded-md mt-4 py-2 text-center text-white  font-semibold hover:from-[#ff5d5d] hover:to-[#fd582b]"
    >
      Procced to Payment
    </Button>
  );
}
