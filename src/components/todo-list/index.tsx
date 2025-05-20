/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import styled from "styled-components";
import EditModal from "./edit-modal";
import ListOfTodo from "./list-of-todo";
import TodoForm from "./todo-form";

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

export type TodoItem = {
    name: string;
    description: string;
};

function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [form, setForm] = useState<TodoItem>({
        name: "",
        description: "",
    });
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

    const [selectedForm, setSelectedForm] = useState<TodoItem>({
        name: "",
        description: "",
    });

    return (
        <MainWrapper>
            {isOpenEditModal && (
                <EditModal
                    setForm={setForm}
                    setTodos={setTodos}
                    form={selectedForm}
                    setSelectedForm={setSelectedForm}
                    type="update"
                    setIsOpenEditModal={setIsOpenEditModal}
                />
            )}

            <TodoForm
                setForm={setForm}
                setTodos={setTodos}
                form={form}
                setIsOpenEditModal={setIsOpenEditModal}
            />
            {todos.length > 0 && (
                <ListOfTodo
                    todos={todos}
                    setIsOpenEditModal={setIsOpenEditModal}
                    setTodos={setTodos}
                    setSelectedForm={setSelectedForm}
                />
            )}
        </MainWrapper>
    );
}

export default TodoList;
