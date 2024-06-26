import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import {  getBySearch, getPages, getTodoById, getTodoByIds, getTodoIds } from "./api";

export function useTodoIds() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodoIds,
    })
}

export function useTodos(ids:  string[] | undefined) {
    return useQueries({
        queries: (ids ?? []).map((id: string) => {
            return {
                queryKey: ['todo', { id }],
                queryFn: () => getTodoByIds(id)
            }
        })
    });
}

export function useTodoById(id: string) {
    return useQuery({
        queryKey: ['todo', {id}],
        queryFn: ()=> getTodoById(id),
    })
}

export function useTodosPagination(page: number) {
    return useQuery({
        queryKey: ['todos', { page }],
        queryFn: () => getPages(page),
        placeholderData: keepPreviousData,
    })
}

export function useSearchTodos(searchTitle: string){
    return useQuery({
        queryKey: ['todos', {searchTitle}],
        queryFn: () => getBySearch(searchTitle),
        
    })
}
