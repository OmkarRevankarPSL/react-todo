import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../state/todoStore";
import { createTodo, updateTodo } from "./api";
import { deleteTodo } from "@/apis";

export function useCreateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TodoType) => createTodo(data),
        onError: () => {
            console.log("Something went wrong")
        },
        onMutate: () => {
            console.log("Mutate")
        },
        onSuccess: () => {
            console.log("Success");
        },
        onSettled: async (_, error) => {
            console.log("Settled");
            if (error) {
                console.log("Error",error)
            }
            else {
                await queryClient.invalidateQueries({ queryKey: ['todos'] })
            }
        }
    })
}

export function useUpdateTodo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TodoType) => updateTodo(data),
        onSuccess:(_,data)=>{console.log("Success: ", data.isDone)},
        onSettled: async (_, error, variables) => {
            if (error) {
                console.log(error)
            }
            else {
                await queryClient.invalidateQueries({ queryKey: ['todos'] })
                await queryClient.invalidateQueries({ queryKey: ['todo', { id: variables.id }] })
            }
        }
    })
}

export function useDeleteTodo (){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTodo(id),
        onSuccess:()=>{
            console.log("Success")
        },

        onSettled: async(_,error)=>{
            if(error){
                console.log("error")
            }
            else{
                await queryClient.invalidateQueries({queryKey: ['todos']})
            }
        }
    })
}
