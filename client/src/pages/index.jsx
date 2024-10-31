import { useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * The `/index` redirects to `/home` if the user is logged in,
 * or else gives a quick go-through of the service.
 * 
*/


export default function Index () {

  useEffect(()=>{
    // try checking if user is logged in,
    // or else redirect `/index` and log out the current user

    onAuthStateChanged(auth, (user)=>{
      if(user) {
        console.log('Logged in');
      }
      else {
        console.log('Not logged in');
      }
    })

  }, []);

  return (
    <div className="">Index</div>
  )
}