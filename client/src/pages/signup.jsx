import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth, GoogleProvider } from "../config/firebase.js"
import { Link, useNavigate } from "npm:react-router-dom"
import { useState, useCallback, useEffect } from "react";
import googleSVG from "../assets/google.svg";
import { ErrorMessage, Input, OR, SignInWithProvider } from "./login.jsx";

function Form () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [logging, setLogging] = useState(false);

  const handleSubmit = useCallback( async (e)=>{
    e.preventDefault();
    setLogging(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (e) {
      console.log(e);
      setInvalid(true);
    }
    finally {
      setLogging(false);
    }
  }, [email, password]);

  return (
    <>
    {invalid && <ErrorMessage message="Email already in use." /> }
    <form onSubmit={handleSubmit} className="w-80 sm:w-96"  >
      <fieldset className="flex flex-col gap-10 border px-6 sm:px-8 py-8 sm:py-10 rounded-md bg-neutral-50/5  dark:bg-neutral-900/5 dark:border-white">
        <div>
          <Input htmlFor="email" type="email" text="Email*" setChange={setEmail} />
          <Input htmlFor="password" type="password" text="Password*" setChange={setPassword} />
        </div>

        <button type="submit" className="lg:px-4 py-1 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-300 rounded-md font-bold">{logging ? "Signing in..." : "Sign up" }</button>
        <span className="block text-center" >Already an existing user? <Link to={'/login'} className="dark:text-indigo-400 underline" >Log in</Link></span>
      </fieldset>
    </form>
    </>
  );
}

export default function SignUpPage () {

  const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if (user)
          navigate('/home');
      return () => unsubscribe();
    })
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <b className=" text-xl " >Mannequin</b>
      
      <Form />
      <OR />
      <SignInWithProvider text="Sign up with" name="Google" provider={GoogleProvider} logo={googleSVG} />
    </div>
  )
}