import React from 'react'
import "./styles.css"
import { Icon } from '@iconify/react';

const DaiRegister = ({isDaiRegOpen,setIsDaiRegOpen}) => {
  return (
    <div className={isDaiRegOpen ? "dai-register-outer-overlay dai-register-open" : "dai-register-outer-overlay dai-register-close"}>

      <form className='dai-register-form'>

        <div className='dai-register-header'>
          <p className='dai-register-title'>Dai Register</p>
          <Icon icon="emojione-monotone:cross-mark-button" className='dai-register-cross-btn' onClick={() => setIsDaiRegOpen(false)}/>
        </div>

        <div className='dai-register-phno-input-container'>
          <input type="tel" className="dai-phno-input"></input>
          <p>+95</p>
        </div>
        <div className='dai-register-name-input-container'>
          <input type="text" className="dai-name-input"></input>
          <p>Name</p>
        </div>
        <div className='dai-register-pw-input-container'>
          <input type="password" className="dai-pw-input"></input>
          <Icon icon="ant-design:lock-outlined" className='dairegister-pw-icon'/>
        </div>
        <div className='dai-register-remark-input-container'>
          <textarea  className="dai-remark-input" placeholder='Remark'></textarea>
        </div>

        <button type="submit" className='dai-register-btn'>Register</button>

      </form>

    </div>
  )
}

export default DaiRegister