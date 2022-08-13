import React,{useState,useEffect} from 'react'
import "./styles.css"
import loginimg from "../../imgs/log-in.png"
import Dropdown from '../dropdown'
import myanmarflag from "../../imgs/myanmar-flag.jpg"
import englandflag from "../../imgs/england-flag.webp"
import { useSelector , useDispatch } from 'react-redux'
import { Icon } from '@iconify/react';
import { login } from '../../redux/user'

const Login = ({isLoginOpen,setIsLoginOpen}) => {

    const [phNo,setPhNo] = useState("")
    const [password,setPassword] = useState("")

    const {user_login} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const [language,setLanguage] = useState("myanmar")
    const options = [
        {label : "Myanmar", value:"myanmar"},
        {label : "English", value:"english"},
    ]

    const handleChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleLoginSubmit =(e) => {
        e.preventDefault()

        const userData = {
            name : "Thurein Win",
            phNo: phNo,
            role : "guest",
            isLoggedIn : true
        }

        dispatch(login(userData))

        setPhNo("")
        setPassword("")
        setIsLoginOpen(false)
    }

    // if(!user_login.isLoggedIn){
    //     setIsLoginOpen(true)
    // }
    
    useEffect(() => {
        if(!user_login.isLoggedIn){
            setIsLoginOpen(true)
        }
    },[])
  return (
    <div className={isLoginOpen ? `login-outer-overlay login-open` : "login-outer-overlay login-close"}>
        <div className='login-container'>
            <div className='login-img-container'>
                <img src={loginimg} alt="login image" className='login-image'></img>
            </div>

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
                        <label className="remember-me-label" htmlFor='remember me'>
                            <input type="checkbox" name='remember me'></input>
                            Remember Me
                        </label>

                        <a href="#" className='forgotpw'>Forgot Password?</a>

                    </div>

                    <button type="submit" className='login-submit-btn'>Log In</button>
                    
                </form>

            </div>
        </div>
    </div>
  )
}

export default Login