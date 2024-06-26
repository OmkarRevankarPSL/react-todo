'use client';
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteTodo } from "../services/mutations";
import { todoStore } from "../state/todoStore";

export default function RemoveBtn({id}:{id:string}){
    const deleteTodo = useDeleteTodo();
    const todoState = todoStore();
const removeTask =async()=>{
    const confirmed = confirm('Are you sure?');

    if(confirmed){
        deleteTodo.mutate(id);
        todoState.deleteTodo(id);
    }
}
    return <button className="text-red-400" onClick={removeTask}>
        <DeleteOutlined key='delete'  />
    </button>
}