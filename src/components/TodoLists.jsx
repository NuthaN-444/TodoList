import React, { useEffect, useRef } from 'react'
import { UseTodoContext } from '../context/TodoContext'



const TodoLists = () => {
  const {todoList , setTodoList,completedSound,displayCurrentTodosFilter,pinedTodoList,setPinedTodoList,notCompletedTodoList,setNotCompletedTodoList,completedTodoList,setCompletedTodoList} = UseTodoContext();
  const divRef = useRef();



  // when Todo added to list automatically scrolls to last todo
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
        setPinedTodoList(todoList.filter((item) => item.pinTodo));
        setNotCompletedTodoList(todoList.filter((item) => !item.todoCompleted));
        setCompletedTodoList(todoList.filter((item) => item.todoCompleted));
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
    
    if(confirm.toLowerCase()==="y") {
        setTodoList([]);
        localStorage.setItem("AllTodoData",JSON.stringify([]));
    }
  }


  //pin And Unpin 
  const pinAndUnpin = (id) => {
    const updatedTodos = todoList.map((item) => 
      item.id === id ? {...item,pinTodo:!item.pinTodo} : item
    );
    setTodoList(updatedTodos);

  }


  // speaker
  const speakerTheTitle = (singleTitle) => {
      const speech = new SpeechSynthesisUtterance(singleTitle);
      speech.lang = "en-US";
      speech.rate = 1.5;
      window.speechSynthesis.speak(speech);
  }


// Single Deletion
  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter((item) => item.id !== id)
    setTodoList(updatedTodos)
  }








  return (
    <>
    <h1 className='text--my-todo'>My Todos</h1>
    <i className="fa-solid fa-trash DeleteAll-btn" title='Delete All' onClick={() => clearAllTodos()}></i>


    
    <div className='todo-lists-div'>
     {displayCurrentTodosFilter && displayCurrentTodosFilter.length > 0 ? (
        displayCurrentTodosFilter.map((item) => {
                return (
                <div className="todo-item"  key={item.id} >
                  <input title='Mark as done' type="checkbox" className='Check-Box' onChange={() => {
                    todoCompletedHandle(item.id)
                    soundPlay(item.completedSound)
                  }} checked={item.todoCompleted} />
                  <p className='todo-title' style={{ textDecoration: item.todoCompleted ? "line-through" : "none" }} >{item.todoTitle}</p>
                  <div className='buttons-in-todo'>
                  <span style={{cursor:'default'}}>{item.todoCompleted ? "✅" : "⏳"}</span>
                  <i title='pin' className="fa-solid fa-thumbtack Pin-btn btns-in-todo" onClick={() => pinAndUnpin(item.id)}></i>                                                        {/* Add Pin and Unpin feature */}
                  <i title='speech' className="fa-solid fa-volume-high Speaker-btn btns-in-todo" onClick={() => speakerTheTitle(item.todoTitle)}></i>
                  <i className="fa-solid fa-trash Delete-btn btns-in-todo" title='Delete' onClick={() => deleteTodo(item.id)}></i></div>
                </div>
              )})
      ) : (
        <img src="/empty.png" alt="No todos yet — add one above!" className='Empty-Todo'/>
      )}
                    <div ref={divRef}></div>
    </div>

  </>
  )
}

export default TodoLists
