import { Link } from "npm:react-router-dom";
import { motion, AnimatePresence } from "npm:framer-motion";


export default function Navbar ({isInView}) {
  return (
    <AnimatePresence>
      { isInView &&
        <motion.nav initial={{translateY: "-100%"}} animate={{translateY: "0"}} exit={{translateY: "-100%"}}
          className="fixed top-0 w-full z-10 px-6 bg-transparent backdrop-blur-sm h-12 border-b-2 lg:h-16"
        >
          <ul className="h-full flex flex-row justify-end items-center *:text-2xl gap-8 " >
            <li><Link to={'/home'} >Home</Link></li>
            <li>Theme</li>
          </ul>
        </motion.nav>
      }
    </AnimatePresence>
  )
}