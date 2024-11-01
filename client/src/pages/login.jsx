import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, GoogleProvider } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import googleSVG from "/google.svg";
import viewPng from "/view.png";
import hidePng from "/hide.png";

function Input ({htmlFor, type, text, setChange}) {

  const [view, setView] = useState(false);
  const ref = useRef(null);

  const handleClick = useCallback(() => setView(p => !p), []);

  const handleChange = useCallback((e) => setChange(e.target.value), [setChange]);

  return (
    <div className="flex flex-col *:w-full " >
      <label htmlFor={htmlFor} className="">{text}</label>
      <div className="relative" >
        <input ref={ref} type={view? "text" : type} id={htmlFor} className="w-full relative  rounded-sm text-black px-2 py-1 bg-neutral-200" required={true} onChange={handleChange}  />
        {type === "password" && <img className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer pointer-events-auto" src={view ? hidePng : viewPng} onClick={handleClick} />}
      </div>
    </div>
  )
}

Input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setChange: PropTypes.func.isRequired
}

function InvalidCredentials () {
  return (
    <span className="bg-red-400/25 rounded-md lg:w-80 text-center py-2 border border-red-400" >Invalid credentials.</span>
  )
}

function Form () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [logging, setLogging] = useState(false);

  const handleSubmit = useCallback( async (e)=>{
    e.preventDefault();
    setLogging(true);
    try {
      await signInWithEmailAndPassword(auth, email, password)
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
    {invalid && <InvalidCredentials /> }
    <form onSubmit={handleSubmit} className="lg:w-80"  >
      <fieldset className="flex flex-col gap-10 border px-6 sm:px-8 py-8 sm:py-10 rounded-md bg-neutral-50/5  dark:bg-neutral-900/5 dark:border-white">
        <div>
          <Input htmlFor="email" type="email" text="Email*" setChange={setEmail} />
          <Input htmlFor="password" type="password" text="Password*" setChange={setPassword} />
        </div>

        <button type="submit" className="lg:px-4 py-1 bg-black text-white dark:bg-white dark:text-black rounded-md font-bold">{logging ? "Logging in..." : "Log in" }</button>
      </fieldset>
    </form>
    </>
  );
}

function OR () {
  return (
    <div className="flex items-center justify-center text-center w-48 md:w-56 lg:w-80">
      <div className="flex-grow border-t border-black dark:border-white"></div>
      <span className="mx-2">OR</span>
      <div className="flex-grow border-t border-black dark:border-white"></div>
    </div>
  )
}

function SignInWithProvider ({name, provider, logo}) {
  const handleClick = useCallback( async (e)=>{
    e.preventDefault();
    await signInWithPopup(auth, provider);
  }, [provider]);

  return (
    <button onClick={handleClick} className="lg:w-80 flex justify-center items-center gap-2 font-bold px-10 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black " >Log in with {name} <img src={logo} className="h-8 inline" /></button>
  )
}

SignInWithProvider.propTypes = {
  name: PropTypes.string.isRequired,
  provider: PropTypes.object.isRequired,
  logo: PropTypes.any.isRequired
}

export default function LoginPage () {

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
      <SignInWithProvider name="Google" provider={GoogleProvider} logo={googleSVG} />
    </div>
  )
}