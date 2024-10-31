import { useCallback, useEffect} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

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