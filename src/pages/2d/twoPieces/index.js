import React,{useState} from 'react'
import "./styles.css"

const TwoPieces = () => {
    const [customerName,setCustomerName] = useState("")
    const [customerPhno,setCustomerPhno] = useState("")
    const [number,setNumber] = useState("")
    const [amount,setAmount] = useState("1000")
    const [twodNumbers,setTwodNumbers] = useState([])
    const submitCustomerInfo = (e) => {
      e.preventDefault()
      // console.log(customerName,customerPhno)
      // setCustomerName("")
      // setCustomerPhno("")
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
      console.log(twodNumbers)
      setTwodNumbers([])
    }
    //submit number amount details end
  
    
    //add number and amount to number details start
    const submitNumberAmount = (e) => {
      e.preventDefault()
      if(!amount){
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
            amount:"1000"
          }
          setTwodNumbers([...twodNumbers,newNumber])
        }
      }
      if(amount){
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
            amount: amount
          }
          setTwodNumbers([...twodNumbers,newNumber])
        }
      }
      setNumber("")
      setAmount("1000")
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
              if(number.number === i.toString()) {
                return true
              }
            }) ? "checked" : null
          }
           value={i} onClick={(e) => changeNumberArray(e,twodNumbers,setTwodNumbers)} type="checkbox" name='twopieces number'></input>
        </div>
        <div className='twopieces-details-container'>
          <div className='twopieces-rate-container'>
            <p className='twopieces-rate-label'>Rate:</p>
            <p className='twopieces-rate-num'>85</p>
          </div>
          <div className='twopieces-max-container'>
            <p className='twopieces-max-label'>Max:</p>
            <p className='twopieces-max-num'>1000000</p>
          </div>
          <div className='twopieces-sale-container'>
            <p className='twopieces-sale-label'>Sale:</p>
            <p className='twopieces-sale-num'>1000000</p>
          </div>
        </div>
    </div>)
      }
      return(rowarray)
    }
    //two number row end


    return (
      <>
      <div className='twopieces-parent-container'>
        <div className='select-directly-container'>
          <p className='select-directly-label'>Select Directly:</p>
          <button className='select-directly-btn'>Normal</button>
        </div>
  
      
        <div className='twopieces-header-container'>
          <div className='twopieces-header-washrate'>
            <p className='twopieces-header'>2pieces</p>
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
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} required type="text" name="twopieces name"></input>
            </div>
            <div className='twopieces-phno-input-container'>
              <p>Ph No:</p>
              <input value={customerPhno} onChange={(e) => setCustomerPhno(e.target.value)} required type="text" name="twopieces phno"></input>
            </div>
  
            <div className='customer-type-container'>
              <p>Choose the type of customer</p>
              <div className='customer-type-radios-container'>
  
                <div className='customer-type-radio-container'>
                  <input type="radio" id="guest" name="customer type" value="guest" checked></input>
                  <label htmlFor='guest'>Guest</label>
                </div>
                <div className='customer-type-radio-container'>
                  <input type="radio" id="royal" name="customer type" value="royal"></input>
                  <label htmlFor='royal'>Royal</label>
                </div>
              </div>
            </div>
            
            <button type='submit' className='twopieces-name-phno-btn'>Add</button>
  
          </form>
  
          <form onSubmit={(e) => submitNumberAmount(e)} className='twopieces-number-amount-input-container'>
            <p className='twopieces-customer-name'>{customerName}</p>
            <div className='twopieces-number-input-container'>
              <p>Number:</p>
              <input value={number} onChange={(e) => setNumber(e.target.value)} type="number" id="number" name="number" min="0" max="99"></input>
            </div>
  
            <div className='twopieces-amount-input-container'>
              <p>Amount:</p>
              <div className='twopieces-amount-input'>
                <button type='button' className='twopieces-minus-btn' onClick={()=>{
                  if(amount > 1000){
                    setAmount(parseInt(amount)-100)
                  }
                  }}>-</button>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" id="amount" name="amount">
              </input>
  
                <button type='button' className='twopieces-plus-btn' onClick={()=>{setAmount(parseInt(amount)+100)}}>+</button>
              </div>
            </div>
  
            <button type='submit' className='twopieces-number-amount-btn'>Add</button>
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
                      twodNumbers.map((item) => (
                          <div className='twod-details-row'>
                          <p>{item.number <= 9 ? `0${item.number}` : item.number}</p>
                          <p>85</p>
                          <div className='twod-details-amount-container'>
                            <button onClick={(e) => 
                            {if(item.amount > 1000){
                              decreaseAmount(e,item)} 
  
                            }}
                              >-</button>
                            <input type="number" onChange={(e) => handleAmountfinalChange(e,item)} value={item.amount}></input>
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
                    <p>Punch Fee</p>
                    <p>0</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>Lottery Closing Time</p>
                    <p>98:00:00</p>
                  </div>
  
                  <button className='twod-betnow-btn' onClick={()=>submitBetNow()}>Bet Now</button>
                </div>
      </div>
      </>
    )
  }

export default TwoPieces