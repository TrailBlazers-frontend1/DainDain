import React,{useState,useEffect} from 'react'
import "./styles.css"
import loginimg from "../../imgs/log-in.png"
import Dropdown from '../dropdown'
import myanmarflag from "../../imgs/myanmar-flag.jpg"
import englandflag from "../../imgs/england-flag.webp"
import { useSelector , useDispatch } from 'react-redux'
import { Icon } from '@iconify/react';
import { login } from '../../redux/user'
import { axiosInstance } from '../../urlConfig';
import { Navigate, useNavigate } from 'react-router-dom'
// import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Login = ({isLoginOpen,setIsLoginOpen}) => {

    const [phNo,setPhNo] = useState("")
    const [password,setPassword] = useState("")
    const [isForgotPwOpen,setIsForgotPwOpen] = useState(false)


    const [forgotPwPhNo,setForgotPwPhNo] = useState("")
    const [forgotPw,setForgotPw] = useState("")
    const [forgotConfirmPw,setForgotConfirmPw] = useState("")
    const [isPhnoValid,setIsPhnoValid] = useState(false)
    const [otpInput,setOtpInput] = useState("")
    const [isOTPValid,setIsOTPValid] = useState(false)
    const [countDownstarted,setCountDownStarted] = useState(false)
    const [countDown, setCountDown] = useState(60)
    const [otpRequestId, setOtpRequestId] = useState("")

    const {user_login} = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const notify = (message) => toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });

    const [language,setLanguage] = useState("myanmar")
    const options = [
        {label : "Myanmar", value:"myanmar"},
        {label : "English", value:"english"},
    ]

    const handleChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            phone: phNo,
            password:password
        }

        try {
            const res = await axiosInstance.post("/login",userData)
            // const data = await res.data
            // console.log(res)
            if(res.data.status === 200){
              notify(res.data.message)
                // console.log(data)
                const data = res.data.user
                if(data.status === '3'){
                  notify("You cannot log in")
                }else{
                  const user = {
                    id: data.id,
                    name : data.name,
                    phNo : data.phone,
                    role: data.request_type ? data.request_type : "guest",
                    token:res.data.token,
                    isLoggedIn:true,
                }

                  if(data.request_type === "referee"){
                    navigate("https://www.google.com/",{replace : true})
                  }else{
                    localStorage.setItem("auth",JSON.stringify(user))
                    dispatch(login(user))
                  }
                }
                

               
            }else{
                notify("Something went wrong")
            }
        } catch (error) {
            // console.log(error)
        }

        setPhNo("")
        setPassword("")
        setIsLoginOpen(false)
    }

    const getOtp = async () => {

        const isPhRegistered = await axiosInstance.post("/hasPhone", {forgotPwPhNo})
    
        // console.log(isPhRegistered)
      
        if(isPhnoValid && isPhRegistered.status === 200){
          setCountDown(60)
          setCountDownStarted(true)
          
          setTimeout(() => {
            setCountDownStarted(false)
          },1000 * 60)
    
          // const OtpRequest = {
          //   "access-token" : "vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-",
          //   "to" : forgotPwPhNo,
          //   "brand_name" : "TrailBlazers",
          //   "channel" : "sms",
          //   "sender_name":"MC888"
          // }
      
          // const otp =await axiosInstance.get(`https://verify.smspoh.com/api/v2/request?access-token=vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-&to=${forgotPwPhNo}&channel=sms&brand_name=TrailBlazers&code_length=4`,{
          // OtpRequest})
    
          // setOtpRequestId(otp.data.request_id)
    
          // if(otp.status === 200){
          //   const res = await axiosInstance.get(`https://verify.smspoh.com/api/v1/verify?access-token=vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-&request_id=${otp.data.request_id}&code=${otpInput}`)
          //   console.log(res)
          //   isOTPValid(true)
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
          const verifyOTP =  async () => {
          //   if(otpInput.length === 4){
          //     const res = await axiosInstance.get(`https://verify.smspoh.com/api/v1/verify?access-token=vJMxoWJOITaHCjm-bMoUe8PNZcFh79Z1-R4VpzRPjOnMB6mTd06FE6U497SldLe-&request_id=${otpRequestId}&code=${otpInput}`)
          //     // console.log(res)
          //     if(res.status ===  200){
                setIsOTPValid(true)
              // }
            // }
          }
      
          verifyOTP()
        }
        
    },[otpInput])

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
    
    useEffect(() => {
        const auth = localStorage.getItem("auth")
        let isLoggedIn
        if(auth){
            isLoggedIn = JSON.parse(auth).isLoggedIn
        }
        // console.log(isLoggedIn)
        if(!isLoggedIn){
            setIsLoginOpen(true)
        }
    },[])

    useEffect(() => {
        if(forgotPwPhNo.length >= 5 && forgotPwPhNo.length <= 11){
          setIsPhnoValid(true)
        }else{
          setIsPhnoValid(false)
        }
      },[forgotPwPhNo])

    const handleForgotPwSubmit = async (e) => {
        e.preventDefault()
        // e.preventDefault()
        if(forgotPw !== forgotConfirmPw){
          notify("Passwords are not eqaul. Please reconfirm them.")
        }else if(forgotPw.length < 6 || forgotConfirmPw.length < 6){
          notify("Password should have at least 6 characters or numbers")
        }
        else if(!isOTPValid){
          notify("This OTP is not valid")
        }
        else{
    
          // console.log({name,phno,password,confirmPassword})
    
          const userData = {
            phone : forgotPwPhNo,
            password : forgotPw,
            password_confirmation : forgotConfirmPw
          }
    
          try {
            const res =await axiosInstance.post("/forget-password",userData)
            // console.log(res)
            if(res.data.status === 200) {
             
            notify(res.data.message)
            }
          } catch (error) {
            // console.log(error)
            notify(error.message)
          }
    
        //   setName("")
          setForgotPwPhNo("")
          setForgotPw("")
          setForgotConfirmPw("")
        //   setOtpFromApi("")
          setOtpInput("")
          setIsForgotPwOpen(false)
        }
    }
  return (
    <div className={isLoginOpen ? `login-outer-overlay login-open` : "login-outer-overlay login-close"}>
        <div className='login-container'>
            <div className='login-img-container'>
                <img src={loginimg} alt="login image" className='login-image'></img>
            </div>

            {
                isLoginOpen && !isForgotPwOpen && 
                <div className='login-form-container'>

                {/* <div className='login-form-header'>
                    <p className='login-logo'>LOGO</p>

                    <div className='login-language-container'>
                        <div className='login-flag-container'>
                            <img src={language === "myanmar" ? myanmarflag : englandflag} alt="myanmar"/>
                        </div>
                        <Dropdown
                        options={options}
                        value={language}
                        handleChange={handleChange}
                        />
                    </div>
                </div> */}

                <Icon icon="emojione-monotone:cross-mark-button" className='login-cross-btn' onClick={() => setIsLoginOpen(false)}/>



                <form onSubmit={(e) => handleLoginSubmit(e)} className='login-form'>
                    <div className='login-phno-input-container'>
                        <input placeholder='0912345678'  required value={phNo} onChange={(e) => setPhNo(e.target.value)} type="tel" className="login-phno-input"></input>
                        <p>+95</p>
                    </div>
                    <div className='login-pw-input-container'>
                        <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="login-pw-input"></input>
                        <Icon icon="ant-design:lock-outlined" className='login-pw-icon'/>
                        
                    </div>

                    <div className='remember-fogotpw-container'>
                        {/* <label className="remember-me-label" htmlFor='remember me'>
                            <input type="checkbox" name='remember me'></input>
                            Remember Me
                        </label> */}

                        <p className='forgotpw' onClick={() => setIsForgotPwOpen(true)}>Forgot Password?</p>

                    </div>

                    <button type="submit" className='login-submit-btn'>Log In</button>
                    
                </form>

            </div>
            }

            {
                isLoginOpen && isForgotPwOpen &&
                <div className='forgotpw-form-container'>
                    <Icon icon="emojione-monotone:cross-mark-button" className='login-cross-btn forgotpw-cross-btn' onClick={() => setIsForgotPwOpen(false)}/>

                    <form onSubmit={(e) => handleForgotPwSubmit(e)} className='forgotpw-form'>
                        <div className='dai-register-phno-input-container'>
                            <input required  value={forgotPwPhNo} onChange={(e) => setForgotPwPhNo(e.target.value)} type="tel" className="dai-phno-input"></input>
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

                        <div className='dai-register-pw-input-container'>
                            <input  disabled={isOTPValid ? false : true} required value={forgotPw} onChange={(e) => setForgotPw(e.target.value)} type="password" className="dai-pw-input"></input>
                            <Icon icon="ant-design:lock-outlined" className='dairegister-pw-icon'/>
                        </div>
                        <div className='register-confirm-pw-container'>
                            <input disabled={isOTPValid ? false : true} required value={forgotConfirmPw} onChange={(e) => setForgotConfirmPw(e.target.value)} type="password" className='confirm-pw-input'></input>
                            <p>Confirm Password</p>
                        </div>
                        <button type="submit" className='dai-register-btn'>Change Password</button>
                    </form>
                </div>
            }
           
        </div>
        {/* <ToastContainer /> */}
    </div>
  )
}

export default Login