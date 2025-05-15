import React from 'react'
import styled from "styled-components";
import TodoForm from './todo-form';
type Props = {}


const EditModalWrapper = styled.div`
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background:gray;
    opacity:0.9;
    padding:20px;
      display:flex;
    align-items:center;
    justify-content:center;
`;

const EditModalBox = styled.div`
    background:white;
    border-radius:20px;
    min-height:300px;
    padding:20px;
    width:100%;
`;





function EditModal({}: Props) {
  return (
    <EditModalWrapper>
        <EditModalBox>
            <TodoForm type='update' />
            
        </EditModalBox>
    </EditModalWrapper>
  )
}

export default EditModal