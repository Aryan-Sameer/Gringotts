import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { auth } from "./firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Manager from "./pages/Manager"
import Signup from "./pages/Signup"

function App() {

  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="py-5 text-slate-600 font-bold text-lg">Loading...</span>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Manager user={user} /> : <Navigate to="/signup" />
    },
    {
      path: "/signup",
      element: !user ? <Signup /> : <Navigate to="/" />
    },
  ])

  return (
    <div className="font-mono flex flex-col h-[100vh]">
      <Navbar user={user} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  )
}

export default App
