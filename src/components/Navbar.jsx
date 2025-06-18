import { useState } from 'react';

import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'

import { FaUserCircle } from "react-icons/fa";

const Navbar = (props) => {

  const [openDropdown, setOpenDropdown] = useState(false)

  const handleSignOut = async (e) => {
    e.preventDefault()
    const response = confirm("Are you sure to log out?")
    if (response) {
      try {
        await signOut(auth)
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <nav className='relative flex justify-center items-center bg-slate-600 p-4'>
      <div className='text-center flex-grow'>
        <div className="title">
          <h1 className='font-bold sm:text-3xl text-2xl text-white tracking-widest'><span className='text-orange-400'>&lt;</span>Gringotts<span className='text-orange-400'>/&gt;</span></h1>
        </div>
        <small className='text-slate-300'>Secure your passwords</small>
      </div>

      {props.user ?
        <div className='flex flex-col'>
          <button
            title={props.user.displayName}
            className='bg-slate-600 text-white rounded-xl'
            onClick={() => setOpenDropdown(!openDropdown)} >
            <FaUserCircle className='size-6 sm:size-8' />
          </button>

          {
            openDropdown ?
              <div className='absolute flex flex-col gap-1 right-4 bottom-[-100%] text-right bg-slate-100 p-3 z-10 rounded-lg'>
                <p className='text-xl'>{props.user.displayName}</p>
                <p className='text-sm'>{props.user.email}</p>
                <hr />
                <button
                  onClick={handleSignOut}
                  className='w-full px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-700'>
                  Logout
                </button>
              </div> : ""
          }

        </div> : ""
      }
    </nav>
  )
}

export default Navbar
