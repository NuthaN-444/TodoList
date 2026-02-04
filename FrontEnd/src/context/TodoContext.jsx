import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const completedSound = new Audio("/bell-transition-141421.mp3");

  // USER EMAIL
  const [UserEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );


  // LOGIN STATUS
  const [isUserLogin, setIsUserLogin] = useState(() => {
    const status = localStorage.getItem("isUserLogin");
    try {
      return status ? JSON.parse(status) : false;
    } catch {
      return false;
    }
  });

  // Save login info
  useEffect(() => {
    localStorage.setItem("isUserLogin", JSON.stringify(isUserLogin));
    localStorage.setItem("userEmail", UserEmail);
  }, [isUserLogin, UserEmail]);

  // MAIN TODO LIST
  const [todoList, setTodoList] = useState([]);


// Fetch todos when logging in
const fetchTodos = async () => {
  if (!UserEmail) return;

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/todos`, {
      params: { email: UserEmail }
    });

    setTodoList(response.data);
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
};

useEffect(() => {
  if (!UserEmail) return;
  fetchTodos();
}, [UserEmail]);

  // FILTERED DISPLAY LIST
  const [displayCurrentTodosFilter, setDisplayCurrentTodosFilter] = useState([]);

  useEffect(() => {
    setDisplayCurrentTodosFilter(todoList);
  }, [todoList]);

  const [pinedTodoList, setPinedTodoList] = useState([]);
  const [notCompletedTodoList, setNotCompletedTodoList] = useState([]);
  const [completedTodoList, setCompletedTodoList] = useState([]);
  const [whichFilter, setWhichFilter] = useState("all");

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        completedSound,
        fetchTodos,
        // filters
        displayCurrentTodosFilter,
        setDisplayCurrentTodosFilter,
        pinedTodoList,
        setPinedTodoList,
        notCompletedTodoList,
        setNotCompletedTodoList,
        completedTodoList,
        setCompletedTodoList,
        whichFilter,
        setWhichFilter,

        // user
        isUserLogin,
        setIsUserLogin,
        UserEmail,
        setUserEmail,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const UseTodoContext = () => useContext(TodoContext);
