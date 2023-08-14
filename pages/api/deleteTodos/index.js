import prisma from "@/prisma/db";

export default async function deleteTodos(req, res) {
  if (req.method === "DELETE") {
    try {
      await prisma.todo.deleteMany();
      res.json({ success: "All Todos deleted" });
    } catch (e) {
      res.status(500).json({ error: "Unable to delete todo", message: e });
    }
  }
}
