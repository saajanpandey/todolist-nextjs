import prisma from "../../../../lib/db";

export default async function handler(req, res) {
  const { title, description, userId } = req.body;
  const todoLists = await prisma.todoList.create({
    data: {
      title: title,
      description: description,
      userId: userId,
    },
  });

  if (todoLists) {
    res.status(200).json({ data: "List Created Successfully!" });
  } else {
    res.status(500).json({ data: "List Not Created!" });
  }
}
