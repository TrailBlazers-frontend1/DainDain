import React from 'react'
import "./styles.css"
import avatar from "../../imgs/avatar.png"
import Header from '../../components/header'
import Navbar from '../../components/navbar'

import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"


const Notifications = () => {

  const {user_login} = useSelector(state => state.user)

  if(user_login.isLoggedIn && user_login.role === "agent"){
    return (
      <>
          <Header/>
          <Navbar/>
  
          <div className='App notifications-page-parent-container'>
            <div className='notifications-page-header'>
              <p>Notifications</p>
            </div>
              <div className='notifications-page-noti-row'>
                <div className='notifications-page-not-img-container'>
                  <img src={avatar} />
                </div>
  
                <p className='notifications-page-noti-text'>
                  <span>Referee 01    </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.
                </p>
              </div>
              <div className='notifications-page-noti-row'>
                <div className='notifications-page-not-img-container'>
                  <img src={avatar} />
                </div>
  
                <p className='notifications-page-noti-text'>
                  <span>Referee 01    </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.
                </p>
              </div>
              <div className='notifications-page-noti-row'>
                <div className='notifications-page-not-img-container'>
                  <img src={avatar} />
                </div>
  
                <p className='notifications-page-noti-text'>
                  <span>Referee 01    </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.
                </p>
              </div>
              <div className='notifications-page-noti-row'>
                <div className='notifications-page-not-img-container'>
                  <img src={avatar} />
                </div>
  
                <p className='notifications-page-noti-text'>
                  <span>Referee 01    </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.
                </p>
              </div>
              <div className='notifications-page-noti-row'>
                <div className='notifications-page-not-img-container'>
                  <img src={avatar} />
                </div>
  
                <p className='notifications-page-noti-text'>
                  <span>Referee 01    </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.
                </p>
              </div>
            
          </div>
      </>
    )
  }else{
    <Navigate to ="/" replace={true}></Navigate>
  }
 
}

export default Notifications