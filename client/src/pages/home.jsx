import { useCallback, useEffect} from "react";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { useNavigate } from "npm:react-router-dom";
import { auth } from "../config/firebase.js";

function SignOut() {
  const navigate = useNavigate();
  
  const handleClick = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      // 
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user === null) {
        navigate('/');
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