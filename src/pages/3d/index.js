import React,{useState} from 'react'
import "./styles.css"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import LiveCounter from '../../components/livecounter'
import ThreeStars from "./threeStars"
import FirstTwo from "./firstTwo"
import LastTwo from "./lastTwo"
import ThreePieces from './threepieces'

import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"

const ThreeD = () => {

  const {user_login} = useSelector(state => state.user)
  const [threedCategory,setThreedCategory] = useState("threepieces")

  if(user_login.isLoggedIn){
    return (
      <>
          <Header/>
          <Navbar/>
          <LiveCounter category="3d"/>

          { 
            user_login.role === "guest" && <p className='notice'>Please request promotion if you want to bet.</p>
          }
  
          <div className='App threed-parent-container'>
            <div className='threed-view-container'>
              <div className='threed-navbar'>
                <p className={threedCategory === "threepieces" ? 'threed-3pieces-link active' : 'threed-3pieces-link'} onClick={() => setThreedCategory("threepieces")}>Three Pieces</p>
                {/* <p className={threedCategory === "firsttwo" ? 'threed-lonepyaing-link active' : 'threed-lonepyaing-link'} onClick={() => setThreedCategory("firsttwo")}>First Two</p>
                <p className={threedCategory === "lasttwo" ? 'threed-lonepyaing-link active' : 'threed-lonepyaing-link'} onClick={() => setThreedCategory("lasttwo")}>Last Two</p> */}
              </div>
  
              {threedCategory === "threepieces" && 
                <ThreePieces/>
              }
              {/* {threedCategory === "firsttwo" && 
                <FirstTwo/>
              }
              {threedCategory === "lasttwo" && 
                <LastTwo/>
              } */}
            </div>
  
            <div className='threed-op-record-parent-container'>
              <p className='threed-op-record-header'>Lottery Opening Record</p>
              <div className='threed-op-record-container'>
                <div className='threed-op-record-datetime-container'>
                  <p>2022-07-16</p>
                  <p>15:00:00</p>
                </div>
                <div className='threed-op-record-number-container'>
                  <p>5</p>
                  <p>9</p>
                  <p>4</p>
                </div>
              </div>
              <div className='threed-op-record-container'>
                <div className='threed-op-record-datetime-container'>
                  <p>2022-07-16</p>
                  <p>15:00:00</p>
                </div>
                <div className='threed-op-record-number-container'>
                  <p>5</p>
                  <p>9</p>
                  <p>4</p>
                </div>
              </div>
              <div className='threed-op-record-container'>
                <div className='threed-op-record-datetime-container'>
                  <p>2022-07-16</p>
                  <p>15:00:00</p>
                </div>
                <div className='threed-op-record-number-container'>
                  <p>5</p>
                  <p>9</p>
                  <p>4</p>
                </div>
              </div>
            </div>
        </div>
      </>
    )
  }else{
    return(
      <Navigate to ="/" replace={true}></Navigate>

    )
  }
  
}

export default ThreeD