import { getBySearch } from "@/apis";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TodoType = {
    id: string,
    title: string,
    description: string,
    isDone: boolean,
    startDate: string | string[],
    endDate: string | string[]
}

type States = {
    todos: Array<TodoType> | []
}

type Actions = {
    todos: TodoType[];
    setTodos: (todos: TodoType[] | undefined) => void;
    addTodo: (todo: TodoType) => void
    completedTodo: (id: string, isDone: boolean) => void;
    deleteTodo: (id: string) => void
    editTodo: (id: string, todo: TodoType) => void
    searchByTitle: (title: string) => void;
}

export const todoStore = create<States & Actions>()(
    devtools(
        persist((set) => ({
            todos: [],
            setTodos: (todos) => set({ todos }),
            addTodo: (todo: TodoType) => set((state) => ({ todos: [todo, ...state.todos] })),
            completedTodo: (id: string, isDone: boolean) => set((state) => ({
                todos: state.todos.map((item) => {
                    if (item.id === id) {
                        item.isDone = isDone;
                    }
                    return item;
                })
            })),
            deleteTodo: (id: string) => set((state) => ({
                todos: state.todos.filter((item) => item.id !== id)
            })),
            editTodo: (id: string, todo: TodoType) => set((state) => ({
                todos: state.todos.map(item => item.id === id ? { ...item, ...todo } : item),

            })),
            searchByTitle: async (title: string) => {
                try {
                    const response = await getBySearch(title);

                    set({ todos: response })
                }
                catch (error) {
                    console.error("Error while fetching Todo: ", error)
                }

            }
        }),
            { name: "todoStore" })
    ),
)