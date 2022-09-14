import React,{useState, useEffect} from 'react'
import "./styles.css"
import myanmarflag from "../../imgs/myanmar-flag.jpg"
import englandflag from "../../imgs/england-flag.webp"
import refreeprofile from "../../imgs/avatar.png"
import Dropdown from '../../components/dropdown'
import Login from '../../components/login'
import Register from '../../components/register'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
import { setAgentProfile } from '../../redux/agent' 
import { pusher } from '../../pusher'

import {useNavigate} from "react-router-dom"

import { Icon } from '@iconify/react';
import { axiosInstance } from '../../urlConfig'
import { changeLangauge } from '../../redux/langauge'
import { setRefereeProfile } from '../../redux/refereeProfile'

const Header = () => {
    // const [language,setLanguage] = useState("english")
    const [isLoginOpen,setIsLoginOpen] = useState(false)
    const [isDaiRegOpen,setIsDaiRegOpen] = useState(false)
    const [isProfileLinkIconOpen,setIsProfileLinkIconOpen] = useState(false)
    const [agentRemaining,setAgentRemaining] = useState("")

    const {user_login} = useSelector(state => state.user)
    const {profile} = useSelector(state => state.agent)
    const {refereeProfile} = useSelector(state => state.refereeProfile)
    const {current_language} = useSelector(state => state.language)

    const navigate = useNavigate()
    

    const dispatch = useDispatch()

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
            // alert(error.message)
        }
        
    }

    const fetchRefereeProfile =  async ()=>{
        try {
            const res = await axiosInstance.get("/referee",{headers:{Authorization:`Bearer ${user_login.token}`}})
            console.log(res)
            if(res.data.status === 200){
                dispatch(setRefereeProfile(res.data.referee))
            }
        } catch (error) {
            // alert(error.message)
        }
     
    }

    useEffect(() => {
        if(user_login.isLoggedIn && user_login.role === "agent"){        

        fetchAgentProfile()
        fetchRefereeProfile()

        const channel = pusher.subscribe(`channel-name.${profile.refereeId}`);
        channel.bind('App\\Events\\Notify', function(data) {
        
          alert(data)
         
        });

    }
            
    },[])

    const options = [
        {label : "Myanmar", value:"myanmar"},
        {label : "English", value:"english"},
    ]

    const handleChange = (e) => {
        // setLanguage(e.target.value)
        // console.log(language)
        dispatch(changeLangauge(e.target.value))
    }

    const handleUserLogout = async () => {
        // {headers:{Authorization:`Bearer ${user_login.token}`}}
        try {
            const res = await axiosInstance.post("/logout",{},{headers:{Authorization:`Bearer ${user_login.token}`}})

            if(res.data.status === 200){
                alert(res.data.message)
                dispatch(logout())
                localStorage.removeItem("auth")
                
                navigate("/")
            }
        } catch (error) {
            alert(error.message)
        }
        
        
    }

    const handleProfileCLicked = () => {
        if(isProfileLinkIconOpen){
            setIsProfileLinkIconOpen(false)
        }else{
            setIsProfileLinkIconOpen(true)
        }

        // console.log(isProfileLinkIconOpen)
    }

  return (
    <>

    <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}/>
    <Register isDaiRegOpen={isDaiRegOpen} setIsDaiRegOpen={setIsDaiRegOpen}/>
        <div className='header'>
            <div className='header-content-container'>
                <div className='language-container'>
                    <div className='flag-container'>
                        <img src={current_language === "myanmar" ? myanmarflag : englandflag} alt="myanmar"/>
                    </div>
                    <Dropdown
                    options={options}
                    value={current_language}
                    handleChange={handleChange}
                    color={"white"}
                    />
                </div>

                <div className='header-btn-container'>
                    {
                        user_login.isLoggedIn ? <>
                        {
                            user_login.role === "agent" && <>
                            <p className='agent-remaining-amount'>{profile.coin_amount}<Icon icon="ri:copper-coin-fill" className='agent-remaining-header-coin-icon'/></p>
                            <p className='agent-comission'>Comission : {profile?.commission}</p>
                            <p className='user-name'>
                                {user_login.name}
                                <span>{current_language === "english" ? "Agent" : "‌အေးဂျင့်"}</span>
                                <div className= "profile-link" >
                                    <Icon icon="ant-design:setting-filled" className='profile-link-icon' onClick={() => handleProfileCLicked()}/>

                                    <div className={isProfileLinkIconOpen ? "profile-dropdown-container profile-link-open" : "profile-dropdown-container profile-link-close"}>
                                        <Link to="/agentprofile">{current_language === "english" ? "Profile" : "ကိုယ်ရေးအကျဉ်း"}</Link>
                                        <button className='log-out-btn' onClick={() => handleUserLogout()}>{current_language === "english" ? "Log Out" : "ထွက်မည်"}</button>
                                    </div>
                                </div>
                            </p>
                            <Link to="/viewreferee" className='agent-refree-profile-icon-container'>
                                <img src={refreeprofile}/>
                                {
                                    refereeProfile.is_online === 1 && <div className='active-dot'></div>
                                }
                                
                            </Link>
                            </> 
                            
                            
                        }
                        {
                            user_login.role === "operationstaff" && <>
                                <p to = "/opprofile" className='user-name'>
                                    {user_login.name}
                                    <span>({user_login.role})</span>
                                    <div className= "profile-link" >
                                    <Icon icon="ant-design:setting-filled" className='profile-link-icon' onClick={() => handleProfileCLicked()}/>

                                        <div className={isProfileLinkIconOpen ? "profile-dropdown-container profile-link-open" : "profile-dropdown-container profile-link-close"}>
                                            <Link to="/opprofile">{current_language === "english" ? "Profile" : "ကိုယ်ရေးအကျဉ်း"}</Link>
                                            <button className='log-out-btn' onClick={() => handleUserLogout()}>{current_language === "english" ? "Log Out" : "ထွက်မည်"}</button>
                                        </div>
                                    </div>
                                    </p>
                                    {/* <button className='log-out-btn' onClick={() => handleUserLogout()}>Log Out</button> */}
                            </>
                        }
                        {
                            user_login.role === "guest" &&<div className='align-center'>
                             <p className='user-name'>{user_login.name}<span>({user_login.role})</span></p>
                             <button className='log-out-btn' onClick={() => handleUserLogout()}>{current_language === "english" ? "Log Out" : "ထွက်မည်"}</button>
                             </div>
                        }
                            
                            {/* <button className='log-out-btn' onClick={() => handleUserLogout()}>Log Out</button> */}
                        </> : <>
                        <button className='login-btn' onClick={() => setIsLoginOpen(true)}>{current_language === "english" ? "Log In" : "ဝင်မည်"}</button>
                        <button className='signup-btn' onClick={() => setIsDaiRegOpen(true)}>{current_language === "english" ? "Sign Up" : "အကောင့်ဆောက်မည်"}</button>
                        </>
                    }
                    
                </div>
                    {/* <br></br> */}
                
            </div>
            {
                    user_login.isLoggedIn && user_login.role === "agent" &&
                    <p className='referee-remark'>{current_language === "english" ? "Referee's Remark" : "ဒိုင်သတင်းစကား"}: {refereeProfile.remark}</p>
                }
        </div>
    </>
  )
}

export default Header