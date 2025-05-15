import React from "react";
import styled from "styled-components";
import { TodoItem as TodoItemProp } from ".";


const TodoItemContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  border-bottom: 1px dashed gray;
  padding-bottom:10px;
  margin-bottom:5px;
`;

const TodoItem = styled.div`
  font-medium: bold;
`;

type Props = {
  todoItem: TodoItemProp;
  indexNumber:number
};

function TodoListItem({ todoItem,indexNumber }: Props) {

  return (
    <TodoItemContainer>
      <TodoItem>{indexNumber}</TodoItem>
      <TodoItem>Name:{todoItem.name}</TodoItem>
      <TodoItem>Description:{todoItem.description}</TodoItem>
    </TodoItemContainer>
  );
}

export default TodoListItem;
