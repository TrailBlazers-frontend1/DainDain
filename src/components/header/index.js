import React,{useState} from 'react'
import "./styles.css"
import myanmarflag from "../../imgs/myanmar-flag.jpg"
import englandflag from "../../imgs/england-flag.webp"
import Dropdown from '../../components/dropdown'
import Login from '../../components/login'

const Header = () => {
    const [language,setLanguage] = useState("myanmar")
    const [isLoginOpen,setIsLoginOpen] = useState(false)
    const options = [
        {label : "Myanmar", value:"myanmar"},
        {label : "English", value:"english"},
    ]

    const handleChange = (e) => {
        setLanguage(e.target.value)
    }

  return (
    <>
    <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}/>
        <div className='header'>
            <div className='header-content-container'>
                <div className='language-container'>
                    <div className='flag-container'>
                        <img src={language === "myanmar" ? myanmarflag : englandflag} alt="myanmar"/>
                    </div>
                    <Dropdown
                    options={options}
                    value={language}
                    handleChange={handleChange}
                    color={"white"}
                    />
                </div>

                <div className='header-btn-container'>
                    <button className='login-btn' onClick={() => setIsLoginOpen(true)}>Log in</button>
                    <button className='signup-btn' >Sign up</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header