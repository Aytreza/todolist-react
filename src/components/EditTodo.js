import {useState} from "react";
import styles from './EditTodo.module.scss'

export default function EditTodo({todo, editTodo}) {

    const [editedTodo, setEditedTodoValue] = useState(todo)

    function handleChange(e) {
        const value = e.target.value
        setEditedTodoValue({...todo, value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch(`https://restapi.fr/api/__todos/${todo._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedTodo)
        })
        console.log(await response.json())
        editTodo(editedTodo)
    }

    return (
        <form className={styles.row} onSubmit={handleSubmit}>
            <input className={styles.input} onChange={handleChange} value={editedTodo.value} type="text"/>
            <button className="btn" type="submit">Valider</button>
        </form>


    )
}