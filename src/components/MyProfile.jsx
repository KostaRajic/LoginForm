/* eslint-disable react/jsx-key */
import { useNavigate } from "react-router-dom"
import { useContextAuth } from "../context/Context";

export const MyProfile = () => {
    const navigate = useNavigate()
<<<<<<< HEAD
    // const [ user ] = useState(() => {
    //     const savedUser = localStorage.getItem('user');
    //     return savedUser ? JSON.parse(savedUser) : '';
    // })
    
=======
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
    const { state } = useContextAuth()

    const allowedKeys = [ 'image', 'username', 'firstName', 'lastName', 'email']

    return <div className="myProfileClass">
<<<<<<< HEAD
                     {state ? Object.entries(state.user)
                    .filter(([key]) => allowedKeys.includes(key))
                    .map(([key, value]) => (
                        <span key={key}>
                            { key === 'image' ? <img src={value} alt="User Image" /> : <div>{key}: <strong>{value}</strong></div>}
                        </span>
=======
                     {state.user ? Object.entries(state.user)
                    .filter(([key]) => allowedKeys.includes(key))
                    .map(([key, value]) => (
                        <p key={key}>
                            { key === 'image' ? <img src={value} alt="User Image" /> : <div><strong>{key}:</strong> {value}</div>}
                        </p>
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
                    )) : ''}
            <button onClick={() => navigate(-1)}>Back</button>
    </div>
}