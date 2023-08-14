import prisma from "../../../prisma/db";
import Joi from "joi";

export default async function createTodo(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const schema = Joi.object({
      todo: Joi.string(),
      is_completed: Joi.bool(),
    });
    schema.validate(body);
    const todos = await prisma.todo.create({
      data: body,
    });
    res.json(todos);
  }
}
