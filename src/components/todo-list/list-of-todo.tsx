/* eslint-disable @typescript-eslint/no-unused-expressions */
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
    setIsOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
    setSelectedForm: React.Dispatch<React.SetStateAction<TodoItem>>;
};

function ListOfTodo({
    todos,
    setIsOpenEditModal,
    setTodos,
    setSelectedForm,
}: Props) {
    const deleteTodoItem = (itemToDelete: TodoItem): void => {
        const newTodos = todos.filter(
            (item) =>
                !(
                    itemToDelete.name === item.name &&
                    itemToDelete.description === item.description
                )
        );
        setTodos(newTodos);
    };

    return (
        <TodoListWrapper>
            <TodoListTitle>Todo List</TodoListTitle>

            {todos.map((item, index) => (
                <TodoListItem
                    key={index}
                    todoItem={item}
                    indexNumber={index + 1}
                    setIsOpenEditModal={setIsOpenEditModal}
                    deleteTodoItem={deleteTodoItem}
                    setSelectedForm={setSelectedForm}
                />
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
