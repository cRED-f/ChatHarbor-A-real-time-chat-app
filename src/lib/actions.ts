"use server";

import exp from "constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

//create chat room
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

//send message function on server side
export async function sendMsg(chatId: string, text: string, sessionId: string) {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/api/user/chat/${chatId}`,
      {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, sessionId }),
      }
    );
    const data = await res.json();
    revalidateTag("chat" + chatId);
    return data;
  } catch (error) {
    throw NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

//get message from server side
export async function getMsg(chatId: string) {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/api/user/chat/${chatId}`,
      {
        cache: "no-cache",
        method: "GET",
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

//post user presence in chat
export async function postUserPresence(chatId: string, userId: string) {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/api/user/chat/presence/${chatId}`,
      {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
