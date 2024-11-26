/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useContextAuth } from "../context/Context"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"
<<<<<<< HEAD
=======
import { NotSubmitModal } from "../modals/NotSubmitModal"
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47

export const Login = () => {
    const [username, setUsername] = useState('emilys')
    const [password, setPassword] = useState('emilyspass')
<<<<<<< HEAD
    const [ wrongUsername, setWrongUsername ] = useState(false)
    const [ wrongPassword, setWrongPassword ] = useState(false)
    const navigate = useNavigate()
    const { login, state, isAuthenticated } = useContextAuth()
=======
    const navigate = useNavigate()
    const { login, state, isAuthenticated } = useContextAuth()
    const [ showErrorModal, setShowErrorModal ] = useState(false)
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47

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
<<<<<<< HEAD
        if (username == 'emilys' && password == 'emilyspass') {
            login(username, password)
        } else if (username !== 'emilys') {
            setWrongUsername(true)
        } else if (password !== 'emilyspass') {
            setWrongPassword(true)
        }
=======
        if (username === 'emilys' && password === 'emilyspass') {
            login(username, password)
        } else {
            setShowErrorModal(true)
        }
        
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
    }

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
<<<<<<< HEAD
                    <label style={{marginRight: '-5px'}}>Username:</label>
=======
                    <label>Username:</label>
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
                    <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
<<<<<<< HEAD
                { wrongUsername ? <span>Wrong username!</span> : '' }
=======
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
                {!username && <span>Username is required</span>}
                <div>
                    <label>Password:</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
<<<<<<< HEAD
                { wrongPassword ? <span>Wrong password!</span> : ''}
=======
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
                {!password && <span>Password is required</span> ||
                password.length < 6 && <span>Password must be minimum 6 characters long!</span>}
                <br/>
                <button type="submit">Login</button>
            </form>
<<<<<<< HEAD
=======
            { showErrorModal && <NotSubmitModal closeModal={() => setShowErrorModal()}/> }
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
        </div>
    );
}