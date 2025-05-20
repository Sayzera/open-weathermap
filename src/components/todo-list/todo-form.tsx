import styled from "styled-components";
import { TodoItem } from ".";

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 15px;
    border-radius: 10px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border-radius: 10px;
`;

const Button = styled.button`
    padding: 10px;
    background: white;
    border-radius: 10px;
`;

type Props = {
    setForm: React.Dispatch<React.SetStateAction<TodoItem>>;
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
    setIsOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    form: TodoItem;
    type?: "add" | "update";
};

function TodoForm({
    setForm,
    setTodos,
    setIsOpenEditModal,
    form,
    type = "add",
}: Props) {
    console.log("BBBBBBBBBBBBBBBBBBB: " + form.name + form.description);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (type === "add") {
            console.log("zzzzzzzzzzzzz: " + form.name + form.description);

            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else if (type === "update") {
            console.log(
                "xxxxxxxxxxxxxxxxxxxxx: " + form.name + form.description
            );
            setForm({ name: name, description: value });
        }
    };

    const isEmpty = (value: string): boolean => {
        return value.length === 0;
    };

    const handleSave = () => {
        console.log("000000000000000000000");
        if (type === "add") {
            console.log("1111111111111111111111");
            if (!isEmpty(form.name) && !isEmpty(form.description))
                setTodos((prev) => {
                    return [form, ...prev];
                });
        } else if (type === "update") {
            console.log("22222222222222222222222");

            if (!isEmpty(form.name) && !isEmpty(form.description)) {
                console.log("3333333333333333333333");
                setForm(form);
                console.log(
                    "CCCCCCCCCCCCCCCCCCCCCCCCC: " + form.name + form.description
                );
                setTodos((prev) => {
                    return [...prev];
                });
            }
        }
    };

    return (
        <FormWrapper>
            <Input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />
            <Textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
            />
            <Button onClick={handleSave}>
                {type === "add" ? "Kaydet" : "Düzenle"}
            </Button>
            {type === "update" && (
                <Button onClick={() => setIsOpenEditModal(false)}>Kapat</Button>
            )}
        </FormWrapper>
    );
}

export default TodoForm;
