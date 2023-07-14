import styles from './AddTodo.module.scss'
import {useState} from "react";

export default function AddTodo({addTodo}) {

    const [value, setValue] = useState('')

    async function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const newTodo = {
                value,
                isDone: false,
                isEdited: false,
            }
            const response = await fetch('https://restapi.fr/api/__todos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            })
            addTodo(await response.json())
            setValue('')
        }
    }

    function handleChange(e) {
        setValue(e.target.value)
    }

    return (
        <p className={styles.inputWrapper}>
            <i className={`fa-solid fa-plus ${styles.icon}`}></i>
            <input onKeyDown={handleKeyDown} onChange={handleChange} className={styles.input} type="text" placeholder='Ajouter une todo' value={value}/>
        </p>
    )
}