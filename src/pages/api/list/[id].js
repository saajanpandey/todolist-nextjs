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
    } else if (req.method == "PUT") {
      const { title, description, userId } = req.body;
      const updateList = await prisma.todoList.update({
        where: {
          id: data,
        },
        data: {
          title: title,
          description: description,
          userId: userId,
        },
      });
      if (updateList) {
        res.status(200).json({ data: "List Update Successfully!" });
      } else {
        res.status(404).json({ data: "No Record Found!" });
      }
    } else {
      const list = await prisma.todoList.findUnique({
        where: {
          id: data,
        },
      });
      if (list) {
        res.status(200).json({ data: list });
      } else {
        res.status(404).json({ data: "No Record Found!" });
      }
    }
  } else {
    res.status(401).json({ data: "Please login in to see your todolists" });
  }
}
