import React, { useContext, useState ,useEffect } from 'react'
import {UseTodoContext} from '../context/TodoContext'
import axios from "axios"

const AddingTodo = () => {
    const {todoList,setTodoList,isUserLogin,setIsUserLogin,UserEmail,setUserEmail,fetchTodos} = UseTodoContext();
    const [todoTitle,setTodoTitle] = useState("")
        

    const addTodoTitle = async(todoTitle) => {


        if(todoTitle=="") return
        

        try{
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/todos`,{todoTitle,todoCompleted:false,pinTodo:false,email:UserEmail});
          fetchTodos();
          console.log("Server response:",response.data);
        } catch (error) {
          console.log("Axios login error : ",error);
          alert("Something went wrong!");
        }


        setTodoTitle("");
    }


    const deleteTodoTitle  = () => {
        setTodoTitle("")
    }




  useEffect(() => {
    console.log("Updated todo list:", todoList);
  }, [todoList]);

  return (
    <>
      <button className='Log-out' onClick={() => {
        setIsUserLogin(false)
        setUserEmail(null);
        }}>Log out</button>
      <div className='Adding-Todo-List-Div'>
      <input type="text" placeholder='Write Todo' value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}/>
      <i className="fa-solid fa-up-long" title="Add To List" onClick={() => addTodoTitle(todoTitle)}></i>
      <i className="fa-solid fa-eraser" title='Erase' onClick={() => deleteTodoTitle()}></i>
      </div>
    </>
  )
}

export default AddingTodo
