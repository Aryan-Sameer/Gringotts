import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useRef } from 'react';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { database } from '../firebaseConfig';
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';

import Toast from '../components/Toast';

const Manager = (props) => {

  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ site: "", userName: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const passwordRef = useRef()

  const dataCollection = collection(database, "passwords")
  const userData = query(dataCollection, where("id", "==", props.user.uid))

  useEffect(() => {
    readPasswords()
  }, [passwordArray])

  const toggleEye = () => {
    if (showPass) {
      passwordRef.current.type = "password"
    } else {
      passwordRef.current.type = "text"
    }
    setShowPass(!showPass)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const createPassword = async () => {
    setisLoading(true)
    try {
      if ((form.site != "" && form.userName != "" && form.password != "")) {
        await addDoc(dataCollection, {
          id: props.user.uid,
          userName: form.userName,
          site: form.site,
          password: form.password,
        })
        setForm({ site: "", userName: "", password: "" })
        toast("Password saved successfully")
      } else {
        toast("Fill all the fieds")
      }
    } catch (error) {
      toast(error.message)
    } finally {
      setisLoading(false)
    }
  }

  const readPasswords = () => {
    onSnapshot(userData, (data) => {
      const passwords = data.docs.map((item) => ({
        docid: item.id,
        ...item.data()
      }));
      setPasswordArray(passwords)
    });
  }

  const updatePassword = async (id) => {
    if (form.site == "" && form.userName == "" && form.password == "") {
      setForm(passwordArray.filter(item => item.docid === id)[0])
      const docToUpdate = doc(database, "passwords", id);
      await deleteDoc(docToUpdate);
      setPasswordArray(passwordArray.filter(item => item.docid !== id))
    }
  }

  const deletePassword = async (id) => {
    let canDelete = confirm("Are you sure you want to delete this password")
    if (canDelete) {
      const docToUpdate = doc(database, "passwords", id);
      await deleteDoc(docToUpdate);
      setPasswordArray(passwordArray.filter(item => item.docid !== id))
      toast(`Password deleted`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  return (
    <main>
      <div className='flex flex-col md:items-center m-5 gap-2'>

        <div className="absolute top-0 z-[-2] h-screen w-fit bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <section className="inputField flex flex-col gap-3 bg-slate-400 xl:w-1/2 md:w-2/3 p-4 rounded-xl">
          <input onChange={handleChange} value={form.site} name='site' className='focus:outline-none p-1 border-2 text-slate-500 border-slate-500 rounded-xl' type="text" placeholder='Enter the URL' />
          <div className='flex gap-3 flex-col relative md:flex-row'>
            <input onChange={handleChange} value={form.userName} name='userName' className='focus:outline-none p-1 md:w-[60%] w-full border-2 text-slate-500 border-slate-500 rounded-xl' type="text" placeholder='Unsename / email' />
            <input onChange={handleChange} ref={passwordRef} value={form.password} name='password' className='focus:outline-none p-1 md:w-[40%] w-full border-2 text-slate-500 border-slate-500 rounded-xl relative' type="password" placeholder='Enter Password' />
            <span onClick={toggleEye} className='absolute right-2 md:top-[50%] md:translate-y-[-50%] top-[75%] translate-y-[-25%] cursor-pointer'>{showPass ? <FaEye /> : <FaEyeSlash />}</span>
          </div>
          <button
            onClick={createPassword}
            disabled = {isLoading}
            className='md:w-min w-full px-4 bg-slate-600 text-white rounded-xl flex items-center justify-center gap-1 hover:bg-slate-700'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "18px" }}>
            </lord-icon>
            <p className='text-md select-none'>{isLoading ? "Saving..." : "Save"}</p></button>
        </section>

        <Toast />

        <h2 className='font-bold text-2xl text-slate-700 text-center '>Your passwords</h2>
        <section className='content w-full flex flex-col gap-3 overflow-auto'>
          {passwordArray.length === 0 ? <p className='font-bold text-slate-500 text-center'>You have not saved any passwords!</p> :
            <table className="table-auto text-center rounded-lg overflow-hidden">
              <thead>
                <tr className='bg-slate-400'>
                  <th className='p-2'>Site URL</th>
                  <th className='p-2'>User name</th>
                  <th className='p-2'>Password</th>
                  <th className='p-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-slate-200'>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index} className='border border-y-white'>

                      <td className='flex justify-center items-center gap-2 py-1 px-3'>
                        <a className='hover:underline' target='_blank' href={item.site}>{item.site}</a>
                        <span onClick={() => { copyText(item.site) }} className='cursor-pointer'>
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            state="hover-file-2"
                            style={{ width: "18px", display: "inline-block", verticalAlign: "middle" }}>
                          </lord-icon></span>
                      </td>

                      <td>
                        <p className='flex justify-center items-center gap-2 py-1 px-3'>{item.userName} <span onClick={() => { copyText(item.userName) }} className='cursor-pointer align-middle'>
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            state="hover-file-2"
                            style={{ width: "18px", display: "inline-block", verticalAlign: "middle" }}>
                          </lord-icon></span></p>
                      </td>

                      <td>
                        <p className='flex justify-center items-center gap-2 py-1 px-3'>{"*".repeat(item.password.length)} <span onClick={() => { copyText(item.password) }} className='cursor-pointer align-middle'>
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            state="hover-file-2"
                            style={{ width: "18px", display: "inline-block", verticalAlign: "middle" }}>
                          </lord-icon></span></p>
                      </td>

                      <td>
                        <span onClick={() => { updatePassword(item.docid) }} className='cursor-pointer p-1'>
                          <lord-icon
                            src="https://cdn.lordicon.com/cbtlerlm.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000,tertiary:#ebe6ef,quaternary:#000000,quinary:#3a3347"
                            style={{ width: "20px", display: "inline-block", verticalAlign: "middle" }}>
                          </lord-icon>
                        </span>
                        <span onClick={() => { deletePassword(item.docid) }} className='cursor-pointer p-1'>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            state="hover-file-2"
                            style={{ width: "20px", display: "inline-block", verticalAlign: "middle" }}>
                          </lord-icon>
                        </span>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>}
        </section>

      </div>
    </main>
  )
}

export default Manager
