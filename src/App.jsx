import React, { use, useEffect, useState } from 'react'
import { TodoContextProvider, UseTodoContext } from './context/TodoContext.jsx'
import AddingTodo from './components/AddingTodo.jsx';
import TodoLists from './components/TodoLists.jsx';

const App = () => {
    const [TodoList,setTodoList] = useState([]);


  return (
    <div>

          <TodoContextProvider>

                <AddingTodo/>
                <TodoLists/>
              
          </TodoContextProvider>
    </div>
  )
}

export default App
