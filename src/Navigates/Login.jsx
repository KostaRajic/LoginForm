/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useContextAuth } from "../context/Context"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"
import { NotSubmitModal } from "../modals/NotSubmitModal"

export const Login = () => {
    const [username, setUsername] = useState('emilys')
    const [password, setPassword] = useState('emilyspass')
    const [ wrongUsername, setWrongUsername ] = useState(false)
    const [ wrongPassword, setWrongPassword ] = useState(false)
    const navigate = useNavigate()
    const { login, state, isAuthenticated } = useContextAuth()
    const [ showErrorModal, setShowErrorModal ] = useState(false)

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
        if (username == 'emilys' && password == 'emilyspass') {
            login(username, password)
        } else if (username !== 'emilys') {
            setWrongUsername(true)
        } else if (password !== 'emilyspass') {
            setWrongPassword(true)
        }
        if (username === 'emilys' && password === 'emilyspass') {
            login(username, password)
        } else {
            setShowErrorModal(true)
        }
        
    }

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>

                    <label style={{marginRight: '-5px'}}>Username:</label>
                    <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                { wrongUsername ? <span>Wrong username!</span> : '' }

                {!username && <span>Username is required</span>}
                <div>
                    <label>Password:</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                { wrongPassword ? <span>Wrong password!</span> : ''}
                {!password && <span>Password is required</span> ||
                password.length < 6 && <span>Password must be minimum 6 characters long!</span>}
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}