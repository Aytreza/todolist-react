export default function todoReducer(state, action) {
    switch (action.type) {
        case 'SET_TODOS': {
            return {
                todos: action.todos
            }
        }
        case 'ADD_TODO': {
            return {
                todos: [...state.todos, action.todo]
            }
        }
        case 'DELETE_TODO': {
            return {
                todos: state.todos.filter(todo => todo._id !== action.id)
            }
        }
        case 'TOOGLE_EDIT': {
            return {
                todos: state.todos.map((t) => t._id === action.id ? {...t, isEdited: true} : t)
            }
        }
        case 'TOOGLE_DONE': {
            let todos = [...state.todos]
            todos = todos.map((t) => t._id === action.id ? {...t, isDone: action.isDone} : t)
            todos.sort((a, b) => Number(a.isDone) - Number(b.isDone))
            return {
                todos
            }
        }
        case 'EDIT_TODO': {
            return {
                todos: state.todos.map((t) => t._id === action.todo._id ? {...t, value: action.todo.value, isEdited: false} : t)
            }
        }
        default: throw new Error('Action inconnue')
    }
}