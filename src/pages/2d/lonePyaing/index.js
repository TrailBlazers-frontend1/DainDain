import React,{useState, useRef} from 'react'
import BetNowModal from '../../../components/betnowmodal'
import "./styles.css"

const LonePyaing = () => {
    // let whichLone

    const [isBetNowModalOpen,setIsBetNowModalOpen] = useState(false)

    const customerNameInput = useRef("")
    const customerPhNoInput = useRef("")
    const [customerName,setCustomerName] = useState("")
    const [customerPhNo,setCustomerPhNo] = useState("")
    const [customerType,setCustomerType] = useState("guest")
    const [firstNumbers,setFirstNumbers] = useState([])
    const [lastNumbers,setLastNumbers] = useState([])

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

    const changeFirstNumbers = (e) => {
        const numberString = e.target.value.toString()

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
                number:numberString,
                compensation:"1.9",
                amount:"1000"
            }
            setFirstNumbers([...firstNumbers,newNumber])
        }
        // console.log(firstNumbers)
        // setFirstNumbers(firstNumbers)
    }

    const changeSecondNumbers = (e) => {
        const numberString = e.target.value.toString()
        
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
                number:numberString,
                compensation:"1.9",
                amount:"1000"
            }
            setLastNumbers([...lastNumbers,newNumber])
        }
        // console.log(lastNumbers)
    }

    const bigBtnFirst = () => {
        let btnValues = ["5","6","7","8","9"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }
    const smallBtnFirst = () => {
        let btnValues = ["0","1","2","3","4"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }
    const maBtnFirst = () => {
        let btnValues = ["1","3","5","7","9"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }
    const setBtnFirst = () => {
        let btnValues = ["0","2","4","6","8"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }

    const bigBtnLast = () => {
        let btnValues = ["5","6","7","8","9"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }
    const smallBtnLast = () => {
        let btnValues = ["0","1","2","3","4"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }
    const maBtnLast = () => {
        let btnValues = ["1","3","5","7","9"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }
    const setBtnLast = () => {
        let btnValues = ["0","2","4","6","8"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }

    //one number row start
    const firstNumberRow = () => {
        const rowarray = []
        for(let i = 0;i <= 9; i++){
            rowarray.push(
                <div className='onenumber-1stone-number-btn-container'>
                    <p>{i}</p>
                    <input value={i} onClick={(e) => { changeFirstNumbers(e)}} type="checkbox" name="onenumber number"
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
        for(let i = 0;i <= 9; i++){
            rowarray.push(
                <div className='onenumber-1stone-number-btn-container'>
                    <p>{i}</p>
                    <input value={i} onClick={(e) =>  changeSecondNumbers(e)} type="checkbox" name="onenumber number"
                    className={
                        lastNumbers.some((number) => {
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

    const submitLonePyaing = () => {

        if(customerName === "" || customerPhNo === ""){
            alert("Please Provide Customer Name and Phone Number")
        }else if(firstNumbers.length === 0 && lastNumbers.length === 0){
            alert("Please Bet on a number")
        }else{
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

    />
    <div className='onenumber-parent-container'>
        <div className='select-directly-container'>
            <p className='select-directly-label'>Select Directly:</p>
            <button className='select-directly-btn'>Normal</button>
        </div>

        <div className='onenumber-header-container'>
            <div className='onenumber-header-washrate'>
                <p className='onenumber-header'>Lone Pyaing</p>
                <p className='onenumber-washrate'>wash rate   1.9</p>
            </div>
            <p className='onenumber-description'>Description</p>
        </div>

        <div className='onenumber-numbers-parent-container'>
            <div className='onenumber-numbers-container'>
                <div className='onenumber-1stone-container'>
                    <p className='onenumber-1stone-label'>First Number:</p>
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
                    <p className='onenumber-1stone-label'>Second Number:</p>
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
                <p>Name:</p>
                {/* disabled={user_login.role==="guest" ? true:false} */}
                <input ref={customerNameInput} required type="text" name="onenumber name" ></input>
                </div>
                <div className='onenumber-phno-input-container'>
                <p>Ph No:</p>
                {/* disabled={user_login.role==="guest" ? true:false} */}
                <input ref={customerPhNoInput} required type="text" name="onenumber phno" ></input>
                </div>
            </div>
            
                <div className='onenumber-customer-type-submit-container'>
                    <div   className='onenumber-customer-type-container'>
                        <p>Choose the type of customer:</p>
                        <div className='onenumber-customer-type-radios-container'>
        
                            <div className='onenumber-customer-type-radio-container'>
                            {/* disabled={user_login.role==="guest" ? true:false} */}
                            <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="guest" checked={customerType === "guest"} ></input>
                            <label htmlFor='guest'>Guest</label>
                            </div>
                            <div className='onenumber-customer-type-radio-container'>
                            {/* disabled={user_login.role==="guest" ? true:false} */}
                            <input onChange={(e) => setCustomerType(e.target.value)}  type="radio"  name="customer type" value="royal" checked={customerType === "royal"} ></input>
                            <label htmlFor='royal'>Royal</label>
                            </div>
                        </div>
                    </div>
                    
                    <button type='submit' className='onenumber-name-phno-btn'>Add</button>
                </div>
            
  
          </form>

          <div className='onenumber-customer-info-detail-container'>
            <div className='onenumber-customer-info-detail-name-container'>
                <p>Name:</p>
                <p>{customerName}</p>
            </div>
            <div className='onenumber-customer-info-detail-phno-container'>
                <p>PhNo:</p>
                <p>{customerPhNo}</p>
            </div>
          </div>
          </div>

        <div className='twod-details-parent-container'>
            <div className='twod-details-container'>
                <div className='lonepyaing-details-header-container'>
                    <p>Number</p>
                    <p>Compensation</p>
                    <p>Amount</p>
                </div>

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

                <div className='lonepyaing-details-table-container'>
                    {
                        firstNumbers.map((number,index) => (
                            <div key={index} className='lonepyaing-details-row'>
                                <p className='onenumber-details-number'>first({`${number.number}∞`})</p>
                                <p>{number.compensation}</p>
                            <div className='lonepyaing-details-amount-container'>
                                <button onClick={(e,firstOrLast="first") => {
                                    if(number.amount > 100){
                                        // setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) - 100).toString()})
                                     decreaseAmount(e,number,firstOrLast)
                                    }
                                }}>-</button>
                                <input type="number" onChange={(e,firstOrLast="first") => handleAmountfinalChange(e,number,firstOrLast)} value={number.amount}></input>
                                <button onClick={(e,firstOrLast="first") => increaseAmount(e,number,firstOrLast)}>+</button>
                            </div>
                                <button className='lonepyaing-details-delete-btn' onClick={(e,firstOrLast="first") => deleteNumber(number,firstOrLast)}>Delete</button>
                            </div>
                            
                        ))
                    }
                    {
                        lastNumbers.map((number,index) => (
                            <div key={index} className='lonepyaing-details-row'>
                                <p className='onenumber-details-number'>last({`∞${number.number}`})</p>
                                <p>{number.compensation}</p>
                            <div className='lonepyaing-details-amount-container'>
                                <button onClick={(e,firstOrLast="last") => {
                                    if(number.amount > 100){
                                        // setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) - 100).toString()})
                                     decreaseAmount(e,number,firstOrLast)
                                    }
                                }}>-</button>
                                <input type="number" onChange={(e,firstOrLast="last") => handleAmountfinalChange(e,number,firstOrLast)} value={number.amount}></input>
                                <button onClick={(e,firstOrLast="last") => increaseAmount(e,number,firstOrLast)}>+</button>
                            </div>
                                <button className='lonepyaing-details-delete-btn' onClick={(e,firstOrLast="last") => deleteNumber(number,firstOrLast)}>Delete</button>
                            </div>
                            
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
                    
                </div>
            </div>

            <div className='twod-overall-details-container'>
                <div className='twod-overall-detail-container'>
                    <p>Program Information</p>
                    <p>{firstNumbers.length + lastNumbers.length}</p>
                </div>
                <div className='twod-overall-detail-container'>
                    <p>Punch Fee</p>
                    <p>{totalAmount()}</p>
                </div>
                <div className='twod-overall-detail-container'>
                    <p>Lottery Closing Time</p>
                    <p>98:00:00</p>
                </div>

                <button className='twod-betnow-btn' onClick={() => submitLonePyaing()}>Bet Now</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default LonePyaing