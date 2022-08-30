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

import {useNavigate} from "react-router-dom"

import { Icon } from '@iconify/react';
import { axiosInstance } from '../../urlConfig'

const Header = () => {
    const [language,setLanguage] = useState("myanmar")
    const [isLoginOpen,setIsLoginOpen] = useState(false)
    const [isDaiRegOpen,setIsDaiRegOpen] = useState(false)
    const [isProfileLinkIconOpen,setIsProfileLinkIconOpen] = useState(false)
    const [agentRemaining,setAgentRemaining] = useState("")

    const {user_login} = useSelector(state => state.user)
    const {profile} = useSelector(state => state.agent)

    const navigate = useNavigate()
    

    const dispatch = useDispatch()

    useEffect(() => {
        if(user_login.isLoggedIn && user_login.role === "agent"){

        
        const fetchAgentProfile =  () => {
            // const res = await axiosInstance.get("/agent-profile",{headers:{Authorization:`Bearer ${user_login.token}`}})

            // console.log(res)
            // if(res.data.status === 200){
                // const agent = {
                //     image:res.data.user.image,
                //     coin_amount:res.data.user.coin_amount,
                //     commission:res.data.user.commision,
                //     twod_sale_list:res.data.twod_saleLists,
                //     threed_sale_list:res.data.threed_salelists,
                //     lonepyine_sale_list:res.data.lonepyaing_salelists,
                // }

                const agent = {
                        image:"",
                        coin_amount:"10000",
                        commission:"5",
                        twod_sale_list:[],
                        threed_sale_list:[],
                        lonepyine_sale_list:[],
                    }

                dispatch(setAgentProfile(agent))

                console.log(profile)
            // }
        }

        fetchAgentProfile()

    }
    
            
    },[user_login])

    const options = [
        {label : "Myanmar", value:"myanmar"},
        {label : "English", value:"english"},
    ]

    const handleChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleUserLogout = async () => {
        // {headers:{Authorization:`Bearer ${user_login.token}`}}
        // const res = await axiosInstance.post("/logout",{},{headers:{Authorization:`Bearer ${user_login.token}`}})

        // console.log(res)
        // if(res.data.status === 200){
            // alert(res.data.message)
            dispatch(logout())
            localStorage.removeItem("auth")
            
            navigate("/")
        // }
        
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
                        <img src={language === "myanmar" ? myanmarflag : englandflag} alt="myanmar"/>
                    </div>
                    <Dropdown
                    options={options}
                    value={language}
                    handleChange={handleChange}
                    color={"white"}
                    />
                </div>

                <div className='header-btn-container'>
                    {
                        user_login.isLoggedIn ? <>
                        {
                            user_login.role === "agent" && <>
                            <p className='agent-remaining-amount'>{agentRemaining ? agentRemaining : 0}<Icon icon="ri:copper-coin-fill" className='agent-remaining-header-coin-icon'/></p>
                            <p className='agent-comission'>Comission : {profile?.commission}</p>
                            <p className='user-name'>
                                {user_login.name}
                                <span>(agent)</span>
                                <div className= "profile-link" >
                                    <Icon icon="ant-design:setting-filled" className='profile-link-icon' onClick={() => handleProfileCLicked()}/>

                                    <div className={isProfileLinkIconOpen ? "profile-dropdown-container profile-link-open" : "profile-dropdown-container profile-link-close"}>
                                        <Link to="/agentprofile">Profile</Link>
                                        <button className='log-out-btn' onClick={() => handleUserLogout()}>Log Out</button>
                                    </div>
                                </div>
                            </p>
                            <Link to="/viewreferee" className='agent-refree-profile-icon-container'>
                                <img src={refreeprofile}/>
                                <div className='active-dot'></div>
                            </Link>
                            </> 
                            
                            
                        }
                        {
                            user_login.role === "operation staff" && <>
                                <p to = "/opprofile" className='user-name'>
                                    {user_login.name}
                                    <span>({user_login.role})</span>
                                    <Link className='profile-link'  to="/opprofile">
                                        <Icon icon="ant-design:setting-filled" className='profile-link-icon'/>
                                    </Link>
                                    </p>
                                    <button className='log-out-btn' onClick={() => handleUserLogout()}>Log Out</button>
                            </>
                        }
                        {
                            user_login.role === "guest" &&<div className='align-center'>
                             <p className='user-name'>{user_login.name}<span>({user_login.role})</span></p>
                             <button className='log-out-btn' onClick={() => handleUserLogout()}>Log Out</button>
                             </div>
                        }
                            
                            {/* <button className='log-out-btn' onClick={() => handleUserLogout()}>Log Out</button> */}
                        </> : <>
                        <button className='login-btn' onClick={() => setIsLoginOpen(true)}>Log in</button>
                        <button className='signup-btn' onClick={() => setIsDaiRegOpen(true)}>Sign up</button>
                        </>
                    }
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Header