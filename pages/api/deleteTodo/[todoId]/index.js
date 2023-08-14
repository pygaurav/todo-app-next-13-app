import prisma from "../../../../prisma/db";

export default async function deleteTodo(req, res) {
  if (req.method === "DELETE") {
    const { todoId } = req.query;
    try {
      await prisma.todo.delete({
        where: {
          id: todoId,
        },
      });
    } catch (ex) {
      res
        .status(500)
        .json({
          error: `Unable to delete todo with id ${todoId}`,
          message: ex,
        });
    }
    res.json({ success: `Todo ${todoId} is deleted successfully` });
  }
}
