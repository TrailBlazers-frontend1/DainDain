import React,{useState} from 'react'
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

const renderLonePyaing = () => {
  return (
    <div>Lone Pyaing</div>
  )
}

const TwoD = () => {
  const [twodCategory,setTwodCategory] = useState("2pieces")
  // const [customerName,setCustomerName] = useState("")
  // const [customerPhno,setCustomerPhno] = useState("")
  // const [number,setNumber] = useState("")
  // const [amount,setAmount] = useState("1000")
  // const [twodNumbers,setTwodNumbers] = useState([])

  const {user_login} = useSelector(state => state.user)

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
                <p className={twodCategory === "2pieces" ? 'twod-2pieces-link active' : 'twod-2pieces-link'} onClick={() => setTwodCategory("2pieces")}>2pieces</p>
                <p className={twodCategory === "lonepyaing" ? 'twod-lonepyaing-link active' : 'twod-lonepyaing-link'} onClick={() => setTwodCategory("lonepyaing")}>Lone Pyaing</p>
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
                Lottery Opening Record
              </p>
              <div className={twodCategory === "lonepyaing" ? 'lottery-op-records-container lottery-op-records-lonepyaing-container' : 'lottery-op-records-container'}>
                    <div className='lottery-op-record-container'>
                      <p className='lottery-op-record-time-container'>2022-07-27 Wednesday</p>
                      <div className='lottery-op-evening-container'>
                        <p className='lottery-op-evening-time'>
                          4:30pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
  
                      <div className='lottery-op-morning-container'>
                        <p className='lottery-op-evening-time'>
                          12:00pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='lottery-op-record-container'>
                      <p className='lottery-op-record-time-container'>2022-07-27 Wednesday</p>
                      <div className='lottery-op-evening-container'>
                        <p className='lottery-op-evening-time'>
                          4:30pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
  
                      <div className='lottery-op-morning-container'>
                        <p className='lottery-op-evening-time'>
                          12:00pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='lottery-op-record-container'>
                      <p className='lottery-op-record-time-container'>2022-07-27 Wednesday</p>
                      <div className='lottery-op-evening-container'>
                        <p className='lottery-op-evening-time'>
                          4:30pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
  
                      <div className='lottery-op-morning-container'>
                        <p className='lottery-op-evening-time'>
                          12:00pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='lottery-op-record-container'>
                      <p className='lottery-op-record-time-container'>2022-07-27 Wednesday</p>
                      <div className='lottery-op-evening-container'>
                        <p className='lottery-op-evening-time'>
                          4:30pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
  
                      <div className='lottery-op-morning-container'>
                        <p className='lottery-op-evening-time'>
                          12:00pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='lottery-op-record-container'>
                      <p className='lottery-op-record-time-container'>2022-07-27 Wednesday</p>
                      <div className='lottery-op-evening-container'>
                        <p className='lottery-op-evening-time'>
                          4:30pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
  
                      <div className='lottery-op-morning-container'>
                        <p className='lottery-op-evening-time'>
                          12:00pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className='lottery-op-record-container'>
                      <p className='lottery-op-record-time-container'>2022-07-27 Wednesday</p>
                      <div className='lottery-op-evening-container'>
                        <p className='lottery-op-evening-time'>
                          4:30pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
  
                      <div className='lottery-op-morning-container'>
                        <p className='lottery-op-evening-time'>
                          12:00pm
                        </p>
                        <div className='lottery-op-details-container'>
                          <div className='lottery-op-details-set-container'>
                            <p className='lottery-op-details-set-header'>Set</p>
                            <p className='lottery-op-details-set-text'>1,576</p>
                          </div>
                          <div className='lottery-op-details-value-container'>
                            <p className='lottery-op-details-value-header'>value</p>
                            <p className='lottery-op-details-value-text'>59,390</p>
                          </div>
                          <div className='lottery-op-details-number-container'>
                            <p className='lottery-op-details-number-header'>2D</p>
                            <p className='lottery-op-details-number-text'>18</p>
                          </div>
                        </div>
                      </div>
                    </div> */}
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