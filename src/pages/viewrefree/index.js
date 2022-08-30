import React from 'react'
import "./styles.css"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import avatar from "../../imgs/avatar.png"
import { Icon } from '@iconify/react';

import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"

const ViewRefree = () => {

    const {user_login} = useSelector(state => state.user)

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
                        {/* <form className='agent-change-profile-form'>
                            <label className='agent-change-profile-input-container' htmlFor='change-profile'>
                                Change Profile Imge
                                <input className='agent-change-profile-input' type="file" id="change-profile"  accept="image/png, image/jpeg"></input>
                            </label>

                        </form> */}

                    
                </div>

                <div className='agent-name-container'>
                    
            
                    <>
                        <p>Referee Name</p>
                        
                    </>
                    
                </div>

                <p className='agent-id'>rf-001</p>

                <div className='view-referee-phno-container'>
                    <p>Phone No.:</p>
                    <p className='view-referee-phno'>0912345678</p>
                </div>


                <div className='view-referee-remark-container'>
                    <p>This is this referee remark.....</p>
                </div>

                {/* <div className='agent-coin-container'>
                    <p>Remaining Amount:</p>
                    <div className='agent-remaining-coin-container'>
                        <p>100000</p>
                        <Icon icon="ri:copper-coin-fill" className='agent-remaining-coin-icon'/>
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

export default ViewRefree