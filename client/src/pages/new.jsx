import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth } from "../config/firebase.js";
import { Input } from "./login.jsx";
import { useState, useEffect, useCallback } from "react";
import { VITE_SERVER_URL } from "../config/secrets.js";
import { useNavigate } from "npm:react-router-dom";

export const createFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

function Select ({ id, name, options, setChange }) {
  return (
    <div>
    <label htmlFor={id} className="mr-2" >{name}</label>
    <select name={name} id={id} className="bg-neutral-200 dark:bg-neutral-700 md:px-4 rounded-md ml-2" onChange={(e)=> setChange(e.target.value)} >
      {options.map( (option, index) => <option key={index} value={option}>{option}</option> )}
    </select>
    </div>
  )
}

export default function Register () {

  const navigate = useNavigate();

  const [UID, setUID] = useState("")
  const [name, setName] = useState("")
  const [pronouns, setPronouns] = useState("He/Him")

  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, user => setUID(user.uid))
    return () => unsubscribe()
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${VITE_SERVER_URL}/user/new`, {
        mode: 'cors',
        method: "POST",
        headers: {
          'Accept': '*/*',
        },
        body: createFormData({
          userId: UID,
          name: name,
          pronouns: pronouns
        })
      })

      if (response.ok) {
        navigate('/home')
      }
    }
    catch (error) {
      // todo: handle catch block
      console.error(error.message)
    }
  }, [UID, name, pronouns])

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <b className="text-xl text-center " >Mannequin</b>
      <form className="w-80 sm:w-96" >
        <fieldset className="flex flex-col gap-10 border px-6 sm:px-8 py-8 sm:py-10 rounded-md bg-neutral-50/5  dark:bg-neutral-900/5 dark:border-white" >
        
          <div className="*:my-2" >
            <Input text="Your given UID" value={UID} type="text" setChange={()=>()=>{}} htmlFor="UID" disabled={true} />
            <Input text="Name*" type="text" value={name} setChange={setName} htmlFor="name"  />
            <Select id="pronouns" name="Pronouns*" options={["He/Him", "She/Her", "They/Them", "Prefer not to say"]} setChange={setPronouns} />
          </div>

          <button type="submit" onClick={handleSubmit} className="lg:px-4 py-1 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-300 rounded-md font-bold" >Save</button>
        </fieldset>
      </form>
      <span>Note: You can change your name and pronouns later as well.</span>
    </div>
  )
}