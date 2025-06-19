import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {

  const [showPass, setShowPass] = useState(false)
  const [accoutnExists, setAccoutnExists] = useState(false)
  const [formData, setFormData] = useState(
    {
      email: "",
      password: ""
    }
  )

  const passwordRef = useRef()

  const googleProvider = new GoogleAuthProvider()

  const toggleEye = () => {
    if (showPass) {
      passwordRef.current.type = "password"
    } else {
      passwordRef.current.type = "text"
    }
    setShowPass(!showPass)
  }

  const handlChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleGoogleAuth = async (e) => {
    e.preventDefault()
    try {
      await signInWithPopup(auth, googleProvider)
      toast('Signin successful', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {
      alert(String(error.code).split("/")[1].replace("-", " ").toUpperCase() + "!")
    }
  }
  
  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      await updateProfile(auth.currentUser, {
        displayName: formData.userName
      })
    } catch (error) {
      alert(String(error.code).split("/")[1].replaceAll("-", " ").toUpperCase() + "!")
    }
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
    } catch (error) {
      alert(String(error.code).split("/")[1].replace("-", " ").toUpperCase() + "!")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center flex-grow'>
      <form className='flex gap-3 flex-col relative sm:w-2/3 md:w-1/2 lg:w-1/4 border-2 rounded-xl border-slate-500 p-4'>

        <h1 className='text-lg'>{accoutnExists ? `Login to ` : `Create `} your account</h1>

        <hr />

        {!accoutnExists ? <input
          onChange={(e) => handlChange(e)}
          name='userName'
          className='focus:outline-none p-1 w-full border-2 text-slate-500 border-slate-500 rounded-xl'
          type="text"
          placeholder='user name' /> : ""}

        <input
          onChange={(e) => handlChange(e)}
          name='email'
          className='focus:outline-none p-1 w-full border-2 text-slate-500 border-slate-500 rounded-xl'
          type="email"
          placeholder='email' />

        <div className='relative'>
          <input
            onChange={(e) => handlChange(e)}
            ref={passwordRef}
            name='password'
            className='focus:outline-none p-1 w-full border-2 text-slate-500 border-slate-500 rounded-xl relative'
            type="password"
            placeholder='Enter Password' />

          <span onClick={toggleEye} className='absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer'>{showPass ? <FaEye /> : <FaEyeSlash />}</span>
        </div>

        <button
          onClick={accoutnExists ? (e) => handleSignin(e) : (e) => handleSignup(e)}
          className='md:w-min w-full px-4 bg-slate-600 text-white rounded-xl flex items-center justify-center gap-1 hover:bg-slate-700 select-none'>
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "18px" }}>
          </lord-icon>
          <p className='text-md'>{accoutnExists ? `Login` : `Signup`}</p>
        </button>

        <hr />

        <button
          onClick={(event) => handleGoogleAuth(event)}
          className='w-full p-2 bg-slate-600 text-white rounded-xl flex items-center justify-center gap-1 select-none hover:bg-slate-700'>
          <lord-icon
            src="https://cdn.lordicon.com/wstfgfud.json"
            trigger="hover"
            state="hover-draw">
          </lord-icon>
          <p className='text-md'>Continue with Google</p>
        </button>

        <small
          onClick={() => setAccoutnExists(!accoutnExists)}
          className='text-blue-800 cursor-pointer select-none'>
          {accoutnExists ? `Do not have an account?` : `Already have an account?`}
        </small>

      </form>
    </div>
  )
}

export default Signup
