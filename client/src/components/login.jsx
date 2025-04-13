import '../styles/login.css'
import pic from '../assets/pic.png'
import { useState } from 'react'

function Login() {
    const [login, setLogin] = useState(true);
    function handleToggle() {
        setLogin(prev => !prev);
    }
    return (
        <>
            <div className="login_main">
                <div className="login_container">
                    <div className="login">
                        <h1>{login ? "Welcome back" : "Create an account"}</h1>
                        <form >
                            {login ? null : (<><label htmlFor="name">Name</label>
                                <input type='text' id='name' placeholder='Enter your name' required /></>)}
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' placeholder="username@gmail.com" required />
                            <label htmlFor="password">Mpin</label>
                            <input type="number" id="password" placeholder="Mpin" requires />
                            {login && <h3>Forgot Password?</h3>}
                            <button type="submit">{login ? "Sign in" : "Sign Up"}</button>
                        </form>
                        <h2>{login ? "Don't have an account yet?" : "Already have an account?"}<span onClick={handleToggle}>{login ? " Register for free" : " Login here"}</span></h2>
                    </div>
                    <div className='image'>
                        <img src={pic} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login