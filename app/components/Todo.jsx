"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const changeTodo = async (todoId, todoText, todoIsCompleted) => {
  await fetch(`/api/updateTodo/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_completed: todoIsCompleted,
      todo: todoText
    }),
  });
};

const Todo = ({ todo }) => {
  const [todoText, setTodoText] = useState(todo.todo);
  const router = useRouter();
  const [isCompleted, setTodoComplete] = useState(todo.is_completed);

  const handleCheckBoxChange = () => {
    changeTodo(todo.id, todoText, !isCompleted);
    setTodoComplete(!isCompleted);
  };

  const handleTodoChange = (e) => {
    changeTodo(todo.id, e.target.value, isCompleted);
    setTodoText(e.target.value);
  };

  const handleDelete = async () => {
    await fetch(`/api/deleteTodo/${todo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.refresh();
  }

  return (
    <>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckBoxChange}
      />
      <input type="text" value={todoText} onChange={handleTodoChange} />
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default Todo;
