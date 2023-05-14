import prisma from "../../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const todolists = await prisma.todoList.findMany({
      where: {
        userId: session.user.id,
      },
    });
    res.status(200).json({ data: todolists });
  } else {
    res.status(401).json({ error: "Please login in to see your todolists" });
  }
}
