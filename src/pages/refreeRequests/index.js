import React,{useState, useEffect} from 'react'
import "./styles.css"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import {Navigate} from "react-router-dom"

import {useSelector, useDispatch} from "react-redux"
import RefreeCrud from '../../components/refreecrud'
import { addRefree, deleteRefree, deleteRequest } from '../../redux/refree'

const RefreeRequests = () => {
    const [isAddRefree, setIsAddRefree] = useState(false)
    const [isEditRefree, setIsEditRefree] = useState(false)

    const [editRefreeId,setEditRefreeId] = useState("")
    const [title,setTitle] = useState("")

    const dispatch = useDispatch()

    const {refree_list,refree_requests} = useSelector(state=>state.refree)
    const {user_login} = useSelector(state => state.user)

    // const [refreeList,setRefreeList] = useState([])

    // useEffect(()=>{
    //     setRefreeList(refree_list)
    //     // console.log(refree)
    // },[])


    const refreeAddbtn = () => {
        setIsAddRefree(true)
        setTitle("Add Refree")
    }

    const refreeEditBtn = (id) => {
        // console.log(refree)
        setIsEditRefree(true)
        setTitle("Edit Refree")
        setEditRefreeId(id)
        // console.log(editRefreeData)
    }

    const refreeDeleteBtn = (id) => {
        dispatch(deleteRefree(id))
    }

    const handleAcceptRefreeRequest = (request) => {
        const newRefree = {
            id: (Math.floor(Math.random() * 1000)).toString(),
            name: request.name,
            PhNo:request.PhNo,
            refId:"ref-001",
            joinedOn:"08/15/2022"
        }

        dispatch(addRefree(newRefree))
        dispatch(deleteRequest(request.PhNo))
    } 

    const handleDeleteRefreeRequest = (request) => {
        dispatch(deleteRequest(request.PhNo))
    }

    if(user_login.isLoggedIn){
    return (
        <>
            <Header/>
            <Navbar/>

           

            <RefreeCrud title={title} setTitle={setTitle} isAddRefree={isAddRefree} setIsAddRefree={setIsAddRefree} 
            isEditRefree={isEditRefree} setIsEditRefree={setIsEditRefree} editRefreeId={editRefreeId} setEditRefreeId={setEditRefreeId}/>

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
                            {
                                refree_requests.map((request,index) => (
                                    <div className='refree-requests-accdec-row'>
                                        <p className='refree-requests-name'>{request.name}</p>
                                        <p className='refree-requests-phno'>{request.PhNo}</p>
                                        <div className='refree-requests-btn-container'>
                                            <button onClick={() => handleAcceptRefreeRequest(request)}>Accept</button>
                                            <button onClick={() => handleDeleteRefreeRequest(request)}>Decline</button>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>

                <div className='refree-list-parent-container'>

                   

                        <p className='refree-list-header'>Refrees</p>
                        {/* <button className='refree-crud-add-btn' onClick={() => refreeAddbtn()}>Add</button> */}
                   

                    <div className='refree-list-container'>
                        <div className='refree-list-labels-container'>
                            <p>Name</p>
                            <p>PhNo</p>
                            <p>Refree Id</p>
                            <p>Joined On</p>
                        </div>

                        <div className='refree-list-row-container'>
                            {
                                refree_list?.map((refree,index) => (
                                <div className='refree-list-row'>
                                    <p>{refree.name}</p>
                                    <p>{refree.PhNo}</p>
                                    <p>{refree.refId}</p>
                                    <p>{refree.joinedOn}</p>
    
                                    <div className='refree-list-editdel-btns-container'>
                                        <button className='refree-list-edit-btn' onClick={() => refreeEditBtn(refree.id)}>Edit</button>
                                        <button className='refree-list-delete-btn' onClick={() => refreeDeleteBtn(refree.id)}>Delete</button>
                                    </div>
                                </div>
                                ))
                            }
                            
                            
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