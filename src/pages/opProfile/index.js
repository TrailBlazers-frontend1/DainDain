import React,{useState} from 'react'
import avatar from "../../imgs/avatar.png"
import { Icon } from '@iconify/react';
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import "./styles.css"

const OpProfile = () => {
    const [isChangeUsername,setIsChangeUsername] = useState(false)
    const [agentName,setAgentName] = useState("User Name")
    const {user_login} = useSelector(state => state.user)

    const handleUserNameChangeCancel = () => {
        setIsChangeUsername(false)
        setAgentName("User Name")
    }

    const handleUserNameChangeConfirm = () => {
        setIsChangeUsername(false)
        // setAgentName()
    }
    if(user_login.isLoggedIn && user_login.role === "operation staff"){
        return (
            <>
                    <Header/>
                    <Navbar/>
        
                    <div className='App agent-profile-parent-container'>
                        <div className='agent-profile-img-parent-container'>
                            <div className='agent-profile-img-container'>
                                <img src={avatar} alt="agent profile image"/>
                            </div>
        
                            
                                {/* <Icon icon="ant-design:setting-filled" className='agent-profile-img-icon'/> */}
                                <form className='agent-change-profile-form'>
                                    <label className='agent-change-profile-input-container' htmlFor='change-profile'>
                                        Change Profile Imge
                                        <input className='agent-change-profile-input' type="file" id="change-profile"  accept="image/png, image/jpeg"></input>
                                    </label>
        
                                </form>
        
                            
                        </div>
        
                        <div className='agent-name-container'>
                            {
                                isChangeUsername ?<>
                                <input value={agentName} onChange={(e) => setAgentName(e.target.value)} type="text" className='change-username-input'></input>
                                <button className='confirm-username-btn' onClick={() => handleUserNameChangeConfirm()}>Confirm</button>
                                <button className='cancel-username-btn' onClick={() => handleUserNameChangeCancel()}>Cancel</button>
                                </> : 
                                <>
                                <p>{agentName}</p>
                                <Icon icon="ant-design:setting-filled" className='agent-profile-name-icon' onClick={() => setIsChangeUsername(true)}/>
                                </>
                            }
                            
                        </div>
        
                        <p className='agent-id'>op-001</p>
        
                        {/* <div className='agent-coin-container'>
                            <p>Remaining Amount:</p>
                            <div className='agent-remaining-coin-container'>
                                <p>100000</p>
                                <Icon icon="ri:copper-coin-fill" className='agent-remaining-coin-icon'/>
                            </div>
                        </div> */}
        
                        {/* <div className='agent-transaction-history-parent-container'>
                            <p>Transaction History</p>
        
                            <div className='agent-transaction-history-container'>
                                <div className='agent-transaction-history-labels-container'>
                                    <p>Name</p>
                                    <p>PhNo</p>
                                    <p>Number</p>
                                    <p>Wash Rate</p>
                                    <p>Amount</p>
                                </div>
        
                                <div className='agent-transaction-history-rows-container'>
        
                                <div className='agent-transaction-history-row'>
                                    <p>Customer Name</p>
                                    <p>0912345678</p>
                                    <p>34</p>
                                    <p>85</p>
                                    <p>2000ks</p>
                                </div>
                                <div className='agent-transaction-history-row'>
                                    <p>User Name</p>
                                    <p>0912345678</p>
                                    <p>34</p>
                                    <p>85</p>
                                    <p>2000ks</p>
                                </div>
                                </div>
        
                            </div>
                        </div> */}
                    </div>
                  </>
          )
    }else{
        return(
            <Navigate to ="/" replace={true}></Navigate>
          )
    }
 
}

export default OpProfile