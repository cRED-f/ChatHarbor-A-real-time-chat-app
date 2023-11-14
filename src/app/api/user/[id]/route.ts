import { NextResponse } from "next/server";
import { db } from "../../../../db/prisma";
export const GET = async (
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
    return NextResponse.json({ userData }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
};

// async function getUserData(session: Session) {
//   const userData = await db.user.findFirst({
//     where: {
//       id: session?.user?.id,
//     },
//     select: {
//       subscriptions: true,
//     },
//   });

//   return userData;
// }

// const userData = getUserData(session!);

// console.log(userData);
