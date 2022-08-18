import React,{useState} from 'react'

import { Link } from 'react-router-dom'
import RequestPromotion from '../requestPromotion'
// import Transaction from '../../pages/transaction'
import "./styles.css"
import {useSelector} from "react-redux"

const Navbar = () => {

  const [isRequestPromoOpen,setIsRequestPromoOpen] = useState(false)

  const {user_login} = useSelector(state => state.user)
  
  return (
    <>

    <RequestPromotion isRequestPromoOpen={isRequestPromoOpen} setIsRequestPromoOpen={setIsRequestPromoOpen}/>
    
    <div className='navbar-container'>
        <p className="logo">LOGO</p>

        <div className='navbar-links-container'>
          <Link to="/">Main Page</Link>
          {
            user_login.role === "operation staff" ? <Link to = "/refreerequests">Refree Requests</Link> :
              <>
              <Link to="/2d">2D</Link>
              <Link to="/3d">3D</Link>
              {
                user_login.role === "agent" ? <> 
                {/* <Link to ="/transaction">Transaction</Link>  */}
                <Link to="/sale">Sale</Link>
                </>: null
              }
              </>
          }
          
        </div>
        <div className='navbar-btn-container'>
          {
            user_login.isLoggedIn && user_login.role==="guest" ? <button className='request-promotion-btn' onClick={() => setIsRequestPromoOpen(true)}>Request Promotion</button>:
            null
          }
            
            {/* <button className='dai-rgs-btn' onClick={() => setIsDaiRegOpen(true)}>Dai Register</button>
            <button className='agent-admin-rgs-btn'>Agent Register</button> */}
        </div>
    </div>
    </>
  )
}

export default Navbar