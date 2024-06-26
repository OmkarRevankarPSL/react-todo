import { FormEventHandler, SetStateAction, useState } from "react";
import { todoStore } from "../state/todoStore";
import { redirect, useRouter } from "next/navigation";
import debounce from "lodash.debounce"
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchTodos } from "../services/queries";

const SearchTodo = () => {
    // const [searchTitle, setSearchTitle] = useState<string>("");
    // const todoState = todoStore();
    // const data= useSearchTodos(searchTitle)
    // todoState.setTodos(data.data)
    // todoState.searchByTitle(searchTitle)
    // console.log(data.data)
    // const handleSearchSubmit =()=>{
    //     todoState.searchByTitle(value);
    //     todoState.setTodos(data.data)
    //     redirect('/view-tasks')
    //     todoState.searchByTitle
    // }

    // const updateQuery = (e: { target: { value: SetStateAction<string>; }; }) => setSearchTitle(e?.target?.value)
    // const debounceOnChange = debounce(updateQuery, 4000)

    return (
    <div className='flex items-center max-w-sm mx-auto'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='flex items-center max-w-sm mx-auto relative w-full'>
        <input
          type='text'
          id='simple-search'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search task title...'
          // onChange={debounceOnChange}
        />
      </div>
      
    </div>
  );
};

export default SearchTodo;
