import React from 'react'
import "./styles.css"

const LastTwo = () => {
  const last2NumbersRow = (start,end) => {
    const arr = []
    for(let i = start; i <= end;i++){
      arr.push(
        
          <div className='last2-number-btn-container'>
            <p>{i <= 9 ? `0${i}` : i}</p>
            <input type="checkbox"></input>
          </div>
        
      )
    }
    return arr
  }
  return (
    <div className='last2-parent-container'>
      <div className='last2-select-container'>
        <div className='last2-select-competiton-container'>
            <p className='last2-select-competiton-label'>
              Competition:
            </p>
            <button className='last2-select-competiton-btn'>Normal</button>
        </div>
      </div>

      <div className='twopieces-header-container'>
          <div className='twopieces-header-washrate'>
            <p className='twopieces-header'>Last Two</p>
            <p className='twopieces-washrate'>wash rate   1.9</p>
          </div>
          <p className='twopieces-description'>Description</p>
      </div>

      <div className='last2-numbers-parent-container'>
        <p className='last2-numbers-label'>Choose Number</p>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(0,9)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(10,19)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(20,29)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(30,39)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(40,49)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(50,59)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(60,69)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(70,79)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(80,89)
        }
        </div>
        <div className='last2-number-btns-container'>
        {
          last2NumbersRow(90,99)
        }
        </div>

        
      </div>

      <div className='firstTwo-line'></div>


      <div className='twopieces-name-number-input-container'>

        {/* onSubmit={(e) => submitCustomerInfo(e)} */}
  
          <form  className='twopieces-name-phno-input-container'>
            <div className='twopieces-name-input-container'>
              <p>Name:</p>
              {/* value={customerName} onChange={(e) => setCustomerName(e.target.value)} */}
              <input  required type="text" name="twopieces name"></input>
            </div>
            <div className='twopieces-phno-input-container'>
              <p>Ph No:</p>
              {/* value={customerPhno} onChange={(e) => setCustomerPhno(e.target.value)} */}
              <input  required type="text" name="twopieces phno"></input>
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
  
          {/* onSubmit={(e) => submitNumberAmount(e)} */}
          <form  className='twopieces-number-amount-input-container'>
            <p className='twopieces-customer-name'></p>
            <div className='twopieces-number-input-container'>
              <p>Number:</p>
              {/* value={number} onChange={(e) => setNumber(e.target.value)} */}
              <input  type="number" id="number" name="number" min="0" max="99"></input>
            </div>
  
            <div className='twopieces-amount-input-container'>
              <p>Amount:</p>
              <div className='twopieces-amount-input'>
              {/* onClick={()=>{
                  if(amount > 1000){
                    setAmount(parseInt(amount)-100)
                  }
                  }} */}
                <button type='button' className='twopieces-minus-btn'>-</button>
                {/* value={amount} onChange={(e) => setAmount(e.target.value)} */}
              <input  type="number" id="amount" name="amount">
              </input>
              {/* onClick={()=>{setAmount(parseInt(amount)+100)}} */}
                <button type='button' className='twopieces-plus-btn' >+</button>
              </div>
            </div>
  
            <button type='submit' className='twopieces-number-amount-btn'>Add</button>
          </form>
  
      </div>

      <div className='twod-details-parent-container'>
                <div className='twod-details-container'>
                  <div className='twod-details-header-container'>
                    <p>Number</p>
                    <p>Wash Rate</p>
                    <p>Amount</p>
                  </div>
  
                  <div className='twod-details-table-container'>
                          <div className='twod-details-row'>
                          <p>80</p>
                          <p>85</p>
                          <div className='twod-details-amount-container'>
                          {/* onClick={(e) => 
                            {if(item.amount > 1000){
                              decreaseAmount(e,item)} 
  
                            }} */}
                            <button>-</button>
                              {/* onChange={(e) => handleAmountfinalChange(e,item)} value={item.amount} */}
                            <input type="number" ></input>
                            {/* onClick={(e) => increaseAmount(e,item)} */}
                            <button >+</button>
                          </div>
                          {/* onClick={() => deleteNumber(item)} */}
                          <button className='twod-details-delete-btn' >Delete</button>
                          </div>
                  </div>
                </div>
  
                <div className='twod-overall-details-container'>
                  <div className='twod-overall-detail-container'>
                    <p>Program Information</p>
                    <p></p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>Punch Fee</p>
                    <p>0</p>
                  </div>
                  <div className='twod-overall-detail-container'>
                    <p>Lottery Closing Time</p>
                    <p>98:00:00</p>
                  </div>
                  {/* onClick={()=>submitBetNow()} */}
                  <button className='twod-betnow-btn'>Bet Now</button>
                </div>
      </div>
      
    </div>
  )
}

export default LastTwo