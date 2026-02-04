import React, { use, useEffect, useState } from 'react'
import { UseTodoContext } from '../context/TodoContext';



const Filters = () => {

    const {todoList,displayCurrentTodosFilter,setDisplayCurrentTodosFilter,pinedTodoList,setPinedTodoList,notCompletedTodoList,setNotCompletedTodoList,completedTodoList,setCompletedTodoList,whichFilter,setWhichFilter} = UseTodoContext();




  const updateTheTodo = (filter,name) => {

        setPinedTodoList(todoList.filter((item) => item.pinTodo));
    

        setNotCompletedTodoList(todoList.filter((item) => !item.todoCompleted));


        setCompletedTodoList(todoList.filter((item) => item.todoCompleted));

      setWhichFilter(name);
     setDisplayCurrentTodosFilter(filter)
  }



  return (
    <>
      <div className='Filter-bar'>
            <div className='Filter-options' style={{backgroundColor : whichFilter==="all" ? "#ffffffe0":"#fff9f938" , color:whichFilter==="all"?"black":"white"}} onClick={() => updateTheTodo(todoList,"all")}>All</div>
            <div className='Filter-options' style={{backgroundColor : whichFilter==="pined" ? "#ffffffe0":"#fff9f938" , color:whichFilter==="pined"?"black":"white"}} onClick={() => updateTheTodo(pinedTodoList,"pined")}>Pined</div>
            <div className='Filter-options' style={{backgroundColor : whichFilter==="notCompleted" ? "#ffffffe0":"#fff9f938" , color:whichFilter==="notCompleted"?"black":"white"}} onClick={() => updateTheTodo(notCompletedTodoList,"notCompleted")}>Not Completed</div>
            <div className='Filter-options' style={{backgroundColor : whichFilter==="completed" ? "#ffffffe0":"#fff9f938" , color:whichFilter==="completed"?"black":"white"}} onClick={() => updateTheTodo(completedTodoList,"completed")}>Completed</div>
      </div>
    </>
  )
}

export default Filters
