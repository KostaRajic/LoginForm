/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";


export const Context = createContext();

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return initialState;
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export const useContextAuth = () => {
  return useContext(Context);
};

export const UseContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedTheme = localStorage.getItem("isAuth");
    return savedTheme ? savedTheme : false;
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  const [landingImage, setLandingImage] = useState(() => {
    const savedTheme = JSON.parse(localStorage.getItem("landingPage"));;
    return savedTheme ? savedTheme : true;
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);


  const loggedUser = useMemo(() => state?.isLoggedIn, [state?.isLoggedIn]);
  const role = useMemo(() => state?.user?.role, [state.user]);

  const login = async (username, password) => {
    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      });
      const data = await response.json();
      dispatch({ type: "LOGIN", payload: data });
      setIsAuthenticated(true);
      localStorage.setItem("isAuth", true);
      saveToken(data?.token);
      dispatch({ type: "LOADING", payload: false });
    } catch (e) {
      dispatch({ type: "ERROR", payload: true });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    setLandingImage(true)
    localStorage.setItem('landingPage', true)
    dispatch({ type: "LOGOUT" });
  };

  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <div>
      <Context.Provider
        value={{
          login,
          logout,
          state,
          dispatch,
          isAuthenticated,
          role,
          theme,
          setTheme,
          loggedUser,
          setLandingImage,
          landingImage
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
    

//   const reducer = (state, action) => {
//     switch (action.type) {
//       case 'LOGIN':
//         return {
//           ...state,
//           isLoading: false,
//           isLoggedIn: true,
//           user: action.payload
//         }
//       case 'LOGOUT':
//         return initialState
//       case 'LOADING':
//         return {
//           ...state,
//           isLoading: action.payload
//         }
//       case 'ERROR':
//         return {
//           ...state,
//           isError: action.payload
//         }
//       default:
//         return state
//     }
//   }

// export const useContextAuth = () => {
//     return useContext(Context)
// }

// export const UseContextProvider = ({children}) => {
//     const [token, setToken] = useState(() => {
//       return localStorage.getItem('token')
//     })

//     const [ isAuthenticated, setIsAuthenticated ] = useState(() => {
//       const savedTheme = localStorage.getItem('isAuth');
//       return savedTheme ? savedTheme : false;
//     })

//     const [ theme, setTheme ] = useState(() => {
//       const savedTheme = localStorage.getItem('theme');
//       return savedTheme ? savedTheme : 'dark'
//     })

//     const [state, dispatch] = useReducer(reducer, initialState)

//     useEffect(() => {
//       document.body.className = theme + '-theme';
//     }, [theme]);

//     const loggedUser = useMemo(() => state?.isLoggedIn, [state?.isLoggedIn])
//     const role = useMemo(() => state?.user?.role, [state.user]);

//     const login = async (username, password) => {
//       dispatch({type: 'LOADING', payload: true})
//         try {
//           const response = await fetch('https://dummyjson.com/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
                  
//                   username: username,
//                   password: password,
//                   expiresInMins: 30, // optional, defaults to 60
//                 })
//               })
//               const data = await response.json()
//               dispatch({type: 'LOGIN', payload: data})
//               setIsAuthenticated(true)
//               localStorage.setItem('isAuth', true)

//               saveToken(data?.token);
              
//         dispatch({type: 'LOADING', payload: false})
//         }
//         catch (e) {
//         dispatch({type: 'ERROR', payload: true})
//         }
        
//     }

//     const logout = () => {
//       setIsAuthenticated(false)
//       localStorage.removeItem('isAuth')
//       localStorage.removeItem('token')
//       dispatch({type: 'LOGOUT'})
  
//     }

//     const saveToken = (token) => {
//       setToken(token);
//        localStorage.setItem('token', token);
//     }
    
//     return <div>
//         <Context.Provider value={{ login, logout, state, dispatch, isAuthenticated, role, theme, setTheme, loggedUser }}>
//             {children}
//         </Context.Provider>
//     </div>
// }
// >>>>>>> 46ae12a624a837fa231610799c234841d37efa47
