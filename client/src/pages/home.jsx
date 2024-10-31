import { useEffect } from "react";

export default function Home(user) {

  useEffect(()=>{
    // try to fetch user, or else redirect to server error and log out current user
    if (user) {
      // todo: do something
    }
  }, [user]);

  return (
    <div>
      Home
    </div>
  );
}