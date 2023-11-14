import { NextResponse } from "next/server";
import { db } from "../../../../../../db/prisma";
import { revalidatePath } from "next/cache";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const createChatId = await db.chat.create({
      data: {
        chatCreatedBy_id: id,
      },
    });

    return NextResponse.json({ createChatId }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};

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
