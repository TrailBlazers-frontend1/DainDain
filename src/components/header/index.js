import React,{useState, useEffect} from 'react'
import "./styles.css"
import myanmarflag from "../../imgs/myanmar-flag.jpg"
import englandflag from "../../imgs/england-flag.webp"
import Dropdown from '../../components/dropdown'
import Login from '../../components/login'
import Register from '../../components/register'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { logout } from '../../redux/user'

import { Icon } from '@iconify/react';

const Header = () => {
    const [language,setLanguage] = useState("myanmar")
    const [isLoginOpen,setIsLoginOpen] = useState(false)
    const [isDaiRegOpen,setIsDaiRegOpen] = useState(false)
    const [agentRemaining,setAgentRemaining] = useState("")

    const {user_login} = useSelector(state => state.user)
    const {agent_list} = useSelector(state => state.agent)

    const dispatch = useDispatch()

    useEffect(() => {
        if(user_login.role === "agent"){
            const foundAgent = agent_list.find((agent) => {
                if(agent.phNo === user_login.phNo){
                    return agent
                }
            })
            // console.log(foundAgent.remainingAmount)
            setAgentRemaining(foundAgent?.remainingAmount)
        }
    },[user_login])

    const options = [
        {label : "Myanmar", value:"myanmar"},
        {label : "English", value:"english"},
    ]

    const handleChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleUserLogout = () => {
        dispatch(logout())
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
                            user_login.role === "agent" ? <>
                            <p className='agent-remaining-amount'>{agentRemaining}<Icon icon="ri:copper-coin-fill" className='agent-remaining-header-coin-icon'/></p>
                            <Link to ="/profile" className='user-name'>{user_login.name}<span>({user_login.role})</span></Link></> : 
                            <p className='user-name'>{user_login.name}<span>({user_login.role})</span></p>
                            
                        }
                            
                            <button className='log-out-btn' onClick={() => handleUserLogout()}>Log Out</button>
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