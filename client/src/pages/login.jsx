import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, GoogleProvider } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

function Input ({htmlFor, type, text, setChange}) {

  const handleChange = useCallback((e)=>{
    setChange(e.target.value);
  }, [setChange]);

  return (
    <div className="flex flex-col" >
      <label htmlFor={htmlFor}>{text}</label>
      <input type={type} id={htmlFor} className="rounded-sm px-2 dark:bg-white dark:text-black " required={true} onChange={handleChange}  />
    </div>
  )
}

Input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setChange: PropTypes.func.isRequired
}

function Form () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback( async (e)=>{
    e.preventDefault();
    console.log("submit clicked");
    await signInWithEmailAndPassword(auth, email, password)
  }, [email, password]);

  return (
    <form onSubmit={handleSubmit} className="lg:w-80"  >
      <fieldset className="flex flex-col gap-10 border px-6 sm:px-8 py-8 sm:py-10 rounded-md dark:bg-neutral-900 dark:border-white" >
        <div>
          <Input htmlFor="email" type="mail" text="Email" setChange={setEmail} />
          <Input htmlFor="password" type="password" text="Password" setChange={setPassword} />
        </div>

        <button type="submit" className="lg:px-4 py-1 dark:bg-white dark:text-black rounded-md font-bold" >Login</button>
      </fieldset>
    </form>
  );
}

function SignInWithProvider ({name, provider}) {
  const handleClick = useCallback( async (e)=>{
    e.preventDefault();
    await signInWithPopup(auth, provider);
  }, [provider]);

  return (
    <button onClick={handleClick} className="font-bold px-10 py-3 rounded-md dark:bg-white dark:text-black  " >Sign in with {name}</button>
  )
}

SignInWithProvider.propTypes = {
  name: PropTypes.string.isRequired,
  provider: PropTypes.object.isRequired
}

export default function Login () {

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
      <Form />
      <div className="border w-48 md:w-56 lg:w-80 rounded-lg border-black dark:border-white" ></div>
      <SignInWithProvider name="Google" provider={GoogleProvider} />
    </div>
  )
}