import { Link, useLocation,useNavigate} from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import { FaBars } from "react-icons/fa"
import { useState , useContext} from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"


const Navbar = () => {

  const [prompt,setPrompt]=useState("")
  const [menu,setMenu]=useState(false)
  const navigate=useNavigate()
  const path=useLocation().pathname


  const showMenu = () => {
    setMenu(!menu)
  }

  const {user}=useContext(UserContext)

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-20 py-4">
        <h1 className="text-x1 font-extrabold"><Link to="/">Article Hub</Link></h1>
        {path==="/" && <div className="flex items-center justify-center space-x-0">
          <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch /></p>
          <input onChange={(e)=>setPrompt(e.target.value)} type="text" placeholder="Search" className="outline-none px-3" />
        </div>}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login">Login</Link></h3>}
          {user ? <div onClick={showMenu}>
            <p className="cursor-pointer relative"><FaBars /></p>
            {menu && <Menu />}
          </div> : <h3><Link to="/register">Register</Link></h3>}
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative"><FaBars /></p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  )
}

export default Navbar