import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [completed , setCompleted]= useState([])
    const [editMode, seteditMode] = useState(false)
    const [editBtn, setEditBtn] = useState(false)

    const fetchTask = async () => {
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
        fetchTask()
    }, [setTasks])

    function handleChange(e) {
        setTask(e.target.value)
    }

    const addTask = async (e) => {
        if (editMode === false) {
            if (task.trim() === '') {
                alert("Enter a Task to add")
                return;
            }
            else {
                const response = await axios.post('/api/todos', { task})
                fetchTask()
            }
        }
    }

    function toogleEditBtn() {
        setEditBtn((prev) => !prev)
    }

    function UpdateCompleted() {
        try {
            
        }
        catch (err) {
            
        }
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
                        <li key={t._id}>
                            {
                                t.isCompleted ? <div className="complete-signal">✅</div> : null
                            }
                            {t.task}
                            {
                                editBtn === true ? <div className="task-actions">
                                    <button onClick={() => editTask(index)}>✏️</button>
                                    <button onClick={() => deleteTask(index)}>🗑️</button>
                                </div> : null
                            }
                            {
                                t.isCompleted ? null : <button onClick={UpdateCompleted}>Completed</button>
                            }
                        </li>
                    )
                })}
            </ol>

        </div>
    )
}

export default Home