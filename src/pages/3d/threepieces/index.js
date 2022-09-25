import React,{useState, useRef, useEffect} from 'react'
import { pusher } from '../../../pusher'
import "./styles.css"
import { axiosInstance } from '../../../urlConfig'

import BetNowModal from '../../../components/betnowmodal'
import {useSelector} from "react-redux"
import { threeDCountDown } from '../../../redux/countdown'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ThreePieces = () => {

  const [isBetNowModalOpen,setIsBetNowModalOpen] = useState(false)

    const [customerName,setCustomerName] = useState("")
    const [customerPhno,setCustomerPhno] = useState("")
    const [customerType,setCustomerType] = useState("guest")
    const customerNameInput = useRef('')
    const customerPhnoInput = useRef('')
    const [number,setNumber] = useState("")
    const [amount,setAmount] = useState("1000")
    const [Rchecked,setRchecked] = useState(false)
    const [threePiecesNumbers,setThreePiecesNumbers] = useState([])

    const [threedCompensation,setThreedCompensation] = useState("")
   

    // const {morning_evening} = useSelector(state => state.countdown)

    const {user_login} = useSelector(state => state.user)
    const {profile} = useSelector(state => state.agent)

    const {current_language} = useSelector(state => state.language)

    const notify = (message) => toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });

    const fetch3dCompensation = async () => {
      try {
        const res = await axiosInstance.get("/3ds",{headers:{Authorization:`Bearer ${user_login.token}`}})
        if(res.data.status === 200){
          // console.log(res.data.threeds.compensation)
          setThreedCompensation(res.data.threeds?.compensation)
        }
      } catch (error) {
        notify(error.message)
      }
      

    }

    // const fet3dHistory = async () => {
    //   try {
    //     const res = await axiosInstance.get("/winning-3ds",{headers:{Authorization:`Bearer ${user_login.token}`}})
    //     // console.log(res)
    //     setThreedHistory(res.data.threeds)
    //   } catch (error) {
    //     notify(error.message)
    //   }
    // }

    useEffect(() => {
      // fet3dHistory()
      if(user_login.isLoggedIn && user_login.role === "agent"){
        fetch3dCompensation()
  
      const channel = pusher.subscribe(`threed-channel.${profile.refereeId}`);
        channel.bind('App\\Events\\sendthreed', function(data) {
          setThreedCompensation(data[0].compensation)
        });

        return (() => {
          pusher.unsubscribe(`threed-channel.${profile.refereeId}`)
      })
      }
    },[])

    //get permutations
    function permut(string) {
      if (string.length < 2) return string; // This is our break condition
    
      var permutations = []; // This array will hold our permutations
      for (var i = 0; i < string.length; i++) {
        var char = string[i];
    
        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
          continue; // skip it this time
    
        var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS
    
        for (var subPermutation of permut(remainingString))
          permutations.push(char + subPermutation)
      }
      return permutations;
    }

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
            notify("Number Already Exists")
          }
          else{
            if(!Rchecked){
              const newNumber = {
                number: number,
                compensation: threedCompensation ? threedCompensation : '0',
                amount: amount.toString()
              }
              setThreePiecesNumbers([...threePiecesNumbers,newNumber])
            }else{
              const arr = permut(number)
              // console.log(arr)
              const newNumbers = arr.map((item) => {
                const newNumer = {
                  number : item,
                  compensation: threedCompensation ? threedCompensation : '0',
                  amount: amount.toString()
                }
                return newNumer
              })

              setThreePiecesNumbers([...threePiecesNumbers,...newNumbers])
              
            }
            
          }
      }else{
        notify("Number should have three digits")
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
      const totalAmount = twoPiecesTotalAmount()
      if(customerName == "" && customerPhno == ""){
        notify("Please Provide Customer name and phone number")
      }
      else if(threePiecesNumbers.length === 0){
        notify("Please Bet on a number")
      }else if(profile.coin_amount < totalAmount){
        notify("Not Enough Coins")
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

    const handleRCheck = () => {
      setRchecked(!Rchecked)
      // console.log(Rchecked)
    }
  return (
    <>
    <BetNowModal isBetNowModalOpen={isBetNowModalOpen} setIsBetNowModalOpen={setIsBetNowModalOpen}
       customerName= {customerName}
       customerPhno= {customerPhno}
       customerType={customerType}
       threePiecesNumbers = {threePiecesNumbers}
       setThreePiecesNumbers={setThreePiecesNumbers}
       threedCompensation = {threedCompensation}
       />
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
            <p className='threepieces-header'>{current_language === "english" ? "3Pieces" : "၃လုံး"}</p>
            <p className='threepieces-washrate'>{current_language === "english" ? "Rate" : "ဆ"}   {threedCompensation}</p>
          </div>
          {/* <p className='threepieces-description'>Description</p> */}
      </div>

      <div className='threepieces-name-number-input-container'>
  
          <form onSubmit={(e) => submitCustomerInfo(e)} className='threepieces-name-phno-input-container'>
            <div className='threepieces-name-input-container'>
              <p>{current_language === "english" ? "Name:" : "နာမည်"}</p>
              <input ref={customerNameInput} required type="text" name="threepieces name" disabled={user_login.role==="guest"  ? true:false}></input>
            </div>
            <div className='threepieces-phno-input-container'>
              <p>{current_language === "english" ? "Phone:" : "ဖုန်း"}</p>
              <input ref={customerPhnoInput} required type="text" name="threepieces phno" disabled={user_login.role==="guest"  ? true:false}></input>
            </div>
  
            {/* <div   className='customer-type-container'>
              <p>Choose the type of customer</p>
              <div className='customer-type-radios-container'>
  
                <div className='customer-type-radio-container'>
                  <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="guest" checked={customerType === "guest"} disabled={user_login.role==="guest"  ? true:false}></input>
                  <label htmlFor='guest'>Guest</label>
                </div>
                <div className='customer-type-radio-container'>
                  <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="royal" checked={customerType === "royal"} disabled={user_login.role==="guest"  ? true:false}></input>
                  <label htmlFor='royal'>Royal</label>
                </div>
              </div>
            </div> */}
            
            <button disabled={user_login.role==="guest" ? true:false} type='submit' className='threepieces-name-phno-btn'>{current_language === "english" ? "Add" : "ထည့်မည်"}</button>
  
          </form>
  
          <form onSubmit={(e) => submitNumberAmount(e)} className='threepieces-number-amount-input-container'>
            <div className='threepieces-customer-infos'>

              <p className='threepieces-customer-name'>{customerName}</p>
              <p className='threepieces-customer-phno'>{customerPhno}</p>
            </div>
            <div className='threepieces-number-input-container'>
              <p>{current_language === "english" ? "Number" : "နံပါတ်"}</p>
              <input required value={number} onWheel={(e) => e.target.blur()} onChange={(e) => setNumber(e.target.value)} type="number" id="number" name="number" disabled={user_login.role==="guest"  ? true:false}></input>
            </div>

            <div className='threepieces-R-counter'>
              <p>R:</p>
              <input onChange={() => handleRCheck()} type="checkbox"></input>
            </div>
  
            <div className='threepieces-amount-input-container'>
              <p>{current_language === "english" ? "Amount:" : "ထိုးကြေး"}</p>
              <div className='threepieces-amount-input'>
                <button type='button' className='threepieces-minus-btn' onClick={()=>{
                  if(amount > 100){
                    setAmount(parseInt(amount)-100)
                  }
                  }} disabled={user_login.role==="guest"  ? true:false}>-</button>
              <input value={amount} onWheel={(e) => e.target.blur()}  onChange={(e) => setAmount(e.target.value)} type="number" id="amount" name="amount" disabled={user_login.role==="guest"  ? true:false}>
              </input>
  
                <button type='button' className='threepieces-plus-btn' onClick={()=>{setAmount(parseInt(amount)+100)}} disabled={user_login.role==="guest"  ? true:false}>+</button>
              </div>
            </div>

            
  
            <button disabled={user_login.role==="guest"  ? true:false} type='submit' className='threepieces-number-amount-btn'>{current_language === "english" ? "Add" : "ထည့်မည်"}</button>
          </form>
  
        </div>
    </div>
    <div className='twod-details-parent-container'>
                <table className='twod-details-container'>
                  <thead>
                  <tr className='twod-details-header-container'>
                    <th>{current_language === "english" ? "Number" : "နံပါတ်"}</th>
                    <th>{current_language === "english" ? "Rate" : "ဆ"}</th>
                    <th>{current_language === "english" ? "Amount:" : "ထိုးကြေး"}</th>
                    <th></th>
                  </tr>
                  </thead>
  
                  <tbody className='twod-details-table-container'>
                    {
                      threePiecesNumbers.map((item,index) => (
                          <tr key = {index} className='twod-details-row'>
                            <td>{item.number}</td>
                            <td>{item.compensation}</td>
                            <td>
                            <div className='twod-details-amount-container'>
                              <button
                              disabled={user_login.role==="guest"  ? true:false}
                              onClick={(e) => 
                              {if(item.amount > 100){
                                decreaseAmount(e,item)} 
    
                              }}
                                >-</button>
                              <input disabled={user_login.role==="guest"  ? true:false} type="number" onWheel={(e) => e.target.blur()} onChange={(e) => handleAmountfinalChange(e,item)} value={item.amount}></input>
                              <button disabled={user_login.role==="guest"  ? true:false} onClick={(e) => increaseAmount(e,item)}>+</button>
                            </div>
                            </td>
                            <td>
                            <button disabled={user_login.role==="guest"  ? true:false} className='twod-details-delete-btn' onClick={() => deleteNumber(item)}>Delete</button>
                            </td>
                          </tr>
                      ))
                    }
                  </tbody>
                </table>
  
                <div className='twod-overall-details-container'>
                  <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Program Information" : "အ‌ရေအတွက်"}</p>
                    <p>{threePiecesNumbers.length}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Total Amount" : "ထိုးကြေးစုစု‌ပေါင်း"}</p>
                    <p>{twoPiecesTotalAmount()}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Lottery Closing Time" : "ပိတ်ချိန်"}</p>
                    <p>{threeDCountDown().diffInDays}days:{threeDCountDown().diffinHours}hours</p>
                  </div>
  
                  <button className='twod-betnow-btn' disabled={user_login.role==="guest"  ? true:false} onClick={submitBetNow}>{current_language === "english" ? "Bet Now" : "ထိုးမည်"}</button>
                  
                </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  )
}

export default ThreePieces