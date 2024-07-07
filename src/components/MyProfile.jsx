/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useContextAuth } from "../context/Context";

export const MyProfile = () => {
    const navigate = useNavigate()
    // const [ user ] = useState(() => {
    //     const savedUser = localStorage.getItem('user');
    //     return savedUser ? JSON.parse(savedUser) : '';
    // })
    
    const { state } = useContextAuth()
    console.log('state' , state)

    const allowedKeys = [ 'image', 'username', 'firstName', 'lastName', 'email']

    return <div className="myProfileClass">
                     {state ? Object.entries(state.user)
                    .filter(([key]) => allowedKeys.includes(key))
                    .map(([key, value]) => (
                        <span key={key}>
                            { key === 'image' ? <img src={value} alt="User Image" /> : <div><strong>{key}:</strong> {value}</div>}
                        </span>
                    )) : ''}
            <button onClick={() => navigate(-1)}>Back</button>
    </div>
}