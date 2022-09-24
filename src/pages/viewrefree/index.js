import React,{useState, useEffect} from 'react'
import "./styles.css"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import avatar from "../../imgs/avatar.png"
import { Icon } from '@iconify/react';

import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"
import { axiosInstance } from '../../urlConfig'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ViewRefree = () => {

    const [refereeName,setRefereeName] = useState("")
    const [refereeImage,setRefereeImage] = useState("")
    const [refereeId,setRefereeId] = useState("")
    const [refereePhone,setRefereePhone] = useState("")

    const {user_login} = useSelector(state => state.user)
    const {current_language} = useSelector(state => state.language)
    const {refereeProfile} = useSelector(state => state.refereeProfile)

    const notify = (message) => toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });

    const fetchRefereeProfile =  async ()=>{
        try {
            const res = await axiosInstance.get("/referee",{headers:{Authorization:`Bearer ${user_login.token}`}})
            // console.log(res)
            if(res.data.status === 200){
                setRefereeName(res.data.referee.user.name)
                setRefereePhone(res.data.referee.user.phone)
                setRefereeId(res.data.referee.referee_code)
            }
        } catch (error) {
            notify(error.message)
        }
     
    }


    useEffect(() => {
        if(user_login.isLoggedIn && user_login.role === "agent"){ 
            fetchRefereeProfile()
        }    
       
    },[])

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
                        <p>{refereeName}</p>
                        
                    </>
                    
                </div>

                <p className='agent-id'>{refereeId}</p>

                <div className='view-referee-phno-container'>
                    <p>{current_language === "english" ? "Phone  :" : "ဖုန်း   :"}</p>
                    <p className='view-referee-phno'>{refereePhone}</p>
                </div>


                <div className='view-referee-remark-container'>
                    <p>{refereeProfile.remark}</p>
                </div>

                {/* <div className='agent-coin-container'>
                    <p>Remaining Amount:</p>
                    <div className='agent-remaining-coin-container'>
                        <p>100000</p>
                        <Icon icon="ri:copper-coin-fill" className='agent-remaining-coin-icon'/>
                    </div>
                </div> */}
            </div>
            {/* <ToastContainer /> */}
            </>
        )
    }else{
        return(
            <Navigate to ="/" replace={true}></Navigate>
          )
    }
}

export default ViewRefree