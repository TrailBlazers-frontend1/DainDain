import React, { useEffect } from 'react'
import "./styles.css"
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../urlConfig';

const BetNowModal = ({isBetNowModalOpen,setIsBetNowModalOpen,
    customerName,customerPhno,
    twodNumbers,setTwodNumbers,
    threePiecesNumbers,setThreePiecesNumbers,threedCompensation,
    firstNumbers,setFirstNumbers,
    lastNumbers,setLastNumbers,lonePyineList
}) => {

    const {user_login} = useSelector(state => state.user)
    const {morning_evening} = useSelector(state => state.countdown)
    const {profile} = useSelector(state => state.agent)
    const {twodList} = useSelector(state => state.twodThreed)
    const {current_language} = useSelector(state => state.language)

    let round
    if(morning_evening.morning){
        round = "Morning"
       
    }
    if(morning_evening.evening){
        round = "Evening"
    }

    const sendTwodSaleOrder = async (twoPiecesData) => {
        try {
            const res = await axiosInstance.post("/2d-sale",{
                twoDSalesList : twoPiecesData,
            },{headers:{Authorization:`Bearer ${user_login.token}`}})
            if(res.data.status === 200){
                alert(res.data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const sendLonePyineSaleOrder = async (lonePyineData) => {
        try {
            const res = await axiosInstance.post("/lonepyaing-sale",{
                lonePyaingSalesList : lonePyineData
            },{headers:{Authorization:`Bearer ${user_login.token}`}})
            if(res.data.status === 200){
                alert(res.data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const sendThreedSaleOrder = async (threePiecesData) => {
        try {
            const res = await axiosInstance.post("/3d-sale",{
                threeDSalesList : threePiecesData
            },{headers:{Authorization:`Bearer ${user_login.token}`}})
            if(res.data.status === 200){
                alert(res.data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const handleBetNow = () => {
        
        setIsBetNowModalOpen(false)
        if(twodNumbers){
            const arr = []
            twodList.forEach((item,index) => {    
                twodNumbers.forEach((number) => {
                    if(number.number === item.number){
                        arr.push(item)
                    }
                })
            })

            
            const canBet = arr.every((item,index) => {
                const amount = parseInt(twodNumbers[index].amount)
                const sale = parseInt(item.sale? item.sale : 0)
                console.log(item.max_amount < amount + sale)
                if(item.max_amount < (amount + sale) ){
                    alert("U Cannot Bet")
                    return false
                }
                return true
            })

            if(canBet){
                
                const twoPiecesData = twodNumbers.map((number) => {
                    return {
                        twod_id : number.id,
                        twod_number : number.number,
                        agent_id : profile.id,
                        agent_name : user_login.name,
                        round : round,
                        sale_amount : number.amount,
                        compensation : number.compensation,
                        type: "2d",
                        customer_name : customerName,
                        customer_phone : customerPhno
                    }
                })
              
                console.log(twoPiecesData)

               sendTwodSaleOrder(twoPiecesData)
                  
            }
            
            
            setTwodNumbers([])
        }
        if(threePiecesNumbers){
            const threePiecesData = threePiecesNumbers.map((number) => {
                return {
                    threed_number : number.number,
                    agent_id : profile.id,
                    agent_name : user_login.name,
                    sale_amount : number.amount,
                    compensation : number.compensation,
                    type: "3d",
                    customer_name : customerName,
                    customer_phone : customerPhno
                }
            })
            console.log(threePiecesData)
            sendThreedSaleOrder(threePiecesData)
            setThreePiecesNumbers([])
        }

        if(firstNumbers || lastNumbers){
            console.log(firstNumbers,lastNumbers)
            const firstArr = firstNumbers.map((number) => {
                return {...number,number : `${number.number}*`}
            })
            const lastArr = lastNumbers.map((number) => {
                return {...number,number : `*${number.number}`}
            })
            const combinedArray = firstArr.concat(lastArr)
            console.log(combinedArray)

            const arr = []
            lonePyineList.forEach((item,index) => {    
                combinedArray.forEach((number) => {
                    if(number.number === item.number){
                        arr.push(item)
                    }
                })
            })

            console.log(arr)


            const canBet = arr.every((item,index) => {
                const amount = parseInt(combinedArray[index].amount)
                const sale = parseInt(item.sale? item.sale : 0)
                console.log(item.max_amount < amount + sale)
                if(item.max_amount < (amount + sale) ){
                    alert("U Cannot Bet")
                    return false
                }
                return true
            })

            if(canBet){
                const lonePyineData = combinedArray.map((number) => {
                    return {
                        lonepyine_id : number.id,
                        agent_id : profile.id,
                        sale_amount : number.amount,
                        customer_name : customerName,
                        customer_phone : customerPhno
                    }
                })
                // console.log(lonePyineData)

                sendLonePyineSaleOrder(lonePyineData)
            }

            
            setFirstNumbers([])
            setLastNumbers([])
        }
        
    }
  return (
    <div className={isBetNowModalOpen ? 'betnow-modal-outer-overlay betnow-open' : "betnow-modal-outer-overlay betnow-close"}>

        

        <div className='betnow-details-container'>

        <div className='betnow-header'>
          <p className='betnow-title'></p>
          <Icon icon="emojione-monotone:cross-mark-button" className='betnow-cross-btn' onClick={() => setIsBetNowModalOpen(false)}/>
        </div>
            <div className='betnow-agent-details-container'>
                <p className='detail-label'>{current_language === "english" ? 'Agent Name:' : "‌အေးဂျင့်နာမည်"}</p>
                <p className='details-info'>{user_login.name}</p>
            </div>
            <div className='betnow-agent-details-container'>
                <p className='detail-label'>{current_language === "english" ? 'Agent Phone:' : "‌အေးဂျင့်ဖုန်း"}</p>
                <p className='details-info'>{user_login.phNo}</p>
            </div>
            <div className='betnow-customer-details-container'>
                <p className='detail-label'>{current_language === "english" ? 'Customer Name:' : "ထိုးသူ"}</p>
                <p className='details-info'>{customerName}</p>
            </div>
            <div className='betnow-customer-details-container'>
                <p className='detail-label'>{current_language === "english" ? 'Customer Phone:' : "ထိုးသူဖုန်း"}</p>
                <p className='details-info'>{customerPhno}</p>
            </div>
            {/* <div className='betnow-customer-details-container'>
                <p className='detail-label'>Customer Type:</p>
                <p className='details-info'>customerType</p>
            </div> */}
            <div className='betnow-numbers-details-container'>
                <div className='betnow-numbers-labels-container'>
                    <p>{current_language === "english" ? "Number" : "ထိုးသား"}</p>
                    <p>{current_language === "english" ? "Compensation" : "ဆ"}</p>
                    <p>{current_language === "english" ? "Amount" : "ထိုး‌‌ကြေး"}</p>
                </div>
                <div className='betnow-number-details-rows-container'>
                {twodNumbers?.map((number,index) => (
                    <div key={index} className='betnow-number-details-row'>
                    <p>{number.number}</p>
                    <p>{number.compensation}</p>
                    <p>{number.amount}</p>
                    </div>
                ))}
                {threePiecesNumbers?.map((number,index) => (
                    <div key={index} className='betnow-number-details-row'>
                    <p>{number.number}</p>
                    <p>{number.compensation}</p>
                    <p>{number.amount}</p>
                    </div>
                ))}
                {firstNumbers?.map((number,index) => (
                    <div key={index} className='betnow-number-details-row'>
                    <p>{number.number}∞</p>
                    <p>{number.compensation}</p>
                    <p>{number.amount}</p>
                    </div>
                ))}
                {lastNumbers?.map((number,index) => (
                    <div key={index} className='betnow-number-details-row'>
                    <p>∞{number.number}</p>
                    <p>{number.compensation}</p>
                    <p>{number.amount}</p>
                    </div>
                ))}
                </div>
            </div>

            <button className='betnow-modal-btn' disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onClick={() => handleBetNow()}>{current_language === "english" ? "Bet Now" : "ထိုးမည်း"}</button>
        </div>
        
    </div>
  )
}

export default BetNowModal