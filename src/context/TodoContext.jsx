import {useState , createContext , useContext, useEffect } from 'react';



const TodoContext = createContext();



export const TodoContextProvider = ({children}) => {

    const completedSound = new Audio("/bell-transition-141421.mp3")


    // Getting Todo Datas From localStorage
    const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("AllTodoData");
        try {
            return saved
              ? JSON.parse(saved)
              : [{id:1213123,todoTitle :"demo",todoCompleted:false,pinTodo:false}];
        }catch (error) {
            console.error("Invalid JSON in localStorage:", error);
            return [{id:1213123,todoTitle :"demo",todoCompleted:false,pinTodo:false}];
        }     
    });
    
    // Storing the todolist when the todo list are added
    useEffect(() => {
        if(todoList.length === 0) return;
         localStorage.setItem("AllTodoData",JSON.stringify(todoList));
         
    },[todoList])

    useEffect(() => {
        setDisplayCurrentTodosFilter(todoList)
    },[todoList])


    const [displayCurrentTodosFilter,setDisplayCurrentTodosFilter] = useState(todoList);
    
    const [pinedTodoList,setPinedTodoList] = useState([]);
    const [notCompletedTodoList,setNotCompletedTodoList] = useState([]);
    const [completedTodoList,setCompletedTodoList] = useState([]);

    const [whichFilter,setWhichFilter] = useState("all");

    return (
         <TodoContext.Provider value={{todoList,setTodoList,completedSound,displayCurrentTodosFilter,setDisplayCurrentTodosFilter,pinedTodoList,setPinedTodoList,notCompletedTodoList,setNotCompletedTodoList,completedTodoList,setCompletedTodoList,whichFilter,setWhichFilter}} >
            {children}
        </TodoContext.Provider>
    )
}

export const UseTodoContext = () => useContext(TodoContext);
