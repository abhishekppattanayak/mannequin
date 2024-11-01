import {Routes, Route, BrowserRouter} from "react-router-dom";
import { useCallback, useMemo } from "react";
import Index from "./pages/index.jsx";
import LoginPage from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Room from "./pages/room.jsx";
import Error404 from "./pages/404.jsx";

export default function App () {
  
  const _route = useCallback((path, element)=>({path, element}), []);

  const routes = useMemo(()=>[
    _route('/', <Index/>),
    _route('/room', <Room/>),
    _route('/home', <Home/>),
    _route('/login', <LoginPage/>),
  ], [_route])

  return (
    <BrowserRouter basename="/" >
      <Routes>
        {
          routes.map((route, index)=><Route key={index} path={route.path} element={route.element} />)
        }
        <Route path="*" element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  )
}