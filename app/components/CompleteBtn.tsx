'use client';
import { CheckSquareOutlined, } from "@ant-design/icons";
import { useUpdateTodo } from "../services/mutations";
import { TodoType, todoStore } from "../state/todoStore";
import { useState } from "react";

export default function CompleteBtn({data}:{data:TodoType}){
    const updateTodo = useUpdateTodo();
    const todoState = todoStore();
    const [exisitngStatus, setExistingStatus] = useState<TodoType>(data)
const removeTask =async()=>{
    const confirmed = confirm('Do you want to change the status?');
    if(confirmed){
        const updateStatus = {...exisitngStatus, isDone:!exisitngStatus.isDone}
        updateTodo.mutate(updateStatus);
        todoState.editTodo(data.id, updateStatus);
    }
}
    return <button className="text-red-400" onClick={removeTask}>
        <CheckSquareOutlined key='delete' className={`${data.isDone?"text-green-600":"text-blue-600"} `} />
    </button>
}