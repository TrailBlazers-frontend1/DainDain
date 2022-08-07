import React,{useState} from 'react'
import DaiRegister from '../dai-register'
import { Link } from 'react-router-dom'
import "./styles.css"

const Navbar = () => {
  const [isDaiRegOpen,setIsDaiRegOpen] = useState(false)
  return (
    <>
    <DaiRegister isDaiRegOpen={isDaiRegOpen} setIsDaiRegOpen={setIsDaiRegOpen}/>
    <div className='navbar-container'>
        <p className="logo">LOGO</p>

        <div className='navbar-links-container'>
          <Link to="/">Main Page</Link>
          <Link to="/2d">2D</Link>
          <Link to="/3d">3D</Link>
        </div>
        <div className='navbar-btn-container'>
            <button className='site-admin-rgs-btn'>Site Admin Register</button>
            <button className='dai-rgs-btn' onClick={() => setIsDaiRegOpen(true)}>Dai Register</button>
            <button className='agent-admin-rgs-btn'>Agent Register</button>
        </div>
    </div>
    </>
  )
}

export default Navbar