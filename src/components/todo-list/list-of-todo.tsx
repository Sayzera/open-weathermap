import React from "react";
import styled from "styled-components";
import { TodoItem } from ".";
import TodoListItem from "./todo-list-item";

const TodoListWrapper = styled.div`
  margin-top: 20px;
`;

const TodoListTitle = styled.h2`
  font-medium: bold;
`;

type Props = {
  todos: TodoItem[];
};

function ListOfTodo({ todos }: Props) {
  return (
    <TodoListWrapper>
      <TodoListTitle>Todo List</TodoListTitle>

      {todos.map((item, index) => (
        <TodoListItem key={index} todoItem={item} indexNumber={index + 1} />
      ))}

      {/* {
        todos.map((item) =>  <TodoListItem />)
      } */}

      {/* {todos.map((item) => {
        console.log(item)
        return <TodoListItem />;
      })} */}
    </TodoListWrapper>
  );
}

export default ListOfTodo;
