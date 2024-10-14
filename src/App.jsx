import Footer from "./components/Footer"
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"

function App() {

  return (
    <div className="font-mono flex flex-col justify-between h-[100vh]">
      <section>
        <Navbar />
        <Manager />
      </section>
      <Footer />
    </div>
  )
}

export default App
