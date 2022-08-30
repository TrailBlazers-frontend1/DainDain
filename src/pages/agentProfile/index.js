import React,{useState, useRef, useEffect} from 'react'
import "./styles.css"
import avatar from "../../imgs/avatar.png"
import { Icon } from '@iconify/react';
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import {Navigate} from "react-router-dom"

import {useDispatch, useSelector} from "react-redux"

import { axiosInstance } from '../../urlConfig';
import { changeName } from '../../redux/agent';
import { changeUserName } from '../../redux/user';

const AgentProfile = () => {

    const {user_login} = useSelector(state => state.user)
    const {profile} = useSelector(state => state.agent)

    const [profileImage,setProfileImage] = useState()
    const [agentName,setAgentName] = useState(user_login.name)

    const [isChangeUsername,setIsChangeUsername] = useState(false)
    const profileimgRef = useRef()

    const dispatch = useDispatch()

   

    const onProfileChangeSubmit = (e) => {
        e.preventDefault()
    //    console.log(profileImage)
        const formData = new FormData();
        formData.append("" , profileImage)

    }

    const handleUserNameChangeCancel = () => {
        setIsChangeUsername(false)
        setAgentName(profile.name)
    }

    const onProfileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        // console.log(profileImage)
    }

    const onProfileCancelClicked = () => {
        profileimgRef.current.value = null
        // setProfileImage()
        console.log(profileimgRef)
    }

    const handleUserNameChangeConfirm = async () => {
        setIsChangeUsername(false)
        // setAgentName()
        const res =await  axiosInstance.post("/profile-update",{
            name : agentName
        },{headers:{Authorization:`Bearer ${user_login.token}`}})

        // console.log(res)
        if(res.data.status === 200){
            alert(res.data.message)
            const newName = res.data.data.name
            // console.log(newName)
            // dispatch(changeName(newName))
            dispatch(changeUserName(newName))
        }
        setAgentName(user_login.name)
    }

    

    if(user_login.isLoggedIn && user_login.role === "agent"){
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
                        <form onSubmit={(e) => onProfileChangeSubmit(e)} className='agent-change-profile-form'>
                            <label className='agent-change-profile-input-container' htmlFor='change-profile'>
                                Change Profile Imge
                                <input ref={profileimgRef}  onChange={(e) => onProfileChange(e)} className='agent-change-profile-input' type="file" id="change-profile"  accept="image/png, image/jpeg"></input>
                                <p className='chosen-img'>{profileImage && profileImage.name}</p>
                            </label>
                            {
                                profileImage ?  <div className='profile-change-btn-container'>
                                    <button type='submit'>Change Profile</button>
                                    <button type='button' onClick={() => onProfileCancelClicked()}>Cancel</button>
                                    </div> : null
                            }
                           
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
                        <p>{user_login.name}</p>
                        <Icon icon="ant-design:setting-filled" className='agent-profile-name-icon' onClick={() => setIsChangeUsername(true)}/>
                        </>
                    }
                    
                </div>

                <p className='agent-id'>ag-001</p>

                <div className='agent-coin-container'>
                    <p>Remaining Amount:</p>
                    <div className='agent-remaining-coin-container'>
                        <p>{profile.coin_amount}</p>
                        <Icon icon="ri:copper-coin-fill" className='agent-remaining-coin-icon'/>
                    </div>
                </div>

                <div className='agent-transaction-history-parent-container'>
                    <p>2Pieces Transaction History</p>

                    <div className='agent-transaction-history-container'>
                        {/* <p className='agent-transaction-history-header'>2pieces </p> */}
                        <div className='agent-transaction-history-labels-container'>
                            <p>Name</p>
                            <p>PhNo</p>
                            <p>Number</p>
                            <p>Compensation</p>
                            <p>Amount</p>
                            <p>Status</p>
                        </div>

                        <div className='agent-transaction-history-rows-container'>

                            {
                                profile.twod_sale_list.map((list) => (
                                    <div className='agent-transaction-history-row'>
                                        <p>{list.customer_name}</p>
                                        <p>{list.customer_phone}</p>
                                        <p>{list.twod.number}</p>
                                        <p>{list.twod.compensation}</p>
                                        <p>{list.sale_amount}ks</p>
                                        {
                                        list.status === 1 &&
                                        <p className='agent-transaction-accepted'>Accepted</p>
                                        }
                                        {
                                             list.status === 2 &&
                                             <p className='agent-transaction-declined'>Declined</p>
                                        }
                                        
                                    </div>
                                ))
                            }

                        
                       
                        </div>

                    </div>
                </div>
                <div className='agent-transaction-history-parent-container'>
                    <p>Lone Pyine Transaction History</p>

                    <div className='agent-transaction-history-container'>
                        {/* <p className='agent-transaction-history-header'>2pieces </p> */}
                        <div className='agent-transaction-history-labels-container'>
                            <p>Name</p>
                            <p>PhNo</p>
                            <p>Number</p>
                            <p>Compensation</p>
                            <p>Amount</p>
                            <p>Status</p>
                        </div>

                        <div className='agent-transaction-history-rows-container'>

                        {
                                profile.lonepyine_sale_list.map((list) => (
                                    <div className='agent-transaction-history-row'>
                                        <p>{list.customer_name}</p>
                                        <p>{list.customer_phone}</p>
                                        <p>{list.lonepyaing.number}</p>
                                        <p>{list.lonepyaing.compensation}</p>
                                        <p>{list.sale_amount}ks</p>
                                        {
                                        list.status === 1 &&
                                        <p className='agent-transaction-accepted'>Accepted</p>
                                        }
                                        {
                                             list.status === 2 &&
                                             <p className='agent-transaction-declined'>Declined</p>
                                        }
                                        
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
                <div className='agent-transaction-history-parent-container'>
                    <p>3Pieces Transaction History</p>

                    <div className='agent-transaction-history-container'>
                        {/* <p className='agent-transaction-history-header'>2pieces </p> */}
                        <div className='agent-transaction-history-labels-container'>
                            <p>Name</p>
                            <p>PhNo</p>
                            <p>Number</p>
                            <p>Compensation</p>
                            <p>Amount</p>
                            <p>Status</p>
                        </div>

                        <div className='agent-transaction-history-rows-container'>

                        {
                                profile.threed_sale_list.map((list) => (
                                    <div className='agent-transaction-history-row'>
                                        <p>{list.customer_name}</p>
                                        <p>{list.customer_phone}</p>
                                        <p>{list.threed.number}</p>
                                        <p>{list.threed.compensation}</p>
                                        <p>{list.sale_amount}ks</p>
                                        {
                                        list.status === 1 &&
                                        <p className='agent-transaction-accepted'>Accepted</p>
                                        }
                                        {
                                             list.status === 2 &&
                                             <p className='agent-transaction-declined'>Declined</p>
                                        }
                                        
                                    </div>
                                ))
                            }
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

export default AgentProfile