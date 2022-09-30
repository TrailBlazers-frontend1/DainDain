import React,{useState, useRef, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
// import Pusher from 'pusher-js';
import { pusher } from '../../../pusher'

import BetNowModal from '../../../components/betnowmodal'
import { isMorningOrEvening } from '../../../redux/countdown'

import {axiosInstance} from "../../../urlConfig"

import { setTwodList } from '../../../redux/2d3dList'

import "./styles.css"

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const TwoPieces = () => {
    const [isBetNowModalOpen,setIsBetNowModalOpen] = useState(false)

    // const [twodSaleList,setTwodSaleList] = useState([])

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

    const dispatch = useDispatch()

    const {user_login} = useSelector(state => state.user)
    const {morning_evening} = useSelector(state => state.countdown)
    const {profile} = useSelector(state => state.agent)
    const {twodList} = useSelector(state => state.twodThreed)

    const {current_language} = useSelector(state => state.language)
    const {remaining_time} = useSelector(state => state.countdown)

    const notify = (message) => toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });
    
    const fetch2dList = async () => {
      try {
        if(morning_evening.morning){
          const morning2d = await axiosInstance.get("/getTwoDsAM",{headers:{Authorization:`Bearer ${user_login.token}`}})
        if(morning2d.data.status === 200){
          // console.log(res)
          // console.log(morning2d.data.twods)
          const sortedMorningTwodList = morning2d.data.twods.sort((a,b) => {
            return a.id - b.id
          })
          // console.log(sortedMorningTwodList)
          dispatch(setTwodList(sortedMorningTwodList))
        }
        }

        if(morning_evening.evening){
          const evening2d = await axiosInstance.get("/getTwoDsPM",{headers:{Authorization:`Bearer ${user_login.token}`}})
          if(evening2d.data.status === 200){
            // console.log(res)
            const sortedEveningTwodList = evening2d.data.twods.sort((a,b) => {
              return a.id - b.id
            })
            // console.log(sortedEveningTwodList)
            dispatch(setTwodList(sortedEveningTwodList))
          }
        }
        
      } catch (error) {
        notify("Something went Wrong. Please log in again.")
      }
    }

    useEffect(() => {
      if(user_login.isLoggedIn && user_login.role === "agent"){

      fetch2dList()
        // var pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
        //   cluster: process.env.REACT_APP_PUSHER_CLUSTER
        // });
  
        const channel = pusher.subscribe(`${process.env.REACT_APP_PUSHER_CHANNEL}.${profile.refereeId}`);
        channel.bind('App\\Events\\testing', function(data) {
          // console.log(data);
         
        //   const sortedTwodList = data.salesList.sort((a,b) => {
        //     return a.id - b.id
        //   })
        //   console.log(sortedTwodList)
        //   dispatch(setTwodList(sortedTwodList))
          fetch2dList()
        });

        const channel1 = pusher.subscribe(`accepted-channel.${profile.refereeId}`);
            channel1.bind('App\\Events\\AcceptedSMS', function(data) { 
            // notify(data)
            fetch2dList()
              
        });

        return (() => {
          pusher.unsubscribe(`${process.env.REACT_APP_PUSHER_CHANNEL}.${profile.refereeId}`)
          pusher.unsubscribe(`accepted-channel.${profile.refereeId}`)
      })
      }
      
    }, [])
    


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
      const totalAmount = twoPiecesTotalAmount()
      // console.log(profile.coin_amount)
      if(customerName == "" || customerPhno == ""){
        notify("Please Provide Customer name and phone number")
      }
      else if(twodNumbers.length === 0){
        notify("Please Bet on a number")
      }else if(profile.coin_amount < totalAmount){
        notify("Not Enough Coins")
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
            notify("Number Already Exists")
          }
          else{
            const compensationId = twodList.find((item) => {
              if(item.number === number){
                return item
              }
            })
            // const id = twodSaleList.find((item) => {
            //   if(item.number === number){
            //     return item
            //   }
            // })
            // console.log(compensationId)
            const newNumber = {
              id:compensationId?.id,
              number: number,
              compensation:compensationId? compensationId.compensation : '0',
              amount: amount.toString()
            }
            setTwodNumbers([...twodNumbers,newNumber])
          }
      }else{
        notify("Number should have two digits")
      }
        
      setNumber("")
      setAmount("1000")
      // console.log(twodNumbers)
    }
    //add number and amount to number details end


    //update number amount array start
    const changeNumberArray = (e, twod) => {
      
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
                id: twod?.id,
                number:numberString,
                compensation: twod? twod.compensation : '0',
                amount:"1000"
            }
        setTwodNumbers([...twodNumbers,newNumber])
      }
      
  
      // console.log(twodNumbers)
    }
    //update number amount array end
  
    //twod Number row start
    const row = (start,end) => {
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
           value={i <= 9 ? `0${i}` : i} onClick={(e) => changeNumberArray(e,twodList[i])} type="checkbox" name='twopieces number' disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}></input>
        </div>
        <div className='twopieces-details-container'>
          {
            user_login.role==="guest" ? null :
          <div className='twopieces-rate-container'>
            <p className='twopieces-rate-label'>{current_language === "english" ? "Rate" : "ဆ"}</p>
            <p className='twopieces-rate-num'>{twodList[i]? twodList[i].compensation : "0"}</p>
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

      const handleNumberInputChange = (e) => {
        setNumber(e.target.value)
        // console.log(e.target.value)
      }


    return (
      <>
      <BetNowModal isBetNowModalOpen={isBetNowModalOpen} setIsBetNowModalOpen={setIsBetNowModalOpen}
       customerName= {customerName}
       customerPhno= {customerPhno}
       customerType={customerType}
       twodNumbers = {twodNumbers}
       setTwodNumbers={setTwodNumbers}
       twodList={twodList}/>
      <div className='twopieces-parent-container'>
        <div className='select-directly-container'>
          <p className='select-directly-label'>Select Directly:</p>
          <button className='select-directly-btn'>Normal</button>
        </div>
  
      
        <div className='twopieces-header-container'>
          <div className='twopieces-header-washrate'>
            <p className='twopieces-header'>{current_language === "english" ? "2Pieces" : "၂လုံး"}</p>
            {/* <p className='twopieces-washrate'>Compensation   80</p> */}
          </div>
          {/* <p className='twopieces-description'>Description</p> */}
        </div>
  
        <div className='twopieces-numbers-parent-container'>
          <div className='twopieces-numbers-container'>
  
            <div className='twopieces-numbers-row'>
              {row(0,6)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(7,13)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(14,20)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(21,27)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(28,34)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(35,41)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(42,48)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(49,55)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(56,62)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(63,69)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(70,76)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(77,83)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(84,90)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(91,97)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(98,99)}
            </div>
            {/* <div className='twopieces-numbers-row'>
              {row(85,92)}
              </div>
              <div className='twopieces-numbers-row'>
              {row(93,99)}
            </div> */}
          </div>

          <div className='twopieces-numbers-container twopieces-numbers-container-mobile'>
  
            <div className='twopieces-numbers-row'>
              {row(0,3)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(4,7)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(8,11)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(12,15)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(16,19)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(20,23)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(24,27)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(28,31)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(32,35)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(36,39)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(40,43)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(44,47)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(48,51)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(52,55)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(56,59)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(60,63)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(64,67)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(68,71)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(72,75)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(76,79)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(80,83)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(84,87)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(88,91)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(92,95)}
            </div>
            <div className='twopieces-numbers-row'>
              {row(96,99)}
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
              <p>{current_language === "english" ? "Name:" : "နာမည်"}</p>
              <input ref={customerNameInput} required type="text" name="twopieces name" disabled={user_login.role==="guest"  || (!morning_evening.morning && !morning_evening.evening)  ?true:false}></input>
            </div>
            <div className='twopieces-phno-input-container'>
              <p>{current_language === "english" ? "Phone:" : "ဖုန်း"}</p>
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
            
            <button type='submit' className='twopieces-name-phno-btn'>{current_language === "english" ? "Add" : "ထည့်မည်"}</button>
  
          </form>
  
          <form onSubmit={(e) => submitNumberAmount(e)} className='twopieces-number-amount-input-container'>
            <div className='twopieces-customer-infos'>

              <p className='twopieces-customer-name'>{customerName}</p>
              <p className='twopieces-customer-phno'>{customerPhno}</p>
            </div>
            <div className='twopieces-number-input-container'>
              <p>{current_language === "english" ? "Number:" : "နံပါတ်"}</p>
              <input required value={number} onWheel={(e) => e.target.blur()} onChange={(e) => handleNumberInputChange(e)} type="number" id="number" name="number" min="0" max="99" disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false}></input>
             
            </div>
  
            <div className='twopieces-amount-input-container'>
              <p>{current_language === "english" ? "Amount:" : "ထိုးကြေး"}</p>
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
  
            <button type='submit' disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ?  true:false}  className='twopieces-number-amount-btn'>{current_language === "english" ? "Add" : "ထည့်မည်"}</button>
          </form>
  
        </div>
  
      </div>
      <div className='twod-details-parent-container'>
                <table className='twod-details-container'>
                  <tr className='twod-details-header-container'>
                    <th>{current_language === "english" ? "Number" : "နံပါတ်"}</th>
                    <th>{current_language === "english" ? "Rate" : "ဆ"}</th>
                    <th>{current_language === "english" ? "Amount:" : "ထိုးကြေး"}</th>
                    <th></th>
                  </tr>
  
                  <tbody className='twod-details-table-container'>
                    {
                      twodNumbers.map((item,index) => (
                          <tr key = {index} className='twod-details-row'>
                          <td>{item.number}</td>
                          <td>{item.compensation}</td>
                          <td>
                          <div className='twod-details-amount-container'>
                            <button onClick={(e) => 
                            {if(item.amount > 100){
                              decreaseAmount(e,item)} 
  
                            }}
                              >-</button>
                            <input type="number" onWheel={(e) => e.target.blur()} onChange={(e) => handleAmountfinalChange(e,item)} value={item.amount}></input>
                            <button onClick={(e) => increaseAmount(e,item)}>+</button>
                          </div>
                          </td>
                          <td>
                          <button className='twod-details-delete-btn' onClick={() => deleteNumber(item)}>Delete</button>
                          </td>
                          </tr>
                      ))
                    }
                  </tbody>
                </table>
  
                <div className='twod-overall-details-container'>
                  <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Program Information" : "အ‌ရေအတွက်"}</p>
                    <p>{twodNumbers.length}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Total Amount" : "ထိုးကြေးစုစု‌ပေါင်း"}</p>
                    <p>{twoPiecesTotalAmount()}</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Lottery Closing Time" : "ပိတ်ချိန်"}</p>
                    <p>{remaining_time.hours ? remaining_time.hours : "0"}:{remaining_time.minutes ? remaining_time.minutes : "0"}:{remaining_time.seconds ? remaining_time.seconds : "0"}</p>
                  </div>
  
                  <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ?  true:false} className='twod-betnow-btn' onClick={submitBetNow}>{current_language === "english" ? "Bet Now" : "ထိုးမည်"}</button>
                  
                </div>
      </div>
      {/* <ToastContainer /> */}
      </>
    )
  }

export default TwoPieces