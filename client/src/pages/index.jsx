import { Link, useNavigate } from "npm:react-router-dom";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { useEffect } from "react";
import Hero from "../components/hero.jsx";
import About from "../components/about.jsx";

/**
 * The `/index` redirects to `/home` if the user is logged in,
 * or else gives a quick go-through of the service.
 * 
*/

function Header () {
  return (
    <header className="px-2 sm:px-4 md:px-8 lg:px-12 py-4 sticky top-0 bg-transparent backdrop-blur-sm border-b border-sm flex flex-row justify-between items-center " >
      <b className="text-3xl" >Mannequin</b>
      <div className="flex gap-8" >
        <Link className="px-4 py-2 text-center border border-black dark:border-white lg:w-24 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md font-bold text-nowrap" to={'/signup'} >Sign up</Link>
        <Link className="px-4 py-2 lg:w-24 text-center bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-md font-bold text-nowrap " to={'/login'} >Log in</Link>
      </div>
    </header>
  )
}


export default function Index () {

  const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      }
    })
    
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
    <Hero />
    <div className="h-fit">
      <About />
    </div>
    </>
  )
}