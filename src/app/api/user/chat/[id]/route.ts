import { NextResponse } from "next/server";
import { db } from "../../../../../db/prisma";
import { pusherServer } from "@/lib/pusher";

//delete chat room
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const { userId } = await req.json();
    //delete chat room
    const chatDataFromUser = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        extraChats: true,
      },
    });

    const newExtraChats = chatDataFromUser?.extraChats.filter(
      (chatId) => chatId !== id
    );

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        extraChats: newExtraChats,
      },
    });

    await db.chat.delete({
      where: {
        chat_id: id,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};

//get message from client side
export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const bodyText = await req.json();
    //save message to database
    const message = await db.message.create({
      data: {
        chatId: id,
        message: bodyText.text,
        sender_id: bodyText.sessionId,
      },
    });
    const userData = await db.user.findFirst({
      where: {
        id: bodyText.sessionId,
      },
      select: {
        name: true,
        image: true,
      },
    });

    const sendData = {
      messageId: message?.id,
      chatId: message?.chatId,
      createAt: message?.createdAt,
      senderId: message?.sender_id,
      message: message?.message,
      senderName: userData?.name,
      senderImage: userData?.image,
    };

    pusherServer.trigger(id, "incoming-message", sendData);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};

//get all messages from chatroom

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const msgFromChat = await db.chat.findFirstOrThrow({
      where: {
        chat_id: id,
      },
      select: {
        messages: true,
      },
    });
    const msgFromChatWithUserData = await Promise.all(
      msgFromChat.messages.map(async (msg) => {
        const userData = await db.user.findFirst({
          where: {
            id: msg.sender_id,
          },
          select: {
            name: true,
            image: true,
          },
        });
        return {
          messageId: msg.id,
          chatId: msg.chatId,
          createAt: msg.createdAt,
          senderId: msg.sender_id,
          message: msg.message,
          senderName: userData?.name,
          senderImage: userData?.image,
        };
      })
    );

    return NextResponse.json(msgFromChatWithUserData);
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};
