import React,{useState, useRef} from 'react'
import "./styles.css"

import BetNowModal from '../../../components/betnowmodal'
import {useSelector} from "react-redux"

const ThreePieces = () => {

  const [isBetNowModalOpen,setIsBetNowModalOpen] = useState(false)

    const [customerName,setCustomerName] = useState("")
    const [customerPhno,setCustomerPhno] = useState("")
    const [customerType,setCustomerType] = useState("guest")
    const customerNameInput = useRef('')
    const customerPhnoInput = useRef('')
    const [number,setNumber] = useState("")
    const [amount,setAmount] = useState("1000")
    const [threePiecesNumbers,setThreePiecesNumbers] = useState([])

    const {user_login} = useSelector(state => state.user)

    const submitNumberAmount = (e) => {
      e.preventDefault()
      // console.log(number <= 9)
      if(number.length === 3){
      const doesNumberExist = threePiecesNumbers.some((item) => {
            if(number === item.number){
              return true
            }
            return false
          })
    
          if(doesNumberExist){
            alert("Number Already Exists")
          }
          else{
            const newNumber = {
              number: number,
              washrate:"",
              amount: amount.toString()
            }
            setThreePiecesNumbers([...threePiecesNumbers,newNumber])
          }
      }else{
        alert("Number should have three digits")
      }
        
      setNumber("")
      setAmount("1000")
      // console.log(threePiecesNumbers)
    }

    const submitCustomerInfo = (e) => {
      e.preventDefault()
      setCustomerName(customerNameInput.current.value)
      setCustomerPhno(customerPhnoInput.current.value)
      // console.log(customerType)
      // setCustomerName('')
      // setCustomerPhno('')
      customerNameInput.current.value=""
      customerPhnoInput.current.value = ""
      // setCustomerType("guest")
      
    }

    const submitBetNow = () => {
      if(customerName == "" && customerPhno == ""){
        alert("Please Provide Customer name and phone number")
      }
      else if(threePiecesNumbers.length === 0){
        alert("Please Bet on a number")
      }
      else{
        
        // console.log(customerName,customerPhno,customerType,threePiecesNumbers)
        // setThreePiecesNumbers([])
        setIsBetNowModalOpen(true)
      }
    }

    const deleteNumber = (item) => {
      // console.log(item)
      let filteredArray = threePiecesNumbers.filter((number) => {
        return number.number !== item.number
      })
  
      setThreePiecesNumbers(filteredArray)
    }

    const twoPiecesTotalAmount = () => {
      const amountArr = threePiecesNumbers.map((number) => parseInt(number.amount))
      // console.log(amountArr)
      const totalAmount = amountArr.reduce((previous,current) => previous+current,0)
      return totalAmount
        }

    const increaseAmount = (e,item) => {
      const newarr = threePiecesNumbers.map((number) => {
        if(item.number === number.number){
          return {...number, amount : (parseInt(item.amount)+100).toString()}
        }
        return number
      })
  
      setThreePiecesNumbers(newarr)
    }

    const decreaseAmount = (e,item) => {
      const newarr = threePiecesNumbers.map((number) => {
        if(item.number === number.number){
          return {...number, amount : (parseInt(item.amount)-100).toString()}
        }
        return number
      })
  
      setThreePiecesNumbers(newarr)
    }

    const handleAmountfinalChange = (e,item) => {
      const newarr = threePiecesNumbers.map((number) => {
        if(item.number === number.number){
          return {...number, amount: e.target.value}
        }
        return number
      })
  
      setThreePiecesNumbers(newarr)
      // console.log(twodNumbers)
    }
  return (
    <>
    <BetNowModal isBetNowModalOpen={isBetNowModalOpen} setIsBetNowModalOpen={setIsBetNowModalOpen}
       customerName= {customerName}
       customerPhno= {customerPhno}
       customerType={customerType}
       threePiecesNumbers = {threePiecesNumbers}
       setThreePiecesNumbers={setThreePiecesNumbers}/>
    <div className='threepieces-parent-container'>
      <div className='threepieces-select-container'>
        <div className='threepieces-select-competiton-container'>
            <p className='threepieces-select-competiton-label'>
              Competition:
            </p>
            <button className='threepieces-select-competiton-btn'>Normal</button>
        </div>
      </div>

      <div className='threepieces-header-container'>
          <div className='threepieces-header-washrate'>
            <p className='threepieces-header'>Three Pieces</p>
            <p className='threepieces-washrate'>wash rate   1.9</p>
          </div>
          <p className='threepieces-description'>Description</p>
      </div>

      <div className='threepieces-name-number-input-container'>
  
          <form onSubmit={(e) => submitCustomerInfo(e)} className='threepieces-name-phno-input-container'>
            <div className='threepieces-name-input-container'>
              <p>Name:</p>
              <input ref={customerNameInput} required type="text" name="threepieces name" disabled={user_login.role==="guest" ? true:false}></input>
            </div>
            <div className='threepieces-phno-input-container'>
              <p>Ph No:</p>
              <input ref={customerPhnoInput} required type="text" name="threepieces phno" disabled={user_login.role==="guest" ? true:false}></input>
            </div>
  
            <div   className='customer-type-container'>
              <p>Choose the type of customer</p>
              <div className='customer-type-radios-container'>
  
                <div className='customer-type-radio-container'>
                  <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="guest" checked={customerType === "guest"} disabled={user_login.role==="guest" ? true:false}></input>
                  <label htmlFor='guest'>Guest</label>
                </div>
                <div className='customer-type-radio-container'>
                  <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="royal" checked={customerType === "royal"} disabled={user_login.role==="guest" ? true:false}></input>
                  <label htmlFor='royal'>Royal</label>
                </div>
              </div>
            </div>
            
            <button type='submit' className='threepieces-name-phno-btn'>Add</button>
  
          </form>
  
          <form onSubmit={(e) => submitNumberAmount(e)} className='threepieces-number-amount-input-container'>
            <div className='threepieces-customer-infos'>

              <p className='threepieces-customer-name'>{customerName}</p>
              <p className='threepieces-customer-phno'>{customerPhno}</p>
            </div>
            <div className='threepieces-number-input-container'>
              <p>Number:</p>
              <input required value={number} onWheel={(e) => e.target.blur()} onChange={(e) => setNumber(e.target.value)} type="number" id="number" name="number" disabled={user_login.role==="guest" ? true:false}></input>
            </div>
  
            <div className='threepieces-amount-input-container'>
              <p>Amount:</p>
              <div className='threepieces-amount-input'>
                <button type='button' className='threepieces-minus-btn' onClick={()=>{
                  if(amount > 100){
                    setAmount(parseInt(amount)-100)
                  }
                  }} disabled={user_login.role==="guest" ? true:false}>-</button>
              <input value={amount} onWheel={(e) => e.target.blur()}  onChange={(e) => setAmount(e.target.value)} type="number" id="amount" name="amount" disabled={user_login.role==="guest" ? true:false}>
              </input>
  
                <button type='button' className='threepieces-plus-btn' onClick={()=>{setAmount(parseInt(amount)+100)}} disabled={user_login.role==="guest" ? true:false}>+</button>
              </div>
            </div>
  
            <button type='submit' className='threepieces-number-amount-btn'>Add</button>
          </form>
  
        </div>
    </div>
    <div className='twod-details-parent-container'>
                <div className='twod-details-container'>
                  <div className='twod-details-header-container'>
                    <p>Number</p>
                    <p>Wash Rate</p>
                    <p>Amount</p>
                  </div>
  
                  <div className='twod-details-table-container'>
                    {
                      threePiecesNumbers.map((item,index) => (
                          <div key = {index} className='twod-details-row'>
                          <p>{item.number}</p>
                          <p>85</p>
                          <div className='twod-details-amount-container'>
                            <button onClick={(e) => 
                            {if(item.amount > 100){
                              decreaseAmount(e,item)} 
  
                            }}
                              >-</button>
                            <input type="number" onWheel={(e) => e.target.blur()} onChange={(e) => handleAmountfinalChange(e,item)} value={item.amount}></input>
                            <button onClick={(e) => increaseAmount(e,item)}>+</button>
                          </div>
                          <button className='twod-details-delete-btn' onClick={() => deleteNumber(item)}>Delete</button>
                          </div>
                      ))
                    }
                  </div>
                </div>
  
                <div className='twod-overall-details-container'>
                  <div className='twod-overall-detail-container'>
                    <p>Program Information</p>
                    <p>{threePiecesNumbers.length}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>Total Amount</p>
                    <p>{twoPiecesTotalAmount()}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>Lottery Closing Time</p>
                    <p>98:00:00</p>
                  </div>
  
                  <button className='twod-betnow-btn' onClick={submitBetNow}>Bet Now</button>
                  
                </div>
      </div>
    </>
  )
}

export default ThreePieces