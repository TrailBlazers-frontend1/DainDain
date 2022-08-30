import React,{useState, useRef, useEffect} from 'react'
import {useSelector} from "react-redux"
import Pusher from 'pusher-js';

import BetNowModal from '../../../components/betnowmodal'
import { isMorningOrEvening } from '../../../redux/countdown'

import "./styles.css"

const TwoPieces = () => {
    const [isBetNowModalOpen,setIsBetNowModalOpen] = useState(false)

    const [customerName,setCustomerName] = useState("")
    const [customerPhno,setCustomerPhno] = useState("")
    const [customerType,setCustomerType] = useState("guest")
    const customerNameInput = useRef('')
    const customerPhnoInput = useRef('')
    // const customerTypeRef = useRef("guest")
    const [number,setNumber] = useState("")
    const [amount,setAmount] = useState("1000")
    const [twodNumbers,setTwodNumbers] = useState([])
    // const [twopiecesData, setTwoPiecesData] = useState({})

    const {user_login} = useSelector(state => state.user)
    const {morning_evening} = useSelector(state => state.countdown)
    
    // const twoPieces = useSelector((state) => state)

    // const dispatch = useDispatch()

    // const {customerName} = twoPieces
    // console.log(twoPieces)

    useEffect(() => {
    //   Pusher.logToConsole = true;

    //   var pusher = new Pusher('88190f086954aa7ddb96', {
    //     cluster: 'us2'
    //   });

    // var channel = pusher.subscribe('notify-channel');
    // channel.bind('App\\Events\\Notify', function(data) {
    //   alert(JSON.stringify(data));
    // });
    },[])


    const submitCustomerInfo = (e) => {
      e.preventDefault()
      setCustomerName(customerNameInput.current.value)
      // dispatch(setTwoPiecesCustomerName(customerNameInput.current.value))
      setCustomerPhno(customerPhnoInput.current.value)
      // setCustomerType
      // console.log(customerType)
      // setCustomerName('')
      // setCustomerPhno('')
      customerNameInput.current.value=""
      customerPhnoInput.current.value = ""
      // setCustomerType("guest")
      
    }

    
    //delete number from number details start
    const deleteNumber = (item) => {
      // console.log(item)
      let filteredArray = twodNumbers.filter((number) => {
        return number.number !== item.number
      })
  
      setTwodNumbers(filteredArray)
    }
    //delete number from number details end


    //change amount of a specific number in number details start
    const handleAmountfinalChange = (e,item) => {
      const newarr = twodNumbers.map((number) => {
        if(item.number === number.number){
          return {...number, amount: e.target.value}
        }
        return number
      })
  
      setTwodNumbers(newarr)
      // console.log(twodNumbers)
    }
    //change amount of a specific number in number details end


    //decrease amount by pressing - btn in number details start
    const decreaseAmount = (e,item) => {
      const newarr = twodNumbers.map((number) => {
        if(item.number === number.number){
          return {...number, amount : (parseInt(item.amount)-100).toString()}
        }
        return number
      })
  
      setTwodNumbers(newarr)
    }
    //decrease amount by pressing - btn in number details end
    
    //increase amount by pressing - btn in number details start
    const increaseAmount = (e,item) => {
      const newarr = twodNumbers.map((number) => {
        if(item.number === number.number){
          return {...number, amount : (parseInt(item.amount)+100).toString()}
        }
        return number
      })
  
      setTwodNumbers(newarr)
    }
    //increase amount by pressing - btn in number details end

   
  
    //submit number amount details start
    const submitBetNow = () => {
      if(customerName == "" || customerPhno == ""){
        alert("Please Provide Customer name and phone number")
      }
      else if(twodNumbers.length === 0){
        alert("Please Bet on a number")
      }
      else{
        
        // console.log(customerName,customerPhno,customerType,twodNumbers)
        // setTwodNumbers([])
        setIsBetNowModalOpen(true)
      }
    }
    //submit number amount details end
  
    
    //add number and amount to number details start
    const submitNumberAmount = (e) => {
      e.preventDefault()
      // console.log(number <= 9)
      if(number.length === 2){
      const doesNumberExist = twodNumbers.some((item) => {
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
            setTwodNumbers([...twodNumbers,newNumber])
          }
      }else{
        alert("Number should have two digits")
      }
        
      setNumber("")
      setAmount("1000")
      // console.log(twodNumbers)
    }
    //add number and amount to number details end


    //update number amount array start
    const changeNumberArray = (e,twodNumbers,setTwodNumbers) => {
      
      const numberString = e.target.value.toString()
      // console.log(e.target.value.toString())
      let found = false
      let filteredArray = twodNumbers.filter((number) => {
        if(number.number === numberString){
          found = true
        }
        else{
          return number
        }
      })
  
      setTwodNumbers(filteredArray)
  
      if(found === false){
        const newNumber = {
                number:numberString,
                washrate:"",
                amount:"1000"
            }
        setTwodNumbers([...twodNumbers,newNumber])
      }
      
  
      // console.log(twodNumbers)
    }
    //update number amount array end
  
    //twod Number row start
    const row = (start,end,twodNumbers,setTwodNumbers) => {
      const rowarray = []
      for(let i = start;i <= end;i++){
        rowarray.push(<div className='twopieces-number-container'>
        <div className='twopieces-number-btn-container'>
          <p>{i <= 9 ? `0${i}` : i}</p>
          <input
          className={
            twodNumbers.some((number) => {
              if(number.number === i.toString() || number.number === `0${i}`) {
                return true
              }
            }) ? "checked" : null
          }
           value={i <= 9 ? `0${i}` : i} onClick={(e) => changeNumberArray(e,twodNumbers,setTwodNumbers)} type="checkbox" name='twopieces number' disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}></input>
        </div>
        <div className='twopieces-details-container'>
          {
            user_login.role==="guest" ? null :
          <div className='twopieces-rate-container'>
            <p className='twopieces-rate-label'>Rate:</p>
            <p className='twopieces-rate-num'>85</p>
          </div>
          }
          {/* <div className='twopieces-max-container'>
            <p className='twopieces-max-label'>Max:</p>
            <p className='twopieces-max-num'>1000000</p>
          </div>
          <div className='twopieces-sale-container'>
            <p className='twopieces-sale-label'>Sale:</p>
            <p className='twopieces-sale-num'>1000000</p>
          </div> */}
        </div>
    </div>)
      }
      return(rowarray)
    }
    //two number row end

    //total amount start
    const twoPiecesTotalAmount = () => {
      const amountArr = twodNumbers.map((number) => parseInt(number.amount))
      // console.log(amountArr)
      const totalAmount = amountArr.reduce((previous,current) => previous+current,0)
      return totalAmount
        }


    return (
      <>
      <BetNowModal isBetNowModalOpen={isBetNowModalOpen} setIsBetNowModalOpen={setIsBetNowModalOpen}
       customerName= {customerName}
       customerPhno= {customerPhno}
       customerType={customerType}
       twodNumbers = {twodNumbers}
       setTwodNumbers={setTwodNumbers}/>
      <div className='twopieces-parent-container'>
        <div className='select-directly-container'>
          <p className='select-directly-label'>Select Directly:</p>
          <button className='select-directly-btn'>Normal</button>
        </div>
  
      
        <div className='twopieces-header-container'>
          <div className='twopieces-header-washrate'>
            <p className='twopieces-header'>Two Pieces</p>
            <p className='twopieces-washrate'>wash rate   95</p>
          </div>
          <p className='twopieces-description'>Description</p>
        </div>
  
        <div className='twopieces-numbers-parent-container'>
          <div className='twopieces-numbers-container'>
  
            <div className='twopieces-numbers-row'>
              {row(0,6,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(7,13,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(14,20,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(21,27,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(28,34,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(35,41,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(42,48,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(49,55,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(56,62,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(63,69,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(70,76,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(77,83,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(84,90,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(91,97,twodNumbers,setTwodNumbers)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(98,99,twodNumbers,setTwodNumbers)}
            </div>
            {/* <div className='twopieces-numbers-row'>
              {row(85,92)}
              </div>
              <div className='twopieces-numbers-row'>
              {row(93,99)}
            </div> */}
          </div>
        </div>
  
        <div className='twopieces-line'></div>
  
        <div className='twopieces-name-number-input-container'>
  
          <form onSubmit={(e) => submitCustomerInfo(e)} className='twopieces-name-phno-input-container'>
            <div className='twopieces-name-input-container'>
              <p>Name:</p>
              <input ref={customerNameInput} required type="text" name="twopieces name" disabled={user_login.role==="guest"  || (!morning_evening.morning && !morning_evening.evening)  ?true:false}></input>
            </div>
            <div className='twopieces-phno-input-container'>
              <p>Ph No:</p>
              <input ref={customerPhnoInput} required type="text" name="twopieces phno" disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}></input>
            </div>
  
            {/* <div   className='customer-type-container'>
              <p>Choose the type of customer</p>
              <div className='customer-type-radios-container'>
  
                <div className='customer-type-radio-container'>
                  <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="guest" checked={customerType === "guest"} disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}></input>
                  <label htmlFor='guest'>Guest</label>
                </div>
                <div className='customer-type-radio-container'>
                  <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="royal" checked={customerType === "royal"} disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}></input>
                  <label htmlFor='royal'>Royal</label>
                </div>
              </div>
            </div> */}
            
            <button type='submit' className='twopieces-name-phno-btn'>Add</button>
  
          </form>
  
          <form onSubmit={(e) => submitNumberAmount(e)} className='twopieces-number-amount-input-container'>
            <div className='twopieces-customer-infos'>

              <p className='twopieces-customer-name'>{customerName}</p>
              <p className='twopieces-customer-phno'>{customerPhno}</p>
            </div>
            <div className='twopieces-number-input-container'>
              <p>Number:</p>
              <input required value={number} onWheel={(e) => e.target.blur()} onChange={(e) => setNumber(e.target.value)} type="number" id="number" name="number" min="0" max="99" disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}></input>
            </div>
  
            <div className='twopieces-amount-input-container'>
              <p>Amount:</p>
              <div className='twopieces-amount-input'>
                <button  type='button' className='twopieces-minus-btn' onClick={()=>{
                  if(amount > 100){
                    setAmount(parseInt(amount)-100)
                  }
                  }} 
                  disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ?  true:false}>-</button>
              <input value={amount} onWheel={(e) => e.target.blur()}   onChange={(e) => setAmount(e.target.value)} type="number" id="amount" name="amount" disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}>
              </input>
  
                <button type='button' className='twopieces-plus-btn' onClick={()=>{setAmount(parseInt(amount)+100)}} disabled={user_login.role==="guest"  || (!morning_evening.morning && !morning_evening.evening) ? true:false}>+</button>
              </div>
            </div>
  
            <button type='submit' disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ?  true:false}  className='twopieces-number-amount-btn'>Add</button>
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
                      twodNumbers.map((item,index) => (
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
                    <p>{twodNumbers.length}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>Total Amount</p>
                    <p>{twoPiecesTotalAmount()}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>Lottery Closing Time</p>
                    <p>98:00:00</p>
                  </div>
  
                  <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ?  true:false} className='twod-betnow-btn' onClick={submitBetNow}>Bet Now</button>
                  
                </div>
      </div>
      </>
    )
  }

export default TwoPieces