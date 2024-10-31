import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

/**
 * The `/index` redirects to `/home` if the user is logged in,
 * or else gives a quick go-through of the service.
 * 
*/

function Header () {
  return (
    <header className="px-2 sm:px-4 md:px-8 lg:px-12 py-4 sticky top-0 bg-transparent backdrop-blur-sm border border-sm flex flex-row-reverse " >
      <Link className=" px-4 py-2 bg-white text-black rounded-md font-bold " to={'/login'} >Log In</Link>
    </header>
  )
}


export default function Index () {

  const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/home');
      }
    })
    
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Header />
    </div>
  )
}