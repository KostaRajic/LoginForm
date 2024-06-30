/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const MyProfile = () => {
    const navigate = useNavigate()
    const [ user ] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : '';
    })

    const allowedKeys = [ 'image', 'username', 'firstName', 'lastName', 'email']

    return <div className="myProfileClass">
                     {user ? Object.entries(user)
                    .filter(([key]) => allowedKeys.includes(key))
                    .map(([key, value]) => (
                        <p key={key}>
                            { key === 'image' ? <img src={value} alt="User Image" /> : <div><strong>{key}:</strong> {value}</div>}
                        </p>
                    )) : ''}
            <button onClick={() => navigate(-1)}>Back</button>
    </div>
}