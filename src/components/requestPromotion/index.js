import React,{useState} from 'react'
import { Icon } from '@iconify/react';
import {useSelector, useDispatch} from "react-redux"
import "./styles.css"
import { promoteRole } from '../../redux/user';
import {axiosInstance} from "../../urlConfig"

const RequestPromotion = ({isRequestPromoOpen,setIsRequestPromoOpen}) => {
  // const [phno,setPhno] = useState("")
  const [remark,setRemark] = useState("")
  const [role,setRole] = useState("")
  const [opstaffId,setOpstaffId] = useState("")
  const [refreeId,setRefreeId] = useState("")

  const {user_login} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const submitRequest = async (e) => {
    if(remark !== "" && role!==""){

      e.preventDefault()
      console.log(user_login.phNo,remark,role,refreeId,opstaffId,user_login.token)

      

      // dispatch(promoteRole(role))
      // const res = await axiosInstance.post("/request-promotion",{
      //   phone: user_login.phNo,
      //   request_type: role,
      //   remark : remark,
      //   referee_id : refreeId,
      //   operationstaff_id : opstaffId,
      // },{headers:{Authorization:`Bearer ${user_login.token}`}})

      // console.log(res)

      // if(res.status === 200){
        dispatch(promoteRole(role))
      // }

      // setPhno("")
      setRemark("")
      setRole("")
      setOpstaffId("")
      setRefreeId("")

      setIsRequestPromoOpen(false)
    }
  }
  return (
    <div className={ isRequestPromoOpen ? 'request-promo-outeroverlay request-promo-open' : "request-promo-outeroverlay request-promo-close"}>
        <form onSubmit={(e) => submitRequest(e)} className='request-promo-form'>
            <div className='request-promo-header'>
                <p className='request-promo-title'>Request Promotion</p>
                <Icon icon="emojione-monotone:cross-mark-button" className='request-promo-cross-btn' onClick={() => setIsRequestPromoOpen(false)}/>
            </div>

            {/* <div className= "request-promo-phno-input-container">
              <input placeholder='09123456789' required value={phno} onChange={(e) => setPhno(e.target.value)} type="tel" className="request-promo-phno-input"></input>
              <p>+95</p>
            </div> */}

            <div className='request-promo-remark-container'>
              <textarea value={remark} onChange={(e) => setRemark(e.target.value)}  className="request-promo-remark-input" placeholder='Remark'></textarea>
            </div>
            <div className= "request-promo-role-container">
              <p>Choose a role</p>
              <select required value={role} onChange={(e) => setRole(e.target.value)} name="roles" id="roles">
                <option value="" selected>Select a Role</option>
                <option value="refree">Refree</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            {
              role === "refree" && <div className='opstaff-id-input-container'>
                <p>Operation Staff ID:</p>
                <input value={opstaffId} onChange={(e) => setOpstaffId(e.target.value)} required type="text"></input> 
              </div>
            }
            {
              role === "agent" && <div className='refree-id-input-container'>
                <p>Refree ID:</p>
                <input value={refreeId} onChange={(e) => setRefreeId(e.target.value)} required type="text"></input> 
              </div>
            }

            <button className='request-promo-btn' type='submit'>Request</button>
        </form>
    </div>
  )
}

export default RequestPromotion