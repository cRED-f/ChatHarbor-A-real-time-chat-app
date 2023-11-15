"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function createChatId(userId: string) {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/api/user/chat/create/${userId}`,
      {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    throw NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
//get the user data
export async function userData(id: string) {
  const res = await fetch(`${process.env.SERVER_URL}/api/user/${id}`, {
    cache: "no-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

//chat room delete
export async function deleteChatRoom(id: string) {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/user/chat/${id}`, {
      cache: "no-cache",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    revalidateTag("chat");
    return data;
  } catch (error) {
    throw NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
