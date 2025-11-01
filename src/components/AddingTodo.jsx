import React, { useContext, useState ,useEffect } from 'react'
import {UseTodoContext} from '../context/TodoContext'

const AddingTodo = () => {
    const {todoList,setTodoList} = UseTodoContext();
    const [todoTitle,setTodoTitle] = useState("")


    const addTodoTitle = (todoTitle) => {
        if(todoTitle=="") return
        
        const newTodo = {
            id: Date.now(),
            todoTitle : todoTitle,
            todoCompleted : false,
            pinTodo:false
        };
        setTodoList((prev) => ([...prev,newTodo]));

        setTodoTitle("")
    }


    const deleteTodoTitle  = () => {
        setTodoTitle("")
    }


  useEffect(() => {
    console.log("Updated todo list:", todoList);
  }, [todoList]);

  return (
    <div className='Adding-Todo-List-Div'>
    <input type="text" placeholder='Write Todo' value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}/>
    <i className="fa-solid fa-up-long" title="Add To List" onClick={() => addTodoTitle(todoTitle)}></i>
    <i className="fa-solid fa-eraser" title='Delete' onClick={() => deleteTodoTitle()}></i>
    </div>
  )
}

export default AddingTodo
