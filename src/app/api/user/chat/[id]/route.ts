import { NextResponse } from "next/server";
import { db } from "../../../../../db/prisma";
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
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
