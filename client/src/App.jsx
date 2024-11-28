
// @deno-types="@types/react"
import {Routes, Route, BrowserRouter} from "npm:react-router-dom";
import { useState, useCallback, useMemo } from "react";
import Index from "./pages/index.jsx";
import LoginPage from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Room from "./pages/room.jsx";
import Error404 from "./pages/404.jsx";
import SignUpPage from "./pages/signup.jsx";
import Register from "./pages/register.jsx";
import { createContext } from "react";
import Settings from "./pages/settings.jsx";


export const UserContext = createContext(null);

export default function App () {
  
  const _route = useCallback((path, element)=>({path, element}), []);

  const routes = useMemo(()=>[
    _route('/', <Index/>),
    _route('/room', <Room/>),
    _route('/home', <Home/>),
    _route('/login', <LoginPage/>),
    _route('/signup', <SignUpPage /> ),
    _route('/register', <Register /> ),
    _route('/settings', <Settings /> ),
    _route('*', <Error404 /> )
  ], [_route])

  const [userState, setUserState] = useState(null)

  return (
    <BrowserRouter basename="/" >
      <UserContext.Provider value={{userState, setUserState}} > 
        <Routes>
          {
            routes.map((route, index)=><Route key={index} path={route.path} element={route.element} />)
          }
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}