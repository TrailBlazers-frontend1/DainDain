import React from 'react'
import "./styles.css"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"

const RefreeRequests = () => {

    const {user_login} = useSelector(state => state.user)

    if(user_login.isLoggedIn){
    return (
        <>
            <Header/>
            <Navbar/>

            <div className='App refree-requests-parent-container'>
                <div className='refree-requests-container'>
                    <p className='refree-requests-header'>Refree Requests</p>

                    <div className='refree-requests-accdec-parent-container'>
                        <div className='refree-requests-accdec-headers-container'>
                            <p>Name</p>
                            <p>PhNo</p>
                        </div>

                        <div className='refree-requests-accdec-container'>
                            <div className='refree-requests-accdec-row'>
                                <p className='refree-requests-name'>User Name</p>
                                <p className='refree-requests-phno'>0912345678</p>
                                <div className='refree-requests-btn-container'>
                                    <button>Accept</button>
                                    <button>Decline</button>
                                </div>
                            </div>
                            <div className='refree-requests-accdec-row'>
                                <p className='refree-requests-name'>User Name</p>
                                <p className='refree-requests-phno'>0912345678</p>
                                <div className='refree-requests-btn-container'>
                                    <button>Accept</button>
                                    <button>Decline</button>
                                </div>
                            </div>
                            <div className='refree-requests-accdec-row'>
                                <p className='refree-requests-name'>User Name</p>
                                <p className='refree-requests-phno'>0912345678</p>
                                <div className='refree-requests-btn-container'>
                                    <button>Accept</button>
                                    <button>Decline</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='refree-list-parent-container'>
                    <p className='refree-list-header'>Refrees</p>

                    <div className='refree-list-container'>
                        <div className='refree-list-labels-container'>
                            <p>Name</p>
                            <p>PhNo</p>
                            <p>Agent Id</p>
                            <p>Joined On</p>
                        </div>

                        <div className='refree-list-row-container'>
                            <div className='refree-list-row'>
                                <p>User Name</p>
                                <p>0912345678</p>
                                <p>ag-001</p>
                                <p>08/13/2022</p>
                            </div>
                            <div className='refree-list-row'>
                                <p>Customer Name</p>
                                <p>0912345678</p>
                                <p>ag-001</p>
                                <p>08/13/2022</p>
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

export default RefreeRequests