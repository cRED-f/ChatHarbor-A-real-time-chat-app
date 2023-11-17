import { NextResponse } from "next/server";
import { db } from "../../../../../../db/prisma";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const userData = await db.user.findFirst({
      where: {
        id: id,
      },
    });

    const chatsLength = await db.user.findMany({
      where: {
        id: id,
      },
      select: {
        chats: true,
      },
    });
    //check if the user has free subscription and has reached the limit of free chats
    if (
      userData?.subscriptions === "free" &&
      chatsLength[0].chats.length >= 2
    ) {
      return NextResponse.json(
        { error: "You have reached the limit of free chats" },
        { status: 500 }
      );
    }

    const createChatId = await db.chat.create({
      data: {
        chatCreatedBy_id: userData?.id,
        chatCreatedBy_name: userData?.name!,
        chatCreatedBy_image: userData?.image!,
      },
    });

    return NextResponse.json({ createChatId }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};

//get chat data
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const chatData = await db.chat.findFirst({
      where: {
        chat_id: id,
      },
    });
    return NextResponse.json({ message: "Success", chatData }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};
