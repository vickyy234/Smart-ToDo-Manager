import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/home.css'


function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [editMode, seteditMode] = useState(false)
    const [editId, setEditId] = useState(0)
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

    const addTask = async (id) => {
        if (editMode === false) {
            if (task.trim() === '') {
                alert("Enter a Task to add")
                return;
            }
            else {
                try {
                    const response = await axios.post('/api/todos', { task })
                    fetchTasks()
                    setTask("")
                }
                catch (err) {
                    alert(err.response?.data?.message)
                    navigate("/")
                }

            }
        } else {
            await axios.put(`/api/todos/${editId}`, { task })
            fetchTasks()
            setEditId(0)
            setTask('')
        }
    }

    function toogleEditBtn() {
        setEditBtn((prev) => !prev)
        seteditMode((prev) => !prev)
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
        setEditId(id)
    }

    const deleteTask = async (id) => {
        await axios.delete(`/api/todos/${id}`)
        fetchTasks()
    }

    return (
        <div className="container">
            <h1>Welcome {name}</h1>
            <div className="input_container">
                <input type="text" value={task} name="task" placeholder="Enter a Task..." onChange={handleChange} />
                <button className='btn' onClick={addTask}>{editMode ? "Update Task" : "Add Task"} </button>
                <button className='btn' onClick={toogleEditBtn}>{editBtn ? "Done" : "Edit"}</button>
            </div>

            {tasks.length === 0 ? <h3>No Task Added!</h3> : <h5>Total task : {tasks.length}<br/>Click a Task to mark it as completed. </h5>}

            <ol>
                {tasks.map((t) => {
                    return (
                        <li key={t._id} style={{backgroundColor :  t.isCompleted ? "#d3ffd3" : "#fff"}}>
                            {
                                t.isCompleted ? <div className="complete-signal">✅</div> : null
                            }
                            <div className="task-content" onClick={() => UpdateCompleted(t._id)} value={t.task}>{t.task}</div>
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