import React, { useEffect, useRef } from 'react'
import { UseTodoContext } from '../context/TodoContext'



const TodoLists = () => {
  const {todoList , setTodoList,completedSound} = UseTodoContext();
  const divRef = useRef();




  // when Todo added to list automatically scrolls to last todo
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  },[todoList])



  //Updating todo completed
  const todoCompletedHandle = (id) => {

    completedSound.play();
    const updatedTodos = todoList.map((item) => 
      item.id === id ? {...item,todoCompleted:!item.todoCompleted} : item
    );
    setTodoList(updatedTodos);

  }


  // Clear All Todos
  const clearAllTodos = () => {
    let confirm = prompt("Want To Delete All ? Type Y ");
    
    if(confirm.toLowerCase()==="y")  setTodoList([]);
        localStorage.setItem("AllTodoData",JSON.stringify([{}]));

  }


  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter((item) => item.id !== id)
    setTodoList(updatedTodos)
  }



  return (
    <>
    <h1 className='text--my-todo'>My Todos</h1>
    <i className="fa-solid fa-trash DeleteAll-btn" title='Delete All' onClick={() => clearAllTodos()}></i>
    <div className='todo-lists-div'>

    <>
     {todoList && todoList.length > 0 ? (
        todoList.map((item) => (
          <div key={item.id} className="todo-item">
            <input title='Mark as done' type="checkbox" className='Check-Box' onChange={() => {
              todoCompletedHandle(item.id)
              soundPlay(item.completedSound)
            }} checked={item.todoCompleted} />
            <p className='todo-title' style={{ textDecoration: item.todoCompleted ? "line-through" : "none" }} >{item.todoTitle}</p>
            <span>{item.todoCompleted ? "✅ Done" : "⏳ Pending"}</span>
            <i className="fa-solid fa-trash Delete-btn" title='Delete All' onClick={() => deleteTodo(item.id)}></i>
          </div>
        ))
      ) : (
        <img src="/empty.png" alt="No todos yet — add one above!" className='Empty-Todo'/>
      )}</>
                    <div ref={divRef}></div>
    </div>

  </>
  )
}

export default TodoLists
