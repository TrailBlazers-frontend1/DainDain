import React from 'react'
import "./styles.css"
import avatar from "../../imgs/avatar.png"
import { Icon } from '@iconify/react';
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"

const AgentProfile = () => {

    const {user_login} = useSelector(state => state.user)

    if(user_login.isLoggedIn){
        return (
          <>
            <Header/>
            <Navbar/>

            <div className='App agent-profile-parent-container'>
                <div className='agent-profile-img-parent-container'>
                    <div className='agent-profile-img-container'>
                        <img src={avatar} alt="agent profile image"/>
                    </div>

                    <Icon icon="ant-design:setting-filled" className='agent-profile-img-icon'/>
                </div>

                <div className='agent-name-container'>
                    <p>User Name</p>
                    <Icon icon="ant-design:setting-filled" className='agent-profile-name-icon'/>
                </div>

                <p className='agent-id'>ag-001</p>

                <div className='agent-coin-container'>
                    <p>Remaining Amount:</p>
                    <div className='agent-remaining-coin-container'>
                        <p>100000</p>
                        <Icon icon="ri:copper-coin-fill" className='agent-remaining-coin-icon'/>
                    </div>
                </div>

                <div className='agent-transaction-history-parent-container'>
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