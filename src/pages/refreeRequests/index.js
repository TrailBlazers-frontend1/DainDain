import React,{useState} from 'react'
import "./styles.css"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import {Navigate} from "react-router-dom"

import {useSelector} from "react-redux"
import RefreeCrud from '../../components/refreecrud'

const RefreeRequests = () => {
    const [isAddRefree, setIsAddRefree] = useState(false)
    const [isEditRefree, setIsEditRefree] = useState(false)
    const [title,setTitle] = useState("")

    const {user_login} = useSelector(state => state.user)

    const refreeAddbtn = () => {
        setIsAddRefree(true)
        setTitle("Add Refree")
    }

    const refreeEditBtn = () => {
        setIsEditRefree(true)
        setTitle("Edit Refree")
    }

    if(user_login.isLoggedIn){
    return (
        <>
            <Header/>
            <Navbar/>

           

            <RefreeCrud title={title} setTitle={setTitle} isAddRefree={isAddRefree} setIsAddRefree={setIsAddRefree} isEditRefree={isEditRefree} setIsEditRefree={setIsEditRefree}/>

            {/* <RefreeCrud title={"Add Refree"} isAddRefree={isAddRefree} setIsAddRefree={setIsAddRefree}/> */}
            <div className='App'>

            
            <div className='refree-requests-parent-container'>
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

                    <div className='btn-wrapper'>

                        <p className='refree-list-header'>Refrees</p>
                        <button className='refree-crud-add-btn' onClick={() => refreeAddbtn()}>Add</button>
                    </div>

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

                                <div className='refree-list-editdel-btns-container'>
                                    <button className='refree-list-edit-btn' onClick={() => refreeEditBtn()}>Edit</button>
                                    <button className='refree-list-delete-btn'>Delete</button>
                                </div>
                            </div>
                            <div className='refree-list-row'>
                                <p>Customer Name</p>
                                <p>0912345678</p>
                                <p>ag-001</p>
                                <p>08/13/2022</p>

                                <div className='refree-list-editdel-btns-container'>
                                    <button className='refree-list-edit-btn'>Edit</button>
                                    <button className='refree-list-delete-btn'>Delete</button>
                                </div>
                            </div>
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