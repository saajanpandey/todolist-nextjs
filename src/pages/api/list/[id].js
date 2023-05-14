import prisma from "../../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { id } = req.query;

    const data = parseInt(id);
    if (req.method == "DELETE") {
      const deleteList = await prisma.todoList.delete({
        where: {
          id: data,
        },
      });

      if (deleteList) {
        res.status(200).json({ data: "List Deleted Successfully!" });
      } else {
        res.status(500).json({ data: "List Cannot Be Deleted!" });
      }
    }
  } else {
    res.status(401).json({ data: "Please login in to see your todolists" });
  }
}
