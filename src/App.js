import styles from './App.module.scss'
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import {useEffect, useReducer} from "react";
import todoReducer from "./reducers/todoReducer";

function App() {

    const [state, dispatch] = useReducer(todoReducer, {
        todos: [],
    })

    function setTodos(todos) {
        // setTodos([...todos, todo])
        // console.log(todos)
        dispatch({
            type: 'SET_TODOS',
            todos
        })
    }

    function addTodo(todo) {
        // setTodos([...todos, todo])
        dispatch({
            type: 'ADD_TODO',
            todo
        })
    }

    function deleteTodo(id) {
        dispatch({
            type: 'DELETE_TODO',
            id
        })
    }

    function editTodo(todo) {
        dispatch({
            type: 'EDIT_TODO',
            todo
        })
    }

    function toggleEdit(id) {
        dispatch({
            type: 'TOOGLE_EDIT',
            id
        })
    }
    
    function toogleDone(id, isDone) {
        dispatch({
            type: 'TOOGLE_DONE',
            id,
            isDone
        })
    }

    useEffect(() => {
        console.log('useEffect')
        async function fetchData() {
            const response = await fetch('https://restapi.fr/api/__todos')
            const todos = await response.json()
            if (Array.isArray(todos)) {
                setTodos(todos)
            } else {
                // restapi renvoie un objet quand un seul élément
                setTodos([todos])
            }

        }
        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <h1>Todolist</h1>
            <AddTodo addTodo={addTodo}></AddTodo>
            <TodoList todos={state.todos} deleteTodo={deleteTodo} toggleEdit={toggleEdit} editTodo={editTodo} toogleDone={toogleDone}></TodoList>
        </div>
    );
}

export default App;
