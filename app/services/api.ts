import axios from "axios";
import { TodoType } from "../state/todoStore";

const BASE_URL = "http://localhost:3002"
const axiosInstance = axios.create({baseURL:BASE_URL})


export function sleep(ms = 2000): Promise<void> {
    console.log('Kindly remember to remove `sleep`');
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

export const  getTodoIds = async ()=>{
    return ((await axiosInstance.get<TodoType[]>('tasks')).data.map((todo)=> todo.id));
}

export const  getTodoByIds = async (id: string)=>{
    return (await axiosInstance.get<TodoType[]>(`tasks/${id}`)).data;
}

export const  getTodoById = async (id: string)=>{
    return (await axiosInstance.get<TodoType>(`tasks/${id}`)).data;
}

export const createTodo = async (data: TodoType)=>{
    console.log("data: ",data)
    await sleep();
    await axiosInstance.post('tasks', data)
}

export const updateTodo =async (data:TodoType)=>{
    console.log("Editing the Task!!!")
    try{
    await axiosInstance.put(`tasks/${data.id}`, data)}
    catch(error){
        console.log("Something went wrong!!: ", error)
    }
}


export const deleteTodo = async (id:string)=>{
    console.log("Deleting id: ", id)
    await axiosInstance.delete(`tasks/${id}`)
}

export const getPages = async(page=1)=>{
    (await axiosInstance.get<TodoType[]>(`tasks?_page=${page}&_limit=3`)).data;
}

export const getBySearch = async (searchTitle: string)=>{
    return (await axiosInstance.get<TodoType[]>(`tasks?title=${searchTitle}`)).data;
}