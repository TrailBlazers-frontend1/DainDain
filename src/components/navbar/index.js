import React,{useState} from 'react'

import { Link } from 'react-router-dom'
import RequestPromotion from '../requestPromotion'
import { Icon } from '@iconify/react';
// import Transaction from '../../pages/transaction'
import "./styles.css"
import {useSelector} from "react-redux"

const Navbar = () => {

  const [isRequestPromoOpen,setIsRequestPromoOpen] = useState(false)
  const [isNotiOpen,setIsNotiOpen] = useState(false)

  const {user_login} = useSelector(state => state.user)
  const {current_language} = useSelector(state => state.language)
  // console.log(current_language)
  
  return (
    <>

    <RequestPromotion isRequestPromoOpen={isRequestPromoOpen} setIsRequestPromoOpen={setIsRequestPromoOpen}/>
    
    <div className='navbar-container'>
        <p className="logo">LOGO</p>

        <div className='navbar-links-container'>
          <Link to="/">{current_language === "english" ? "Main Page" : "ပင်မ"}</Link>
          {
            user_login.role === "operationstaff" ? <Link to = "/refreerequests">Refree Requests</Link> :
              <>
              <Link to="/2d">{current_language === "english" ? "2D" : "၂လုံး"}</Link>
              <Link to="/3d">{current_language === "english" ? "3D" : "၃လုံး"}</Link>
              {
                user_login.role === "agent" ? <> 
                <Link to ="/transaction">{current_language === "english" ? "Transaction" : "‌ငွေလွှဲခြင်း"}</Link> 
                <Link to="/sale">{current_language === "english" ? "Sale" : "အ‌ေ"}</Link>
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
          {
            user_login.isLoggedIn && user_login.role === "agent" ? 
            <div className='notification-bell-container'>
              <Icon onClick={() => setIsNotiOpen(!isNotiOpen)} className='notification-bell' icon="akar-icons:bell" />
              <div className='noti-active-dot'></div>
              <div className={isNotiOpen ? 'noti-dropdown-container noti-open' : "noti-dropdown-container noti-close"}>
                <div className='noti-dropdown-header'>
                  <p>Notifications</p>
                  <Link to="/notifications">See All</Link>
                </div>
                <div className='noti-dropdown-row'>
                  <p className='noti-dropdown-label'>Referee 01</p>
                  <p className='noti-dropdown-message'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.</p>
                </div>
                <div className='noti-dropdown-row'>
                  <p className='noti-dropdown-label'>Referee 01</p>
                  <p className='noti-dropdown-message'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.</p>
                </div>
                <div className='noti-dropdown-row'>
                  <p className='noti-dropdown-label'>Referee 01</p>
                  <p className='noti-dropdown-message'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.</p>
                </div>
              </div>

            </div>
             : 
            null
          }
        </div>
    </div>
    </>
  )
}

export default Navbar