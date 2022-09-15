import React,{useEffect, useState} from 'react'
import "./styles.css"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import LiveCounter from '../../components/livecounter'
import TwoPieces from './twoPieces'
// import OneNumber from './oneNumber'
import LonePyaing from './lonePyaing'
// import { Link } from 'react-router-dom'
import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"
import user from '../../redux/user';
import Login from '../../components/login'
import { axiosInstance } from '../../urlConfig'

const renderLonePyaing = () => {
  return (
    <div>Lone Pyaing</div>
  )
}

const TwoD = () => {
  const [twodCategory,setTwodCategory] = useState("2pieces")
  const [opRecords, setOpRecords] = useState([])
  // const [customerName,setCustomerName] = useState("")
  // const [customerPhno,setCustomerPhno] = useState("")
  // const [number,setNumber] = useState("")
  // const [amount,setAmount] = useState("1000")
  // const [twodNumbers,setTwodNumbers] = useState([])

  const {user_login} = useSelector(state => state.user)
  const {current_language} = useSelector(state => state.language)

  const fetchLotteryOpeningRecord = async () => {
    try {
      const res = await axiosInstance.get("https://api.thaistock2d.com/2d_result")
      console.log(res)
      setOpRecords(res.data)
    } catch (error) {
      alert(error.message)
    }
    
  }

  useEffect(() => {
    fetchLotteryOpeningRecord()
  },[])

  if(user_login.isLoggedIn){
    return (
      <>
          <Header/>
          <Navbar/>
          <LiveCounter category="2d"/>
          { 
            user_login.role === "guest" && <p className='notice'>Please request promotion if you want to bet.</p>
          }
            
          <div className='App twod-parent-container'>


            <div className='twod-view-container'>
              <div className='twod-navbar'>
                <p className={twodCategory === "2pieces" ? 'twod-2pieces-link active' : 'twod-2pieces-link'} onClick={() => setTwodCategory("2pieces")}>{current_language === "english" ? "2Pieces" : "၂လုံး"}</p>
                <p className={twodCategory === "lonepyaing" ? 'twod-lonepyaing-link active' : 'twod-lonepyaing-link'} onClick={() => setTwodCategory("lonepyaing")}>{current_language === "english" ? "Lone Pyine" : "လုံးပြိုင်"}</p>
              </div>
  
              {twodCategory === "2pieces" &&
                <TwoPieces/>
              }
              {twodCategory === "lonepyaing" &&
                <LonePyaing/>
              }
              {/* {twodCategory === "lonepyaing" &&
                renderLonePyaing()
              } */}
  
              
  
            </div>
            <div className='lottery-op-record-parent-container'>
              <p className='lottery-op-record-header'>
              {current_language === "english" ? "Lottery Opening Record" : "၂လုံးမှတ်တမ်း"}
              </p>
              <div className={twodCategory === "lonepyaing" ? 'lottery-op-records-container lottery-op-records-lonepyaing-container' : 'lottery-op-records-container'}>
                {
                  opRecords.map((item)=> (
                    <div className='lottery-op-record-container'>
                      <p className='lottery-op-record-time-container'>{item.date}</p>
                      <div className='lottery-op-evening-container'>
                        <p className='lottery-op-evening-time'>
                          {item.child[3]?.time}
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>{item.child[3]?.set}</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>{item.child[3]?.value}</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>{item.child[3]?.twod}</p>
                          </div>
                        </div>
                      </div>
  
                      <div className='lottery-op-morning-container'>
                        <p className='lottery-op-evening-time'>
                        {item.child[1]?.time}
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>{item.child[1]?.set}</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>{item.child[1]?.value}</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>{item.child[1]?.twod}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                    
                    
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



export default TwoD