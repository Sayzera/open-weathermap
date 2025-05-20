import styled from "styled-components";
import { TodoItem } from ".";
import { useEffect, useRef, useState } from "react";

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

    const formRef = useRef<TodoItem>(null);

    useEffect(() => {
        formRef.current = form;
    
    }, [])


    

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // if (type === "add") {
        //     console.log("zzzzzzzzzzzzz: " + form.name + form.description);

        // } else if (type === "update") {
     
        //     setForm({ name: name, description: value });
        // }
        
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isEmpty = (value: string): boolean => {
        return value.length === 0;
    };



    const handleSave = () => {
        if (type === "add") {
            if (!isEmpty(form.name) && !isEmpty(form.description))
                setTodos((prev) => {
                    return [form, ...prev];
                });
        } else if (type === "update") {
            if (!isEmpty(form.name) && !isEmpty(form.description)) {
                const {name, description} =   formRef.current!;  

                setTodos((prev:TodoItem[]) => {
                    return prev.map((item) => {
                        if(item.name === name && item.description === description) {
                            return form
                        } else {
                            return item
                        }
                    })
                
                })
          
               
                // setTodos((prev) => {
                //     return [...prev];
                // });
            }
        }
    };

    return (
        <FormWrapper>
            <Input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
            />
            <Textarea
                name="description"
                value={form.description}
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
