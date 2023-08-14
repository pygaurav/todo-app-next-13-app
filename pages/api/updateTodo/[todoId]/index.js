import prisma from "../../../../prisma/db";

export default async function updateTodo(req, res) {
  if (req.method === "PUT") {
    const { todoId } = req.query;
    const data = req.body;
    try {
      await prisma.todo.update({
        where: {
          id: todoId,
        },
        data,
      });
    } catch (ex) {
      res
        .status(500)
        .json({
          error: `Unable to update todo with id ${todoId}`,
          message: ex,
        });
    }
    res.json({ success: `Todo ${todoId} is updated successfully` });
  }
}
