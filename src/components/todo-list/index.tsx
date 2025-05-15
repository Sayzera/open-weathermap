import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import TodoForm from "./todo-form";
import ListOfTodo from "./list-of-todo";
import EditModal from "./edit-modal";

const MainWrapper = styled.div`
  width: 700px;
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 10px;
  min-height: 700px;
  margin-top: 10px;
  padding: 20px;
  position: relative;
`;
type Props = {};

export type TodoItem = {
  name: string;
  description: string;
};

function TodoList({}: Props) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [form, setForm] = useState<TodoItem>({
    name: "",
    description: "",
  });
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(true);

  return (
    <MainWrapper>
      {isOpenEditModal && <EditModal />}

      <TodoForm setForm={setForm} setTodos={setTodos} form={form} />
      {todos.length > 0 && <ListOfTodo todos={todos} />}
    </MainWrapper>
  );
}

export default TodoList;
