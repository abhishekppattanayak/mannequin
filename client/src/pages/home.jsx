import { useCallback, useEffect, useContext} from "react";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { useNavigate } from "npm:react-router-dom";
import { auth } from "../config/firebase.js";
import { VITE_SERVER_URL } from "../config/secrets.js";
import { UserContext } from "../App.jsx";

function SignOut() {
  const navigate = useNavigate();
  
  const handleClick = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      // todo: implement catch block
    }
  }, []);

  const {userState, setUserState} = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) {
        navigate('/');
      }
      else {
        let userDetails = await fetch(`${VITE_SERVER_URL}/user/${user.uid}`);
        userDetails = await userDetails.json();        
        setUserState(prev => userDetails.user)
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <button onClick={handleClick}>Sign Out</button>
  );
}

export default function Home() {
  return (
    <div>
      <SignOut />
    </div>
  );
}