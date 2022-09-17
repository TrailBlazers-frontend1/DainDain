import React,{useState, useRef, useEffect} from 'react'
import avatar from "../../imgs/avatar.png"
import { Icon } from '@iconify/react';
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import "./styles.css"
import { axiosInstance } from '../../urlConfig';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const OpProfile = () => {
    const [isChangeUsername,setIsChangeUsername] = useState(false)
    const [agentName,setAgentName] = useState("")
    const [opCode, setOpCode] = useState("")
     const [profileImage,setProfileImage] =useState()

    const profileimgRef = useRef()
    const {user_login} = useSelector(state => state.user)
    const {current_language} = useSelector(state => state.language)

    const notify = (message) => toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });



    const fetchOpProfile = async () => {
        try {
            const res = await axiosInstance.get('/opstaff-profile',{headers:{Authorization:`Bearer ${user_login.token}`}})
            // console.log(res)
            if(res.data.status === 200){
                setAgentName(res.data.data.user.name)
                setOpCode(res.data.data.operationstaff_code)
            }
        } catch (error) {
            notify(error.message)
        }
       
    }

    useEffect(() => {
        fetchOpProfile()
    },[])



    const handleUserNameChangeCancel = () => {
        setIsChangeUsername(false)
        // setAgentName("User Name")
    }

    const handleUserNameChangeConfirm = async () => {
        try {
            const res = await axiosInstance.post("opstaffProfile-update",{
                name: agentName
            }, {headers:{Authorization:`Bearer ${user_login.token}`}})
            // console.log(res)
            if(res.data.status === 200){
                fetchOpProfile()
            }
        } catch (error) {
            notify(error.message)
        }
        setIsChangeUsername(false)
        // setAgentName('')
    }

    const onProfileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        // console.log(profileImage)
    }

    const onProfileCancelClicked = () => {
        profileimgRef.current.value = null
        setProfileImage()
    }

    const onProfileChangeSubmit =async (e) => {
        e.preventDefault()
        // console.log(profileImage)
        const formData = new FormData();
        formData.append("profile_image" , profileImage)
        formData.append("name" , agentName)
       try {
            const res =await  axiosInstance.post("/opstaffProfile-update",
            formData,
            {headers:{Authorization:`Bearer ${user_login.token}`}})
            // console.log(res)
            if(res.data.status === 200){

            }
       } catch (error) {
        
       }

       setProfileImage()
       agentName()
       
        // console.log(res)
    }
    if(user_login.isLoggedIn && user_login.role === "operationstaff"){
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
                                <form onSubmit={(e) => onProfileChangeSubmit(e)} className='op-change-profile-form' encType='multipart/form-data'> 
                                    <label className='op-change-profile-input-container' htmlFor='change-profile'>
                                        {current_language === "english" ? 'Change Profile:' : "ပရိုဖိုင်ကိုပြောင်းမည်"}
                                        <input ref={profileimgRef}  onChange={(e) => onProfileChange(e)} className='op-change-profile-input' type="file" name="profile_image"  accept="image/png, image/jpeg"></input>
                                        <p className='chosen-img'>{profileImage && profileImage.name}</p>
                                    </label>
                                    {
                                        profileImage ?  <div className='profile-change-btn-container'>
                                            <button type='submit'>{current_language === "english" ? 'Change Profile:' : "ပြောင်းမည်"}</button>
                                            <button type='button' onClick={() => onProfileCancelClicked()}>{current_language === "english" ? 'Cancel:' : "ပယ်ဖျက်"}</button>
                                            </div> : null
                                    }
                                
                                </form>
        
                            
                        </div>
        
                        <div className='agent-name-container'>
                            {
                                isChangeUsername ?<>
                                <input value={agentName} onChange={(e) => setAgentName(e.target.value)} type="text" className='change-username-input'></input>
                                <button className='confirm-username-btn' onClick={() => handleUserNameChangeConfirm()}>{current_language === "english" ? 'Confirm' : "ပြောင်းမည်"}</button>
                                <button className='cancel-username-btn' onClick={() => handleUserNameChangeCancel()}>{current_language === "english" ? 'Cancel:' : "ပယ်ဖျက်"}</button>
                                </> : 
                                <>
                                <p>{agentName}</p>
                                <Icon icon="ant-design:setting-filled" className='agent-profile-name-icon' onClick={() => setIsChangeUsername(true)}/>
                                </>
                            }
                            
                        </div>
        
                        <p className='agent-id'>{opCode}</p>
        
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
                    {/* <ToastContainer /> */}
                  </>
          )
    }else{
        return(
            <Navigate to ="/" replace={true}></Navigate>
          )
    }
 
}

export default OpProfile