import React from 'react'

const Footer = () => {
    return (
        <footer className='flex flex-col justify-center items-center bg-slate-600 py-2'>
            <h1 className='font-bold text-xl text-white tracking-widest'><span className='text-orange-400'>&lt;</span>Gringotts<span className='text-orange-400'>/&gt;</span></h1>
            <p className='flex items-center text-sm text-slate-200'>Made with
                <lord-icon
                    src="https://cdn.lordicon.com/ulnswmkk.json"
                    trigger="hover"
                     colors="primary:#ee6d66"
                    style ={{width: "20px", margin: "0px 5px"}}>
                </lord-icon>
                by Aryan Sameer
            </p>
        </footer>
    )
}

export default Footer
