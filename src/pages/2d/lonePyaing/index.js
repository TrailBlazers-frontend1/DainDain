import React,{useState, useRef, useEffect} from 'react'
import BetNowModal from '../../../components/betnowmodal'
import {useDispatch, useSelector} from "react-redux"
// import Pusher from 'pusher-js';
import { pusher } from '../../../pusher'
import {setLonePyineList} from "../../../redux/2d3dList"
import { axiosInstance } from '../../../urlConfig'
import "./styles.css"

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const LonePyaing = () => {
    // let whichLone

    const [isBetNowModalOpen,setIsBetNowModalOpen] = useState(false)

    const {user_login} = useSelector(state => state.user)
    const {morning_evening} = useSelector(state => state.countdown)

    const customerNameInput = useRef("")
    const customerPhNoInput = useRef("")
    const [customerName,setCustomerName] = useState("")
    const [customerPhNo,setCustomerPhNo] = useState("")
    const [customerType,setCustomerType] = useState("guest")

    // const [lonePyineList,setLonePyineList] = useState([])
    const [firstNumbers,setFirstNumbers] = useState([])
    const [lastNumbers,setLastNumbers] = useState([])

    const {profile} = useSelector(state => state.agent)
    const {lonePyineList} =  useSelector(state => state.twodThreed)

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

    const dispatch = useDispatch()

    const submitCustomerInfo = (e) => {
        e.preventDefault()
        setCustomerName(customerNameInput.current.value)
        setCustomerPhNo(customerPhNoInput.current.value)
        customerNameInput.current.value=""
        customerPhNoInput.current.value = ""
    }

    const totalAmount = () => {
        let amountArr1 = firstNumbers.map((number) => parseInt(number.amount))
        let amountArr2 = lastNumbers.map((number) => parseInt(number.amount))
      // console.log(amountArr)
      let totalAmount1 = amountArr1.reduce((previous,current) => previous+current,0)
      let totalAmount2 = amountArr2.reduce((previous,current) => previous+current,0)
      const totalAmount = totalAmount1 + totalAmount2
      return totalAmount
    }

    const fetchLonePyineList = async () => {
        try {
            if(morning_evening.morning){
              const morningLonePyine = await axiosInstance.get("/getLonePyaingsAM",{headers:{Authorization:`Bearer ${user_login.token}`}})
            if(morningLonePyine.data.status === 200){
              // console.log(res)
              dispatch(setLonePyineList(morningLonePyine.data.lonepyaings))
            }
            }
    
            if(morning_evening.evening){
              const eveningLonepyine = await axiosInstance.get("/getLonePyaingsPM",{headers:{Authorization:`Bearer ${user_login.token}`}})
              if(eveningLonepyine.data.status === 200){
                // console.log(res)
                dispatch(setLonePyineList(eveningLonepyine.data.lonepyaings))
              }
            }
            
          } catch (error) {
            notify(error.message)
          }
        
  
      }

    useEffect(() => {
        if(user_login.isLoggedIn && user_login.role === "agent"){

            fetchLonePyineList()
        // var pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
        //     cluster: process.env.REACT_APP_PUSHER_CLUSTER
        //     });
    
          const channel = pusher.subscribe(`lonepyine-channel.${profile.refereeId}`);
          channel.bind('App\\Events\\lonepyine', function(data) {
            // notify(JSON.stringify(data));
            dispatch(setLonePyineList(data.salesList))
            
            // console.log(lonePyineList)
            // console.log("use effect ran")
          });

          return (() => {
            pusher.unsubscribe(`lonepyine-channel.${profile.refereeId}`)
        })
        }
    },[])

    const changeFirstNumbers = (e,lonePyine) => {
        const numberString = e.target.value?.toString()

        // console.log(firstNumbers.numbers.length > 0)
        
        let found = false

        let filteredArray = firstNumbers.filter((number) => {
            if(number.number === numberString){
                found = true
            }
            else{
                return number
            }
        })

        setFirstNumbers(filteredArray)
        // firstNumbers.numbers = filteredArray
        if(found === false){
            // let newarr = firstNumbers.numbers
            // newarr?.push(numberString)
            // setFirstNumbers({...firstNumbers,numbers : newarr})
            const newNumber = {
                id:lonePyine?.id,
                number:numberString,
                compensation: lonePyine? lonePyine.compensation : "0",
                amount:"1000"
            }
            setFirstNumbers([...firstNumbers,newNumber])
        }
        // console.log(firstNumbers)
        // setFirstNumbers(firstNumbers)
    }

    const changeSecondNumbers = (e,lonePyine) => {
        const numberString = e.target.value.toString().split("")[1]
        // console.log(numberString)
        
        let found = false

        let filteredArray = lastNumbers.filter((number) => {
            if(number.number === numberString){
                found = true
            }
            else{
                return number
            }
        })

        setLastNumbers(filteredArray)
        // lastNumbers.numbers = filteredArray
        if(found === false){
            const newNumber = {
                id:lonePyine?.id,
                number:numberString,
                compensation:lonePyine? lonePyine.compensation : "0",
                amount:"1000"
            }
            setLastNumbers([...lastNumbers,newNumber])
        }
        // console.log(lastNumbers)
    }

    // const bigBtnFirst = () => {
    //     let btnValues = ["5","6","7","8","9"]

    //     // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
    //     setFirstNumbers({...firstNumbers,numbers: btnValues})  

    // }
    // const smallBtnFirst = () => {
    //     let btnValues = ["0","1","2","3","4"]

    //     // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
    //     setFirstNumbers({...firstNumbers,numbers: btnValues})  

    // }
    // const maBtnFirst = () => {
    //     let btnValues = ["1","3","5","7","9"]

    //     // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
    //     setFirstNumbers({...firstNumbers,numbers: btnValues})  

    // }
    // const setBtnFirst = () => {
    //     let btnValues = ["0","2","4","6","8"]

    //     // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
    //     setFirstNumbers({...firstNumbers,numbers: btnValues})  

    // }

    // const bigBtnLast = () => {
    //     let btnValues = ["5","6","7","8","9"]

    //     // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
    //     setLastNumbers({...lastNumbers,numbers: btnValues})  

    // }
    // const smallBtnLast = () => {
    //     let btnValues = ["0","1","2","3","4"]

    //     // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
    //     setLastNumbers({...lastNumbers,numbers: btnValues})  

    // }
    // const maBtnLast = () => {
    //     let btnValues = ["1","3","5","7","9"]

    //     // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
    //     setLastNumbers({...lastNumbers,numbers: btnValues})  

    // }
    // const setBtnLast = () => {
    //     let btnValues = ["0","2","4","6","8"]

    //     // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
    //     setLastNumbers({...lastNumbers,numbers: btnValues})  

    // }

    //one number row start
    const firstNumberRow = () => {
        const rowarray = []
        for(let i = 0;i <= 9; i++){
            rowarray.push(
                <div className='onenumber-1stone-number-btn-container'>
                    <p>{i}</p>
                    <input disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} value={i} onClick={(e) => { changeFirstNumbers(e,lonePyineList[i])}} type="checkbox" name="onenumber number"
                    className={
                        firstNumbers.some((number) => {
                          if(number.number === i.toString()) {
                            return true
                          }
                        }) ? "checked" : null
                      } 
                    ></input>
                </div>
            )
        }
        return rowarray
    }
    const lastNumberRow = () => {
        const rowarray = []
        for(let i = 10;i <= 19; i++){
            rowarray.push(
                <div className='onenumber-1stone-number-btn-container'>
                    <p>{i.toString().split("")[1]}</p>
                    <input disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} value={i} onClick={(e) =>  changeSecondNumbers(e,lonePyineList[i])} type="checkbox" name="onenumber number"
                    className={
                        lastNumbers.some((number) => {
                          if(number.number === i.toString().split("")[1]) {
                            return true
                          }
                        }) ? "checked" : null
                      }
                    ></input>
                </div>
            )
        }
        return rowarray
    }

    const submitLonePyaing = () => {
        const totalLonePyineAmount = totalAmount()
        if(customerName === "" || customerPhNo === ""){
            notify("Please Provide Customer Name and Phone Number")
        }else if(firstNumbers.length === 0 && lastNumbers.length === 0){
            notify("Please Bet on a number")
        }else if(profile.coin_amount < totalLonePyineAmount){
            notify("Not Enough Coins")
          }
        else{
            // console.log(firstNumbers,lastNumbers)
            setIsBetNowModalOpen(true)
        }
        
        
    }

    const decreaseAmount = (e,item,firstOrLast) => {
        if(firstOrLast === "first"){
            const newarr = firstNumbers.map((number) => {
                if(item.number === number.number){
                  return {...number, amount : (parseInt(item.amount)-100).toString()}
                }
                return number
              })
          
              setFirstNumbers(newarr)
        }
        if(firstOrLast === "last"){
            const newarr = lastNumbers.map((number) => {
                if(item.number === number.number){
                  return {...number, amount : (parseInt(item.amount)-100).toString()}
                }
                return number
              })
          
              setLastNumbers(newarr)
        }
        
    }

    const handleAmountfinalChange = (e,item,firstOrLast) => {
        if(firstOrLast === "first"){

            const newarr = firstNumbers.map((number) => {
                if(item.number === number.number){
                  return {...number, amount: e.target.value}
                }
                return number
              })
          
              setFirstNumbers(newarr)
        }
        if(firstOrLast === "last"){
            const newarr = lastNumbers.map((number) => {
                if(item.number === number.number){
                  return {...number, amount: e.target.value}
                }
                return number
              })
          
              setLastNumbers(newarr)
        }
    }

    const increaseAmount = (e,item,firstOrLast) => {
        if(firstOrLast === "first"){
            const newarr = firstNumbers.map((number) => {
                if(item.number === number.number){
                  return {...number, amount : (parseInt(item.amount)+100).toString()}
                }
                return number
              })
          
              setFirstNumbers(newarr)
        }
        if(firstOrLast === "last"){
            const newarr = lastNumbers.map((number) => {
                if(item.number === number.number){
                  return {...number, amount : (parseInt(item.amount)+100).toString()}
                }
                return number
              })
          
              setLastNumbers(newarr)
        }
        
    }

    const deleteNumber = (item,firstOrLast) => {
        // console.log(firstOrLast)
        if(firstOrLast === "first"){
            let filteredArray = firstNumbers.filter((number) => {
                return number.number !== item.number
              })
            //   console.log(filteredArray)
          
              setFirstNumbers(filteredArray)
        }
        if(firstOrLast === "last"){
            let filteredArray = lastNumbers.filter((number) => {
                return number.number !== item.number
              })
          
              setLastNumbers(filteredArray)
        }
        
      }
  return (
    <>
    <BetNowModal isBetNowModalOpen={isBetNowModalOpen} setIsBetNowModalOpen={setIsBetNowModalOpen}
    customerName={customerName} customerPhno={customerPhNo} customerType={customerType}
    firstNumbers={firstNumbers} setFirstNumbers={setFirstNumbers}
    lastNumbers={lastNumbers} setLastNumbers={setLastNumbers}
    lonePyineList={lonePyineList}

    />
    <div className='onenumber-parent-container'>
        <div className='select-directly-container'>
            <p className='select-directly-label'>Select Directly:</p>
            <button className='select-directly-btn'>Normal</button>
        </div>

        <div className='onenumber-header-container'>
            <div className='onenumber-header-washrate'>
                <p className='onenumber-header'>{current_language === "english" ? "Lone Pyine" : "လုံးပြိုင်"}</p>
                {/* <p className='onenumber-washrate'>Compensation   8.0</p> */}
            </div>
            {/* <p className='onenumber-description'>Description</p> */}
        </div>

        <div className='onenumber-numbers-parent-container'>
            <div className='onenumber-numbers-container'>
                <div className='onenumber-1stone-container'>
                    <p className='onenumber-1stone-label'>{current_language === "english" ? "First Number" : "ထိပ်လုံး"}</p>
                    <div className='onenumber-1stone-numbers-container'>
                        {firstNumberRow()}
                    </div>
                </div>
                <div className='onenumber-1stone-btns-container'>
                    {/* <div className='onenumber-1stone-btn-container'>
                        <p>big</p>
                        <input className={
                            firstNumbers.numbers.join() == ["5","6","7","8","9"].join() ?
                            "lonepyaing-btn-checked" : null
                        } onClick={() => bigBtnFirst()}  type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>small</p>
                        <input className={
                            firstNumbers.numbers.join() == ["0","1","2","3","4"].join() ?
                            "lonepyaing-btn-checked" : null }
                             onClick = {() => smallBtnFirst()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>ma</p>
                        <input className={
                            firstNumbers.numbers.join() == ["1","3","5","7","9"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => maBtnFirst()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>set</p>
                        <input className={
                            firstNumbers.numbers.join() == ["0","2","4","6","8"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => setBtnFirst()} type="checkbox" name="onenumber btn"></input>
                    </div> */}
                </div>
            </div>
            <div className='onenumber-numbers-container'>
                <div className='onenumber-1stone-container'>
                    <p className='onenumber-1stone-label'>{current_language === "english" ? "Last Number" : "‌နောက်လုံး"}</p>
                    <div className='onenumber-1stone-numbers-container'>
                        {lastNumberRow()}
                    </div>
                </div>
                <div className='onenumber-1stone-btns-container'>
                    {/* <div className='onenumber-1stone-btn-container'>
                        <p>big</p>
                        <input className={
                            lastNumbers.numbers.join() == ["5","6","7","8","9"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => bigBtnLast()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>small</p>
                        <input className={
                            lastNumbers.numbers.join() == ["0","1","2","3","4"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => smallBtnLast()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>ma</p>
                        <input className={
                            lastNumbers.numbers.join() == ["1","3","5","7","9"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => maBtnLast()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>set</p>
                        <input className={
                            lastNumbers.numbers.join() == ["0","3","4","6","8"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => setBtnLast()} type="checkbox" name="onenumber btn"></input>
                    </div> */}
                </div>
            </div>
        </div>

        <div className='onenumber-line'></div>
        {/* onSubmit={(e) => submitCustomerInfo(e)}  */}
        <div className='onenumber-name-phno-parent-container'>

        
        <form onSubmit={(e) => submitCustomerInfo(e)} className='onenumber-name-phno-input-container'>
            <div className='onenumber-name-phno-container'>
                <div className='onenumber-name-input-container'>
                <p>{current_language === "english" ? "Name:" : "နာမည်"}</p>
                {/* disabled={user_login.role==="guest" ? true:false} */}
                <input disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} ref={customerNameInput} required type="text" name="onenumber name" ></input>
                </div>
                <div className='onenumber-phno-input-container'>
                <p>{current_language === "english" ? "Phone:" : "ဖုန်း"}</p>
                {/* disabled={user_login.role==="guest" ? true:false} */}
                <input disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} ref={customerPhNoInput} required type="text" name="onenumber phno" ></input>
                </div>
            </div>
            
                <div className='onenumber-customer-type-submit-container'>
                    {/* <div   className='onenumber-customer-type-container'>
                        <p>Choose the type of customer:</p>
                        <div className='onenumber-customer-type-radios-container'>
        
                            <div className='onenumber-customer-type-radio-container'>
                            
                            <input disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="guest" checked={customerType === "guest"} ></input>
                            <label htmlFor='guest'>Guest</label>
                            </div>
                            <div className='onenumber-customer-type-radio-container'>
                           
                            <input disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="royal" checked={customerType === "royal"} ></input>
                            <label htmlFor='royal'>Royal</label>
                            </div>
                        </div>
                    </div> */}
                    
                    <button type='submit' className='onenumber-name-phno-btn'>{current_language === "english" ? "Add" : "ထည့်မည်"}</button>
                </div>
            
  
          </form>

          <div className='onenumber-customer-info-detail-container'>
            <div className='onenumber-customer-info-detail-name-container'>
                <p>{current_language === "english" ? "Name:" : "နာမည်"}</p>
                <p>{customerName}</p>
            </div>
            <div className='onenumber-customer-info-detail-phno-container'>
                <p>{current_language === "english" ? "Phone:" : "ဖုန်း"}</p>
                <p>{customerPhNo}</p>
            </div>
          </div>
          </div>

        <div className='twod-details-parent-container'>
            <table className='twod-details-container'>
                <thead>
                    <tr className='lonepyaing-details-header-container'>
                        <th>{current_language === "english" ? "Number" : "နံပါတ်"}</th>
                        <th>{current_language === "english" ? "Compensation" : "ဆ"}</th>
                        <th>{current_language === "english" ? "Amount:" : "ထိုးကြေး"}</th>
                        <th></th>
                    </tr>
                </thead>

                {/* <div className='twod-details-row'>
                        <p className='onenumber-details-number'>first({
                            firstNumbers.numbers.map((number) => (
                                // `${number},`
                                console.log(number)
                            ))
                        })</p>
                        <p>85</p>
                            <div className='twod-details-amount-container'>
                                <button>-</button>
                                <input type="number"></input>
                                <button>+</button>
                            </div>
                                <button className='twod-details-delete-btn'>Delete</button>
                        </div>: null */}

                <tbody className='lonepyaing-details-table-container'>
                    {
                        firstNumbers.map((number,index) => (
                            <tr key={index} className='lonepyaing-details-row'>
                                <td className='onenumber-details-number'>{current_language === "english" ? "First" : "ထိပ်"}({`${number.number}∞`})</td>
                                <td>{number.compensation}</td>
                                <td>
                                <div className='lonepyaing-details-amount-container'>
                                    <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onClick={(e,firstOrLast="first") => {
                                        if(number.amount > 100){
                                            // setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) - 100).toString()})
                                        decreaseAmount(e,number,firstOrLast)
                                        }
                                    }}>-</button>
                                    <input disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} type="number" onChange={(e,firstOrLast="first") => handleAmountfinalChange(e,number,firstOrLast)} value={number.amount}></input>
                                    <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onClick={(e,firstOrLast="first") => increaseAmount(e,number,firstOrLast)}>+</button>
                                </div>
                                </td>
                                <td>
                                <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} className='lonepyaing-details-delete-btn' onClick={(e,firstOrLast="first") => deleteNumber(number,firstOrLast)}>Delete</button>
                                </td>
                            </tr>
                            
                        ))
                    }
                    {
                        lastNumbers.map((number,index) => (
                            <tr key={index} className='lonepyaing-details-row'>
                                <td className='onenumber-details-number'>{current_language === "english" ? "Last" : "နောက်"}({`∞${number.number}`})</td>
                                <td>{number.compensation}</td>
                                <td>
                                <div className='lonepyaing-details-amount-container'>
                                    <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onClick={(e,firstOrLast="last") => {
                                        if(number.amount > 100){
                                            // setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) - 100).toString()})
                                        decreaseAmount(e,number,firstOrLast)
                                        }
                                    }}>-</button>
                                    <input type="number" disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onChange={(e,firstOrLast="last") => handleAmountfinalChange(e,number,firstOrLast)} value={number.amount}></input>
                                    <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} onClick={(e,firstOrLast="last") => increaseAmount(e,number,firstOrLast)}>+</button>
                                </div>
                                </td>
                                <td>
                                <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} className='lonepyaing-details-delete-btn' onClick={(e,firstOrLast="last") => deleteNumber(number,firstOrLast)}>Delete</button>
                                </td>
                            </tr>
                            
                        ))
                    }
                    {/* {
                        firstNumbers.numbers && firstNumbers.numbers.length > 0 ? 
                         <div className='twod-details-row'>
                        <p className='onenumber-details-number'>first({
                            firstNumbers.numbers.map((number) => (
                                `${number},`
                            ))
                        })</p>
                        <p>85</p>
                            <div className='twod-details-amount-container'>
                                <button onClick={() => {
                                    if(firstNumbers.amount > 100){
                                        setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) - 100).toString()})
                                    }
                                }}>-</button>
                                <input type="number" onChange={e => setFirstNumbers({...firstNumbers,amount:e.target.value})} value={firstNumbers.amount}></input>
                                <button onClick={() => setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) + 100).toString()})}>+</button>
                            </div>
                                <button className='twod-details-delete-btn' onClick={() => setFirstNumbers({...firstNumbers,numbers:[]})}>Delete</button>
                        </div>: null 
                    }
                    {
                        lastNumbers.numbers && lastNumbers.numbers.length > 0 ? 
                         <div className='twod-details-row'>
                        <p className='onenumber-details-number'>second({
                            lastNumbers.numbers.map((number) => (
                                `${number},`
                            ))
                        })</p>
                        <p>85</p>
                            <div className='twod-details-amount-container'>
                                <button onClick={() => {
                                    if(lastNumbers.amount > 100){
                                        setLastNumbers({...lastNumbers, amount: (parseInt(lastNumbers.amount) - 100).toString()})
                                    }
                                }}>-</button>
                                <input type="number" onChange={e => setLastNumbers({...lastNumbers,amount:e.target.value})} value={lastNumbers.amount}></input>
                                <button onClick={() => setLastNumbers({...lastNumbers, amount: (parseInt(lastNumbers.amount) + 100).toString()})}>+</button>
                            </div>
                                <button className='twod-details-delete-btn' onClick={() => setLastNumbers({...lastNumbers,numbers:[]})}>Delete</button>
                        </div>: null 
                    } */}
                    
                </tbody>
            </table>

            <div className='twod-overall-details-container'>
                <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Program Information" : "အ‌ရေအတွက်"}</p>
                    <p>{firstNumbers.length + lastNumbers.length}</p>
                </div>
                <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Total Amount" : "ထိုးကြေးစုစု‌ပေါင်း"}</p>
                    <p>{totalAmount()}</p>
                </div>
                <div className='twod-overall-detail-container'>
                    <p>{current_language === "english" ? "Lottery Closing Time" : "ပိတ်ချိန်"}</p>
                    <p>{remaining_time.hours ? remaining_time.hours : "0"}:{remaining_time.minutes ? remaining_time.minutes : "0"}:{remaining_time.seconds ? remaining_time.seconds : "0"}</p>
                </div>

                <button disabled={user_login.role==="guest" || (!morning_evening.morning && !morning_evening.evening) ? true:false} className='twod-betnow-btn' onClick={() => submitLonePyaing()}>{current_language === "english" ? "Bet Now" : "ထိုးမည်"}</button>
            </div>
        </div>
    </div>
    {/* <ToastContainer /> */}
    </>
  )
}

export default LonePyaing