import { motion, AnimatePresence } from "npm:framer-motion";
import { useContext } from "react"
import { NotificationContext } from "../App.jsx";

export default function Notification () {
  const {notifState, setNotifState} = useContext(NotificationContext);
  return (
    <AnimatePresence>
      { notifState &&
      <motion.aside className="fixed text-white bottom-5 right-5 w-60 bg-[#f44336] m-2 py-2 px-4 rounded-md " key="modal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{opacity: 0}} >
        <div className="flex flew-row justify-between items-center " >
          <p>Oops! An error occurred.</p>
          <img src="/src/assets/remove.png" alt="X" className="aspect-square lg:h-8 " onClick={()=>setNotifState(false)} />
        </div>
      </motion.aside> }
    </AnimatePresence>
  )
}