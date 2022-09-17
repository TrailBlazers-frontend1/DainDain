import React,{useState, useEffect} from 'react'
import "./styles.css"
import { Icon } from '@iconify/react';
import {useSelector, useDispatch } from 'react-redux/es/exports';

import { axiosInstance } from '../../urlConfig';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Register = ({isDaiRegOpen,setIsDaiRegOpen}) => {



  const [name,setName]  = useState("")
  const [phno,setphno] = useState("")
  const [otpInput,setOtpInput] = useState("")
  const [otpFromApi,setOtpFromApi] = useState("")
  const [otpRequestId, setOtpRequestId] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const [isPhnoValid,setIsPhnoValid] = useState(false)
  const [isOTPValid,setIsOTPValid] = useState(false)
  const [countDownstarted,setCountDownStarted] = useState(false)
  const [countDown, setCountDown] = useState(60)
  // const [otpCountdown,setOtpCountdown] = useState("")

  const {user_register} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const notify = (message) => toast(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    });
  
  const handleDaiRegClose = () => {
    setIsDaiRegOpen(false)
    setName("")
    setphno("")
    setOtpInput("")
    setOtpFromApi("")
    setPassword("")
    setConfirmPassword("")
    setIsPhnoValid(false)
    setIsOTPValid(false)
  }

  useEffect(() => {
    if(phno.length >= 5 && phno.length <= 11){
      setIsPhnoValid(true)
    }else{
      setIsPhnoValid(false)
    }
  },[phno])

  useEffect(() => {
    setCountDown(60)
    if(countDownstarted){
      let i = 60
      const interval = setInterval(() => {
        i = i -1
        setCountDown(i)
        if(i === 0){
          // console.log("countdown end")
          setCountDown(60)
          clearInterval(interval);
          return
        }
        // console.log(countDown)
      },1000)
      return () => clearInterval(interval);
    }
  },[countDownstarted])

  const getOtp = async () => {

    const isPhRegistered = await axiosInstance.post("/checkPhone", {phno})

    // console.log(isPhRegistered)
  
    if(isPhnoValid ){
      setCountDown(60)
      setCountDownStarted(true)
      
      setTimeout(() => {
        setCountDownStarted(false)
      },1000 * 60)

      // const OtpRequest = {
      //   "access-token" : "vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-",
      //   "to" : phno,
      //   "brand_name" : "TrailBlazers",
      //   "channel" : "sms",
      //   "sender_name":"MC888"
      // }
  
      // const otp =await axiosInstance.get(`https://verify.smspoh.com/api/v2/request?access-token=vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-&to=${phno}&channel=sms&brand_name=TrailBlazers&code_length=4`,{
      // OtpRequest})

      // setOtpRequestId(otp.data.request_id)

      // if(otp.status === 200){
      //   const res = await axiosInstance.get(`https://verify.smspoh.com/api/v1/verify?access-token=vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-&request_id=${otp.data.request_id}&code=${otpInput}`)
      //   console.log(res)
        // isOTPValid(true)
      // }
     
    }else{
      notify("Phone Number is not valid.")
    }
    
    // console.log(res)
  }


  useEffect(() => {
    if(otpInput === ""){
      setIsOTPValid(false)
    }else{
      // const verifyOTP =  async () => {
        // if(otpInput.length === 4){
        //   const res = await axiosInstance.get(`https://verify.smspoh.com/api/v1/verify?access-token=vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-&request_id=${otpRequestId}&code=${otpInput}`)
        //   // console.log(res)
        //   if(res.status ===  200){
            setIsOTPValid(true)
          // }
        // }
      // }
  
//       verifyOTP()
    }
    
},[otpInput])

  const signUp = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      notify("Passwords are not eqaul. Please reconfirm them.")
    }
    else if(!isOTPValid){
      notify("This OTP is not valid")
    }
    else{

      // console.log({name,phno,password,confirmPassword})

      const userData = {
        name : name,
        phone : phno,
        password : password,
        password_confirmation : confirmPassword
      }

      try {
        const res = axiosInstance.post("/register",userData)
        if(res.status === 200) {
          // console.log(res)
          notify(res.data.message)
        }
      } catch (error) {
        // console.log(error)
        notify(error.message)
      }

      setName("")
      setphno("")
      setPassword("")
      setConfirmPassword("")
      setOtpFromApi("")
      setOtpInput("")
      setIsDaiRegOpen(false)
    }
  }

  return (
    <div className={isDaiRegOpen ? "dai-register-outer-overlay dai-register-open" : "dai-register-outer-overlay dai-register-close"}>

      <form onSubmit={(e) => signUp(e)} className='dai-register-form'>

        <div className='dai-register-header'>
          <p className='dai-register-title'>Sign Up</p>
          <Icon icon="emojione-monotone:cross-mark-button" className='dai-register-cross-btn' onClick={() => handleDaiRegClose()}/>
        </div>

        <div className='dai-register-phno-input-container'>
          <input required  value={phno} onChange={(e) => setphno(e.target.value)} type="tel" className="dai-phno-input"></input>
          <p>+95</p>
          <span className={isPhnoValid? "valid-message" : 'warning-message'}>{isPhnoValid? "This Phone Number is valid" : "This Phone Number is not valid"}</span>
        </div>
        <div className='dai-register-otp-input-container'>
          <p>OTP:</p>
          <input value={otpInput} onChange={(e) => setOtpInput(e.target.value)} required   type="number" className="dai-otp-input"></input>
          <span className={isOTPValid? "valid-message" : 'warning-message'}>{isOTPValid? <Icon icon="icon-park-solid:correct" className='otp-icon'/> : <Icon icon="fluent-emoji-high-contrast:cross-mark" className='otp-icon'/>}</span>
          {
            countDownstarted ? 
            <p className='otp-count-down'>{countDown}</p> :
            <button className='otp-request-btn' type='button' onClick={() => getOtp()}>Get OTP</button>
          }
          
        </div>
        <div className='dai-register-name-input-container'>
          <input disabled={isOTPValid ? false : true} required value={name} onChange={(e) => setName(e.target.value)} type="text" className="dai-name-input"></input>
          <p>Name</p>
        </div>
        <div className='dai-register-pw-input-container'>
          <input disabled={isOTPValid ? false : true} required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="dai-pw-input"></input>
          <Icon icon="ant-design:lock-outlined" className='dairegister-pw-icon'/>
        </div>
        <div className='register-confirm-pw-container'>
          <input disabled={isOTPValid ? false : true} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className='confirm-pw-input'></input>
          <p>Confirm Password</p>
        </div>
        {/* <div className='dai-register-remark-input-container'>
          <textarea  className="dai-remark-input" placeholder='Remark'></textarea>
        </div> */}

        <button type="submit" className='dai-register-btn'>Register</button>
          {/* {user_register.name ? <p>{user_register.name}</p>:null} */}
      </form>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default Register