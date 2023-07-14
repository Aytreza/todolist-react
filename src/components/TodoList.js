import styles from './TodoList.module.scss'
import EditTodo from "./EditTodo";

export default function TodoList({todos, deleteTodo, editTodo, toggleEdit, toogleDone}) {

    async function handleDeleteClick(id) {
        await fetch(`https://restapi.fr/api/__todos/${id}`, { method: 'DELETE' })
        deleteTodo(id)
    }

    function handleEditClick(id) {
        toggleEdit(id)
    }

    function handleCheckboxClicked(e, id) {
        toogleDone(id, e.target.checked)
    }

    return (
        <div className={styles.container}>
            { todos.map(todo => {
                return !todo.isEdited? (
                    <div key={todo._id} className={styles.row}>
                        <div className={styles.rowLeft}>
                            <input onChange={(e) => handleCheckboxClicked(e, todo._id)} type="checkbox"/>
                            <span className={todo.isDone ? styles.isDone : ''}>{todo.value}</span>
                        </div>
                        <div>
                            {!todo.isDone && <button onClick={() => handleEditClick(todo._id)} className="btn">Éditer</button> }
                            <button onClick={() => handleDeleteClick(todo._id)} className="btn">Supprimer</button>
                        </div>
                    </div>
                ) : (
                    <EditTodo key={todo._id} todo={todo} editTodo={editTodo}></EditTodo>
                )
            }) }
        </div>
    )
}