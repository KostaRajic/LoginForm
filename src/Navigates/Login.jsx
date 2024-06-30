/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useContextAuth } from "../context/Context"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"

export const Login = () => {
    const [username, setUsername] = useState('emilys')
    const [password, setPassword] = useState('emilyspass')
    const navigate = useNavigate()
    const { login, state, isAuthenticated } = useContextAuth()

    useEffect(()=> {
        if(isAuthenticated){
            return navigate('/products')
        }
    }, [isAuthenticated])

    if(state.isLoading){
        return <Spinner />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(username, password)
    }

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                {!username && <span>Username is required</span>}
                <div>
                    <label>Password:</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {!password && <span>Password is required</span> ||
                password.length < 6 && <span>Password must be minimum 6 characters long!</span>}
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}