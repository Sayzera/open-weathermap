import styled from "styled-components";
import { TodoItem } from ".";
import TodoForm from "./todo-form";

type Props = {
    setForm: React.Dispatch<React.SetStateAction<TodoItem>>;
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
    setIsOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    form: TodoItem;
    type?: "add" | "update";
    setSelectedForm: React.Dispatch<React.SetStateAction<TodoItem>>;
};
const EditModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: gray;
    opacity: 0.9;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EditModalBox = styled.div`
    background: white;
    border-radius: 20px;
    min-height: 300px;
    padding: 20px;
    width: 100%;
`;

function EditModal({
    setTodos,
    setIsOpenEditModal,
    form,
    type = "add",
    setSelectedForm,
}: Props) {
    return (
        <EditModalWrapper>
            <EditModalBox>
                <TodoForm
                    setForm={setSelectedForm}
                    setTodos={setTodos}
                    form={form}
                    setIsOpenEditModal={setIsOpenEditModal}
                    type={type}
                />
            </EditModalBox>
        </EditModalWrapper>
    );
}

export default EditModal;
