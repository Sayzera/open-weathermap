import styled from "styled-components";
import { TodoItem, TodoItem as TodoItemProp } from ".";
import EditIconButton from "./EditIconButton";
import XButton from "./XButton";

const TodoItemContainer = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    border-bottom: 1px dashed gray;
    padding-bottom: 10px;
    margin-bottom: 5px;
`;

const TodoItemStyle = styled.div`
    font-medium: bold;
`;

type Props = {
    todoItem: TodoItemProp;
    indexNumber: number;
    setIsOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    deleteTodoItem: (itemToDelete: TodoItem) => void;
    setSelectedForm: React.Dispatch<React.SetStateAction<TodoItem>>;
};

function TodoListItem({
    todoItem,
    indexNumber,
    setIsOpenEditModal,
    deleteTodoItem,
    setSelectedForm,
}: Props) {
    const onClick = () => {
        setSelectedForm(todoItem);
        setIsOpenEditModal(true);
    };
    return (
        <TodoItemContainer>
            <TodoItemStyle>{indexNumber}</TodoItemStyle>
            <TodoItemStyle>Name:{todoItem.name}</TodoItemStyle>
            <TodoItemStyle>Description:{todoItem.description}</TodoItemStyle>
            <div style={{ marginLeft: "auto" }}>
                <EditIconButton onClick={onClick}></EditIconButton>
                <XButton onClick={() => deleteTodoItem(todoItem)}></XButton>
            </div>
        </TodoItemContainer>
    );
}

export default TodoListItem;
