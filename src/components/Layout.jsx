/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
import logo from "../assets/images/logo.png";
import { useContextAuth } from "../context/Context";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import onlineShopping from '../assets/images/onlineShoppingPicture.png'

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { state, logout, theme, setTheme, isAuthenticated, setLandingImage, landingImage } = useContextAuth();
  const [dropdown, setDropdown] = useState(false);
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : "";
  });


  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdown(false);
  };

  const handleProfile = () => {
    navigate("profile");
    setDropdown(false);
  };

  const handleLoginButton = () => {
    setLandingImage(false)
    localStorage.setItem('landingPage', false)
    navigate("/login")
  }

  return (
    <div>
      <header>
        <nav>
          <div>
            <div className="img-box">
              {isAuthenticated ? (
                <Fragment>
                  <div className="loggedClass">
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
                  <div className={dropdown ? "menu active" : "menu"}>
                    <ul>
                      <li onClick={handleProfile}>
                        <FontAwesomeIcon icon={faUser} />
                        My Profile
                      </li>
                      <li onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Log Out
                      </li>
                    </ul>
                  </div>
                </Fragment>
              ) : (
                <img className="logoImg" src={onlineShopping} alt="Logo" />
              )}
            </div>
            <div
              className="reactSwitch"
              style={
                !isAuthenticated ? { position: "absolute", inset: "40%" } : null
              }
            >
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              <svg
                className="light-dark-mode"
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                onClick={handleChangeTheme}
                checked={theme === "dark"}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="6"
                  mask="url(#moon-mask)"
                  fill="currentColor"
                />
                <g stroke="currentColor">
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
              </svg>
            </div>
          </div>
          <div className="loginBtnClass">
            {!isAuthenticated && (
              <button onClick={handleLoginButton}>Log In</button>
            )}
          </div>
        </nav>
      </header>
      {landingImage ?
              <img src={onlineShopping} alt="Online Shopping" className='landingImageClass'/>
            :
            ''}
            
      {children}
    </div>
  );
};
