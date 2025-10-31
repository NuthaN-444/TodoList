import {useState , createContext , useContext, useEffect } from 'react';



const TodoContext = createContext();



export const TodoContextProvider = ({children}) => {

    const completedSound = new Audio("/correct-356013.mp3")

    // Getting Todo Datas From localStorage
    const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("AllTodoData");
        try {
            return saved
              ? JSON.parse(saved)
              : [{ id: 1, todoTitle: "Learn React", todoCompleted: false }];
        }catch (error) {
            console.error("Invalid JSON in localStorage:", error);
            return [{ id: 1, todoTitle: "Learn React", todoCompleted: false }];
        }     
});
        // Storing the todolist when the todo list are added
useEffect(() => {
    if(todoList.length === 0) return;
     localStorage.setItem("AllTodoData",JSON.stringify(todoList));
},[todoList])


    
    return (
         <TodoContext.Provider value={{todoList,setTodoList,completedSound}} >
            {children}
        </TodoContext.Provider>
    )
}

export const UseTodoContext = () => useContext(TodoContext);
