import React, { use, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TodoContextProvider, UseTodoContext } from './context/TodoContext.jsx'
import TodoListPage from './components/TodoListPage.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';



const App = () => {
    const [TodoList,setTodoList] = useState([]);


  return (
    <div>


      <TodoContextProvider>
        <BrowserRouter>

              <Routes>
              <Route path="/" element={ <TodoListPage/> } />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              </Routes>

        </BrowserRouter>
      </TodoContextProvider>

      
    </div>
  )
}

export default App
