import React,{useState} from 'react'
import "./styles.css"
import { Icon } from '@iconify/react';
import {useSelector, useDispatch } from 'react-redux/es/exports';
import { signup } from '../../redux/user';

const Register = ({isDaiRegOpen,setIsDaiRegOpen}) => {

  const [name,setName]  = useState("")
  const [phno,setphno] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const {user_register} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const signUp = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      alert("Passwords are not eqaul. Please reconfirm them.")
    }
    else{

      // console.log({name,phno,password,confirmPassword})

      const userData = {
        name : name,
        phno : phno,
        password : password,
        confirmPassword : confirmPassword
      }

      dispatch(signup(userData))

      setName("")
      setphno("")
      setPassword("")
      setConfirmPassword("")
    }
  }

  return (
    <div className={isDaiRegOpen ? "dai-register-outer-overlay dai-register-open" : "dai-register-outer-overlay dai-register-close"}>

      <form onSubmit={(e) => signUp(e)} className='dai-register-form'>

        <div className='dai-register-header'>
          <p className='dai-register-title'>Sign Up</p>
          <Icon icon="emojione-monotone:cross-mark-button" className='dai-register-cross-btn' onClick={() => setIsDaiRegOpen(false)}/>
        </div>

        <div className='dai-register-phno-input-container'>
          <input required  value={phno} onChange={(e) => setphno(e.target.value)} type="tel" className="dai-phno-input"></input>
          <p>+95</p>
        </div>
        <div className='dai-register-name-input-container'>
          <input required value={name} onChange={(e) => setName(e.target.value)} type="text" className="dai-name-input"></input>
          <p>Name</p>
        </div>
        <div className='dai-register-pw-input-container'>
          <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="dai-pw-input"></input>
          <Icon icon="ant-design:lock-outlined" className='dairegister-pw-icon'/>
        </div>
        <div className='register-confirm-pw-container'>
          <input required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className='confirm-pw-input'></input>
          <p>Confirm Password</p>
        </div>
        {/* <div className='dai-register-remark-input-container'>
          <textarea  className="dai-remark-input" placeholder='Remark'></textarea>
        </div> */}

        <button type="submit" className='dai-register-btn'>Register</button>
          {user_register.name ? <p>{user_register.name}</p>:null}
      </form>

    </div>
  )
}

export default Register