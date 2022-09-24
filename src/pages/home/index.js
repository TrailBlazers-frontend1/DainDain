import React,{useState, useEffect, useRef} from 'react'
import {Link} from "react-router-dom"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import homepageimg from "../../imgs/2d3d-img3.jpg"
import hotgameimg from "../../imgs/2d3d-img2.png"
import lotteryimage from "../../imgs/2d.png"
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react';
import "./styles.css"
import { axiosInstance } from '../../urlConfig'
import { useDispatch } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import { setRefereeProfile } from '../../redux/refereeProfile'
import { setAgentProfile } from '../../redux/agent'


const Home = () => {
    const [twoOrThree,setTwoOrThree] = useState("two")
    const [morningResult,setMorningResult] = useState()
    const [eveningResult,setEveningResult] = useState()
    // const [isFilteringDate,setIsFilteringDate] = useState(false)
    const [live,setLive] = useState()

    const [date,setDate] = useState('')

    const dispatch = useDispatch()

    const liveNumber = useRef()

    const {current_language} = useSelector(state => state.language)
    const {user_login} = useSelector(state => state.user)

    let isFilteringDate = false

    const notify = (message) => toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });

    const fetchAgentProfile = async () => {
        try {
            const res = await axiosInstance.get("/agent-profile",{headers:{Authorization:`Bearer ${user_login.token}`}})
    
                // console.log(res)
                if(res.data.status === 200){
                    const agent = {
                        id:res.data.agent.id,
                        image:res.data.agent.image,
                        coin_amount:res.data.agent.cashincashout.coin_amount,
                        commission:res.data.agent.commision,
                        refereeId: res.data.agent.referee_id,
                        twod_sale_list:res.data.twod_lists,
                        threed_sale_list:res.data.threed_lists,
                        lonepyine_sale_list:res.data.lonepyaing_lists,
                    }
    
                    dispatch(setAgentProfile(agent))
    
                    // console.log(profile)
                }
        } catch (error) {
            notify(error.message)
        }
        
    }
    
    const fetchRefereeProfile =  async ()=>{
        try {
            const res = await axiosInstance.get("/referee",{headers:{Authorization:`Bearer ${user_login.token}`}})
            // console.log(res)
            if(res.data.status === 200){
                dispatch(setRefereeProfile(res.data.referee))
            }
        } catch (error) {
            notify(error.message)
        }
        
    }

    const fetchLive = async () => {
        try {
            const res =await  axiosInstance.get("https://api.thaistock2d.com/live")
            // console.log(res.data.result[1], res.data.result[3])
            setMorningResult(res.data.result[1])
            setEveningResult(res.data.result[3])
            setLive(res.data.live.twod)
        } catch (error) {
            
        }
        
    }

    const handleDateChange = async (e) => {
        setDate(e.target.value)
        // console.log(e.target.value)
        try {
            // console.log(e.target.value)
            const res = await axiosInstance.get(`https://api.thaistock2d.com/2d_result?date=${e.target.value}`)
            // console.log(res.data[0])
            setMorningResult(res.data[0].child[1])
            setEveningResult(res.data[0].child[3])
            // setLive(res.data.live.twod)

        } catch (error) {
            notify(error.message)
        }
    } 

    const fadeInOut = () => {
        if(liveNumber.current){
            liveNumber?.current?.classList.add("fade-out")
            setTimeout(() => {
                liveNumber.current.classList.remove("fade-out")
                liveNumber.current.classList.add("fade-in")
            },2000)
        }
       
    }

    useEffect(() => {
        // liveNumber.current.classList.add("fade-out")
       
        const interval = setInterval(() => {
            fadeInOut()
            // console.log(liveNumber)
        },3000)

    //    clearInterval(interval)
    },[])

    useEffect(() => {
        // console.log(date)
        if(date.length){
            // setIsFilteringDate(true)
            isFilteringDate = true
            // console.log(isFilteringDate)
        }else{
            // setIsFilteringDate(false)
            isFilteringDate = false
            // console.log(isFilteringDate)
        }
       
    },[date])


    useEffect(() => {
        const interval = setInterval(() => {
            if(isFilteringDate === false){
                fetchLive()
            }
          
          }, 1000);
          return () => clearInterval(interval);


    },[date])
    return(
        <>
            <Header/>
            <Navbar/>
            
            
            <div className='homepage-img-container'>
                {/* <img src={homepageimg} alt="homepage image"></img> */}
            </div>

            <section className='hot-game-section'>
                <div className='hot-game-title-container'>
                    <p className='hot-game-title'>
                        {current_language === "english" ? "Hot Game" : "နာမည်ကြီးကစားနည်း"}
                    </p>
                    <p className='hot-game-subtitle'>
                        All Available at
                    </p>
                </div>
                <div className='App hot-game-content-container'>
                    <div className='hot-game-btn-container'>
                        <button onClick={() => setTwoOrThree("two")} className={twoOrThree === "two" ? 'hot-game-2d-btn hot-game-active' : 'hot-game-2d-btn'}>
                        {current_language === "english" ? "2D" : "၂လုံး"}
                        </button>
                        <button onClick={() => setTwoOrThree("three")} className={twoOrThree === "three" ? 'hot-game-3d-btn hot-game-active' : 'hot-game-3d-btn'}>
                        {current_language === "english" ? "3D" : "၃လုံး"}
                        </button>
                    </div>

                    <div className='hot-game-outer'>
                        <div className='hot-game-inner'>
                            <div className='hot-game-img-container'>
                                <img src={hotgameimg} alt="hot game image"/>
                            </div>
                            <div className='hot-game-text-container'>
                                <div className='hot-game-text-header-container'>
                                    <p data-before={twoOrThree === "two" ? current_language === "english" ? "2D" : "၂လုံး" : current_language === "english" ? "3D" : "၃လုံး"} className='hot-game-text-title'>
                                        {twoOrThree === "two" ? current_language === "english" ? "2D" : "၂လုံး" : null}
                                        {twoOrThree === "three" ? current_language === "english" ? "3D" : "၃လုံး" : null}
                                    </p>
                                    <div className='hot-game-text-compensation-container'>
                                        <p className='hot-game-text-compensation-text'>{current_language === "english" ? "Maximum Compensation" : "အမြင့်ဆုံးဆ"}</p>
                                        <p className='hot-game-text-compensation-number'>{current_language === "english" ? "95" : "၉၅"}</p>
                                    </div>
                                </div>

                                {/* <p className='hot-game-text'>Professional lottery platform, fast lottery opening, high payout, rich gameplay! TTBET is dedicated to providing rich games to global lottery users and creating a high-quality entertainment environment for players.</p> */}
                                <Link to={twoOrThree === "two" ? "/2d" : "/3d"} className='hot-game-btn'>{current_language === "english" ? "Enter" : "ဝင်မည်"} <Icon icon="ep:arrow-right-bold" /></Link>
                            </div>


                        </div>
                    </div>

        
                </div>

            </section>

            <section className='App live-section'>
                <div className='live-content-container'>
                    <div className='live-btn-container'>
                        <button className='live-2d-btn'>{current_language === "english" ? "2D" : "၂လုံး"}</button>
                        {/* <button className='live-3d-btn'>3D</button> */}
                    </div>

                    <div className='live-view'>
                        <p ref={liveNumber}>{live}</p>
                    </div>

                    {/* <input value={date}  className='live-date' type="date" id="live-date" name="live-date" onChange={(e) => handleDateChange(e)}></input> */}

                    <div className='live-numbers-container'>
                        <div className='won-number-container'>
                            <p className='won-number-time'>
                                {current_language === "english" ? "Morning" : "မနက်ခင်း"}
                            </p>

                            <div className='won-number-content-container'>
                                <div className='won-number'>
                                    {morningResult?.twod}
                                </div>

                                <div className='live-setvalue-container'>
                                    <div className='live-set-container'>
                                        <p className='live-set-label'>Set:</p>
                                        <p className='live-set-number'>{morningResult?.set}</p>
                                    </div>
                                    <div className='live-value-container'>
                                        <p className='live-value-label'>Value:</p>
                                        <p className='live-value-number'>{morningResult?.value}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='won-number-container'>
                            <p className='won-number-time'>
                            {current_language === "english" ? "Evening" : "ညနေခင်း"}
                            </p>

                            <div className='won-number-content-container'>
                                <div className='won-number'>
                                    {eveningResult?.twod}
                                </div>

                                <div className='live-setvalue-container'>
                                    <div className='live-set-container'>
                                        <p className='live-set-label'>Set:</p>
                                        <p className='live-set-number'>{eveningResult?.set}</p>
                                    </div>
                                    <div className='live-value-container'>
                                        <p className='live-value-label'>Value:</p>
                                        <p className='live-value-number'>{eveningResult?.value}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='App line-hori'></div>
            
            {/* <section className='App check-voucher-section'>
                <div className='check-voucher-container'>
                    <p className='check-voucher-title'>Check Voucher</p>
                    <label className='check-voucher-input-container' htmlFor='voucher-input'>
                        <p>Voucher No.</p>
                        <input type="text" name="voucher-input" id="voucher-input" className='voucher-input'></input>
                        <Icon icon="bi:qr-code-scan" className='qr-icon' />
                    </label>

                    <button className='check-voucher-btn'>Check Voucher</button>
                </div>

                <Icon icon="bx:up-arrow" className='check-voucher-arrow' />

                <div className='voucher-details-container'>
                    <p className='voucher-details-title'>Voucher</p>
                    <div className='voucher-details-content-container'>
                        <div className='voucher-details-content'>
                            <div className='voucher-code-container'>
                                <p className='voucher-code-label'>Voucher No.:</p>
                                <p className='voucher-code'>486343846325912846</p>
                            </div>

                            <div className='voucher-num-amount-container'>
                                <div className='voucher-num-container'>
                                    <p className='voucher-num-label'>Number:</p>
                                    <p className='voucher-num'>44</p>
                                </div>
                                <div className='voucher-amount-container'>
                                    <p className='voucher-amount-label'>Amount:</p>
                                    <p className='voucher-amount'>10000ks</p>
                                </div>
                            </div>
                        </div>

                        <button className='voucher-detailes-btn'>Check Details</button>
                    </div>
                </div>
            </section> */}


            <section className='App lai-container'>
                <div className='lottery-container'>
                    
                    <p className='lottery-header'>L
                        <p className='lottery-header1'>Lottery</p>
                        <p className='lottery-header2'>ottery</p>
                    </p>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                            <img src={lotteryimage} alt="lottery image"></img>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>2 or 3</p>
                            <p className='lottery-text-subtitle'>Popular Lottery</p>
                        </div>
                    </div>
                    
                </div>
                <div className='lottery-container'>
                    
                    <p className='lottery-header p'>P
                        <p className='lottery-header1'>Advantage</p>
                        <p className='lottery-header2 '>roduct Advantage</p>
                    </p>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                            <Icon icon="fluent:device-meeting-room-remote-48-regular"  className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>Can be played on any type of device</p>
                            <p className='lottery-text-subtitle'>PC, Wap, IOS, Android App</p>
                        </div>
                    </div>
                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="twemoji:pool-8-ball" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>Open Live Lottery</p>
                            <p className='lottery-text-subtitle'>The winnings are added to the game account with the fastest system</p>
                        </div>
                    </div>
                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="ant-design:line-chart-outlined" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>High compensation</p>
                            <p className='lottery-text-subtitle'>95x only available here</p>
                        </div>
                    </div>
                    
                </div>
                <div className='lottery-container'>
                    
                    <p className='lottery-header'>I
                        <p className='lottery-header1'>Information Center</p>
                        <p className='lottery-header2'>nformation Center</p>
                    </p>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="ep:chat-line-round" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>A common problem</p>
                            <p className='lottery-text-subtitle'>How to play, how to buy lottery, etc</p>
                        </div>
                    </div>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="majesticons:money-minus-line" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>How to make a deposit?</p>
                            <p className='lottery-text-subtitle'>Regarding deposit, deposit duration, deposit system, etc</p>
                        </div>
                    </div>
                    
                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="majesticons:money-plus-line" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>How to withdraw money</p>
                            <p className='lottery-text-subtitle'>About withdrawing money, withdrawal duration, money receiving system, etc
</p>
                        </div>
                    </div>

                    
                </div>
            </section>
            {/* <ToastContainer /> */}
        </>
    )
}

export default Home