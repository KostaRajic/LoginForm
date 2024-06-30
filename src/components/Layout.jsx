/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/images/avatar.png'
import logo from '../assets/images/logo.jpg'
import { useContextAuth } from "../context/Context"
import { Fragment, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowRightFromBracket, faL } from '@fortawesome/free-solid-svg-icons'
import ReactSwitch from 'react-switch'



export const Layout = ({children}) => {
	const navigate = useNavigate()
    const { state, logout, theme, setTheme, isAuthenticated } = useContextAuth()
    const [ dropdown, setDropdown ] = useState(false)
    const [ user ] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : '';
    })


    useEffect(() => {
        state.user &&  localStorage.setItem('user', JSON.stringify(state?.user))
    }, [])

    const handleChangeTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    const handleLogout = () => {
        logout()
        navigate('/')
        setDropdown(false)
    }

    const handleProfile = () => {
        navigate('profile')
        setDropdown(false)
    }


return <div>
    <header>
        <nav>
            <div>
                <div className="img-box">

                    {isAuthenticated ? 
                        <Fragment>
                        <div className='loggedClass'>
                            <div>
                                <p>{user?.firstName}</p>
                                <p>{user?.lastName}</p>
                            </div>
                            <img 
                            src={avatar} 
                            alt="Avatar"
                            className="avatarImg"
                            onClick={() => setDropdown(!dropdown)}
                            />
                        </div>
                            <div className={dropdown ? 'menu active' : 'menu'}>
                                <ul>
                                    <li
                                    onClick={handleProfile}
                                    ><FontAwesomeIcon icon={faUser}/>My Profile</li>
                                    <li
                                    onClick={handleLogout}
                                    ><FontAwesomeIcon icon={faArrowRightFromBracket} />Log Out</li>
                                </ul>
                            </div>
                        </Fragment>
                        
                        :
                        <img 
                        className='logoImg'
                        src={logo} 
                        alt="Logo"
                        />
                    }

                </div>
                <div 
                className='reactSwitch'
                style={!isAuthenticated ? {position: 'absolute', inset: '40%'} : null}
                >
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                <ReactSwitch 
                onChange={handleChangeTheme} 
                checked={theme === 'dark'}
                />
            </div>
            </div>
            <div className='loginBtnClass'>
                {!isAuthenticated &&
                <button onClick={() => navigate('/login')}>Log In</button>
                }
            </div>
            
        </nav>
    </header>
    {children}
</div>
}