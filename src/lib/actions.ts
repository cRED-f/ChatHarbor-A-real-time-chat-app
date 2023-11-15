"use server";

import { revalidatePath } from "next/cache";

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
    throw error;
  }
}
//get the user data
export async function userData(id: string) {
  const res = await fetch(`${process.env.SERVER_URL}/api/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
