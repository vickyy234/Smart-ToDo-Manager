import '../styles/authentication.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const isLogin = async (e) => {
        try {
            const response = await axios.get('/api/todos')
            navigate('/home')
        }
        catch (err) {
        }
    }

    useEffect(() => {
        isLogin()
    }, [])


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleToggle() {
        setLogin(prev => !prev);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/login',
                {
                    email: formData.email,
                    password: formData.password
                }
            )
            navigate('/home')
        }
        catch (err) {
            alert(err.response?.data?.message || 'Server error')
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('api/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            isLogin()
            alert(response.data.message)
        }
        catch (err) {
            alert(err.response?.data?.message || "Server error")
        }
    }

    return (
        <>
            <div className="login_main">
                <div className="login_container">
                    <div className="login">
                        <h1>{login ? "Welcome back" : "Create an account"}</h1>
                        <form onSubmit={login ? handleLogin : handleRegister}>
                            {login ? null : (<><label htmlFor="name">Name</label><input type='text' value={formData.name} id='name' name='name' placeholder='Enter your name' onChange={handleChange} required /></>)}
                            <label htmlFor="email">Email</label>
                            <input type="email" value={formData.email} id='email' name='email' placeholder="username@gmail.com" onChange={handleChange} required />
                            <label htmlFor="password">Mpin</label>
                            <input type="password" value={formData.password} id='password' name="password" placeholder={login ? "Mpin" : "Set MPin"} onChange={handleChange} maxLength={4} minLength={4} required />
                            {login && <h3>Forgot Password?</h3>}
                            <button type="submit">{login ? "Sign in" : "Sign Up"}</button>
                        </form>
                        <h2>{login ? "Don't have an account yet?" : "Already have an account?"}<span onClick={handleToggle}>{login ? " Register for free" : " Login here"}</span></h2>
                    </div>
                    <div className='image'>
                        <img src="pic.png" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login