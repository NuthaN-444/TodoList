import React, { useEffect, useRef } from 'react'
import { UseTodoContext } from '../context/TodoContext'



const TodoLists = () => {
  const {todoList , setTodoList,completedSound} = UseTodoContext();
  const divRef = useRef();


  // when Todo added to list automatically scrolls to last todo
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  },[todoList])


  const todoCompletedHandle = (id) => {
  
    completedSound.play();
    const updatedTodos = todoList.map((item) => 
      item.id === id ? {...item,todoCompleted:!item.todoCompleted} : item
    );
    setTodoList(updatedTodos);
  }


  return (
    <>
    <h1 className='text--my-todo'>My Todos</h1>
    <div className='todo-lists-div'>

    <>
     {todoList && todoList.length > 0 ? (
        todoList.map((item) => (
          <div key={item.id} className="todo-item">
            <input type="checkbox" onChange={() => {todoCompletedHandle(item.id)}} checked={item.todoCompleted} />
            <p className='todo-title' style={{ textDecoration: item.todoCompleted ? "line-through" : "none" }}>{item.todoTitle}</p>
            <span>{item.todoCompleted ? "✅ Done" : "⏳ Pending"}</span>
          </div>
        ))
      ) : (
        <p>No todos yet — add one above!</p>
      )}</>
                    <div ref={divRef}></div>
    </div>

  </>
  )
}

export default TodoLists
