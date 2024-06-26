import { FormEventHandler, SetStateAction, useState } from "react";
import { todoStore } from "../state/todoStore";
import { redirect, useRouter } from "next/navigation";
import debounce from "lodash.debounce"
import { AiOutlineSearch } from "react-icons/ai";

const SearchTodo = () => {
    const router = useRouter();
    const [searchTitle, setSearchTitle] = useState<string>("");
    const todoState = todoStore();
    const handleSearchSubmit: FormEventHandler<HTMLFormElement> =(e)=>{
        e.preventDefault();
        todoState.searchByTitle(searchTitle);
        redirect('/view-tasks')
    }

    const updateQuery = (e: { target: { value: SetStateAction<string>; }; }) => setSearchTitle(e?.target?.value)

    const debounceOnChange = debounce(updateQuery, 200)
    return (
    <form onSubmit={handleSearchSubmit} className='flex items-center max-w-sm mx-auto'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='relative w-full'>
        <input
          type='text'
          id='simple-search'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search task title...'
          onChange={debounceOnChange}
        />
      </div>
      
    </form>
  );
};

export default SearchTodo;
