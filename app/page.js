import Link from "next/link";
import prisma from "../prisma/db";
import Todo from "./components/Todo";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
}

async function createTodo(formData) {
  "use server";
  await prisma.todo.create({
    data: {
      todo: formData.get("todo"),
      is_completed: false,
    },
  });

  revalidatePath("/");
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={createTodo}>
        <input name="todo" type="text" />
        <input type="submit" value="Add New Todo" />
      </form>
      {todos?.map((todo) => (
        <div key={todo.id}>
          <Todo todo={todo} />
        </div>
      ))}
    </main>
  );
}
