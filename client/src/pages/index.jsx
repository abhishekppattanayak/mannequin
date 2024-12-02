import { Link } from "npm:react-router-dom";
import Hero from "../components/hero.jsx";
import About from "../components/about.jsx";
import Navbar from "../components/navbar.jsx";
import { useRef } from "react";
import { useInView } from "npm:framer-motion";

function Auth () {
  return (
    <section className="px-2 sm:px-4 md:px-8 lg:px-12 py-4 sticky top-0 bg-transparent backdrop-blur-sm flex flex-row gap-10 justify-center items-center h-screen" >
      <Link className="px-4 py-2 text-center border border-black dark:border-white lg:w-24 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md font-bold text-nowrap" to={'/signup'} >Sign up</Link>
      <Link className="px-4 py-2 lg:w-24 text-center bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-md font-bold text-nowrap " to={'/login'} >Log in</Link>
    </section>
  )
}


export default function Index () {
  
  const about = useRef(null);
  const isInView = useInView(about)

  return (
    <>
    <Navbar isInView={isInView} />
    <Hero/>
    <div ref={about} className="h-fit" >
      <About/>
      <Auth />
    </div>
    </>
  )
}