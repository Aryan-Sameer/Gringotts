import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex flex-col justify-center items-center bg-slate-600 p-4'>
      <div className="title">
        <h1 className='font-bold text-3xl text-white tracking-widest'><span className='text-orange-400'>&lt;</span>Gringotts<span className='text-orange-400'>/&gt;</span></h1>
      </div>
      <small className='text-slate-300'>Secure your passwords</small>
    </nav>
  )
}

export default Navbar
