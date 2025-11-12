import React from 'react'
import AddingTodo from './AddingTodo'
import TodoLists from './TodoLists'
import Filters from './Filters'
import { UseTodoContext } from '../context/TodoContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


const TodoListPage = () => {
    const {isUserLogin,setIsUserLogin} = UseTodoContext();
  
  return (
    <>
    { isUserLogin ? 
                   <><AddingTodo/>
                    <Filters />
                    <TodoLists/></>
                  :
                    <Navigate to="/login" />
    }
    </>
  )
}

export default TodoListPage
