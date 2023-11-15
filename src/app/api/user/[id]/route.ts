import { NextResponse } from "next/server";
import { db } from "../../../../db/prisma";
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const expiredate = await db.user.findFirst({
      where: {
        id: id,
      },
      select: {
        expiresSubscription: true,
        expiryDate: true,
      },
    });

    if (
      expiredate?.expiresSubscription &&
      new Date(expiredate.expiresSubscription) < new Date()
    ) {
      const userData = await db.user.update({
        where: {
          id: id,
        },
        data: {
          subscriptions: "free",
          expiryDate: null,
        },
      });
      return NextResponse.json({ userData }, { status: 200 });
    } else {
      const userData = await db.user.findFirst({
        where: {
          id: id,
        },
      });
      return NextResponse.json({ userData }, { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};
