import { NextResponse } from "next/server";
import { db } from "../../../../../../db/prisma";
import { get } from "http";
import { pusherServer } from "@/lib/pusher";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const { userId } = await req.json();
    //check if the user is already in the chat
    const existingChat = await db.chat.findUnique({
      where: {
        chat_id: id,
      },
    });
    //if the chat does not exist
    if (!existingChat) {
      return;
    }
    //if the user is not in the chat
    if (!existingChat.usersIn_chat_id.includes(userId)) {
      const updatedChat = await db.chat.update({
        where: {
          chat_id: id,
        },
        data: {
          usersIn_chat_id: {
            set: [...existingChat.usersIn_chat_id, userId],
          },
        },
        select: {
          usersIn_chat_id: true,
        },
      });

      //get the user data if the user is not in the chat
      const userData = await Promise.all(
        updatedChat.usersIn_chat_id.map(async (user) => {
          // Get the user's current chats
          const userChats = await db.user.findFirst({
            where: {
              id: user,
            },
            select: {
              chats: true,
            },
          });

          // Store the previous chat values
          const previousChats = userChats?.chats;

          // Add the new chat to the user's chats
          const updatedChats = [...previousChats!, { chat_id: id }];

          // Update the user with the new chat
          await db.user.update({
            where: {
              id: user,
            },
            data: {
              chats: {
                set: updatedChats.map((chat) => ({ chat_id: chat.chat_id })),
              },
            },
          });

          const data = await db.user.findFirst({
            where: {
              id: user,
            },
            select: {
              id: true,
              name: true,
              image: true,
            },
          });

          return {
            id: data?.id,
            name: data?.name,
            image: data?.image,
          };
        })
      );
      pusherServer.trigger(id, "user-joined", "dsa");
      return NextResponse.json({ userData }, { status: 200 });
    } else {
      //get the user data if the user is already in the chat
      const getChat = await db.chat.findMany({
        where: {
          chat_id: id,
        },
        select: {
          usersIn_chat_id: true,
        },
      });
      //get the user data if the user is already in the chat
      const userData = await Promise.all(
        getChat[0].usersIn_chat_id.map(async (user) => {
          const data = await db.user.findFirst({
            where: {
              id: user,
            },
            select: {
              id: true,
              name: true,
              image: true,
            },
          });
          return {
            id: data?.id,
            name: data?.name,
            image: data?.image,
          };
        })
      );
      pusherServer.trigger(id, "user-joined", "dasds");
      return NextResponse.json({ userData }, { status: 200 });
    }
  } catch (e) {
    return NextResponse.json({ message: "Error", error: e }, { status: 500 });
  }
};
