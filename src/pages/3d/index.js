import React,{useState, useEffect} from 'react'
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
import { axiosInstance } from '../../urlConfig'

import { Icon } from '@iconify/react';

const ThreeD = () => {

  const {user_login} = useSelector(state => state.user)
  const [threedCategory,setThreedCategory] = useState("threepieces")

  const {current_language} = useSelector(state => state.language)
  const [threedHistory,setThreedHistory] = useState([])

  const [isLotteryHistoryOpen,setIsLotteryHistoryOpen] = useState(false)

  const fet3dHistory = async () => {
      try {
        const res = await axiosInstance.get("/winning-3ds",{headers:{Authorization:`Bearer ${user_login.token}`}})
        // console.log(res)
        setThreedHistory(res.data.threeds)
      } catch (error) {
        // notify(error.message)
      }
    }

    useEffect(() => {
      fet3dHistory()
    },[])

  if(user_login.isLoggedIn && user_login.role !== "operationstaff"){
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
                <p className={threedCategory === "threepieces" ? 'threed-3pieces-link active' : 'threed-3pieces-link'} onClick={() => setThreedCategory("threepieces")}>{current_language === "english" ? "3Pieces" : "၃လုံး"}</p>
                {/* <p className={threedCategory === "firsttwo" ? 'threed-lonepyaing-link active' : 'threed-lonepyaing-link'} onClick={() => setThreedCategory("firsttwo")}>First Two</p>
                <p className={threedCategory === "lasttwo" ? 'threed-lonepyaing-link active' : 'threed-lonepyaing-link'} onClick={() => setThreedCategory("lasttwo")}>Last Two</p> */}
                <p className='threed-history-link' onClick={() => setIsLotteryHistoryOpen(true)}>Lottery Records</p>
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
  
            <div className={isLotteryHistoryOpen ? 'threed-op-record-parent-container threed-op-record-parent-container-open' : "threed-op-record-parent-container"}>
            <Icon icon="akar-icons:cross" className='lottery-op-close-btn' onClick={() => setIsLotteryHistoryOpen(false)}/>
              <p className='threed-op-record-header'>{current_language === "english" ? "Lottery Opening Record" : "၃လုံးမှတ်တမ်း"}</p>
              {
                threedHistory.map((item) => (
                  <>
                  <div className='threed-op-record-container'>
                    <div className='threed-op-record-datetime-container'>
                      <p>{item.date}</p>
                      {/* <p>15:00:00</p> */}
                    </div>
                    <div className='threed-op-record-number-container'>
                      <p>{item.number.split("")[0]}</p>
                      <p>{item.number.split("")[1]}</p>
                      <p>{item.number.split("")[2]}</p>
                    </div>
                  </div>
                 
                </>
                ))
              }
              
              
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