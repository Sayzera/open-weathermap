import styled, { createGlobalStyle } from "styled-components";
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
  form: TodoItem;
  type?: "add" | "update";
};

function TodoForm({ setForm, setTodos, form, type = "add" }: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (type === "add") {
      setTodos((prev) => {
        return [form, ...prev];
      });
    } else if (type === "update") {
      //....
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
      {type === "update" && <Button onClick={() => {}}>Kapat</Button>}
    </FormWrapper>
  );
}

export default TodoForm;
