import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./styles.css"
import { Icon } from '@iconify/react';
import { addRefree, editRefree } from '../../redux/refree';

const RefreeCrud = ({title,setTitle,isAddRefree,setIsAddRefree , isEditRefree, setIsEditRefree, editRefreeId,setEditRefreeId}) => {

    const [addRefreePhNo,setAddRefreePhNo] = useState("")
    const [addRefreeName,setAddRefreeName] = useState("")
    const [addRefreepw,setAddRefreepw] = useState("")
    const [addRefreeConfirmpw,setAddRefreeConfirmpw] = useState("")

    // const refreeName = editRefreeData.name

    const {refree_list} = useSelector(state => state.refree)

    const dispatch = useDispatch()

    const [editRefreePhNo,setEditRefreePhNo] = useState("")
    const [editRefreeName,setEditRefreeName] = useState("")
    const [editRefreepw,setEditRefreepw] = useState("")
    const [editRefreeConfirmpw,setEditRefreeConfirmpw] = useState("")

    useEffect(() => {
        const editRefree = refree_list.find((refree) => refree.id === editRefreeId)
        setEditRefreeName(editRefree?.name)
        setEditRefreePhNo(editRefree?.PhNo)
        // console.log(editRefree)

    },[editRefreeId])

    const refreeAddClose = () => {
        setIsAddRefree(false)
        setTitle("")
       
    }

    const refreeEditClose = () => {
        setIsEditRefree(false)
        setTitle("")
        // setEditRefreeData({})
        // setEditRefreeData({})
        // setEditRefreeName("")
        // setEditRefreePhNo("")
    }

    const submitAddRefree = (e) => {
        e.preventDefault()
        // console.log(addRefreePhNo,addRefreeName,addRefreepw,addRefreeConfirmpw)
        const newRefree = {
            name:addRefreeName,
            PhNo:addRefreePhNo,
            refId:"ref-001",
            joinedOn:"08/15/2022"
        }

        dispatch(addRefree(newRefree))
    }

    const submitEditRefree = (e) => {
        e.preventDefault()
        // console.log(editRefreePhNo,editRefreeName,editRefreepw,editRefreeConfirmpw)

        const newRefree = {
            id: editRefreeId,
            name:editRefreeName,
            PhNo:editRefreePhNo,

        }

        dispatch(editRefree(newRefree))
    }



    if(title === "Add Refree"){
        return (
            <div className={isAddRefree ? "refree-crud-overlay refree-crud-open" : "refree-crud-overlay refree-crud-close"}>
                <form onSubmit={(e) => submitAddRefree(e)} className='refree-crud-form'>
                    <div className='refree-crud-form-header'>
                        <p>{title}</p>
                        <Icon icon="emojione-monotone:cross-mark-button" className='refree-crud-close-icon' onClick={() => refreeAddClose()}/>
                    </div>
        
                    <div className='refree-crud-phno-input-container'>
                        <input value={addRefreePhNo} onChange={(e) => setAddRefreePhNo(e.target.value)} placeholder='0912345678'  required  type="tel" className="refree-crud-phno-input"></input>
                        <p>+95</p>
                    </div>
                    <div className='refree-crud-name-input-container'>
                        <input value={addRefreeName} onChange={(e) => setAddRefreeName(e.target.value)} required  type="text" className="refree-crud-name-input"></input>
                        <p>Name</p>
                    </div>
                    <div className='refree-crud-pw-input-container'>
                        <input value={addRefreepw} onChange={(e) => setAddRefreepw(e.target.value)} required  type="password" className="refree-crud-pw-input"></input>
                        <Icon icon="ant-design:lock-outlined" className='refree-crud-pw-icon'/>
                        
                    </div>
        
                    <div className='refree-crud-confirm-pw-container'>
                        <input value={addRefreeConfirmpw} onChange={(e) => setAddRefreeConfirmpw(e.target.value)} required  type="password" className='refree-crud-confirm-pw-input'></input>
                        <p>Confirm Password</p>
                    </div>
        
                    <button type="submit" className='refree-crud-submit-btn'>{title}</button>
                </form>
            </div>
          )
    }
    if(title === "Edit Refree"){
        // console.log(editRefreeData)
        // console.log(typeof(refreeName))
        // setEditRefreeName(refree.name)
        // setEditRefreePhNo(refree.PhNo)
        // console.log(editRefreeName,editRefreePhNo)
        return (
            <div className={isEditRefree ? "refree-crud-overlay refree-crud-open" : "refree-crud-overlay refree-crud-close"}>
                <form className='refree-crud-form' onSubmit={(e) => submitEditRefree(e)}>
                    <div className='refree-crud-form-header'>
                        <p>{title}</p>
                        <Icon icon="emojione-monotone:cross-mark-button" className='refree-crud-close-icon' onClick={() => refreeEditClose()}/>
                    </div>
        
                    <div className='refree-crud-phno-input-container'>
                        <input value={editRefreePhNo} onChange={(e) => setEditRefreePhNo(e.target.value)} placeholder='0912345678'  required  type="tel" className="refree-crud-phno-input"></input>
                        <p>+95</p>
                    </div>
                    <div className='refree-crud-name-input-container'>
                        <input value={editRefreeName} onChange={(e) => setEditRefreeName(e.target.value)} required  type="text" className="refree-crud-name-input"></input>
                        <p>Name</p>
                    </div>

                    <div className='refree-crud-pw-input-container'>
                        <input value={editRefreepw} onChange={(e) => setEditRefreepw(e.target.value)}   type="password" className="refree-crud-pw-input"></input>
                        <Icon icon="ant-design:lock-outlined" className='refree-crud-pw-icon'/>
                        
                    </div>
        
                    <div className='refree-crud-confirm-pw-container'>
                        <input value={editRefreeConfirmpw} onChange={(e) => setEditRefreeConfirmpw(e.target.value)}   type="password" className='refree-crud-confirm-pw-input'></input>
                        <p>Confirm Password</p>
                    </div>
        
                    <button type="submit" className='refree-crud-submit-btn'>{title}</button>
                </form>
            </div>
          )
    }
  
}

export default RefreeCrud