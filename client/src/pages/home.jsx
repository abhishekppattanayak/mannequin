import { useCallback, useEffect, useContext} from "react";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { useNavigate } from "npm:react-router";
import { Link } from "npm:react-router-dom";
import { auth } from "../config/firebase.js";
import { VITE_SERVER_URL } from "../config/secrets.js";
import { NotificationContext, UserContext } from "../App.jsx";
import Sidebar from "../components/sidebar.jsx";
import Main from "../components/main.jsx";
import Chats from "../components/chats.jsx";
import AddSvg from "../components/add.jsx";

function SignOut() {
  const navigate = useNavigate();
  const {setNotifState} = useContext(NotificationContext);
  
  const handleClick = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      setNotifState(true);
    }
  }, []);

  const {setUserState} = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) {
        navigate('/');
      }
      else {
        let userDetails = await fetch(`${VITE_SERVER_URL}/user/${user.uid}`);
        userDetails = await userDetails.json();        
        setUserState(userDetails.user)
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <button onClick={handleClick} className="font-bold bg-black text-white dark:bg-white dark:text-black rounded-md py-2 px-3" >Sign Out</button>
  );
}

export default function Home() {
  
  const {userState} = useContext(UserContext);

  return (
    <div className="h-screen grid grid-cols-6 *:m-2 *:py-2 *:px-4 *:rounded-md " >
      <Sidebar className="bg-neutral-100 dark:bg-neutral-900 col-span-1 hidden xl:flex flex-col gap-2" >
        <div className="flex flex-row justify-between items-center" >
          <Chats userDetails={userState} />
          <AddSvg className="aspect-square h-10 rounded-lg p-1" />
        </div>
        <Link to={'/settings'} className="py-2 px-3 text-center hover:underline" >Settings</Link>
        <SignOut />
      </Sidebar>
      <Main className="bg-neutral-50 dark:bg-neutral-950 col-span-full xl:col-span-5 " >

      </Main>
    </div>
  );
}