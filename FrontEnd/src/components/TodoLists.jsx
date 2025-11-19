import React, { useEffect, useRef } from "react";
import { UseTodoContext } from "../context/TodoContext";
import axios from "axios";

const TodoLists = () => {
  const {
    todoList,
    setTodoList,
    completedSound,
    displayCurrentTodosFilter,
    pinedTodoList,
    setPinedTodoList,
    notCompletedTodoList,
    setNotCompletedTodoList,
    completedTodoList,
    setCompletedTodoList,
    UserEmail
  } = UseTodoContext();

  const divRef = useRef();

  // Scroll + Update Filter Lists
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });

    setPinedTodoList(todoList.filter((item) => item.pinTodo));
    setNotCompletedTodoList(todoList.filter((item) => !item.todoCompleted));
    setCompletedTodoList(todoList.filter((item) => item.todoCompleted));
  }, [todoList]);

  // ------------------------------
  // MARK TODO COMPLETED / UNCOMPLETED
  // ------------------------------
  const todoCompletedHandle = async (_id) => {
    completedSound.play();

    const updatedTodos = todoList.map((item) =>
      item._id === _id
        ? { ...item, todoCompleted: !item.todoCompleted }
        : item
    );

    setTodoList(updatedTodos);

    
    // Update DB
    const todo = updatedTodos.find((t) => t._id === _id);
    await axios.put(`http://localhost:5000/api/todos/${_id}`, {
      todoCompleted: todo.todoCompleted,
    });
  };

  // ------------------------------
  // CLEAR ALL TODOS
  // ------------------------------
  const clearAllTodos = async () => {
    let confirm = prompt("Want To Delete All ? Type Y ");

    if (confirm?.toLowerCase() === "y") {
      setTodoList([]);
      // Delete from DB
      await axios.delete("http://localhost:5000/api/todos",{params:{email:UserEmail}});
    }
  };

  // ------------------------------
  // PIN / UNPIN TODO
  // ------------------------------
  const pinAndUnpin = async (_id) => {
    const updatedTodos = todoList.map((item) =>
      item._id === _id ? { ...item, pinTodo: !item.pinTodo } : item
    );

    setTodoList(updatedTodos);

    const todo = updatedTodos.find((t) => t._id === _id);
    await axios.put(`http://localhost:5000/api/todos/${_id}`, {
      pinTodo: todo.pinTodo,
    });
  };

  // ------------------------------
  // SPEAKER
  // ------------------------------
  const speakerTheTitle = (title) => {
    const speech = new SpeechSynthesisUtterance(title);
    speech.lang = "en-US";
    speech.rate = 1.5;
    window.speechSynthesis.speak(speech);
  };

  // ------------------------------
  // DELETE SINGLE TODO
  // ------------------------------
  const deleteTodo = async (_id) => {
    const updated = todoList.filter((item) => item._id !== _id);
    setTodoList(updated);

    await axios.delete(`http://localhost:5000/api/todos/${_id}`);
  };

  return (
    <>
      <h1 className="text--my-todo">My Todos</h1>

      <i
        className="fa-solid fa-trash DeleteAll-btn"
        title="Delete All"
        onClick={clearAllTodos}
      ></i>

      <div className="todo-lists-div">
        {displayCurrentTodosFilter && displayCurrentTodosFilter.length > 0 ? (
          displayCurrentTodosFilter.map((item) => (
            <div className="todo-item" key={item._id}>
              <input
                title="Mark as done"
                type="checkbox"
                className="Check-Box"
                onChange={() => todoCompletedHandle(item._id)}
                checked={item.todoCompleted}
              />

              <p
                className="todo-title"
                style={{
                  textDecoration: item.todoCompleted ? "line-through" : "none",
                }}
              >
                {item.todoTitle}
              </p>

              <div className="buttons-in-todo">
                <span style={{ cursor: "default" }}>
                  {item.todoCompleted ? "✅" : "⏳"}
                </span>

                {/* PIN */}
                <i
                  title="pin"
                  className="fa-solid fa-thumbtack Pin-btn btns-in-todo"
                  onClick={() => pinAndUnpin(item._id)}
                ></i>

                {/* SPEAKER */}
                <i
                  title="speech"
                  className="fa-solid fa-volume-high Speaker-btn btns-in-todo"
                  onClick={() => speakerTheTitle(item.todoTitle)}
                ></i>

                {/* DELETE */}
                <i
                  className="fa-solid fa-trash Delete-btn btns-in-todo"
                  title="Delete"
                  onClick={() => deleteTodo(item._id)}
                ></i>
              </div>
            </div>
          ))
        ) : (
          <img
            src="/empty.png"
            alt="No todos yet — add one above!"
            className="Empty-Todo"
          />
        )}

        <div ref={divRef}></div>
      </div>
    </>
  );
};

export default TodoLists;
