import React from 'react'
import "./styles.css"
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux'

const BetNowModal = ({isBetNowModalOpen,setIsBetNowModalOpen,
    customerName,customerPhno,customerType,
    twodNumbers,setTwodNumbers,
    threePiecesNumbers,setThreePiecesNumbers,
    firstNumbers,setFirstNumbers,
    lastNumbers,setLastNumbers,
}) => {

    const {user_login} = useSelector(state => state.user)

    const handleBetNow = () => {
        
        setIsBetNowModalOpen(false)
        if(twodNumbers){
            console.log(user_login.name,user_login.phNo,customerName,customerPhno,customerType,twodNumbers)
            setTwodNumbers([])
        }
        if(threePiecesNumbers){
            console.log(user_login.name,user_login.phNo,customerName,customerPhno,customerType,threePiecesNumbers)
            setThreePiecesNumbers([])
        }

        if(firstNumbers || lastNumbers){
            console.log(firstNumbers,lastNumbers)
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
                <p className='detail-label'>Agent Name:</p>
                <p className='details-info'>{user_login.name}</p>
            </div>
            <div className='betnow-agent-details-container'>
                <p className='detail-label'>Agent PhNo:</p>
                <p className='details-info'>{user_login.phNo}</p>
            </div>
            <div className='betnow-customer-details-container'>
                <p className='detail-label'>Customer Name:</p>
                <p className='details-info'>{customerName}</p>
            </div>
            <div className='betnow-customer-details-container'>
                <p className='detail-label'>Customer PhNo:</p>
                <p className='details-info'>{customerPhno}</p>
            </div>
            <div className='betnow-customer-details-container'>
                <p className='detail-label'>Customer Type:</p>
                <p className='details-info'>{customerType}</p>
            </div>
            <div className='betnow-numbers-details-container'>
                <div className='betnow-numbers-labels-container'>
                    <p>Number</p>
                    <p>Wash Rate</p>
                    <p>Amount</p>
                </div>
                <div className='betnow-number-details-rows-container'>
                {twodNumbers?.map((number,index) => (
                    <div key={index} className='betnow-number-details-row'>
                    <p>{number.number}</p>
                    <p>{number.washrate}</p>
                    <p>{number.amount}</p>
                    </div>
                ))}
                {threePiecesNumbers?.map((number,index) => (
                    <div key={index} className='betnow-number-details-row'>
                    <p>{number.number}</p>
                    <p>{number.washrate}</p>
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

            <button className='betnow-modal-btn' onClick={() => handleBetNow()}>Bet Now</button>
        </div>
        
    </div>
  )
}

export default BetNowModal