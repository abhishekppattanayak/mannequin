import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, GoogleProvider } from "../config/firebase"
import { Link, useNavigate } from "react-router-dom"
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import googleSVG from "/google.svg";

export function Input ({htmlFor, type, text, setChange}) {
  const handleChange = useCallback((e) => setChange(e.target.value), [setChange]);

  return (
    <div className="*:block" >
      <label htmlFor={htmlFor}>{text}</label>
      <input type={type} id={htmlFor} minLength={"6"} className="w-full rounded-sm text-black px-2 py-1 bg-neutral-200" required={true} onChange={handleChange}  />
    </div>
  )
}

Input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setChange: PropTypes.func.isRequired
}

export function ErrorMessage ({message}) {
  return (
    <span className="bg-red-400/25 rounded-md w-80 sm:w-96 text-center py-2 border border-red-400" >{message}</span>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

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
    {invalid && <ErrorMessage message="Invalid Credentials." /> }
    <form onSubmit={handleSubmit} className="w-80 sm:w-96"  >
      <fieldset className="flex flex-col gap-10 border px-6 sm:px-8 py-8 sm:py-10 rounded-md bg-neutral-50/5  dark:bg-neutral-900/5 dark:border-white">
        <div>
          <Input htmlFor="email" type="email" text="Email*" setChange={setEmail} />
          <Input htmlFor="password" type="password" text="Password*" setChange={setPassword} />
        </div>

        <button type="submit" className="lg:px-4 py-1 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-300 rounded-md font-bold">{logging ? "Logging in..." : "Log in" }</button>
        <span className="block text-center" >Not an existing user? <Link to={'/signup'} className="dark:text-indigo-400 underline" >Sign up</Link></span>
      </fieldset>
    </form>
    </>
  );
}

export function OR () {
  return (
    <div className="flex items-center justify-center text-center w-80 sm:w-96">
      <div className="flex-grow border-t border-black dark:border-white"></div>
      <span className="mx-2">OR</span>
      <div className="flex-grow border-t border-black dark:border-white"></div>
    </div>
  )
}

export function SignInWithProvider ({name, text, provider, logo}) {
  const handleClick = useCallback( async (e)=>{
    e.preventDefault();
    await signInWithPopup(auth, provider);
  }, [provider]);

  return (
    <button onClick={handleClick} className="w-80 sm:w-96 flex justify-center items-center gap-2 font-bold px-10 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black " >{text} {name} <img src={logo} className="h-8 inline" /></button>
  )
}

SignInWithProvider.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
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
      <SignInWithProvider text="Log in with" name="Google" provider={GoogleProvider} logo={googleSVG} />
    </div>
  )
}