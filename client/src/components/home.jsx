import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [completed, setCompleted] = useState([])
    const [editMode, seteditMode] = useState(false)
    const [editBtn, setEditBtn] = useState(false)

    const fetchTasks = async () => {
        try {
            const response = await axios.get("api/todos")
            setName(response.data.userName)
            setTasks(response.data.todos)
        }
        catch (err) {
            alert(err.response?.data?.message)
            navigate('/')
        }
    };

    useEffect(() => {
        fetchTasks()
    }, [setTasks])

    function handleChange(e) {
        setTask(e.target.value)
    }

    const addTask = async () => {
        if (editMode === false) {
            if (task.trim() === '') {
                alert("Enter a Task to add")
                return;
            }
            else {
                const response = await axios.post('/api/todos', { task })
                fetchTasks()
            }
        } else {
            await axios.put(`/api/todos/${id}`, task)
        }
    }

    function toogleEditBtn() {
        setEditBtn((prev) => !prev)
    }

    const UpdateCompleted = async (id) => {
        const toEdit = tasks.find(t => t._id === id)
        const complete_status = !toEdit.isCompleted
        try {
            await axios.put(`/api/todos/${id}`, { isCompleted: complete_status })
            fetchTasks()
        }
        catch (err) {

        }
    }

    const editTask = async (id) => {
        const toEdit = tasks.find(t => t._id === id)
        setTask(toEdit.task)
    }

    return (
        <div className="container">
            <h1>Welcome {name}</h1>
            <div className="input_container">
                <input type="text" value={task} name="task" placeholder="Enter a Task..." onChange={handleChange} />
                <button className='btn' onClick={addTask}>{editMode ? "Update Task" : "Add Task"} </button>
                <button className='btn' onClick={toogleEditBtn}>{editBtn ? "Done" : "Edit"}</button>
            </div>

            {tasks.length === 0 ? <h3>No Task Added!</h3> : <h5>Click a Task to mark it as completed.</h5>}

            <ol>
                {tasks.map((t) => {
                    return (
                        <li key={t._id} onClick={() => UpdateCompleted(t._id)} value={t.task}>
                            {
                                t.isCompleted ? <div className="complete-signal">✅</div> : null
                            }
                            {t.task}
                            {
                                editBtn === true ? <div className="task-actions">
                                    <button onClick={() => editTask(t._id)}>✏️</button>
                                    <button onClick={() => deleteTask(t._id)}>🗑️</button>
                                </div> : null
                            }
                        </li>
                    )
                })}
            </ol>

        </div>
    )
}

export default Home